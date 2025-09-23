const {db} = require('../DB/database')
const jwt = require('jsonwebtoken');
const {google} = require('googleapis')
const axios = require('axios')
const database_util = require('./database_util')
const { Readable } = require('stream');
const Globais = require('./Globais')
const { MongoClient, ObjectId } = require('mongodb');

// variaveis mock - simulando banco de dados
var saldo = 0
var registros =  []
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

  var token = req.headers['authorization'];

  //validando usuario
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    console.log(token.split('Bearer '))
      token = token.split('Bearer ')[1];
  } catch {
      return res.status(400).json({ error: 'Formato de token inválido' });
  }
  var user;
  
    jwt.verify(token, process.env.JWT_SECRET, async (err, user_token) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expirado' });
            } else {
                return res.status(401).json({ error: 'Token inválido' });
            }
        }
  
        
        user = user_token
    });


    // fim da validação de usuario

 

  try{
     let novo_saldo = req.body.novo_saldo

   novo_saldo = parseFloat(novo_saldo)
   novo_saldo = novo_saldo.toFixed(2)
    let valor_registro = novo_saldo - saldo
    if(valor_registro == 0 || novo_saldo < 0){
  return res.json({
    caminho: '/add_registro',
    
    dados:{sucesso: 0}

    
  })
    }
  saldo = novo_saldo
 let data = new Date()
 console.log(`${data.getFullYear()}-${String(data.getMonth()).padStart(2,'0')}-${String(data.getDate()).padStart(2, '0')}`)
 registros.push({valor: valor_registro, saldo_após: saldo , id:Math.ceil(Math.random() * 10000), data: `${data.getFullYear()}-${String(data.getMonth()).padStart(2,'0')}-${String(data.getDate()).padStart(2, '0')}`}) 
 return res.json({
    caminho: '/add_registro',
    
    dados:{sucesso: 1, usuario : user}

    
  })
  }catch{


  return res.json({
    caminho: '/add_registro',
    
    dados:{sucesso: 0}

    
  })


  }

}