module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('movie', {
        movieTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        released: {
            type: DataTypes.STRING
        },
        rated: {
            type: DataTypes.STRING
        },
        runtime: {
            type: DataTypes.STRING
        },
        genre: {
            type: DataTypes.STRING
        },
        director: {
            type: DataTypes.STRING
        },
        actors: {
            type: DataTypes.STRING
        },
        poster: {
            type: DataTypes.STRING
        },
        imdbId: {
            type: DataTypes.STRING,
            unique: true
        },
        plot: {
            type: DataTypes.STRING
        }
    })

    return Movie;
}