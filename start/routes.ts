/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import './hook'


Route.get('login', 'AuthController.index').as('login')
Route.post('gantiPassword', 'AuthController.gantiPassword').as('gantiPassword')
Route.get('gantiPassword', 'AuthController.view_gantiPassword').as('view.gantiPassword')
Route.post('login', 'AuthController.check').as('login.check')
Route.get('logout', 'AuthController.logout').as('logout')

Route.group(() => {
    Route.on('/').render('welcome').as('index')
    Route.get('beranda', 'BerandasController.index').as('beranda')
    
    //diskon
    Route.get('diskon', 'DiskonsController.index').as('diskon')
    Route.post('diskon', 'DiskonsController.post').as('diskon.post')
    Route.post('diskon/edit', 'DiskonsController.editPost').as('diskon.editPost')
    Route.post('diskon/hapus', 'DiskonsController.hapus').as('diskon.hapus')
    
    //Karyawan
    Route.get('karyawan', 'KaryawansController.index').as('karyawan')
    Route.post('karyawan', 'KaryawansController.post').as('karyawan.post')
    Route.post('karyawan/edit', 'KaryawansController.editPost').as('karyawan.editPost')
    Route.post('karyawan/hapus', 'KaryawansController.hapus').as('karyawan.hapus')

    //Booking Aula
    Route.get('booking-aula', 'BookingAulasController.index').as('booking-aula')
    Route.post('booking-aula', 'BookingAulasController.post').as('booking-aula.post')
    Route.post('booking-aula/bayar', 'BookingAulasController.bayar').as('booking-aula.bayar')
    Route.post('booking-aula/edit', 'BookingAulasController.edit').as('booking-aula.edit')
    Route.post('booking-aula/hapus', 'BookingAulasController.hapus').as('booking-aula.hapus')
    
    Route.group(() => {
        //kamar
        Route.get('kamar', 'Input/KamarsController.index').as('kamar')
        Route.post('kamar', 'Input/KamarsController.suspend').as('kamar.suspend')
        Route.get('kamar/add', 'Input/KamarsController.add').as('kamar.add')
        Route.post('kamar/add', 'Input/KamarsController.post').as('kamar.post')
        Route.get('kamar/edit', 'Input/KamarsController.edit').as('kamar.edit')
        Route.post('kamar/edit', 'Input/KamarsController.editPost').as('kamar.editPost')
        Route.get('kamar/hapus', 'Input/KamarsController.hapus').as('kamar.hapus')
    
        //tipe kamar
        Route.get('tipe-kamar', 'Input/TipeKamarsController.index').as('tipe_kamar')
        Route.get('tipe-kamar/add', 'Input/TipeKamarsController.add').as('tipe_kamar.add')
        Route.post('tipe-kamar/add', 'Input/TipeKamarsController.post').as('tipe_kamar.post')
        Route.get('tipe-kamar/edit', 'Input/TipeKamarsController.edit').as('tipe_kamar.edit')
        Route.post('tipe-kamar/edit', 'Input/TipeKamarsController.editPost').as('tipe_kamar.editPost')
        Route.get('tipe-kamar/hapus', 'Input/TipeKamarsController.hapus').as('tipe_kamar.hapus')
    
        //Aula
        Route.get('aula', 'Input/AulasController.index').as('aula')
        Route.get('aula/add', 'Input/AulasController.add').as('aula.add')
        Route.post('aula/add', 'Input/AulasController.post').as('aula.post')
        Route.get('aula/edit', 'Input/AulasController.edit').as('aula.edit')
        Route.post('aula/edit', 'Input/AulasController.editPost').as('aula.editPost')
        Route.post('aula/hapus', 'Input/AulasController.hapus').as('aula.hapus')
        Route.get('aula/booking', 'Input/AulasController.booking').as('aula.booking')
    
        //additonal item
        Route.get('additional-item', 'Input/AdditionalItemsController.index').as('additional_item')
        Route.get('additional-item/add', 'Input/AdditionalItemsController.add').as('additional_item.add')
        Route.post('additional-item', 'Input/AdditionalItemsController.post').as('additional_item.post')
        Route.post('additional-item/edit', 'Input/AdditionalItemsController.editPost').as('additional_item.editPost')
        Route.get('additional-item/hapus', 'Input/AdditionalItemsController.hapus').as('additional_item.hapus')
    }).prefix('input').as('input')
    
    
    Route.group(() => {
        //cek kamar
        Route.get('cek-kamar', 'Resepsi/CekKamarsController.index').as('cek_kamar')
        Route.post('cek-kamar', 'Resepsi/CekKamarsController.post').as('cek_kamar.post')
    
        //Booking
        Route.get('booking', 'Resepsi/BookingsController.index').as('booking')
        Route.post('booking', 'Resepsi/BookingsController.post').as('booking.post')
        Route.get('booking/check-in', 'Resepsi/BookingsController.checkIn').as('booking.check-in')
        Route.get('booking/hapus', 'Resepsi/BookingsController.hapus').as('booking.hapus')

        //check-in
        Route.get('check-in', 'Resepsi/CheckInsController.index').as('check_in')
        Route.post('check-in', 'Resepsi/CheckInsController.post').as('check_in.post')
        
        //check-out
        Route.get('check-out', 'Resepsi/CheckOutsController.index').as('check_out')
        Route.post('check-out', 'Resepsi/CheckOutsController.post').as('check_out.post')
        
        //cetak invoice
        Route.get('cetak-invoice', 'Resepsi/CetakInvoicesController.index').as('cetak_invoice')
        Route.get('invoice', 'Resepsi/CetakInvoicesController.invoice').as('invoice')
        Route.get('tes_cetak', 'Resepsi/CetakInvoicesController.tes_cetak').as('tes_cetak')
        Route.get('bill/:id/:kamar', 'Resepsi/CetakInvoicesController.bill').as('bill')
    }).prefix('resepsi').as('resepsi')
    
    Route.group(() => {
        Route.get('analisa', 'Laporan/AnalisasController.index').as('analisa')
        Route.get('rekap', 'Laporan/LaporansController.index').as('rekap')
        Route.get('kirim', 'Laporan/LaporansController.kirim').as('kirim')
        Route.post('kirim', 'Laporan/LaporansController.kirimPost').as('kirim.post')
    }).prefix('laporan').as('laporan')
    
    Route.group(() => {
        Route.get('addItem', 'ApiController.addItem').as('addItem')
        Route.get('diskon', 'ApiController.diskon').as('diskon')
        Route.get('analisa', 'ApiController.analisa').as('analisa')
        Route.get('download', 'ApiController.download').as('download')
        Route.get('report', 'ApiController.report').as('report')
    }).prefix('api').as('api')
}).middleware(['auth'])



