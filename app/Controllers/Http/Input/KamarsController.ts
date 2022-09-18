// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class KamarsController {
    async index({view}){
        return view.render('input/kamar/index')
    }

    async add({view}){
        return view.render('input/kamar/add')
    }

    async post({request, response}){
        console.log(request.all())
        return response.redirect().toRoute('input.kamar')
    }
}
