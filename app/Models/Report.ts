import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import ExcelJS from "exceljs"

export default class Report extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tanggal: Date
  
  @column()
  public status: number
  
  @column()
  public tipe: number
  
  @column()
  public total: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static async createWorkBook(rekap){
    const wb = new ExcelJS.Workbook()
    const ws = wb.addWorksheet('Sheet1')
    
    const headers = [
      { header: 'No', key: 'no', width: 3 },
      { header: 'No Bill', key: 'serial', width: 15 },
      { header: 'Kamar', key: 'kamar', width: 15 },
      { header: 'Nama', key: 'nama', width: 25 },
      { header: 'KTP', key: 'no_ktp', width: 20 },
      { header: 'Alamat', key: 'alamat', width: 15 },
      { header: 'Jumlah Tamu', key: 'jumlah_tamu', width: 15 },
      { header: 'Check In', key: 'check_in', width: 15 },
      { header: 'Check Out', key: 'check_out', width: 15 },
      { header: 'Total', key: 'total', width: 15 },
    ]

    ws.columns = headers;
    let count = 0
    for(let item of rekap){
      count++
      // console.log(item)
      ws.addRow([count, item.serial, item.meta.nomor, item.nama, item.no_ktp, item.alamat, item.jumlah_tamu, item.check_in, item.check_out, `Rp. ${item.total}`]);
    }

    await wb.xlsx.writeFile(`./public/uploads/rekap.xlsx`)
  }
}
