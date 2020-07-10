const requestResponse = {
    gagal: (pesan) => {
        return{
            sukses: false,
            pesan: pesan
        }
    },
    sukses: (pesan) =>{
      return{
          sukses: true,
          pesan: pesan
      }  
    },
    serverError: {
            sukses: false,
            pesan: 'Terjadi Kesalahan Diserver Kami'
    },
    sukseslogin: (data) => {
        return{
            sukses: true,
            pesan: 'Berhasil Login',
            data: data
        }
    },
    suksesbuilddata: (data) => {
        return {
            sukses: true,
            pesan: 'Berhasil Memuat Data',
            data: data
        }
    }
}
module.exports = { requestResponse }