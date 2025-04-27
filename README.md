# RelatedLab Insight Report

A task management and analytics dashboard built with React, Node.js, and MongoDB.

## Live Demo
- Frontend: https://naveenragunathan.github.io/relatedlab-insight-report
- Backend: https://relatedlab-insight-report.onrender.com

## Features
- Task management with status tracking
- Progress visualization with interactive charts
- Weekly hours tracking
- Task distribution analytics
- Priority-based task organization

## Tech Stack
- Frontend:
  - React with TypeScript
  - Vite
  - TailwindCSS
  - Recharts for data visualization
  - React Query for state management
- Backend:
  - Node.js with Express
  - TypeScript
  - MongoDB with Mongoose
  - RESTful API architecture

## Deployment Instructions

### Frontend Deployment (GitHub Pages)
1. Install gh-pages:
   ```bash
   cd frontend
   npm install gh-pages --save-dev
   ```

2. Update your repository settings:
   - Go to your GitHub repository
   - Navigate to Settings > Pages
   - Set source to "GitHub Actions"

3. Deploy:
   ```bash
   cd frontend
   npm run deploy
   ```

### Backend Deployment (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables:
     - `PORT`: 3000
     - `MONGODB_URI`: Your MongoDB connection string
     - `CORS_ORIGIN`: https://naveenragunathan.github.io

4. Deploy the service

## Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/NaveenRagunathan/relatedlab-insight-report.git
   cd relatedlab-insight-report
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   - Create `.env` files in both frontend and backend directories
   - Use the example files as templates

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd frontend
   npm run dev
   ```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
