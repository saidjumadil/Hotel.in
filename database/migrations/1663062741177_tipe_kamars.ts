import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tipe_kamars'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('tipe').unique()
      table.string('deskripsi')
      // table.integer('luas_kamar')
      // table.integer('luas_mandi')
      table.integer('lemari').defaultTo(0)
      table.integer('kulkas').defaultTo(0)
      table.integer('tv').defaultTo(0)
      table.string('interior').defaultTo('')

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
