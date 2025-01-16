const UserCreateService = require("./UserCreateService")

it("user created sucessfull", () => {
  const user = {
    name: "User Test",
    email: "teste@email.com",
    password: "123"
  }

  const userCreateService = new userCreateService()
  const userCreated = await userCreateService.execute(user)

  expect(userCreated).toHaveProperty("id")

})