// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Aula from "App/Models/Aula"

export default class AulasController {
    async index({view}){
        const aula = await Aula.query().first()

        if(aula){
            return view.render('input/aula/index', {aula})
        }
        else{
            const aula = {
                deskripsi : '',
                harga: 0,
                luas: 0,
                kursi: 0,
                meja: 0,
                proyektor: false,
                layar: false,
                sound: false,
                status: 0
            }
            return view.render('input/aula/index', {aula})
        }
    }

    async add({view}){
        return view.render('input/aula/add')
    }

    async post({request, response}){
        const post = request.all()
        const aula : any = await Aula.query().first()
        const upaula = {
            deskripsi: post.deskripsi,
            harga: post.harga,
            luas: post.luas,
            kursi: post.kursi,
            meja: post.meja,
            proyektor: post.proyektor ? 1 : 0,
            layar: post.layar ? 1 : 0,
            sound: post.sound ? 1 : 0
        }
        if(aula){
            await Aula.query().update(upaula).where('id', aula.id)
        }
        else{
            await Aula.create(request.all())
        }
        return response.redirect().toRoute('input.aula')
    }

    async booking({request, response}){
        console.log(request.all())
        return response.redirect().toRoute('input.aula')
    }
}
