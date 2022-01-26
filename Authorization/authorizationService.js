import User from './User.js';
import Role from './Role.js';
import bcrypt from 'bcryptjs';
import { AuthenticationError } from '../Errors/AuthenticationError.js';
import { RegistrationError } from '../Errors/RegistrationError.js';

class Service {
    async signup(user) {
        const { username, email, password } = user;
        const candidate = await User.findOne({ username });
        if (candidate) {
            throw new RegistrationError('User already exists');
        }
        const userRole = await Role.findOne({ value: 'User' });
        const hashPassword = bcrypt.hashSync(password, 7);
        const newUser = await User.create({ username, password: hashPassword, email, roles: [userRole._id] });
        return newUser;
    }
    async login(user) {
        const { username, password } = user;
        const candidateArray = await User.aggregate([
            { $match: { username: username } },
            {
                $lookup: {
                    from: "roles",
                    localField: "roles",
                    foreignField: "_id",
                    as: "roles"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$roles", 0] }, "$$ROOT"] } }
            }]);
        const candidate = candidateArray[0];
        if (!candidate) {
            throw new AuthenticationError('User does not exist');
        }
        const validPassword = bcrypt.compareSync(password, candidate.password);
        if (!validPassword) {
            throw new AuthenticationError('Password is wrong');
        };
        return candidate;
    }
    async makeRoles() {
        const userRole = new Role();
        const adminRole = new Role({ value: 'Admin' });
        await userRole.save();
        await adminRole.save();
    }
    async getUsers() {
        const foundUsers = await User.find();
        return foundUsers;
    }
}
export default new Service();
