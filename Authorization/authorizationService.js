import User from './User.js';
import Role from './Role.js';
import bcrypt from 'bcryptjs';
export const userExistsMessage = 'User already exists';
export const userDoesNotExistMessage = 'User does not exist';
export const passwordIsWrongMessage = 'Password is wrong';

class Service {
    async signup(user) {
        const { username, password } = user;
        const candidate = await User.findOne({ username });
        if (candidate) {
            throw new Error(userExistsMessage);
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({ value: 'Admin' });
        const newUser = await User.create({ username, password: hashPassword, roles: [userRole.value] });
        return newUser;
    }
    async login(user) {
        const { username, password } = user;
        const candidate = await User.findOne({ username });
        if (!candidate) {
            throw new Error(userDoesNotExistMessage);
        }
        const validPassword = bcrypt.compareSync(password, candidate.password);
        if (!validPassword) {
            throw new Error(passwordIsWrongMessage);
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
