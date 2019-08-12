module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profilePic: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true
        }
    })

    return User;
}