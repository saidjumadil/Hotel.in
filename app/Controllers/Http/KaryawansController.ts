// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import md5 from 'crypto-js/md5';


export default class KaryawansController {
    async index({view}){
        const karyawan = await User.query().where('role', 2)
        return view.render('karyawan', {karyawan})
    }

    async post({request, response, session}){
        const post = request.all()
        post['username'] = post.ktp
        post['password'] = md5(post.ktp).toString()
        post['role'] = 2
        console.log(post)
        const create = await User.create(post)

        if (create) {
            session.flash('status', {type: 'success', message: 'Karyawan Berhasil Ditambahkan'})
            return response.redirect('back')
        } else {
            session.flash('status', {type: 'danger', message: 'Karyawan Gagal Ditambahkan'})
            return response.redirect('back')
        }
    }

    async editPost({request, response, session}){
        const post = request.all()
        console.log(post)
        const update = await User.query().where('id', post.id).update(post)

        if (update) {
            session.flash('status', {type: 'success', message: 'Karyawan Berhasil Diubah'})
            return response.redirect('back')
        } else {
            session.flash('status', {type: 'danger', message: 'Karyawan Gagal Diubah'})
            return response.redirect('back')
        }
    }

    async hapus({request, response, session}){
        const {id} = request.all()
        const hapus = await User.query().where('id', id).delete()

        if (hapus) {
            session.flash('status', {type: 'success', message: 'Karyawan Berhasil Dihapus'})
            return response.redirect('back')
        } else {
            session.flash('status', {type: 'danger', message: 'Karyawan Gagal Dihapus'})
            return response.redirect('back')
        }
    }
}
