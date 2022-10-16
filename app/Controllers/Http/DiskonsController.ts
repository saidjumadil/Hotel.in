// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Diskon from "App/Models/Diskon"

export default class DiskonsController {
    async index({view}){
        const diskon = await Diskon.query()
        return view.render('diskon', {diskon})
    }

    async post({request, response, session}){
        const post = request.all()
        const tambah = await Diskon.create(post)
        if (tambah) {
            session.flash('status', {type: 'success', message: 'Diskon Berhasil Ditambahkan'})
            return response.redirect('back')
        } else {
            session.flash('status', {type: 'danger', message: 'Diskon Gagal Ditambahkan'})
            return response.redirect('back')
        }
    }

    async editPost({request, response, session}){
        const post = request.all()
        const update = await Diskon.query().update(post).where('id', post.id)
        if (update) {
            session.flash('status', {type: 'success', message: 'Diskon Berhasil Ditambahkan'})
            return response.redirect('back')
        } else {
            session.flash('status', {type: 'danger', message: 'Diskon Gagal Ditambahkan'})
            return response.redirect('back')
        }
    }
}
