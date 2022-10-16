// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Kamar from "App/Models/Kamar"

export default class CekKamarsController {
    async index({ view }) {
        const kamar = await Kamar.query()
        const kosong = (await Kamar.query().where('status', 0)).length
        const isi = (await Kamar.query().where('status', 1)).length
        const suspend = (await Kamar.query().where('status', 2)).length
        return view.render('resepsi/cek_kamar/index', {kamar, kosong, isi, suspend})
    }
}
