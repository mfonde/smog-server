module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('review',{
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
        reviewRating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reviewText: {
            type: DataTypes.TEXT
        },
        imdbId: {
            type: DataTypes.STRING
        }
    })

    return Review;
}