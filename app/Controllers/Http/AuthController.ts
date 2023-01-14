// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User"
import md5 from 'crypto-js/md5';

export default class AuthController {
    async index({ view }) {
        return view.render('login')
    }

    async view_gantiPassword({ view }) {
        return view.render('view_gantiPassword')
    }
    
    async check({ request, response, auth, session }) {
        const { username, password } = request.all()
        // await auth.attempt(email, password)
        const input_pw = md5(password).toString()
        const user = await User.query().where('username', username).andWhere('password', input_pw).first()
        if (user) {
            auth.login(user)
            session.put('user', user)
            return response.redirect().toRoute('beranda')
        } else {
            session.flash('status', {type: 'danger', message: 'Username atau Password Salah'})
            return response.redirect('back')
        }
    }

    async logout({ auth, response }) {
        await auth.logout()
        return response.redirect().toRoute('login')
    }

    async gantiPassword({request, response, session, auth}){
        const {pass_lama, pass_baru, konfirmasi} = request.all()
        console.log(md5(pass_lama).toString().length, session.get('user.password').length)
        if (md5(pass_lama).toString() === session.get('user.password')) {
            if (pass_baru == konfirmasi) {
                const update = await User.query().where('id', session.get('user.id')).update({password : md5(pass_baru).toString()})
                if (update) {
                    session.flash('status', {type: 'success', message: 'Password Berhasil Diubah'})
                    await auth.logout()
                    return response.redirect().toRoute('login')
                } else {
                    session.flash('status', {type: 'danger', message: 'Password Gagal Diubah'})
                    return response.redirect('back')
                }
            } else {
                session.flash('status', {type: 'danger', message: 'Password yang dimasukkan tidak sama'})
                return response.redirect('back')
            }
        } else {
            session.flash('status', {type: 'danger', message: 'Password Lama Tidak Sesuai'})
            return response.redirect('back')
        }
    }
}

