# Next.js MongoDB Aggregation Pipeline Example

This project demonstrates the use of MongoDB aggregation pipelines with a Next.js backend and frontend styled with Tailwind CSS and Ant Design.

## Features

- **Next.js** for server-side rendering and API routes.
- **MongoDB** for data storage and aggregation.
- **Tailwind CSS** for responsive and modern UI design.
- **Ant Design** for elegant and easy-to-use Table component.
- **Aggregation Pipelines** in MongoDB for advanced data querying and manipulation.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/faisalamin001/nextjs-mongodb-aggregation.git
   cd nextjs-mongodb-aggregation
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your MongoDB connection string.

   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### API Endpoint

The API endpoint `/api/agents` performs aggregation on the `agents` and `criminals` collections based on the provided tag.

### Example Request

To fetch agents and criminals associated with a specific tag:

```http
GET /api/agents?tag=Fraud

```
