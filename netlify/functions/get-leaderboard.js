import { neon } from '@netlify/neon';

export default async function handler(req) {
  try {
    const sql = neon();
    const url = new URL(req.url);
    const category = url.searchParams.get('category') || 'all';
    const limit = url.searchParams.get('limit') || '50';
    
    let results;
    if (category === 'all') {
      results = await sql`
        SELECT *, RANK() OVER (ORDER BY score DESC) as rank
        FROM benchmarks 
        ORDER BY score DESC 
        LIMIT ${parseInt(limit)}
      `;
    } else {
      results = await sql`
        SELECT *, RANK() OVER (ORDER BY score DESC) as rank
        FROM benchmarks 
        WHERE category = ${category}
        ORDER BY score DESC 
        LIMIT ${parseInt(limit)}
      `;
    }
    
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
