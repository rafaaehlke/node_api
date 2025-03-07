const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")
const UserRepository = require("../repositories/UserRepository")
const sqliteConnection = require("../database/sqlite")
const UserCreateService = require("../services/UserCreateService")


class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const userRepository = new UserRepository()
    const userCreateService = new UserCreateService(userRepository)

    await userCreateService.execute({ name, email, password })

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id

    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

    if (!user) {
      throw new AppError("Usuário não encontrado.")
    }

    // Verifica se já existe um usuário com o e-mail especificado
    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    // Verifica se o id do usuário é diferente do id do email, se for diferente nao deixa alterar
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email já está em uso.")
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    // Se o usuário digitar apenas a senha nova, sem a antiga apresentará a mensagem abaixo
    if (password && !old_password) {
      throw new AppError("Voce precisa informar a senha antiga!")
    }

    // Compara a senha nova com a antiga
    if (password && old_password) {
      // Checa se a senha antiga bate com a que era antes
      const checkOldPassword = await compare(old_password, user.password)
      // Se a senha antiga for diferente, apresentará o erro a abaixo
      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.")
      }

      // Faz a criptografia da senha nova para a DB 
      user.password = await hash(password, 8)
    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    )

    return response.json()
  }
}

module.exports = UsersController