import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Resepsi extends BaseModel {
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
  public no_hp: string

  @column()
  public jumlah_tamu: number
  
  @column()
  public id_item: number
  
  @column()
  public nama_item: string
  
  @column()
  public jumlah_item: number
  
  @column()
  public tgl_in: Date
  
  @column()
  public tgl_out: Date
  
  @column()
  public total: number
  
  @column()
  public status_pembayaran: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
