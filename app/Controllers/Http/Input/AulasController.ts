// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Aula from "App/Models/Aula"

export default class AulasController {
    async index({view}){
        const aula = await Aula.query()
        return view.render('input/aula/index', {aula})
    }
    
    async edit({view, request}){
        const {id} = request.all()
        const aula = await Aula.query().where('id', id).first()

        return view.render('input/aula/edit', {aula})
    }

    async add({view}){
        return view.render('input/aula/add')
    }

    async hapus({request, response, session}){
        const {id} = request.all()
        const del = await Aula.query().where('id', id).delete()

        if (del) {
            session.flash('status', {type: 'success', message: 'Aula Berhasil Dihapus'})
            return response.redirect().toRoute('input.aula')
        } else {
            session.flash('status', {type: 'danger', message: 'Aula Gagal Dihapus'})
            return response.redirect().toRoute('input.aula')
        }
    }

    async editPost({request, response, session}){
        const post = request.all()
        const update = await Aula.query().where('id', post.id).update(post)

        if (update) {
            session.flash('status', {type: 'success', message: 'Aula Berhasil Diubah'})
            return response.redirect().toRoute('input.aula')
        } else {
            session.flash('status', {type: 'danger', message: 'Aula Gagal Diubah'})
            return response.redirect().toRoute('input.aula')
        }
    }

    async post({request, response, session}){
        const post = request.all()
        console.log(post)
        const add = await Aula.create(post)
        if (add) {
            session.flash('status', {type: 'success', message: 'Aula Berhasil Ditambahkan'})
            return response.redirect().toRoute('input.aula')
        } else {
            session.flash('status', {type: 'danger', message: 'Aula Gagal Ditambahkan'})
            return response.redirect().toRoute('input.aula')
        }
        
    }

    async booking({request, response}){
        console.log(request.all())
        return response.redirect().toRoute('input.aula')
    }
}
