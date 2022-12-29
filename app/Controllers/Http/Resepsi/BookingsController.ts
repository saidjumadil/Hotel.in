// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AdditionalItem from 'App/Models/AdditionalItem';
import Booking from 'App/Models/Booking';
import Diskon from 'App/Models/Diskon';
import Kamar from 'App/Models/Kamar';
import Resepsi from 'App/Models/Resepsi';
import TipeKamar from 'App/Models/TipeKamar';

export default class KamarsController {
    async index({view}){
        const booking = await Booking.query().where('status', 0)
        let bookings : any = []
        const kamar = await Kamar.query().orderBy('nomor', 'asc')
        for(let item in booking){
            const detail = await Kamar.query().where('id', booking[item].kamar).first()
            bookings[item] = booking[item].serialize()
            bookings[item]['detail'] = detail?.serialize()
        }
        return view.render('resepsi/booking/index', {booking : bookings, kamar})
    }

    async add({view}){
        const tipe = await TipeKamar.query()
        return view.render('input/kamar/add', {tipe})
    }

    async post({request, response, session}){
        let post : any = request.all()
        let addItem = 0
        const kamar : any = await Kamar.query().where('id', post.kamar).first()
        const diskon : any = await Diskon.query().where('id', post.diskon).first() || 0
        const start : any = new Date(post.check_in) 
        const end : any = new Date(post.check_out)

        const cekBooking = await Booking.cekJadwal(post.kamar, start, end)
        console.log(cekBooking)

        if (cekBooking) {
            console.log("Jadwal sudah ada booking")
            session.flash('status', {type: 'danger', message: 'Kamar Sudah Dibooking Pada Tanggal Yang Sama'})
            return response.redirect('back')
 
        }
        else{
            console.log("Jadwal sudah oke")
            
        }

        //Hitung total harga
        if (post.id_item) {
            for(let index in post.id_item){
                const item : any = await AdditionalItem.query().where('id', post.id_item[index]).first()
                addItem += post.jumlah_item[index] * item.harga
            }
            // console.log(addItem)
            post.id_item = post.id_item.toString()
            post.jumlah_item = post.jumlah_item.toString()
        }
        
        const oneDay = 24 * 60 * 60 * 1000
        const total = ((end - start) / oneDay) * (kamar.harga + addItem - (diskon.length > 0 ? diskon.potong : 0))
        // console.log(total)

        post.total = total
        console.log(post)
        await Booking.create(post)
        session.flash('status', {type: 'success', message: 'Kamar Berhasil Dibooking'})
        return response.redirect('back')
    }

    async checkIn({request, response, session}){
        const {id} = request.all()
        const booking : any = await Booking.query().where('id', id).first()
        const dateNow = new Date()
        //cek tanggal
        console.log(booking.check_in,booking.check_out)
        console.log(dateNow >= booking.check_in && dateNow <= booking.check_out)

        if (!(dateNow >= booking.check_in && dateNow <= booking.check_out)) {
            session.flash('status', {type: 'danger', message: 'Pelanggan Gagal check-in karena tidak sesuai dengan waktu'})
            return response.redirect('back')
        }else{
            const data = {
                kamar: booking.kamar,
                nama: booking.nama,
                no_ktp: booking.no_ktp,
                email: booking.email,
                alamat: booking.alamat,
                no_hp: booking.no_hp,
                jumlah_tamu: booking.jumlah_tamu,
                id_item: booking.id_item,
                jumlah_item: booking.jumlah_item,
                check_in: booking.check_in,
                check_out: booking.check_out,
                diskon: booking.diskon,
                total: booking.total
            }
    
            const add = await Resepsi.create(data)
            if (add) {
                await Booking.query().where('id', id).update({status : 1})
                await Kamar.query().where('id', booking.kamar).update({status : 1})
                session.flash('status', {type: 'success', message: 'Pelanggan Berhasil Check-In'})
                return response.redirect('back')
            } else {
                session.flash('status', {type: 'danger', message: 'Pelanggan Gagal Check-In'})
                return response.redirect('back')
            }
        }


    }

    async edit({request, view}){
        const {id} = request.all()
        const kamar = await Kamar.query().where('id', id).first()
        const tipe = await TipeKamar.query()
        return view.render('input/kamar/edit', {tipe, kamar})
    }

    async editPost({request, response, session}){
        let item : any = request.all()
        const tipe : any = await TipeKamar.query().where('id', item.tipe).first()
        item.nama_tipe = tipe.tipe
        // console.log(item)
        const update = await Kamar.query().update(item).where('id', item.id)
        if (update) {
            session.flash('status', {type: 'success', message: 'Data Berhasil Diubah'})
            return response.redirect().toRoute('input.kamar')
        } else {
            session.flash('status', {type: 'danger', message: 'Terjadi Kesalahan, Data Gagal Diubah'})
            return response.redirect('back')
        }
    }

    async hapus({request, response, session}){
        const {id} = request.all()
        const hapus = await Booking.query().delete().where('id', id)

        if (hapus) {
            session.flash('status', {type: 'success', message: 'Data Berhasil Dihapus'})
            return response.redirect('back')
        } else {
            session.flash('status', {type: 'danger', message: 'Data Gagal Dihapus'})
            return response.redirect('back')
        }
    }
}
