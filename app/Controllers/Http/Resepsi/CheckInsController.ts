// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AdditionalItem from "App/Models/AdditionalItem"
import Diskon from "App/Models/Diskon"
import Kamar from "App/Models/Kamar"
import Resepsi from "App/Models/Resepsi"
import TipeKamar from "App/Models/TipeKamar"

export default class CheckInsController {
    async index({view}){
        let detail_kamar : any = []
        const kamar : any = await Kamar.query().leftJoin('tipe_kamars as tk', 'tk.id', 'kamars.tipe').select('kamars.*',).select('tk.harga').where('kamars.status', 0)
        // console.log(kamar[0])
        for (const item of kamar) {
            const {harga} : any = await TipeKamar.query().select('harga').where('id', item.tipe).first()
            item['harga'] = harga
            detail_kamar.push(item)
        }
        // console.log(detail_kamar)
        return view.render('resepsi/check_in/index', {kamar : detail_kamar})
    }

    async post({request, response, session}){
        let post = request.all()
        console.log(post)
        const kamar : any = await Kamar.query().where('id', post.kamar).first()
        const tipe_kamar : any = await TipeKamar.query().where('id', kamar.tipe).first()
        const diskon : any = await Diskon.query().where('id', post.diskon).first() || 0
        let addItem = 0

        //Hitung total harga
        if (post.id_item) {
            for(let index in post.id_item){
                const item : any = await AdditionalItem.query().where('id', post.id_item[index]).first()
                addItem += post.jumlah_item[index] * item.harga
            }
            console.log(addItem)
            post.id_item = post.id_item.toString()
            post.jumlah_item = post.jumlah_item.toString()
        }
        const start : any = new Date(post.check_in) 
        const end : any = new Date(post.check_out)
        const oneDay = 24 * 60 * 60 * 1000
        const total = ((end - start) / oneDay) * (tipe_kamar.harga + addItem - (diskon.length > 0 ? diskon.potong : 0))
        console.log(total)

        post.total = total
        
        const create = await Resepsi.create(post)
        if (create) {
            await Kamar.query().where('id', post.kamar).update('status', 1)
            session.flash('status', {type: 'success', message: 'Tamu Berhasil Check-In'})
            return response.redirect('back')
        } else {
            session.flash('status', {type: 'danger', message: 'Tamu Gagal ditambahkan Check-In'})
            return response.redirect('back')
        }
    }

    
}
