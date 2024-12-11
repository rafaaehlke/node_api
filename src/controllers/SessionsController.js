const authConfig = require("../configs/auth")
const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const { sign } = require("jsonwebtoken")
const { compare } = require("bcryptjs")

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    // busca dentro de users e retorna o primeiro email
    const user = await knex("users").where({ email }).first()

    // verifica se o email digitado é valido com já cadastrado
    if (!user) {
      throw new AppError("Email e/ou senha incorreta", 401)
    }

    const passwordCheck = await compare(password, user.password)

    if (!passwordCheck) {
      throw new AppError("Senha incorreta. Tente novamente", 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.json({ user, token })
  }
}

module.exports = SessionsController