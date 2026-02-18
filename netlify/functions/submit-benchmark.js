import { neon } from '@netlify/neon';

export default async function handler(req) {
  try {
    const sql = neon();
    const formData = await req.formData();
    
    const name = formData.get('name');
    const score = formData.get('score');
    const category = formData.get('category');
    const cpu = formData.get('cpu') || null;
    const gpu = formData.get('gpu') || null;
    const storage = formData.get('storage') || null;
    const pyversion = formData.get('pyversion') || null;
    const os = formData.get('os') || null;
    const device = formData.get('device') || null;
    
    await sql`
      INSERT INTO benchmarks (name, score, category, cpu, gpu, storage, pyversion, os, device)
      VALUES (${name}, ${score}, ${category}, ${cpu}, ${gpu}, ${storage}, ${pyversion}, ${os}, ${device})
    `;
    
    return new Response(JSON.stringify({ success: true, message: 'Benchmark submitted successfully!' }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error submitting benchmark:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
