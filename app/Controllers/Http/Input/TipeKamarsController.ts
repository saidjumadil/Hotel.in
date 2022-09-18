// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TipeKamarsController {
    async index({view}){
        return view.render('input/tipe_kamar/index')
    }

    async add({view}){
        return view.render('input/tipe_kamar/add')
    }

    async post({request, response}){
        console.log(request.all())
        return response.redirect().toRoute('input.tipe_kamar')
    }
}
