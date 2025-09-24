const {db} = require('../DB/database')
const jwt = require('jsonwebtoken');
const {google} = require('googleapis')
const axios = require('axios')
const database_util = require('./database_util')
const { Readable } = require('stream');
const Globais = require('./Globais')
const { MongoClient, ObjectId } = require('mongodb');

// variaveis mock - simulando banco de dados


var data_calculo = "27/09/2025"

exports.get_saldo = async (req,res)=>{
  var user = await database_util.consultarDocumentoPorId('Usuarios', req.user.id)
  console.log(user)
  return res.json({    caminho: '/get_saldo', dados: {saldo: parseFloat(user.Saldo)}})
}

exports.get_data_calculo = async (req,res)=>{
  return res.json({    caminho: '/get_data_calculo', dados: {data_calculo: data_calculo}})
}





exports.get_registros = async (req,res)=>{
  console.log(req.user)
  console.log('user acima')
  var registrosbanco = await database_util.consultarDocumentos("Registros",{Usuario:new ObjectId(req.user.id)})
  console.log(registrosbanco)

  return res.json({
    caminho: '/get_registros',
    
    dados:

    registrosbanco
  })
}






exports.set_data_calculo= async (req,res)=>{
  data_calculo = req.body.data_calculo
  console.log(data_calculo)
  return res.json({    caminho: '/set_data_calculo', dados: {sucesso: 1}})
}



exports.novo_registro = async (req,res)=>{

 
 

  try{
      var usuario_consultado = await database_util.consultarDocumentoPorId("Usuarios",req.user.id)
  console.log(usuario_consultado)
     let novo_saldo = req.body.novo_saldo

   novo_saldo = parseFloat(novo_saldo)
   novo_saldo = novo_saldo.toFixed(2)
    let valor_registro = novo_saldo - parseFloat(usuario_consultado.Saldo)

    console.log('infos')
    console.log(valor_registro)
    console.log(novo_saldo)
    if(valor_registro == 0 || novo_saldo < 0){
  return res.json({
    caminho: '/add_registro',
    
    dados:{sucesso: 0}

    
  })
    }
 
 let data = new Date()
 console.log(`${data.getFullYear()}-${String(data.getMonth()).padStart(2,'0')}-${String(data.getDate()).padStart(2, '0')}`)
 await database_util.criarDocumento("Registros",
  {
    Usuario: new ObjectId(req.user.id),
    movimentacao: valor_registro,
    Saldo_informado: novo_saldo , 
    data: `${data.getFullYear()}-${String(data.getMonth()).padStart(2,'0')}-${String(data.getDate()).padStart(2, '0')}`}
    ) 
await database_util.atualizarDocumento(
  "Usuarios",
  req.user.id,
  { $set: { Saldo: parseFloat(novo_saldo) } } // Adicione o $set aqui
);
 return res.json({
    caminho: '/add_registro',
    
    dados:{sucesso: 1, usuario : req.user}

    
  })
  }catch(e){
    console.log(e)


  return res.json({
    caminho: '/add_registro',
    
    dados:{sucesso: 0}

    
  })


  }

}