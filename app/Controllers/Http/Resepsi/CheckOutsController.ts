// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CheckOutsController {
    async index({view}){
        return view.render('resepsi/check_out/index')
    }
}
