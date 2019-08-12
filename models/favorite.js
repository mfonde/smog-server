module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('favorite', {
        movieTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        poster: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.INTEGER
        },
        username: {
            type: DataTypes.STRING
        },
        imdbId: {
            type: DataTypes.STRING
        },
        ranking: {
            type: DataTypes.INTEGER
        }
    })

    return Favorite;
}