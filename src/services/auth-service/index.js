const UserRepository = require('../../repositories/user-repository');
const { hashPassword, comparePassword } = require('../../utils/hash-password');
const JWTMiddleware = require('../../middlewares/jwt');
class AuthService {
    static async register(user) {
        const existingUser = await UserRepository.getUserByUsername(
            user.username,
        );
        if (existingUser) {
            return {
                error_message: 'Username already exists',
            };
        }
        const hashedPassword = await hashPassword(user.password);
        user.password = hashedPassword;
        await UserRepository.createUser(user);
        return {
            message: 'User created successfully',
        };
    }

    static async login(user) {
        const existingUser = await UserRepository.getUserByUsername(
            user.username,
        );
        if (!existingUser) {
            return {
                error_message: 'Username does not exist',
            };
        }
        const isPasswordCorrect = await comparePassword(
            user.password,
            existingUser.password,
        );
        if (!isPasswordCorrect) {
            return {
                error_message: 'Password is incorrect',
            };
        }
        return {
            token: JWTMiddleware.createToken(existingUser.id),
        };
    }
}

module.exports = AuthService;
