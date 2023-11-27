const UserModel = (sequelize, { DataTypes }) => {
    const User = sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            timestamps: false,
        },
    );

    User.associate = (models) => {
        User.hasMany(models.LoggingScan, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
        });
    };

    return User;
};

module.exports = UserModel;
