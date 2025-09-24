import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const configPath = path.join(process.cwd(), 'public', 'config.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData) as { resumeUrl: string };
    
    return res.status(200).json(config);
  } catch (error) {
    console.error('Error reading config:', error);
    return res.status(500).json({ message: 'Failed to read config' });
  }
}
