const StandardError = require('../utils/standard-error');
const { getDB } = require('../clients/google-firestore-admin');

class UserRepository {
    static async getUserById(id) {
        try {
            const DB = getDB();
            const user = await DB.collection('users').doc(id).get();
            if (user.exists) {
                return user.data();
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
