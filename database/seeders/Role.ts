import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Kamar from 'App/Models/Kamar'
import Role from 'App/Models/Role'
import TipeKamar from 'App/Models/TipeKamar'
import User from 'App/Models/User'
import md5 from 'crypto-js/md5';

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
      nama: 'Novita Sari', 
      password: md5('admin').toString(), 
      no_hp: '081354132223',
      role: 1,
      username: 'admin',
      ktp: '1174030609980005'
    })

    await TipeKamar.createMany([
      {
        "id": 1,
        "tipe": "Standart",
        "deskripsi": "Ini Adalah Deskripsi Tipe Kamar Standart",
        "lemari": 1,
        "kulkas": 0,
        "tv": 1,
        "interior": ""
      },
      {
        "id": 2,
        "tipe": "Superior",
        "deskripsi": "Ini Adalah Deskripsi Tipe Kamar Superior",
        "lemari": 1,
        "kulkas": 1,
        "tv": 1,
        "interior": ""
      },
      {
        "id": 3,
        "tipe": "Deluxe",
        "deskripsi": "Ini Adalah Deskripsi Tipe Kamar Deluxe",
        "lemari": 1,
        "kulkas": 1,
        "tv": 1,
        "interior": ""
      }
    ])

    await Kamar.createMany([
      {
        "id": 1,
        "nomor": "102",
        "tipe": 1,
        "nama_tipe": "Standart",
        "harga": 380000,
        "tempat_tidur": 2,
        "lantai": 1,
        "status": 0
      },
      {
        "id": 2,
        "nomor": "103",
        "tipe": 1,
        "nama_tipe": "Standart",
        "harga": 380000,
        "tempat_tidur": 4,
        "lantai": 1,
        "status": 0
      },
      {
        "id": 3,
        "nomor": "201",
        "tipe": 1,
        "nama_tipe": "Standart",
        "harga": 400000,
        "tempat_tidur": 6,
        "lantai": 2,
        "status": 0
      },
      {
        "id": 4,
        "nomor": "203",
        "tipe": 1,
        "nama_tipe": "Standart",
        "harga": 3500000,
        "tempat_tidur": 4,
        "lantai": 2,
        "status": 0
      },
      {
        "id": 5,
        "nomor": "204",
        "tipe": 1,
        "nama_tipe": "Standart",
        "harga": 350000,
        "tempat_tidur": 3,
        "lantai": 2,
        "status": 0
      },
      {
        "id": 6,
        "nomor": "301",
        "tipe": 1,
        "nama_tipe": "Standart",
        "harga": 330000,
        "tempat_tidur": 4,
        "lantai": 3,
        "status": 0
      },
      {
        "id": 7,
        "nomor": "303",
        "tipe": 1,
        "nama_tipe": "Standart",
        "harga": 330000,
        "tempat_tidur": 4,
        "lantai": 3,
        "status": 0
      },
      {
        "id": 8,
        "nomor": "304",
        "tipe": 1,
        "nama_tipe": "Standart",
        "harga": 330000,
        "tempat_tidur": 2,
        "lantai": 3,
        "status": 0,
      },
      {
        "id": 9,
        "nomor": "101",
        "tipe": 2,
        "nama_tipe": "Superior",
        "harga": 400000,
        "tempat_tidur": 2,
        "lantai": 1,
        "status": 0,
      },
      {
        "id": 10,
        "nomor": "106",
        "tipe": 2,
        "nama_tipe": "Superior",
        "harga": 400000,
        "tempat_tidur": 4,
        "lantai": 1,
        "status": 0,
      },
      {
        "id": 11,
        "nomor": "107",
        "tipe": 2,
        "nama_tipe": "Superior",
        "harga": 400000,
        "tempat_tidur": 4,
        "lantai": 1,
        "status": 0,
      },
      {
        "id": 12,
        "nomor": "206",
        "tipe": 2,
        "nama_tipe": "Superior",
        "harga": 380000,
        "tempat_tidur": 4,
        "lantai": 2,
        "status": 0,
      },
      {
        "id": 13,
        "nomor": "207",
        "tipe": 2,
        "nama_tipe": "Superior",
        "harga": 380000,
        "tempat_tidur": 4,
        "lantai": 2,
        "status": 0,
      },
      {
        "id": 14,
        "nomor": "209",
        "tipe": 2,
        "nama_tipe": "Superior",
        "harga": 380000,
        "tempat_tidur": 4,
        "lantai": 2,
        "status": 0,
      },
      {
        "id": 15,
        "nomor": "210",
        "tipe": 2,
        "nama_tipe": "Superior",
        "harga": 380000,
        "tempat_tidur": 4,
        "lantai": 2,
        "status": 0,
      },
      {
        "id": 16,
        "nomor": "302",
        "tipe": 2,
        "nama_tipe": "Superior",
        "harga": 350,
        "tempat_tidur": 4,
        "lantai": 2,
        "status": 0,
      },
      {
        "id": 17,
        "nomor": "306",
        "tipe": 2,
        "nama_tipe": "Superior",
        "harga": 350000,
        "tempat_tidur": 4,
        "lantai": 3,
        "status": 0,
      },
      {
        "id": 18,
        "nomor": "307",
        "tipe": 2,
        "nama_tipe": "Superior",
        "harga": 350000,
        "tempat_tidur": 4,
        "lantai": 3,
        "status": 0,
      },
      {
        "id": 19,
        "nomor": "309",
        "tipe": 2,
        "nama_tipe": "Superior",
        "harga": 350000,
        "tempat_tidur": 4,
        "lantai": 3,
        "status": 0,
      },
      {
        "id": 20,
        "nomor": "310",
        "tipe": 2,
        "nama_tipe": "Superior",
        "harga": 350000,
        "tempat_tidur": 4,
        "lantai": 3,
        "status": 0,
      },
      {
        "id": 21,
        "nomor": "104",
        "tipe": 3,
        "nama_tipe": "Deluxe",
        "harga": 450000,
        "tempat_tidur": 3,
        "lantai": 1,
        "status": 0,
      },
      {
        "id": 22,
        "nomor": "105",
        "tipe": 3,
        "nama_tipe": "Deluxe",
        "harga": 450000,
        "tempat_tidur": 3,
        "lantai": 1,
        "status": 0,
      },
      {
        "id": 23,
        "nomor": "108",
        "tipe": 3,
        "nama_tipe": "Deluxe",
        "harga": 450000,
        "tempat_tidur": 3,
        "lantai": 1,
        "status": 0,
      },
      {
        "id": 24,
        "nomor": "109",
        "tipe": 3,
        "nama_tipe": "Deluxe",
        "harga": 450000,
        "tempat_tidur": 3,
        "lantai": 1,
        "status": 0,
      },
      {
        "id": 25,
        "nomor": "202",
        "tipe": 3,
        "nama_tipe": "Deluxe",
        "harga": 400000,
        "tempat_tidur": 2,
        "lantai": 2,
        "status": 0,
      },
      {
        "id": 26,
        "nomor": "205",
        "tipe": 3,
        "nama_tipe": "Deluxe",
        "harga": 500000,
        "tempat_tidur": 6,
        "lantai": 2,
        "status": 0,
      },
      {
        "id": 27,
        "nomor": "208",
        "tipe": 3,
        "nama_tipe": "Deluxe",
        "harga": 500000,
        "tempat_tidur": 5,
        "lantai": 2,
        "status": 0,
      },
      {
        "id": 28,
        "nomor": "211",
        "tipe": 3,
        "nama_tipe": "Deluxe",
        "harga": 400000,
        "tempat_tidur": 3,
        "lantai": 2,
        "status": 0,
      },
      {
        "id": 29,
        "nomor": "305",
        "tipe": 3,
        "nama_tipe": "Deluxe",
        "harga": 380000,
        "tempat_tidur": 4,
        "lantai": 3,
        "status": 0,
      },
      {
        "id": 30,
        "nomor": "308",
        "tipe": 3,
        "nama_tipe": "Deluxe",
        "harga": 380000,
        "tempat_tidur": 4,
        "lantai": 3,
        "status": 0,
      },
      {
        "id": 31,
        "nomor": "311",
        "tipe": 3,
        "nama_tipe": "Deluxe",
        "harga": 380000,
        "tempat_tidur": 3,
        "lantai": 3,
        "status": 0,
      }
    ])
  }
}
