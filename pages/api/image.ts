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
      // Fetch the image by its 'name'
      const image = await Image.findOne({ name });

      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }

      // Respond with the image data
      res.status(200).json(image);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  } else if (method === 'PUT') {
    try {
      // Update the image by 'name'
      const { url, alt } = req.body;

      // Check if URL and alt text are provided
      if (!url || !alt) {
        return res.status(400).json({ message: 'URL and alt text are required' });
      }

      const updatedImage = await Image.findOneAndUpdate(
        { name },  // Find the image by 'name'
        { url, alt }, // Update the image's url and alt text
        { new: true } // Return the updated document
      );

      if (!updatedImage) {
        return res.status(404).json({ message: 'Image not found' });
      }

      // Respond with the updated image
      res.status(200).json(updatedImage);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  } else if (method === 'POST') {
    try {
      // Create a new image
      const { name, url, alt } = req.body;

      // Check if all required fields are provided
      if (!name || !url || !alt) {
        return res.status(400).json({ message: 'Name, URL, and alt text are required' });
      }

      // Check if an image with the same name already exists
      const existingImage = await Image.findOne({ name });
      if (existingImage) {
        return res.status(400).json({ message: 'An image with this name already exists' });
      }

      // Create and save the new image
      const newImage = new Image({ name, url, alt });
      await newImage.save();

      // Respond with the created image
      res.status(201).json(newImage);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  } else {
    // If method is not GET, PUT, or POST
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
