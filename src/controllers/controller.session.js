import userModel from "../models/user.model.js";

export const login = async (req, res) => {

    const {email, password} = req.body
    const user = await userModel.findOne({email , password})
    if(!user)  return res.status(404).send(`user not found`)
    req.session.user = user
    return res.redirect(`/products`)
}

export const register = async  (req, res) =>{
    const user = req.body
    console.log(user)
    if(user.email === `adminCoder@coder.com` &&  user.password === `admincod3r123`){ 
         user.role = "admin"
        await userModel.create(user)
        res.redirect(`/`)
    } else{
    await userModel.create(user)
    return res.redirect(`/`)}
}

