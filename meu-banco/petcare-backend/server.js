const express = require('express');
const cors = require('cors');
const db = require('./model/db');

const app = express();

// Middleware para permitir requisições de outras portas (como o React na 5173)
app.use(cors());

// Middleware para fazer o Express entender o formato JSON que o React envia
app.use(express.json());

// Rota POST: Recebe os dados de pagamento da vitrine e salva na tabela 'usuarios'
app.post('/usuarios', async (req, res) => {
  const { nome, idade, cpf } = req.body;

  // Log no terminal para monitorar o que está chegando do frontend
  console.log('📥 Nova tentativa de pagamento recebida:');
  console.log(`👤 Nome: ${nome} | 💳 Qtd Cartões (Idade): ${idade}`);
  console.log(`📝 Detalhes (CPF): ${cpf}\n`);

  // Validação básica de segurança dos dados de entrada
  if (!nome || !cpf) {
    return res.status(400).json({ 
      success: false, 
      message: 'Erro: Dados obrigatórios ausentes na requisição.' 
    });
  }

  try {
    // Query SQL parametrizada para evitar SQL Injection
    const sql = 'INSERT INTO usuarios (nome, idade, cpf) VALUES (?, ?, ?)';
    const [resultado] = await db.execute(sql, [nome, idade, cpf]);

    // Retorno de sucesso para o React desativar o status de carregamento
    return res.status(201).json({
      success: true,
      message: 'Transação processada e salva no banco de dados com sucesso!',
      idInserido: resultado.insertId
    });

  } catch (erro) {
    console.error('❌ Erro crítico ao tentar gravar no banco MySQL:', erro);
    return res.status(500).json({ 
      success: false, 
      message: 'Erro interno no servidor ao salvar a transação.' 
    });
  }
});

// Define a porta do servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log('===================================================');
  console.log(`🚀 SERVIDOR PETCARE RODANDO NA PORTA: ${PORT}`);
  console.log(`📅 Banco de dados mapeado: petcare_db -> tabela: usuarios`);
  console.log('===================================================');
});