import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username').unique().notNullable()
      table.string('nama', 75).notNullable()
      table.string('password')
      table.string('ktp', 20).notNullable()
      table.string('no_hp', 15)
      table.string('alamat')
      table.string('email', 100).unique().notNullable()
      table.integer('role', 1).notNullable().unsigned().references('id').inTable('roles')

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
