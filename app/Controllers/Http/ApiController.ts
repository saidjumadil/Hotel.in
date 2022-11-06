// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AdditionalItem from "App/Models/AdditionalItem"
import Diskon from "App/Models/Diskon"
import Kamar from "App/Models/Kamar"
import Resepsi from "App/Models/Resepsi"

export default class ApiController {
    async addItem(){
        return await AdditionalItem.query()
    }
    
    async diskon({request}){
        const {check_in} = request.all()
        const tanggal = new Date(check_in)
        const diskon = await Diskon.query().where('mulai', '<=', tanggal).andWhere('akhir', '>=', tanggal)
        return {diskon}
    }

    async analisa(){
        const kamar = await Kamar.query()
        let data_kamar : any = {'labels': [], 'series': []}
        for(let item of kamar){
            data_kamar.labels.push(item.nomor)
            const jumlah = (await Resepsi.query().where('kamar', item.id)).length
            data_kamar.series.push(jumlah)
        }
        return {kamar : data_kamar}
    }
}
