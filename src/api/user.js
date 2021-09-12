const { uuid } = require("uuidv4")

module.exports = app => {

    const { isNullValue, isEquals, emailVerification } = app.src.utils.validationUser

    const createAccount = async (req, res) => {
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
    
        const query = [
            {
                query: "INSERT INTO user (id, createat, email, lastname, name, password) VALUES (?,?,?,?,?,?)",
                params: [uuid(), new Date(), user.email, user.lastName, user.name, user.password,]
            }
        ]

        try {
            await app.db.batch(query, { prepare: true }, (err, result) => {
                if (err) res.status(500).send(err)
                else res.status(200).send()
            })
        }catch(msg) {
            res.status(500).send(`Erro no servidor.\n ${msg}`)
        }
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
        app.db.execute(query, params)
          .then(users => {
            if (users["rows"].length === 0) {
                return res.status(400).send("Usuario não esta cadastrado.")
            }
            return res.status(200).send(res.json(users["rows"]))
        })
          .catch(err => res.status(500).send(err))
    }

    return { createAccount, login }
}