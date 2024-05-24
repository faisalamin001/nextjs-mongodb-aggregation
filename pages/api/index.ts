import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Agent from '../../models/Agent';
import Crime from '../../models/Crime';
import Criminal from '../../models/Criminal';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  await dbConnect();
  switch (method) {
    case 'GET':
      try {
        const tag = query.tag ? query.tag.toString() : null;

        // Pipeline for Agents
        const agentPipeline = tag ? [{ $match: { assignedCrime: tag } }] : [{ $match: {} }];

        // Execute the aggregation pipeline on Agent model
        const agents = await Agent.aggregate(agentPipeline);

        const criminalPipeline = tag ? [{ $match: { crime: tag } }] : [{ $match: {} }];

        const criminals = await Criminal.aggregate(criminalPipeline);

        const structuredData = [
          ...agents.map((agent) => ({
            _id: agent._id ? agent._id.toString() : '',
            id: agent.id || '',
            name: agent.name || '',
            email: agent.email || '',
            badgeNumber: agent.badgeNumber || '',
            city: agent.address || '',
            assignedCrime: agent.assignedCrime || '',
            department: agent.department || '',
          })),
          ...criminals.map((criminal) => ({
            _id: criminal._id ? criminal._id.toString() : '',
            id: criminal.id || '',
            name: criminal.name || '',
            email: criminal.email || '',
            badgeNumber: criminal.badgeNumber || '001',
            city: criminal.city || '',
            assignedCrime: criminal.assignedCrime || '',
            department: criminal.department || 'Criminal',
          })),
        ];

        res.status(200).json({ status: 'success', data: structuredData });
      } catch (e) {
        console.error(e);
        res.status(404).json({ status: 'error', message: 'Agents search could not be performed.' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).send(`Method ${method} is not allowed.`);
      break;
  }
}
