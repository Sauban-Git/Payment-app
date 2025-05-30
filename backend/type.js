const zod = require("zod")

const createUser = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    username: zod.string().min(8, "Username should be at least of 8 characters."),
    password: zod.string().min(6, "Password should be at least of 6 characters."),
})

const checkUser = zod.object({
    username: zod.string(),
    password: zod.string(),
})
module.exports ={
    createUser,
    checkUser,
}