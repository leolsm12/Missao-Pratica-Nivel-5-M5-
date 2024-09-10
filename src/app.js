const express = require('express');
const bodyParser = require('body-parser');
const { authenticateToken, authorizeAdmin } = require('./authService');
const { loginUser, getUserProfile } = require('./userService');
const { getContracts } = require('./contractService');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint para login do usuário
app.post('/api/auth/login', loginUser);

// Endpoint para recuperação de dados do usuário logado
app.get('/api/users/me', authenticateToken, getUserProfile);

// Endpoint para recuperação dos contratos existentes
app.get('/api/contracts', authenticateToken, authorizeAdmin, getContracts);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});