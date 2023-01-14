import View from '@ioc:Adonis/Core/View'
import Env from '@ioc:Adonis/Core/Env'

const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

View.global('appUrl', (path) => {
    const APP_URL = Env.get('APP_URL')

    return path ? `${APP_URL}/${path}` : APP_URL
})

View.global('date', (tanggal) => {
    return `${tanggal.getDate()} ${bulan[tanggal.getMonth()]} ${tanggal.getFullYear()}`
})

View.global('tanggal', function(tanggal : Date){
    const date = ('0' + tanggal.getDate()).slice(-2)
    const month = ('0' + (tanggal.getMonth() + 1)).slice(-2)
    const year = tanggal.getFullYear()
    return `${year}-${month}-${date}`
})

View.global('tanggal_laporan', function(tanggal : Date){
    const date = ('0' + tanggal.getDate()).slice(-2)
    const month = ('0' + (tanggal.getMonth() + 1)).slice(-2)
    const year = tanggal.getFullYear()
    return `${date}/${month}/${year}`
})