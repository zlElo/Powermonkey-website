import { neon } from '@netlify/neon';

export default async function handler(req) {
  const sql = neon();
  const formData = await req.formData();
  
  const data = {
    name: formData.get('name'),
    score: formData.get('score'),
    category: formData.get('category'),
    cpu: formData.get('cpu') || null,
    gpu: formData.get('gpu') || null,
    storage: formData.get('storage') || null,
    pyversion: formData.get('pyversion') || null,
    os: formData.get('os') || null
  };
  
  await sql`
    INSERT INTO benchmarks ${sql(data, 'name', 'score', 'category', 'cpu', 'gpu', 'storage', 'pyversion', 'os')}
  `;
  
  return new Response('Success!', { status: 200 });
}
