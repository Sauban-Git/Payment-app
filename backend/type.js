const zod = require("zod")

const createUser = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    username: zod.string(),
    password: zod.string(),
})

const checkUser = zod.object({
    username: zod.string(),
    password: zod.string(),
})
module.exports ={
    createUser,
    checkUser,
}