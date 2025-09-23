const express = require('express')
const {db} = require('../DB/database')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const database_util = require('../Controllers/database_util')
const router = express.Router()
router.get('/', (req,res)=>{return res.send("Online")})
router.get('/versao', (req,res)=>{return res.json(
  {
    versao: '0.8.5', 
    forcar_update: 'nao',
    link: "",
    changelog:`
- Bugs Corrigidos
    `,
    

  }) }
)
router.post('/login', async (req, res) => {

    const { email, senha } = req.body;

    try {
        const usuario = await database_util.consultarDocumentos('Usuarios', { Email: email });

        if (!usuario || usuario.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const user = usuario[0];

        const senhaCorreta = await bcrypt.compare(senha, user.senha_hash);
    
        if (senhaCorreta) {
            const token = jwt.sign(
                { nome: user.Nome, id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' } 
            );

            return res.json({ token: token, email: user.Email });
        } else {

            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }
    } catch (error) {
        console.error('Erro durante o login:', error);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
});


router.post('/check_token', (req, res) => {
  let token = req.headers['authorization'];

  if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
      token = token.split('Bearer ')[1];
  } catch {
      return res.status(400).json({ error: 'Formato de token inválido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
          if (err.name === 'TokenExpiredError') {
              return res.status(401).json({ error: 'Token expirado' });
          } else {
              return res.status(401).json({ error: 'Token inválido' });
          }
      }

      
      res.status(200).json({ message: 'Token válido', user });
  });
});
module.exports = router