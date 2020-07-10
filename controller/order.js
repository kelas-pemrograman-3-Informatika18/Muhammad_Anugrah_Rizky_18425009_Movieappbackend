const orderModel = require('../model/order')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId

exports.insert = (data) =>
 new Promise((resolve, reject) => {
   try {
     orderModel.create(data)
      .then(() => resolve(requestResponse.sukses('Berhasil Memproses Transaksi')))
      .catch(() => reject(requestResponse.serverError))
   } catch (error) {
     console.log(error)
     
   }
 })

exports.getAllOrder = () =>
 new Promise((resolve, reject) => {
   try {
    orderModel.aggregate([
      {
        $lookup: {
          from: "movies",
          localField: "idFilm",
          foreignField: "_id",
          as: "dataMovie"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "idUser",
          foreignField: "_id",
          as: "dataUser"
        }
      }
    ]).then(res => {
      resolve(requestResponse.suksesbuilddata(res))
    }).catch(() => reject(requestResponse.serverError))
   } catch (error) {
     console.log(error)
   }
 })

 exports.getOrderByUser = (id) =>
 new Promise((resolve, reject) => {
   try {
    orderModel.aggregate([
      {
        $match: {
          idUser: objectId(id)
        }
      },
       {
         $lookup: {
           from: "movies",
           localField: "idFilm",
           foreignField: "_id",
           as: "dataMovie"
         }
       },
     ]).then(res => {
       resolve(requestResponse.suksesbuilddata(res))
     }).catch(() => reject(requestResponse.serverError))
   } catch (error) {
     console.log(error)
   }
 })

exports.konfirmasiOrder = (id) =>
 new Promise((resolve, reject) => {
   orderModel.updateOne({
     _id: objectId(id)
   },
   {
     status: 2
   }).then(() => resolve(requestResponse.sukses('Berhasil Konfirmasi Berkas')))
   .catch(() => reject(requestResponse.serverError))
 })

exports.terimaOrder = (id) =>
 new Promise((resolve, reject) => {
   orderModel.updateOne({
     _id: objectId(id)
   },
   {
     status: 3
   }).then(() => resolve(requestResponse.sukses('Berhasil Menerima Order')))
   .catch(() => reject(requestResponse.serverError))
 }) 