// pages/api/images.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Image from '../../models/Image';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  // Connect to MongoDB
  await dbConnect();

  if (method === 'GET') {
    try {
      // Fetch all images from MongoDB
      const images = await Image.find({});
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  } else if (method === 'POST') {
    try {
      // Create a new image
      const { url, alt } = req.body;

      // Validate data
      if (!url || !alt) {
        return res.status(400).json({ message: 'URL and alt text are required' });
      }

      const newImage = new Image({ url, alt });
      await newImage.save();

      res.status(201).json(newImage);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  } else {
    // If method is not GET or POST
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
