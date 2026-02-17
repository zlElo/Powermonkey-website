import { neon } from '@netlify/neon';

export default async function handler(req, res) {
  const sql = neon();
  
  await sql`
    CREATE TABLE IF NOT EXISTS benchmarks (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      score DECIMAL,
      category VARCHAR(20),
      cpu VARCHAR(100),
      gpu VARCHAR(50),
      storage VARCHAR(20),
      pyversion VARCHAR(10),
      os VARCHAR(20),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  
  return new Response('DB ready!', { status: 200 });
}
