// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Kamar from "App/Models/Kamar"
import Resepsi from "App/Models/Resepsi"

export default class LaporansController {
    async index({view}){
        const rekap = await Resepsi.query().where('status_pembayaran', 1)
        let detail_rekap : any = []
        for(let item of rekap){
            const detail = await Kamar.query().where('id', item.kamar).first()
            item['detail'] = detail
            detail_rekap.push(item)
        }
        return view.render('laporan/rekap/index', {rekap : detail_rekap})
    }
}
