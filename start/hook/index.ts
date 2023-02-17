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

View.global('tandaPemisahTitik', function(b){
    if (b == null) {
        return 0
    }
    var _minus = false;
    if (b<0) _minus = true;
    b = b.toString();
    b=b.replace(".","");
    b=b.replace("-","");
    let c = "";
    let panjang = b.length;
    let j = 0;
    for (let i = panjang; i > 0; i--){
        j = j + 1;
        if (((j % 3) == 1) && (j != 1)){
            c = b.substr(i-1,1) + "." + c;
        } else {
            c = b.substr(i-1,1) + c;
        }
    }
    if (_minus) c = "-" + c ;
    return c;
})


