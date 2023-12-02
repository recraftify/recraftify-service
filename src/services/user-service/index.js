const UserRepository = require('../../repositories/user-repository');
class UserService {
    static async getUser(id) {
        const user = await UserRepository.getUserById(id);
        return {
            message: 'Fetching user successful',
            data: user,
        };
    }
}

module.exports = UserService;
