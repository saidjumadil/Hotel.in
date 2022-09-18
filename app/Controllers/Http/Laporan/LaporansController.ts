// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LaporansController {
    async index({view}){
        return view.render('laporan/rekap/index')
    }
}
