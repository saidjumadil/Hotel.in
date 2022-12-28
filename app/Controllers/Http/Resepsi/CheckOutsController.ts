// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Kamar from "App/Models/Kamar"
import Resepsi from "App/Models/Resepsi"
import ExcelJS from "exceljs"
import Application from '@ioc:Adonis/Core/Application';
import Env from '@ioc:Adonis/Core/Env';


export default class CheckOutsController {

    async index({view}){
        const kamar : any = await Resepsi.query().where('status_pembayaran', 0)
        let detail_kamar : any = []
        for(let item of kamar){
            const detail = await Kamar.query().where('id', item.kamar).first()
            item['detail'] = detail
            detail_kamar.push(item)
        }
        return view.render('resepsi/check_out/index', {kamar : detail_kamar})
    }

    async post({request, response, session}) {
        const post = request.all()
        console.log(post)
        const path = 'BILL.xlsx'
        const resepsi : any = await Resepsi.query().where('id', post.id).first()
        const kamar : any = await Kamar.query().where('id', post.kamar).first()
        // console.log(resepsi.serialize())

        const end = new Date(post.check_out)
        const serial = `${end.getDate()}-${end.getMonth()+1}-${end.getFullYear().toString().slice(2,4)}/DH/${post.id}`
        
        post.serial = serial
        post.status_pembayaran = 1

        //create bill
        await Resepsi.cetak(path, post, kamar, resepsi, session.get('user.nama'))
        
        const fileName = `${kamar.nomor}_${await Resepsi.date(resepsi.check_out)}`

        const update = await Resepsi.query().where('id', post.id).update(post)

        if (update) {
            await Kamar.query().where('id', post.kamar).update('status', 0)
            session.flash('status', {type: 'success', message: 'Tamu Berhasil Check-Out'})
            return {fileName : fileName}
        } else {
            session.flash('status', {type: 'danger', message: 'Tamu Gagal Check-Out'})
            return response.redirect('back')
        }
    }

    

}
