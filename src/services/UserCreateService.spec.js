const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")

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

    console.log(userCreated)
    expect(userCreated).toHaveProperty("id")

  })
})