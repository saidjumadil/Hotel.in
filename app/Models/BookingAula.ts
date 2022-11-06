import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class BookingAula extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nama: string

  @column()
  public event: string

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
}
