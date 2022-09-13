// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    async index({ view }) {
        return view.render('login')
    }
    
    async check({ request, auth, session, response }) {
    /**
     * get data from form
     */
    const { email, password } = request.all()

    /**
     * attemp auth
     */
    await auth.attempt(email, password)

    return email

    }

    async logout({ auth, response }) {
    await auth.logout()
    return response.route('login.index')
    }
}
