// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BookingAulasController {
    async index({view}){
        return view.render('booking_aula')
    }
}
