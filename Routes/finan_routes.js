const express = require('express')
const {db} = require('../DB/database')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const finan_controller  = require('../Controllers/finan_controllers')
const router = express.Router()
const multer = require('multer');


const memoryStorage = multer.memoryStorage();


const limits = { fileSize: 20 * 1024 * 1024 };


const upload = multer({
  storage: memoryStorage,
  limits: limits
}).array('arquivo'); 



router.get('/get_saldo', validar_usuario,finan_controller.get_saldo)      
 router.get('/get_registros',validar_usuario, finan_controller.get_registros) 
router.post('/add_registro', finan_controller.novo_registro) 
router.get('/get_data_calculo',validar_usuario, finan_controller.get_data_calculo)
router.post('/set_data_calculo', finan_controller.set_data_calculo)



function validar_usuario(req,res,next){
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
    console.log('veja aqui')
    console.log(token)
    
      jwt.verify(token, process.env.JWT_SECRET, async (err, user_token) => {
          if (err) {
              if (err.name === 'TokenExpiredError') {
                  return res.status(401).json({ error: 'Token expirado' });
              } else {
                  return res.status(401).json({ error: 'Token inválido' });
              }
          }
    
          
          req.user = user_token
          next()
      });
      
}
module.exports = router