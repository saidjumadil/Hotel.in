// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Kamar from "App/Models/Kamar"
import Report from "App/Models/Report"
import Resepsi from "App/Models/Resepsi"
import Env from '@ioc:Adonis/Core/Env';
import Mail from '@ioc:Adonis/Addons/Mail';
import Application from '@ioc:Adonis/Core/Application';

export default class LaporansController {
    async index({view}){
        const rekap = await Resepsi.query().where('status_pembayaran', 1).orderBy('check_out', 'desc')
        let detail_rekap : any = []
        for(let item of rekap){
            const detail = await Kamar.query().where('id', item.kamar).first()
            item['detail'] = detail
            detail_rekap.push(item)
        }
        return view.render('laporan/rekap/index', {rekap : detail_rekap})
    }

    async kirim({view}){
        const report = await Report.query()
        const belum = await Report.query().where('status', 0)
        return view.render('laporan/kirim/index', {report, belum})
    }

    async kirimPost({request, response, session}){
        const post = request.all()
        let lainnya = []
        let lain : any = []
        const cekLaporan = await Report.query().where('tanggal', post.tanggal).first()
        if (!cekLaporan) {
            if (post.laporan) {
                lainnya = lainnya.concat(post.laporan)
            }
    
            for(let item of lainnya){
                const report : any = await Report.query().where('id', item).first()
                lain.push(report.serialize())
                await Report.query().where('id', item).update('status', 1)
            }
    
            //hitung total
            const total : any = await Resepsi.query().sum('total as total').where('status_pembayaran', 1).andWhere('check_out', post.tanggal).first()
            post.total = total.total
    
            //create rekap
            const rekap : any = await Resepsi.query().join('kamars', 'kamars.id', 'resepsis.kamar').where('check_out', post.tanggal).andWhere('status_pembayaran', 1)
            const belum : any = await Resepsi.query().join('kamars', 'kamars.id', 'resepsis.kamar').andWhere('status_pembayaran', 0)
            await Report.createWorkBook(rekap.map( e => e.serialize()))
            
            const emailData = {post, rekap : rekap.map( e => e.serialize()), belum : belum.map(e => e.serialize()), lain}
            console.log(emailData.belum)
            const fileName = await Resepsi.date(new Date(post.tanggal))
    
            const kirimEmail = await Mail.send((message) => {
                message
                  .to('djarwal.app@gmail.com')
                  .from(Env.get('SMTP_USERNAME'), Env.get('SMTP_PASSWORD'))
                  .subject(`LAPORAN HARIAN TANGGAL ${fileName}`)
                  .htmlView('email/konfirmasi', emailData)
                  .attach(Application.publicPath('uploads/rekap.xlsx'), {filename : fileName+'.xlsx'})
              })
    
            const data = {tanggal : post.tanggal, status : post.status, total : post.total}
            const create = await Report.create(data)
            if (kirimEmail) {
                if (create) {
                    session.flash('status', {type: 'success', message: 'Laporan Berhasil Dikirim'})
                    return response.redirect('back')
                } else {
                    session.flash('status', {type: 'danger', message: 'Laporan Gagal Dikirim'})
                    return response.redirect('back')
                }
            } else {
                session.flash('status', {type: 'danger', message: 'Laporan Gagal Dikirim di Email'})
                return response.redirect('back')
            }
        }
        else{
            session.flash('status', {type: 'danger', message: 'Laporan Sudah Pernah diBuat Sebelumnya'})
            return response.redirect('back')
        }

    }
}
