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
}
