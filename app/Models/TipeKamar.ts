import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TipeKamar extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tipe: string

  @column()
  public deskripsi: string

  // @column()
  // public harga: number

  // @column()
  // public luas_kamar: number

  // @column()
  // public luas_mandi: number

  // @column()
  // public tempat_tidur: number

  @column()
  public lemari: number

  @column()
  public kulkas: number

  @column()
  public tv: number

  @column()
  public interior: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
