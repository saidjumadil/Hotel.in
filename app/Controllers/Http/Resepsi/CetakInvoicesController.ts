// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CetakInvoicesController {
    async index({view}){
        return view.render('resepsi/cetak_invoice/index')
    }
}
