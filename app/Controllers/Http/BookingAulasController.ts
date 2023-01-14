// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Aula from "App/Models/Aula"
import BookingAula from "App/Models/BookingAula"
import Application from '@ioc:Adonis/Core/Application';

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

    async edit({request, response, session}){
        let post = request.all()
        console.log(post)
        const aula : any = await Aula.query().where('id', post.aula).first()
        const start : any = new Date(post.mulai) 
        const end : any = new Date(post.akhir)
        
        // const cekJadwal = await BookingAula.cekJadwal(post.aula, start, end)
        // if (cekJadwal) {
        //     session.flash('status', {type: 'danger', message: 'Aula Sudah Dibooking Pada Tanggal Tersebut'})
        //     return response.redirect('back')
        // }

        const oneDay = 24 * 60 * 60 * 1000
        const total = (1 + ((end - start) / oneDay)) * aula.harga
        post['total'] = total

        console.log(aula.harga, start, end)

        const update = await BookingAula.query().where('id', post.id).update(post)
        if (update) {
            session.flash('status', {type: 'success', message: 'Data Booking berhasil Diubah'})
            return response.redirect('back')
        } else {
            session.flash('status', {type: 'danger', message: 'Data Booking Gagal Diubah'})
            return response.redirect('back')
        }
    }

    async bayar({request, response, session}){
        let post = request.all()
        const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']

        console.log(post)
        post['status_pembayaran'] = 1

        const path = 'BILL.xlsx'
        const booking : any = await BookingAula.query().where('id', post.id).first()
        const tanggal_booking = new Date(booking.akhir)
        const list_booking : any = await BookingAula.query().whereRaw(`MONTH(akhir) = ${tanggal_booking.getMonth() + 1}`).andWhereRaw(`YEAR(akhir) = ${tanggal_booking.getFullYear()}`).andWhere('status_pembayaran', 1)
        const aula : any = await Aula.query().where('id', booking.aula).first()
        const end = new Date(post.akhir)
        const serial = `${list_booking.length + 1}/DH/${roman[tanggal_booking.getMonth()]}/${tanggal_booking.getFullYear()}`
        post.serial = serial
        console.log(serial, path, post)

        //create bill
        await BookingAula.cetak(path, post, aula, booking, session.get('user.nama'))

        // const emailData = {nomor:kamar.nomor, nama:resepsi.nama}
        const fileName = `${aula.nama}_${await BookingAula.date(booking.akhir)}`

        const update = await BookingAula.query().where('id', post.id).update(post)
        if (update) {
            session.flash('status', {type: 'success', message: 'Aula Berhasil Dibayar'})
            return {fileName : fileName}
        } else {
            session.flash('status', {type: 'danger', message: 'Aula Gagal Dibayar'})
            return response.redirect('back')
        }
    }

    async invoice({response, request}){
        const {fileName} = request.all()
        const filePath = Application.publicPath('uploads/filename.xlsx')
        console.log(filePath)
        response.attachment(filePath, fileName+'.xlsx')
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
