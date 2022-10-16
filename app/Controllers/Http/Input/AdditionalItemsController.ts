// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AdditionalItem from "App/Models/AdditionalItem"

export default class AdditionalItemsController {
    async index({view}){
        const additional = await AdditionalItem.query()
        return view.render('input/additional_item/index', {additional})
    }

    async add({view}){
        return view.render('input/additional_item/add')
    }

    async post({request, response, session}){
        console.log(request.all())
        const add = await AdditionalItem.create(request.all())
        if(add){
            session.flash('status', {type: 'success', message: 'Data Telah Ditambahkan'})
            return response.redirect().toRoute('input.additional_item')
        }
        else{
            session.flash('status', {type: 'danger', message: 'Data Gagal Ditambahkan'})
        }
    }

    async editPost({request, response, session}){
        const post = request.all()
        const update = await AdditionalItem.query().update(post).where('id', post.id)

        if (update) {
            session.flash('status', {type: 'success', message: 'Data Telah Diubah'})
            return response.redirect('back')
        } else {
            session.flash('status', {type: 'danger', message: 'Data Gagal Diubah'})
            return response.redirect('back')
        }
    }

    async hapus({request, response, session}){
        const {id} = request.all()
        const hapus = await AdditionalItem.query().delete().where('id', id)

        if (hapus) {
            session.flash('status', {type: 'success', message: 'Data Telah Dihapus'})
            return response.redirect('back')
        } else {
            session.flash('status', {type: 'danger', message: 'Data Gagal Dihapus'})
            return response.redirect('back')
        }
    }
}
