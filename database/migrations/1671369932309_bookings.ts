import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('serial', 20)
      table.integer('kamar').unsigned().references('id').inTable('kamars')
      table.string('nama')
      table.string('no_ktp')
      table.string('email').nullable()
      table.string('no_hp').nullable()
      table.integer('jumlah_tamu')
      table.string('id_item')
      table.string('jumlah_item')
      table.date('check_in')
      table.date('check_out')
      table.integer('diskon').unsigned().references('id').inTable('diskons')
      table.integer('total').nullable()
      table.integer('status', 1).defaultTo(0)

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
