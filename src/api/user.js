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
            await app.db.batch(query, { prepare: true })
        }catch(msg) {
            res.status(500).send(`Erro no servidor.\n ${msg}`)
        }
        res.status(200).send("Cadastro finalizado com sucesso!")
    }

    const login = async (req, res) => {
        return res.status(200).send()
    }
    
    return { createAccount, login }
}