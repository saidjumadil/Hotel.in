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

Route.on('/').render('welcome').as('index')

Route.get('login', 'AuthController.index').as('login')
Route.post('login', 'AuthController.check').as('login.check')
Route.get('logout', 'AuthController.logout').as('logout')
Route.on('beranda').render('beranda').as('beranda')

Route.group(() => {
    //kamar
    Route.get('kamar', 'Input/KamarsController.index').as('kamar')
    Route.get('kamar/add', 'Input/KamarsController.add').as('kamar.add')
    Route.post('kamar/add', 'Input/KamarsController.post').as('kamar.post')

    //tipe kamar
    Route.get('tipe-kamar', 'Input/TipeKamarsController.index').as('tipe_kamar')
    Route.get('tipe-kamar/add', 'Input/TipeKamarsController.add').as('tipe_kamar.add')
    Route.post('tipe-kamar/add', 'Input/TipeKamarsController.post').as('tipe_kamar.post')

    //Aula
    Route.get('aula', 'Input/AulasController.index').as('aula')
    Route.get('aula/add', 'Input/AulasController.add').as('aula.add')
    Route.post('aula/add', 'Input/AulasController.post').as('aula.post')

    //additonal item
    Route.get('additional-item', 'Input/AdditionalItemsController.index').as('additional_item')
    Route.get('additional-item/add', 'Input/AdditionalItemsController.add').as('additional_item.add')
    Route.post('additional-item', 'Input/AdditionalItemsController.post').as('additional_item.post')
}).prefix('input').as('input')

Route.group(() => {
    Route.get('cek-kamar', 'Resepsi/CekKamarsController.index').as('cek_kamar')
    Route.get('check-in', 'Resepsi/CheckInsController.index').as('check_in')
    Route.get('check-out', 'Resepsi/CheckOutsController.index').as('check_out')
    Route.get('cetak-invoice', 'Resepsi/CetakInvoicesController.index').as('cetak_invoice')
}).prefix('resepsi').as('resepsi')

Route.group(() => {
    Route.get('analisa', 'Laporan/AnalisasController.index').as('analisa')
    Route.get('rekap', 'Laporan/LaporansController.index').as('rekap')
}).prefix('laporan').as('laporan')



