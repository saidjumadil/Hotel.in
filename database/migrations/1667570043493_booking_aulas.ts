import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'booking_aulas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('aula')
      table.string('nama', 80)
      table.string('no_ktp', 20)
      table.string('email', 80).nullable()
      table.string('alamat').nullable()
      table.string('no_hp', 15).nullable()
      table.date('mulai')
      table.date('akhir')
      table.integer('total', 13)
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
