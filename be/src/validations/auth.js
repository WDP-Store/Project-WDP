import Joi from "joi";
const validateRegister = data => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string()
                .email()
                .not(null)
                .only()
                .required(),
        password: Joi.string()
                .min(6)
                .max(32)
                .required(),    
    })

    return schema.validate(data);
}
const validateLogin = data => {
    const schema = Joi.object({
        email: Joi.string()
                .email()
                .not(null)
                .only()
                .required(),
        password: Joi.string()
                .min(6)
                .max(32)
                .required(),      
    })

    return schema.validate(data);
}

export default {
    validateRegister,
    validateLogin
}