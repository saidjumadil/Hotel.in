import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Role.createMany([
      {
        role : 'Admin'
      },
      {
        role : 'Karyawan'
      }
    ])

    await User.create({
      nama: 'Said Jumadil Akbar', 
      password: '9154e0660e51297a4660b957e24154f4', 
      no_hp: '081354132223', 
      email: 's.jumadil.akbar@gmail.com',
      role: 2,
      username: '1174030609980005',
      ktp: '1174030609980005'
    })
  }
}
