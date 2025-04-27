import mysql from 'mysql2/promise'; 
import keys from './keys'

const pool = mysql.createPool(keys.database);

async function connectToDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('BD is conected');
    
    connection.release();
  } catch (error) {
    console.error('Error conectando a la BD:', error);
  }
}

connectToDatabase();

export default pool;