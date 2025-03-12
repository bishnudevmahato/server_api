const { z } = require('zod')

// creating an object schema

const signupSchema = z.object({
    username : z.string({required_error : 'name is require'})
    .trim()
    .min(3, {message : "name most be a length 3"})
    .max(255, {message : "maximum 255 length"}),

    email : z.string({required_error : 'email is require'})
    .trim()
    .min(3, {message : "email most be a length 3"})
    .max(255, {message : "maximum 255 length"}),

    phone : z.string({required_error : 'phone is require'})
    .trim()
    .min(10, {message : "phone most be a length 10"})
    .max(20, {message : "maximum 20 length"}),

    password : z.string({required_error : 'password is require'})
    .min(7, {message : "password most be a length 7"})
    .max(255, {message : "maximum 255 length"}),

})

module.exports = signupSchema;