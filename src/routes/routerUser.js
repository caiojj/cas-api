module.exports = app => {
    app.route("/login")
        .post(app.src.api.user.login)

    app.route("/createAccount")
        .post(app.src.api.user.createAccount)
}