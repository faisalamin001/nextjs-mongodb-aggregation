import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Criminal from '../../models/Criminal';
import { faker } from '@faker-js/faker';

const generateCriminalsData = () => {
  const criminals = [];
  for (let i = 1; i < 1000; i++) {
    criminals.push({
      id: i.toString(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      city: faker.location.city(),
      crime: faker.helpers.arrayElement(['Fraud', 'Robbery', 'Ciber Crime', 'Kidnapping']),
      date: faker.date.recent(),
      captured: faker.datatype.boolean(),
    });
  }
  return criminals;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        // Insert initial criminals data
        const criminalsData = generateCriminalsData();

        const criminals = await Criminal.insertMany(criminalsData);

        res.status(201).json({ status: 'success', message: 'Criminals successfully populated!', data: criminals });
      } catch (e) {
        console.error(e);
        res.status(400).json({ status: 'error', message: 'Criminal creation failed.' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).send(`Method ${method} is not allowed.`);
      break;
  }
}
