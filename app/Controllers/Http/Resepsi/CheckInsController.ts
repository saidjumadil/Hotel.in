// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CheckInsController {
    async index({view}){
        return view.render('resepsi/check_in/index')
    }
}
