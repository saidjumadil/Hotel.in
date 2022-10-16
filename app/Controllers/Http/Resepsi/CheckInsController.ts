// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Kamar from "App/Models/Kamar"
import TipeKamar from "App/Models/TipeKamar"

export default class CheckInsController {
    async index({view}){
        let detail_kamar : any = []
        const kamar : any = await Kamar.query().leftJoin('tipe_kamars as tk', 'tk.id', 'kamars.tipe').select('kamars.*',).select('tk.harga')
        // console.log(kamar[0])
        for (const item of kamar) {
            const {harga} : any = await TipeKamar.query().select('harga').where('id', item.tipe).first()
            item['harga'] = harga
            detail_kamar.push(item)
        }
        // console.log(detail_kamar)
        return view.render('resepsi/check_in/index', {kamar : detail_kamar})
    }
    
}
