// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Kamar from "App/Models/Kamar"
import Resepsi from "App/Models/Resepsi"
import Application from '@ioc:Adonis/Core/Application';
import ExcelJS from "exceljs"

export default class CetakInvoicesController {
    async index({view}){
        const resepsi = await Resepsi.query().where('status_pembayaran', 1)
        let detail_resepsi : any = []
        for(let item of resepsi){
            const detail = await Kamar.query().where('id', item.kamar).first()
            item['detail'] = detail
            detail_resepsi.push(item)
        }
        console.log(detail_resepsi)
        return view.render('resepsi/cetak_invoice/index', {resepsi : detail_resepsi})
    }

    async invoice({response, request}){
        const {fileName} = request.all()
        const filePath = Application.publicPath('uploads/filename.xlsx')
        console.log(filePath)
        response.attachment(filePath, fileName+'.xlsx')
    }

    async bill({response, params, session}){
        const path = 'bill_kamar.xlsx'
        const resepsi : any = await Resepsi.query().where('id', params.id).first()
        const kamar : any = await Kamar.query().where('id', params.kamar).first()
        
        let post : any = {}
        post.serial = resepsi.serial
        post.total = resepsi.total
        console.log(resepsi.serial)

        //create bill
        await Resepsi.cetak(path, post, kamar, resepsi, session.get('user.nama'))
        
        const fileName = `${kamar.nomor}_${await Resepsi.date(resepsi.check_out)}`

        const filePath = Application.publicPath('uploads/filename.xlsx')
        console.log(filePath)
        response.attachment(filePath, fileName+'.xlsx')
    }

}
