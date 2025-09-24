import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { password, newUrl } = req.body as { password: string; newUrl: string };

  // Check password
  if (password !== 'abeer2024') {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Validate URL
  try {
    new URL(newUrl);
  } catch {
    return res.status(400).json({ message: 'Invalid URL format' });
  }

  try {
    // Update the config file
    const configPath = path.join(process.cwd(), 'public', 'config.json');
    const config = { resumeUrl: newUrl };
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    
    return res.status(200).json({ message: 'Config updated successfully' });
  } catch (error) {
    console.error('Error updating config:', error);
    return res.status(500).json({ message: 'Failed to update config' });
  }
}
