const Repository = require('./repository'); // Repositório fictício

// Função para sanitizar os parâmetros
function sanitizeInput(input) {
  return input.replace(/[^a-zA-Z0-9]/g, '');
}

// Recupera os contratos do banco de dados
async function getContracts(req, res) {
  try {
    // Extraindo empresa e data de início dos headers
    const empresa = req.headers['x-empresa'];
    const inicio = req.headers['x-inicio'];

    // Verificação para garantir que os headers estão presentes
    if (!empresa || !inicio) {
      return res.status(400).json({ message: 'Cabeçalhos x-empresa e x-inicio são obrigatórios' });
    }

    // Sanitizar os parâmetros
    const empresaSanitized = sanitizeInput(empresa);
    const inicioSanitized = sanitizeInput(inicio);

    const repository = new Repository();

    // Usar parâmetros preparados para evitar injeção de SQL
    const query = 'SELECT * FROM contracts WHERE empresa = $1 AND data_inicio = $2';
    const result = await repository.execute(query, [empresaSanitized, inicioSanitized]);

    if (result.length > 0) {
      res.json({ data: result });
    } else {
      res.status(404).json({ message: 'Dados não encontrados' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

module.exports = { getContracts };