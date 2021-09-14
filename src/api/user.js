const { uuid } = require("uuidv4")

module.exports = app => {

    const { isNullValue, isEquals, emailVerification } = app.src.utils.validationUser

    const hasAccount = async (req, res) => {
        const user = { ...req.body }

        try {
            isNullValue(user.name, "Preencha o campo de usuário.")
            isNullValue(user.lastName, "Preencha o sobrenome nome.")
            isNullValue(user.email, "Preencha o campo de e-mail.")
            emailVerification(user.email)
            isNullValue(user.password, "Preencha o campo senha.")
            isEquals(user.password, user.confirmPassword, "Senha invalida.")
        } catch(msg) {
            return res.status(400).send(msg)
        }
        
        const querySelect = "SELECT * FROM user WHERE email = ?  ALLOW FILTERING"
        const paramsOne = [user.email]

        await app.db.execute(querySelect, paramsOne, { prepare: true}, (err, result) => {
            if (result["rows"][0]) {
                return res.status(400).send("Usuário ja esta cadastrado")
            } else {
                createAccount(user)
                return res.status(200).send("Cadastro realizado com sucesso")
            }
        })
    }
    

    const createAccount = async (user) => {
        const query = [
            {
                query: "INSERT INTO user (id, createat, email, lastname, name, password) VALUES (?,?,?,?,?,?)",
                params: [uuid(), new Date(), user.email, user.lastName, user.name, user.password,]
            }
        ]
        
        await app.db.batch(query, { prepare: true }, (err, result) => {
            if (err) return res.status(500).send(err)
        })    
    }

    const login = async (req, res) => {
        const user = { ...req.body }
        
        try {
            isNullValue(user.email, "Preencha o campo de email.")
            isNullValue(user.password, "Preencha o campo senha.")
        } catch(msg) {
            res.status(400).send(msg)
        }

        const query = "SELECT * FROM user WHERE email = ? AND password = ? ALLOW FILTERING"
        const params = [user.email, user.password]
        
        await app.db.execute(query, params, { prepare: true })
            .then(result => {
                
                if(result.first() === null) {
                    res.status(400).send("Usuário não esta na nossa base de dados.")
                } else {
                    res.status(200).send(result.first())
                }
            })    
            .catch(err => res.status(500).send(err))
    }

    return { createAccount, login, hasAccount }
}