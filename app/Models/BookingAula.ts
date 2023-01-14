import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import ExcelJS from "exceljs"


export default class BookingAula extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public serial: string

  @column()
  public aula: number

  @column()
  public nama: string

  @column()
  public no_ktp: string

  @column()
  public email: string

  @column()
  public alamat: string

  @column()
  public jumlah_tamu: number

  @column()
  public no_hp: string

  @column()
  public mulai: Date

  @column()
  public akhir: Date

  @column()
  public total: number

  @column()
  public status_pembayaran: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static async cekJadwal(aula, mulai, akhir){
    const booking = await BookingAula.query().where('aula', aula)
    for(let item of booking){
      console.log(mulai, akhir)
      console.log(this.tanggalConvert(item.mulai), this.tanggalConvert(item.akhir))
      console.log(mulai >= this.tanggalConvert(item.mulai), mulai <= this.tanggalConvert(item.akhir), akhir >= this.tanggalConvert(item.mulai), akhir <= this.tanggalConvert(item.akhir))
      
      if ((mulai >= this.tanggalConvert(item.mulai) && mulai <= this.tanggalConvert(item.akhir)) || (akhir >= this.tanggalConvert(item.mulai) && akhir <= this.tanggalConvert(item.akhir)) ) {
        return true
      }
    }
    return false
  }

  public static date(tanggal){
    const bulan : any = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    return `${tanggal.getDate()} ${bulan[tanggal.getMonth()]} ${tanggal.getFullYear()}`
  }

  public static tanggalConvert(tanggal : Date){
    const date = ('0' + tanggal.getDate()).slice(-2)
    const month = ('0' + (tanggal.getMonth() + 1)).slice(-2)
    const year = tanggal.getFullYear()
    const full = new Date(`${year}-${month}-${date}`)
    return full
  }

  public static async cetak(path, post, aula, resepsi, nama){
    //Hitung hari dan diskon
    const oneDay = 24 * 60 * 60 * 1000
    const hari = ((resepsi.akhir - resepsi.mulai) / oneDay) + 1
    const diskon = Math.abs(post.total - (aula.harga * hari))
    console.log(diskon)

    //
    const wb = new ExcelJS.Workbook()
    await wb.xlsx.readFile(path)
    const worksheet = wb.getWorksheet(1);
    worksheet.getCell('A6').value = `NO. BILL    :  ${post.serial}`
    worksheet.getCell('C7').value = `: ${resepsi.nama}`
    worksheet.getCell('C11').value = `: ${resepsi.alamat == null || resepsi.alamat == '' ? 'Tidak Ada Alamat' : resepsi.alamat}`
    worksheet.getCell('C13').value = `: ${await BookingAula.date(resepsi.akhir)}`
    worksheet.getCell('B18').value = `Sewa Aula`
    worksheet.getCell('C18').value = `${resepsi.jumlah_tamu}`
    worksheet.getCell('D18').value = `${hari}`
    worksheet.getCell('E18').value = `Rp. ${aula.harga}`
    worksheet.getCell('F18').value = `Rp. ${aula.harga * hari}`
    worksheet.getCell('A21').value = `Potongan Harga`
    worksheet.getCell('F21').value = `Rp. ${diskon}`
    worksheet.getCell('F22').value = `Rp. ${post.total}`
    worksheet.getCell('A23').value = `Terbilang                                                 ${await BookingAula.terbilang(post.total)}`
    worksheet.getCell('E25').value = `Bireuen, ${await BookingAula.date(resepsi.akhir)}`
    worksheet.getCell('B28').value = `${resepsi.nama}`
    worksheet.getCell('E28').value = `${nama}`
    // const URL = Env.get('APP_URL')

    await wb.xlsx.writeFile(`./public/uploads/filename.xlsx`)
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
