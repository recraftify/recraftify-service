const WasteModel = (sequelize, { DataTypes }) => {
    const Waste = sequelize.define(
        'Waste',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'waste',
            timestamps: false,
        },
    );

    Waste.associate = (models) => {
        Waste.hasMany(models.LoggingScan, {
            foreignKey: 'waste_id',
            onDelete: 'CASCADE',
        });
    };

    return Waste;
};

const LoggingScanModel = (sequelize, { DataTypes }) => {
    const LoggingScan = sequelize.define(
        'logging_scan',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            waste_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: 'logging_scan',
            timestamps: false,
        },
    );

    LoggingScan.associate = (models) => {
        LoggingScan.belongsTo(models.User, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
        });
        LoggingScan.belongsTo(models.Waste, {
            foreignKey: 'waste_id',
            onDelete: 'CASCADE',
        });
    };
    return LoggingScan;
};

module.exports = { WasteModel, LoggingScanModel };
