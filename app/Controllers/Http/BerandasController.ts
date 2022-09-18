// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BerandasController {
    async index({view}){
        return view.render('beranda')
    }
}
