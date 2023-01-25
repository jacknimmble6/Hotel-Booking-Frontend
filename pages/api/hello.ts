
import type { NextApiRequest, NextApiResponse } from 'next'
import { hotels } from '../../hotels'

export default async function handler(req: any, res: { json: (arg0: () => Promise<void>) => void }) {
  res.json(hotels)
}