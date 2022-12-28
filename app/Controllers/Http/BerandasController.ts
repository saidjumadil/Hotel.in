// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Kamar from "App/Models/Kamar"
import Resepsi from "App/Models/Resepsi"

export default class BerandasController {
    async index({view}){
        const kosong = (await Kamar.query().where('status', 0)).length
        const isi = (await Kamar.query().where('status', 1)).length
        const suspend = (await Kamar.query().where('status', 2)).length
        const kamar = await Kamar.query()
        let list_kamar : any = []
        for(let index in kamar){
            if(kamar[index].status == 1){
                const resepsi = await Resepsi.query().where('kamar', kamar[index].id).first()
                list_kamar[index] = kamar[index]
                list_kamar[index]['detail'] = resepsi
            }
            else{
                list_kamar[index] = kamar[index]
            }
        }
        return view.render('beranda', {kosong, isi, suspend, kamar : list_kamar})
    }
}
