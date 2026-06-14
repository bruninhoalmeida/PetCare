const mysql = require('mysql2');

// Configuração do pool de conexões com o MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',          // Usuário padrão do XAMPP / Workbench
  password: '',          // Senha padrão (geralmente vazia no XAMPP)
  database: 'petcare_db', // Nome do banco de dados que criamos
  waitForConnections: true,
  connectionLimit: 10,   // Máximo de conexões simultâneas abertas
  queueLimit: 0
});

// Exporta o pool utilizando suporte a Promises (async/await)
module.exports = pool.promise();