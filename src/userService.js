const { generateToken } = require('./authService');

const users = [
  { username: 'user', password: '123456', id: 123, email: 'user@dominio.com', perfil: 'user' },
  { username: 'admin', password: '123456789', id: 124, email: 'admin@dominio.com', perfil: 'admin' },
  { username: 'colab', password: '123', id: 125, email: 'colab@dominio.com', perfil: 'user' },
  { username: 'tester', password: '1234567', id: 123, email: 'user@dominio.com', perfil: 'admin' },
];

// Endpoint para login do usuário
function loginUser(req, res) {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
  console.log( "linha 20 userService" + user );
}

// Endpoint para recuperação dos dados do usuário logado
function getUserProfile(req, res) {
  const user = users.find(u => u.id === req.user.userId);
  if (user) {
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      perfil: user.perfil,
    });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
  console.log( user );
}

module.exports = { loginUser, getUserProfile };
