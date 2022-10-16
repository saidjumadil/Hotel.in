import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Aula extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public deskripsi: string

  @column()
  public harga: number

  @column()
  public luas: number

  @column()
  public kursi: number

  @column()
  public meja: number

  @column()
  public layar: number

  @column()
  public proyektor: number

  @column()
  public sound: number

  @column()
  public status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
