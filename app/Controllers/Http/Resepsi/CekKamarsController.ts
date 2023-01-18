// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AdditionalItem from "App/Models/AdditionalItem"
import Diskon from "App/Models/Diskon"
import Kamar from "App/Models/Kamar"
import Resepsi from "App/Models/Resepsi"

export default class CekKamarsController {
    async index({ view }) {
        const kamar = await Kamar.query()
        let detail_kamar : any = []
        for(let item in kamar){
            const resepsi : any = await Resepsi.query().where('kamar', kamar[item].id).andWhere('status_pembayaran', 0).first()
            detail_kamar[item] = kamar[item]
            detail_kamar[item]['detail'] = resepsi
            if(resepsi){
                if (resepsi.id_item != null) {
                    const id_item = resepsi.id_item.split(',')
                    const jumlah_item = resepsi.jumlah_item.split(',')
                    detail_kamar[item]['addItem'] = []
                    for(let i in id_item){
                        const detail_item : any = await AdditionalItem.query().where('id', id_item[i]).first()
                        const def_item = {
                            detail_item : detail_item.serialize(),
                            jumlah : jumlah_item[i]
                        }
                        detail_kamar[item]['addItem'].push(def_item)
                    }        
                }
                else{
                    detail_kamar[item]['addItem'] = false
                }
            }
            else{
                detail_kamar[item]['addItem'] = false
            }
            if (detail_kamar[item]['addItem']) {
                console.log(detail_kamar[item])
            }
        }
        const diskon = await Diskon.query()
        const addItem = await AdditionalItem.query()
        const kosong = (await Kamar.query().where('status', 0)).length
        const isi = (await Kamar.query().where('status', 1)).length
        const suspend = (await Kamar.query().where('status', 2)).length
        return view.render('resepsi/cek_kamar/index', {kamar : detail_kamar, kosong, isi, suspend, diskon, addItem})
    }

    async post({response, request, session}){
        let post = request.all()
        const kamar : any = await Kamar.query().where('id', post.kamar).first()
        const diskon : any = await Diskon.query().where('id', post.diskon).first() || 0
        let addItem = 0
        // const cekBooking = await Booking
        

        //Hitung total harga
        if (post.id_item) {
            for(let index in post.id_item){
                const item : any = await AdditionalItem.query().where('id', post.id_item[index]).first()
                addItem += post.jumlah_item[index] * item.harga
            }
            post.id_item = post.id_item.toString()
            post.jumlah_item = post.jumlah_item.toString()
        }
        const start : any = new Date(post.check_in) 
        const end : any = new Date(post.check_out)
        const oneDay = 24 * 60 * 60 * 1000
        const total = ((end - start) / oneDay) * (kamar.harga + addItem - (diskon.length > 0 ? diskon.potong : 0))
        
        post.total = total
        
        console.log(post)
        const create = await Resepsi.query().where('id', post.id).update(post)
        if (create) {
            await Kamar.query().where('id', post.kamar).update('status', 1)
            session.flash('status', {type: 'success', message: 'Data Tamu Berhasil Diubah'})
            return response.redirect('back')
        } else {
            session.flash('status', {type: 'danger', message: 'Data Tamu Gagal Diubah'})
            return response.redirect('back')
        }
    }
}
