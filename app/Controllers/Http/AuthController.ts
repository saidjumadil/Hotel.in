// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    async index({ view }) {
        return view.render('login')
    }
    
    async check({ request, response }) {
    const { username, password } = request.all()
    // await auth.attempt(email, password)
    console.log(username, password)
    return response.redirect().toRoute('beranda')
    }

    async logout({ auth, response }) {
    await auth.logout()
    return response.redirect().toRoute('login')
    }
}
