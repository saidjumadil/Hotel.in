import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'aulas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('deskripsi').defaultTo('')
      table.integer('harga') 
      table.integer('luas') 
      table.integer('kursi') 
      table.integer('meja') 
      table.boolean('proyektor').defaultTo(false)
      table.boolean('layar').defaultTo(false)
      table.boolean('sound').defaultTo(false)
      table.integer('status').defaultTo(0) 

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
