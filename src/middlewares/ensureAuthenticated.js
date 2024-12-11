const { Verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const {jwt} = require("../configs/auth")

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization //obtem o cabeçalho jwt

  // Verifica se existe token, se nao existir retorna o erro
  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401)
  }

  // Separa o bare antes do token com espaçamento
  const [, token] = authHeader.split(",")


  try {

    // retorna o conteudo armazenado (sub) e converte para user_id
    const { sub: user_id } = verify(token, authConfig.jwt.secret) // verifica se é um token jwt válido

    request.user = {
      id: Number(user_id)
    }

    return next()
  } catch (error) {
    throw new AppError("JWT Token inválido", 401)
  }
}

module.exports = ensureAuthenticated