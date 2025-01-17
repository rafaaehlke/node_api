const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const UserCreateService = require("./UserCreateService")
const AppError = require("../utils/AppError")

describe("UserCreateService", () => {
  it("user created sucessfull", async () => {
    
    const user = {
      name: "User Test",
      email: "teste@email.com",
      password: "123"
    }

    const userRepositoryInMemory = new UserRepositoryInMemory()
    const userCreateService = new UserCreateService(userRepositoryInMemory)
    const userCreated = await userCreateService.execute(user)

    expect(userCreated).toHaveProperty("id")
  })

  it("user not should be create with exists email", async () => {
    const user1 = {
      name: "Usuário 1",
      email: "teste1@email.com",
      password: "123"
    }

    const user2 = {
      name: "Usuário 2",
      email: "teste1@email.com",
      password: "456"
    }

    const userRepository = new UserRepositoryInMemory()
    const userCreateService = new UserCreateService(userRepository)

    
    await userCreateService.execute(user1)
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este email já está em uso."))

    //await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este email já está em uso."))

    
  })
})