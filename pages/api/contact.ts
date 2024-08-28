import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { orgName, email, message } = req.body;

    // Store the contact form submission in Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        { org_name: orgName, email, message }
      ]);

    if (error) {
      console.error('Error submitting contact form:', error);
      return res.status(500).json({ error: 'Error submitting form' });
    }

    // TODO: Send email notification to admin (implement this later)

    return res.status(200).json({ message: 'Form submitted successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}