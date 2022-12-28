// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Aula from "App/Models/Aula"
import BookingAula from "App/Models/BookingAula"

export default class BookingAulasController {
    async index({view}){
        const aula = await Aula.query()
        const list : any = await BookingAula.query()
        let list_detail : any = []
        for(let item in list){
            const aula = await Aula.query().where('id', list[item].aula).first()
            list_detail[item] = list[item]
            list_detail[item]['detail'] = aula
        }

        return view.render('booking_aula', {aula, list : list_detail})
    }

    async post({request, response, session}){
        let post = request.all()
        const aula : any = await Aula.query().where('id', post.aula).first()
        const start : any = new Date(post.mulai) 
        const end : any = new Date(post.akhir)
        
        const cekJadwal = await BookingAula.cekJadwal(post.aula, start, end)
        if (cekJadwal) {
            session.flash('status', {type: 'danger', message: 'Aula Sudah Dibooking Pada Tanggal Tersebut'})
            return response.redirect('back')
        }

        const oneDay = 24 * 60 * 60 * 1000
        const total = (1 + ((end - start) / oneDay)) * aula.harga
        post['total'] = total

        console.log(aula.harga, start, end)
        const add = await BookingAula.create(post)
        if (add) {
            session.flash('status', {type: 'success', message: 'Aula Berhasil dibooking'})
            return response.redirect('back')
        } else {
            session.flash('status', {type: 'danger', message: 'Aula Gagal Dibooking'})
            return response.redirect('back')
        }
    }

    async bayar({request, response, session}){
        let post = request.all()
        post['status_pembayaran'] = 1

        console.log(post)
        const update = await BookingAula.query().where('id', post.id).update(post)
        if (update) {
            session.flash('status', {type: 'success', message: 'Aula Berhasil Dibayar'})
            return response.redirect('back')
        } else {
            session.flash('status', {type: 'danger', message: 'Aula Gagal Dibayar'})
            return response.redirect('back')
        }
    }

    async hapus({request, response, session}){
        const {id} = request.all()

        const hapus = await BookingAula.query().where('id', id).delete()
        if (hapus) {
            session.flash('status', {type: 'success', message: 'Aula Berhasil Dihapus'})
            return response.redirect('back')
        } else {
            session.flash('status', {type: 'danger', message: 'Aula Gagal Dihapus'})
            return response.redirect('back')
        }
    }
}
