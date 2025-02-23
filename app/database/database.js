import mysql2 from 'mysql2';

const connectiondb = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'login_node'
});

connectiondb.connect((error) => {
  if (error) {
    console.error('Error de conexión:', error);
    return;
  }
  console.log('¡Conectado a la base de datos!');
});

export default connectiondb; 