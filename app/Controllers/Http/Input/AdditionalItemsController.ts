// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdditionalItemsController {
    async index({view}){
        return view.render('input/additional_item/index')
    }

    async add({view}){
        return view.render('input/additional_item/add')
    }

    async post({request, response}){
        console.log(request.all())
        return response.redirect().toRoute('input.additional_item')
    }
}
