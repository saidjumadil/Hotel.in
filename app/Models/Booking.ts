import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Booking extends BaseModel {
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
  public status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static async cekJadwal(kamar, mulai, akhir){
    const booking = await Booking.query().where('id', kamar).andWhere('status', 0)
    for(let item of booking){
      console.log(mulai, akhir)
      console.log(this.tanggalConvert(item.check_in), this.tanggalConvert(item.check_out))
      console.log(mulai >= this.tanggalConvert(item.check_in), mulai < this.tanggalConvert(item.check_out), akhir > this.tanggalConvert(item.check_in), akhir <= this.tanggalConvert(item.check_out))
      
      if ((mulai >= this.tanggalConvert(item.check_in) && mulai < this.tanggalConvert(item.check_out)) || (akhir > this.tanggalConvert(item.check_in) && akhir <= this.tanggalConvert(item.check_out)) ) {
        return true
      }
    }
    return false
  }

  public static tanggalConvert(tanggal : Date){
    const date = ('0' + tanggal.getDate()).slice(-2)
    const month = ('0' + (tanggal.getMonth() + 1)).slice(-2)
    const year = tanggal.getFullYear()
    const full = new Date(`${year}-${month}-${date}`)
    return full
  }
}
