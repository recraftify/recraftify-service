class UserModel {
    constructor({ uid, name, email }) {
        this.id = uid;
        this.name = name;
        this.email = email;
    }
}

module.exports = UserModel;
