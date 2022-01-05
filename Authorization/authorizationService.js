import User from './User.js';
import Role from './Role.js';
import bcrypt from 'bcryptjs';
import { AuthenticationError } from '../Errors/AuthenticationError.js';
import { RegistrationError } from '../Errors/RegistrationError.js';
import { userSample } from './helpers/userAggregationHelpers.js';

class AuthorizationService {

    async signup(user) {
        const { username, email, password } = user;
        const candidateFindByName = await User.findOne({ username });
        if (candidateFindByName) {
            throw new RegistrationError('User already exists');
        }
        const candidateFindByEmail = await User.findOne({ email });
        if (candidateFindByEmail) {
            throw new RegistrationError('Email already exists');
        }
        const userRole = await Role.findOne({ value: 'User' });
        const hashPassword = bcrypt.hashSync(password, 7);
        const newUser = await User.create({ username, password: hashPassword, email, roles: [userRole._id] });
        return newUser;
    }

    async login(user) {
        const { username, password } = user;
        const candidateArray = await User.aggregate(userSample(username));
        const candidate = candidateArray[0];
        if (!candidate) {
            throw new AuthenticationError('User does not exist');
        }
        const validPassword = await bcrypt.compare(password, candidate.password);
        if (!validPassword) {
            throw new AuthenticationError('Password is wrong');
        };
        return candidate;
    }
    async getUser(userId) {
        const foundUser = await User.findById(userId);
        return foundUser;
    }
}

export default new AuthorizationService();
