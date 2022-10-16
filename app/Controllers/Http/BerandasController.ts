// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Kamar from "App/Models/Kamar"

export default class BerandasController {
    async index({view}){
        const kosong = (await Kamar.query().where('status', 0)).length
        const isi = (await Kamar.query().where('status', 1)).length
        const kamar = await Kamar.query()
        return view.render('beranda', {kosong, isi, kamar})
    }
}
