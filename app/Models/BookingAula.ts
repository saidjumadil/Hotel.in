import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class BookingAula extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public aula: number

  @column()
  public nama: string

  @column()
  public no_ktp: string

  @column()
  public email: string

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

  public static tanggalConvert(tanggal : Date){
    const date = ('0' + tanggal.getDate()).slice(-2)
    const month = ('0' + (tanggal.getMonth() + 1)).slice(-2)
    const year = tanggal.getFullYear()
    const full = new Date(`${year}-${month}-${date}`)
    return full
  }

  
}
