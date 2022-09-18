// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AnalisasController {
    async index({view}){
        return view.render('laporan/analisa/index')
    }
}
