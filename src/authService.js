const jwt = require('jsonwebtoken');
const secretKey = 'uma-chave-secreta-muito-forte';

// Função para gerar o token JWT
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      perfil: user.perfil
    },
    secretKey,
    { expiresIn: '1h' }
  );
}

// Middleware para autenticar o token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Middleware para verificar o perfil do usuário
function authorizeAdmin(req, res, next) {
  console.log('req.user.perfil:', req.user.perfil); // Verifique o valor de perfil
  if (req.user.perfil === 'admin') {
    next();
  } else {
    if (!res.headersSent) {
      res.status(403).json({ message: 'Perfil não autorizado' });
    }
  }
}
module.exports = { generateToken, authenticateToken, authorizeAdmin };