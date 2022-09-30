// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AulasController {
    async index({view}){
        return view.render('input/aula/index')
    }

    async add({view}){
        return view.render('input/aula/add')
    }

    async post({request, response}){
        console.log(request.all())
        return response.redirect().toRoute('input.aula')
    }
}
