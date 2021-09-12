module.exports = app => {
    app.route("/users")
        .post(app.src.api.user.insertUser)
        .get(app.src.api.user.getUsers)
}