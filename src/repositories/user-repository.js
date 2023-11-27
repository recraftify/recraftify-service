const { models } = require('../db/index');
const StandardError = require('../utils/standard-error');

class UserRepository {
    static async createUser(user) {
        try {
            return await models.User.create({
                name: user.name,
                username: user.username,
                password: user.password,
            });
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error occured in database',
                error,
                {
                    user,
                },
            );
        }
    }

    static async getUserByUsername(username) {
        try {
            return await models.User.findOne({
                where: {
                    username,
                },
            });
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error occured in database',
                error,
                {
                    username,
                },
            );
        }
    }

    static async getUserById(id) {
        try {
            return await models.User.findOne({
                where: {
                    id,
                },
            });
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error occured in database',
                error,
                {
                    id,
                },
            );
        }
    }
}

module.exports = UserRepository;
