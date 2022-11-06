// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Kamar from "App/Models/Kamar"

export default class AnalisasController {
    async index({view}){
        const avail = (await Kamar.query().where('status', 0)).length
        const suspend = (await Kamar.query().where('status', 2)).length
        const unavail = (await Kamar.query().where('status', 1)).length

        return view.render('laporan/analisa/index', {avail, unavail, suspend})
    }
}
