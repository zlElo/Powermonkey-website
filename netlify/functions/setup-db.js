import { neon } from '@netlify/neon';

export default async function handler(req) {
  try {
    const sql = neon();
    
    await sql`
      CREATE TABLE IF NOT EXISTS benchmarks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        score DECIMAL NOT NULL,
        category VARCHAR(20) NOT NULL,
        cpu VARCHAR(100),
        gpu VARCHAR(50),
        storage VARCHAR(20),
        pyversion VARCHAR(10),
        os VARCHAR(20),
        device VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    return new Response(JSON.stringify({ success: true, message: 'Database table created successfully!' }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error setting up database:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
