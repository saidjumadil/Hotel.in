import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import ExcelJS from "exceljs"
import AdditionalItem from 'App/Models/AdditionalItem';
import TipeKamar from './TipeKamar';

export default class Resepsi extends BaseModel {
  public serializeExtras = true
  @column({ isPrimary: true })
  public id: number

  @column()
  public serial: string

  @column()
  public kamar: number

  @column()
  public nama: string
  
  @column()
  public no_ktp: string
  
  @column()
  public email: string

  @column()
  public alamat: string
  
  @column()
  public no_hp: string

  @column()
  public jumlah_tamu: number
  
  @column()
  public id_item: number
  
  @column()
  public jumlah_item: number
  
  @column()
  public check_in: Date
  
  @column()
  public check_out: Date

  @column()
  public diskon: number
  
  @column()
  public total: number
  
  @column()
  public status_pembayaran: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static async cetak(path, post, kamar, resepsi, nama){
    //Hitung hari dan diskon
    const oneDay = 24 * 60 * 60 * 1000
    const hari = (resepsi.check_out - resepsi.check_in) / oneDay
    // console.log(resepsi)
    let detail_item : any = []
    let diskon = (kamar.harga * hari) - post.total
    
    if (resepsi.id_item != null) {
      const item = resepsi.id_item.split(',')
      const jumlah_item = resepsi.jumlah_item.split(',')
      for(let i in item){
        const additional : any = await AdditionalItem.query().where('id', item[i]).first()
        detail_item[i] = additional.serialize()
        detail_item[i].jumlah = parseInt(jumlah_item[i])
        diskon += detail_item[i].jumlah * detail_item[i].harga
      }
      console.log(detail_item)
    }
    
    //
    const wb = new ExcelJS.Workbook()
    console.log(path)
    await wb.xlsx.readFile(path)
    const worksheet = wb.getWorksheet(26)
    worksheet.getCell('L5').value = `: ${post.serial}`
    worksheet.getCell('L6').value = `: ${resepsi.no_ktp == null || resepsi.no_ktp == '' ? '' : resepsi.no_ktp}`
    worksheet.getCell('L7').value = `: ${resepsi.nama}`
    worksheet.getCell('R7').value = `${kamar.nama_tipe}`
    worksheet.getCell('L8').value = `: ${resepsi.alamat == null || resepsi.alamat == '' ? '' : resepsi.alamat}`
    worksheet.getCell('L9').value = `: ${await Resepsi.date(resepsi.check_out)}`
    worksheet.getCell('K12').value = `${await Resepsi.tanggal(resepsi.check_in)}`
    worksheet.getCell('L12').value = `${await Resepsi.tanggal(resepsi.check_out)}`
    worksheet.getCell('M12').value = `${kamar.nomor}`
    worksheet.getCell('N12').value = `Rp. ${kamar.harga}`
    worksheet.getCell('O12').value = `Rp. ${kamar.harga * hari}`
    worksheet.getCell('R12').value = `Rp. ${diskon}`
    worksheet.getCell('S12').value = `${resepsi.jumlah_tamu}`
    worksheet.getCell('T12').value = `Rp. ${(kamar.harga * hari) - diskon}`
    if (detail_item.length != 0) {
      worksheet.getCell('T14').value = `Rp. ${detail_item[0].harga * detail_item[0].jumlah}`
    } 
    worksheet.getCell('T15').value = `Rp. ${post.total}`
    worksheet.getCell('L17').value = `${await Resepsi.terbilang(post.total)}`
    worksheet.getCell('R18').value = `Bireun, ${await Resepsi.date(resepsi.check_out)}`
    worksheet.getCell('J23').value = `${resepsi.nama}`
    worksheet.getCell('R23').value = `${nama}`
    // const URL = Env.get('APP_URL')

    await wb.xlsx.writeFile(`./public/uploads/filename.xlsx`)
  }

  public static async tes_cetak(data){
    const wb = new ExcelJS.Workbook()

    const sheet1 = wb.addWorksheet('Lembar 1')
    const worksheet = wb.getWorksheet(1)
    let row = 1
    for(let item in data){
      //Judul
      worksheet.getCell('A' + row).value = item
      row++
      //kolom
      worksheet.getCell('A' + row).value = "Nama Tipe"
      worksheet.getCell('B' + row).value = "Nomor"
      worksheet.getCell('C' + row).value = "Harga"

      worksheet.getCell('A' + row).border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      }
      worksheet.getCell('B' + row).border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      }
      worksheet.getCell('C' + row).border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      }
      row++
      //isi data
      for(let set of data[item]){
        worksheet.getCell('A' + row).value = set.nama_tipe
        worksheet.getCell('B' + row).value = set.nomor
        worksheet.getCell('C' + row).value = set.harga

        worksheet.getCell('A' + row).border = {
          top: {style:'thin'},
          left: {style:'thin'},
          bottom: {style:'thin'},
          right: {style:'thin'}
        }
        worksheet.getCell('B' + row).border = {
          top: {style:'thin'},
          left: {style:'thin'},
          bottom: {style:'thin'},
          right: {style:'thin'}
        }
        worksheet.getCell('C' + row).border = {
          top: {style:'thin'},
          left: {style:'thin'},
          bottom: {style:'thin'},
          right: {style:'thin'}
        }
        
        row++
      }
      row++
    }

    await wb.xlsx.writeFile(`./public/uploads/tes.xlsx`)
  }

  public static date(tanggal){
    const bulan : any = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    return `${tanggal.getDate()} ${bulan[tanggal.getMonth()]} ${tanggal.getFullYear()}`
  }

  public static tanggal(tanggal){
    return `${tanggal.getDate()}/${tanggal.getMonth() + 1}/${tanggal.getFullYear()}`
  }

  public static terbilang(angka){

    var bilne=["","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas"];

    if(angka < 12){

      return bilne[angka];

    }else if(angka < 20){

      return this.terbilang(angka-10)+" belas";

    }else if(angka < 100){

      return this.terbilang(Math.floor(parseInt(angka)/10))+" puluh "+this.terbilang(parseInt(angka)%10);

    }else if(angka < 200){

      return "seratus "+this.terbilang(parseInt(angka)-100);

    }else if(angka < 1000){

      return this.terbilang(Math.floor(parseInt(angka)/100))+" ratus "+this.terbilang(parseInt(angka)%100);

    }else if(angka < 2000){

      return "seribu "+this.terbilang(parseInt(angka)-1000);

    }else if(angka < 1000000){

      return this.terbilang(Math.floor(parseInt(angka)/1000))+" ribu "+this.terbilang(parseInt(angka)%1000);

    }else if(angka < 1000000000){

      return this.terbilang(Math.floor(parseInt(angka)/1000000))+" juta "+this.terbilang(parseInt(angka)%1000000);

    }else if(angka < 1000000000000){

      return this.terbilang(Math.floor(parseInt(angka)/1000000000))+" milyar "+this.terbilang(parseInt(angka)%1000000000);

    }else if(angka < 1000000000000000){

      return this.terbilang(Math.floor(parseInt(angka)/1000000000000))+" trilyun "+this.terbilang(parseInt(angka)%1000000000000);

    }

  }
}
 