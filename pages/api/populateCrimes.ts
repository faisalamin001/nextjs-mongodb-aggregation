import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Crime from '../../models/Crime';
import { faker } from '@faker-js/faker';

const generateCrimesData = () => {
  const crimes = [];
  for (let i = 1; i < 1000; i++) {
    crimes.push({
      id: i.toString(),
      crimeName: faker.helpers.arrayElement(['Fraud', 'Robbery', 'Ciber Crime', 'Kidnapping']),
      date: faker.date.recent(),
      city: faker.location.city(),
      status: faker.helpers.arrayElement(['Solved', 'Unsolved']),
    });
  }
  return crimes;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        // Insert initial crimes data
        const crimesData = generateCrimesData();

        const crimes = await Crime.insertMany(crimesData);

        res.status(201).json({ status: 'success', message: 'Crimes successfully populated!', data: crimes });
      } catch (e) {
        console.error(e);
        res.status(400).json({ status: 'error', message: 'Crime creation failed.' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).send(`Method ${method} is not allowed.`);
      break;
  }
}
