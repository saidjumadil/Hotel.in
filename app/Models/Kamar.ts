import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Kamar extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nomor: string

  @column()
  public tipe: number

  @column()
  public nama_tipe: string

  @column()
  public lantai: number

  @column()
  public status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
