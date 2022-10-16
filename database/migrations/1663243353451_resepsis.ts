import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'resepsis'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('serial', 12)
      table.integer('kamar').references('kamars.id')
      table.string('nama')
      table.string('no_ktp')
      table.string('email').nullable()
      table.string('no_hp').nullable()
      table.integer('jumlah_tamu')
      table.integer('id_item').references('additional_items.id')
      table.string('nama_item')
      table.integer('jumlah_item')
      table.date('tgl_in')
      table.date('tgl_out')
      table.integer('total')
      table.integer('status_pembayaran', 1).defaultTo(0)


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
