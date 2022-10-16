// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kamar from 'App/Models/Kamar';
import TipeKamar from 'App/Models/TipeKamar';

export default class KamarsController {
    async index({view}){
        const kamar = await Kamar.query()
        let kamars : any = []
        for(let item of kamar){
            item['detail'] = await TipeKamar.query().where('id', item.tipe).first()
            kamars.push(item)
        }
        return view.render('input/kamar/index', {kamars})
    }

    async add({view}){
        const tipe = await TipeKamar.query()
        return view.render('input/kamar/add', {tipe})
    }

    async post({request, response}){
        let item : any = request.all()
        const tipe : any = await TipeKamar.query().where('id', item.tipe).first()
        item.nama_tipe = tipe.tipe
        console.log(item)
        await Kamar.create(item)
        return response.redirect().toRoute('input.kamar')
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
        const hapus = await Kamar.query().delete().where('id', id)

        if (hapus) {
            session.flash('status', {type: 'success', message: 'Data Berhasil Dihapus'})
            return response.redirect('back')
        } else {
            session.flash('status', {type: 'danger', message: 'Data Gagal Dihapus'})
            return response.redirect('back')
        }
    }
}
