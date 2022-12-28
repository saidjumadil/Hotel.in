// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import TipeKamar from "App/Models/TipeKamar"

export default class TipeKamarsController {
    async index({view}){
        const tipe = await TipeKamar.query()
        return view.render('input/tipe_kamar/index', {tipe})
    }

    async add({view}){
        return view.render('input/tipe_kamar/add')
    }

    async post({request, response}){
        const {tipe, deskripsi, lemari, tv, kulkas, interior} = request.all()
        console.log(request.all())

        let item = {tipe, deskripsi, lemari, tv, kulkas, interior : interior ? interior.toString() : ''}
        await TipeKamar.create(item)
        return response.redirect().toRoute('input.tipe_kamar')
    }

    async edit({request, view}){
        const {id} = request.all()
        const tipe_kamar : any = await TipeKamar.query().where('id', id).first()
        const list_interior = tipe_kamar.interior.split(',')
        console.log(list_interior)
        return view.render('input/tipe_kamar/edit', {tipe_kamar, list_interior})
    }

    async editPost({request, response, session}){
        const post = request.all()
        console.log(post)
        const tipe = {
            tipe: post.tipe,
            deskripsi: post.deskripsi,
            harga: post.harga,
            luas_kamar: post.luas_harga,
            luas_mandi: post.luas_mandi,
            tempat_tidur: post.tempat_tidur,
            lemari: post.lemari ? 1 : 0,
            tv: post.tv ? 1 : 0,
            kulkas: post.kulkas ? 1 : 0,
            interior: post.interior ? post.interior.toString() : ''
        }
        const tipe_kamar = await TipeKamar.query().update(tipe).where('id', post.id)
        
        if(tipe_kamar){
            session.flash('status', {type : 'success', message : 'Data Berhasil Diubah'})
            return response.redirect().toRoute('input.tipe_kamar')
        }
        else{
            session.flash('status', {type : 'danger', message : 'Error, Terjadi Kesalahan'})
            return response.redirect('back')
        }
    }

    async hapus({request, response, session}){
        const {id} = request.all()
        const hapus = await TipeKamar.query().delete().where('id', id)
        if (hapus) {
            session.flash('status', {type : 'success', message : 'Data Berhasil Dihapus'})
            return response.redirect('back')
        } else {
            session.flash('status', {type : 'danger', message : 'Data Gagal Dihapus'})
            return response.redirect('back')
        }
    }
}
