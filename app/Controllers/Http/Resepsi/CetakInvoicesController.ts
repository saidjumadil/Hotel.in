// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Kamar from "App/Models/Kamar"
import Resepsi from "App/Models/Resepsi"

export default class CetakInvoicesController {
    async index({view}){
        const resepsi = await Resepsi.query().where('status_pembayaran', 1)
        let detail_resepsi : any = []
        for(let item of resepsi){
            const detail = await Kamar.query().where('id', item.kamar).first()
            item['detail'] = detail
            detail_resepsi.push(item)
        }
        console.log(detail_resepsi)
        return view.render('resepsi/cetak_invoice/index', {resepsi : detail_resepsi})
    }
}
