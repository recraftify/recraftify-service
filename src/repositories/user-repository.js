const StandardError = require('../utils/standard-error');
const DB = require('../config/service-config');
const UserModel = require('../db/user-model');

class UserRepository {
    static async getUserById(id) {
        try {
            const user = await DB.collection('users').doc(id).get();
            if (user.exists) {
                return new UserModel(user.data());
            }
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
