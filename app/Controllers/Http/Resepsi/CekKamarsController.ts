// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CekKamarsController {
    async index({ view }) {
        return view.render('resepsi/cek_kamar/index')
    }
}
