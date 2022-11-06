// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User"

export default class AuthController {
    async index({ view }) {
        return view.render('login')
    }
    
    async check({ request, response, auth }) {
    const { username, password } = request.all()
    // await auth.attempt(email, password)
    const user = await User.query().where('username', username).first()
    auth.login(user)
    return response.redirect().toRoute('beranda')
    }

    async logout({ auth, response }) {
    await auth.logout()
    return response.redirect().toRoute('login')
    }
}
