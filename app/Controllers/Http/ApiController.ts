// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AdditionalItem from "App/Models/AdditionalItem"
import Diskon from "App/Models/Diskon"
import Kamar from "App/Models/Kamar"
import Resepsi from "App/Models/Resepsi"
import xlsx from 'xlsx'


export default class ApiController {
    async addItem(){
        return await AdditionalItem.query()
    }
    
    async diskon({request}){
        const {check_in} = request.all()
        const tanggal = new Date(check_in)
        const diskon = await Diskon.query().where('mulai', '<=', tanggal).andWhere('akhir', '>=', tanggal)
        return {diskon}
    }

    async report({request}){
        let {jenis, mulai, akhir} = request.all()
        console.log(jenis, mulai, akhir)
        let data : any = []
        let detail_rekap : any = []
        
        switch (jenis) {
            case '1':
                mulai = new Date(mulai)
                akhir = new Date(akhir,12,0)
                data = await Resepsi.query().where('status_pembayaran', 1).whereBetween('check_out', [mulai, akhir])
                for(let item of data){
                    const isi = item.serialize()
                    const detail : any = await Kamar.query().where('id', item.kamar).first()
                    isi['detail'] = detail.serialize()
                    detail_rekap.push(isi)
                }
                return {data : detail_rekap}
            case '2':
                const tahun = new Date().getFullYear()
                mulai = new Date(tahun, parseInt(mulai)+1, 1)
                akhir = new Date(tahun, parseInt(akhir)+1, 0)
                console.log('Bulan', mulai, akhir)
                data = await Resepsi.query().where('status_pembayaran', 1).whereBetween('check_out', [mulai, akhir])
                for(let item of data){
                    const isi = item.serialize()
                    const detail : any = await Kamar.query().where('id', item.kamar).first()
                    isi['detail'] = detail.serialize()
                    detail_rekap.push(isi)
                }
                return {data : detail_rekap}
            case '3':
                console.log('hari', mulai, akhir)
                data = await Resepsi.query().where('status_pembayaran', 1).whereBetween('check_out', [mulai, akhir])
                for(let item of data){
                    const isi = item.serialize()
                    const detail : any = await Kamar.query().where('id', item.kamar).first()
                    isi['detail'] = detail.serialize()
                    detail_rekap.push(isi)
                    console.log(isi)
                }
                return {data : detail_rekap}
            default:
                console.log('default')
                break;
        }
    }

    async analisa(){
        //Analisa Kamar
        const kamar = await Kamar.query()
        let data_kamar : any = {'labels': [], 'series': []}
        for(let item of kamar){
            data_kamar.labels.push(item.nomor)
            const jumlah = (await Resepsi.query().where('kamar', item.id)).length
            data_kamar.series.push(jumlah)
        }

        //Analisa Income
        let data_income : any = []
        const now = new Date()
        const bulan_sekarang = now.getMonth()
        const bulans = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        const tanggal = await Resepsi.query().select('check_out').whereRaw(`MONTH(check_out) = ${now.getMonth() + 1}`).andWhereRaw(`YEAR(check_out) = ${now.getFullYear()}`).groupBy('check_out')

        let dates : any = []
        let count_date = new Date(now.getFullYear(), now.getMonth(), 1)
        while(now.getMonth() === count_date.getMonth()){
            dates.push(new Date(count_date))
            count_date.setDate(count_date.getDate() + 1)
        }

        for(let item of dates){
            const jumlah : any = await Resepsi.query().sum('total as total').where('check_out', item).first()
            const dateFull = item
            const date = `${dateFull.getDate()} ${bulans[dateFull.getMonth()]} ${dateFull.getFullYear()}`
            if (jumlah.total == null) {
                data_income.push({x : date, y : 0})
            } else {
                data_income.push({x : date, y : jumlah.total})
            }

        }
        
        return {kamar : data_kamar, income : data_income}
    }

    async rekap({request}){
        const post = request.all()
        
    }

    async invoice({request}){
        const post = request.all()
        const resepsi : any = await Resepsi.query().join('kamars', 'resepsis.kamar', 'kamars.id').where('status_pembayaran', 1)
        
        resepsi.forEach(e => {
            console.log(e['$extras'])
        })
        const rows = resepsi.map( (e,i) => ({
            bill : e.serial,
            kamar : e['$extras'].nomor,
            nama : e.nama,
            total : e.total
        }))
        console.log(rows)
        const wb = xlsx.utils.book_new()
        
        const ws = xlsx.utils.json_to_sheet([])
        console.log(ws)
        xlsx.utils.book_append_sheet(wb,ws, "Sheet")
        xlsx.utils.sheet_add_aoa(ws, [["DJARWAL HOTEL"]], { origin: "A1" })
        xlsx.utils.sheet_add_aoa(ws, [["Jl. Banda Aceh – Medan, Gelanggang Tengoeh – Bireuen, Telp. (0644) 323236, Fax. (0644) 323237"]], { origin: "A2" })
        xlsx.utils.sheet_add_aoa(ws, [["E-mail : djarwal.hotel@gmail.com"]], { origin: "A3" })
        xlsx.utils.sheet_add_aoa(ws, [["BUKTI PEMBAYARAN GRUB"]], { origin: "A4" })
        xlsx.utils.sheet_add_aoa(ws, [[`NO. BILL    :  0000008/DH/XI/2022`]], { origin: "A5" })
        /* create an XLSX file and try to save to Presidents.xlsx */
        xlsx.writeFile(wb, "Presidents.xlsx", { compression: true })

        return post
    }
}
