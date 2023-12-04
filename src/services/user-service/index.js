const UserRepository = require('../../repositories/user-repository');
class UserService {
    static async getUser(id) {
        const user = await UserRepository.getUserById(id);
        return {
            message: `Fetching user with id ${id} successful`,
            data: user,
        };
    }
}

module.exports = UserService;
