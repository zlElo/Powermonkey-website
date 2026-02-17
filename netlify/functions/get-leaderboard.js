import { neon } from '@netlify/neon';

export default async function handler(req) {
  const sql = neon();
  const category = req.url.searchParams.get('category') || 'all';
  
  const whereClause = category === 'all' ? sql`` : sql`WHERE category = ${category}`;
  
  const results = await sql`
    SELECT *, RANK() OVER (ORDER BY score DESC) as rank
    FROM benchmarks 
    ${whereClause}
    ORDER BY score DESC 
    LIMIT 50
  `;
  
  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' }
  });
}
