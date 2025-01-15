const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository // this é referenciado uma chave GLOBAL para o scope global
  }

  async execute({ name, email, password }) {
    const checkUserExist = await this.userRepository.findByEmail(email)

    if (checkUserExist) {
      throw new AppError("Este email já está em uso.")
    }

    const hashedPassword = await hash(password, 8)

    await this.userRepository.create({ name, email, password: hashedPassword })

  }

}

module.exports = UserCreateService