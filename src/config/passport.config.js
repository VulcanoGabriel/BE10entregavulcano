import passport from "passport";
import local from "passport-local"
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../../utils.js";
import GitHubStrategy from "passport-github2"
import env from "../config.js";

const LocalStrategy = local.Strategy

const initializePassport = () => {

    ////Bcrypt///////////////////////////////////////////////////////////////////////////////////////////////////////

    passport.use('register', new LocalStrategy({
        passReqToCallback: true, // Tener acceso al req como un middleware
        usernameField: 'email'
    }, async (req, username, password, done) => {

        const { name, email } = req.body
        try {
            const user = await UserModel.findOne({ email: username })
            if (user) {
                console.log('User already exits')
                return done(null, false)
            }

            const newUser = {
                name,
                email,
                password: createHash(password)
            }
            const result = await UserModel.create(newUser)
            return done(null, result)
        } catch (error) {
            done('Error to register ' + error)
        }
    }))

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ email: username }).lean().exec()
                if (!user) {
                    console.error('User doent exist')
                    return done(null, false)
                }

                if (!isValidPassword(user, password)) {
                    console.error('password not valid')
                    return done(null, false)
                }

                return done(null, user)
            } catch (error) {
                return done('Error login ' + error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })

    //github//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    passport.use(`github`, new GitHubStrategy({


        //id otorgada por github unica de app para trabajar con nuestro sitio web

        clientID: process.env.GITHUBID,

        //codigo de app unico generado por github

        clientSecret: process.env.GITHUBSECRET,

        //ruta de funcion callback

        callBackURL: `http//127.0.0.1:8080/githubcallback`

    }, async (accesToken, refreshToken, profile, done) => {

        console.log(profile)

        try {

            const user = await UserModel.findOne({ email: profile._json.email })

            if (user) {
                console.log(`ya se encuentra registrado`)
                return done(null, user)
            }

            const newUser = await UserModel.create({
                first_name: profile._json.name,
                last_name: ``,
                email: profile._json.email,
                password: ``,
                age: ``
            })

            return done(null, newUser)

        } catch (e) { return done(`error para loguear git`) }
    }

    ))

    passport.serializeUser((user, done) => {

        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {

        const user = await UserModel.findById(id)
        done(null, user)
    })
}

export default initializePassport