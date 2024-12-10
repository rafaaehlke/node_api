const knex  = require("../database/knex")
const AppError = require("../utils/AppError")
const { compare } = require("bcryptjs")

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await knex("users").where({email}).first()

    if(!user) {
      throw new AppError("Email e/ou senha incorreta", 401)
    }

    const passwordCheck = await compare(password, user.password)

    if(!passwordCheck) {
      throw new AppError("Senha incorreta. Tente novamente", 401)
    }

    return response.json({ email, password })
  }
}

module.exports = SessionsController