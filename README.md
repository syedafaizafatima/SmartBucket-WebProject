# SmartBasket - Smart Grocery Shopping App

## Project Overview

SmartBasket is an innovative e-commerce platform designed to modernize and improve the grocery shopping experience. The app leverages AI-powered price comparison, dietary-based product recommendations, and subscription services to optimize grocery shopping.

## Team
- **Team Size:** 2 members
- **Course:** Web Development

## Technology Stack

### Frontend
- React (JavaScript)
- React Router
- Axios
- Bootstrap 5 (CSS Framework)
- Chart.js
- JavaScript (ES6+)

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT (Authentication)
- pdfkit/puppeteer (PDF Generation)
- JavaScript (ES6+)

## Key Features

### Core Features
- ✅ User Authentication & Profiles (with photos & biography)
- ✅ Product Search & Filtering
- ✅ AI-Powered Price Comparison
- ✅ Personalized Shopping Lists
- ✅ Recipe Recommendations
- ✅ Subscription Management
- ✅ Cashflow Statements & Transaction Tracking
- ✅ PDF Generation
- ✅ Blog System
- ✅ Social Sharing & Reviews
- ✅ Admin Dashboard & Analytics
- ✅ Sub-domain Configuration

## Project Documentation

1. **[IMPLEMENTATION_PHASES.md](./IMPLEMENTATION_PHASES.md)** - Detailed 18-week implementation plan with 13 phases
2. **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick reference guide and timeline summary
3. **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Recommended folder structure and setup guide
4. **[BOOTSTRAP_SETUP.md](./BOOTSTRAP_SETUP.md)** - Bootstrap 5 setup and usage guide

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Project_SmartBucket
```

2. Set up Backend
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```

3. Set up Frontend
```bash
cd frontend
npm install
cp .env.example .env  # Configure your environment variables
npm start
```

## Implementation Phases Summary

| Phase | Duration | Focus Area |
|-------|----------|------------|
| 1-2 | Weeks 1-4 | Setup & Authentication |
| 3-4 | Weeks 5-8 | Products & Price Comparison |
| 5-6 | Weeks 9-11 | Shopping Lists & Recipes |
| 7-8 | Weeks 12-13 | Subscriptions & Finance |
| 9-10 | Weeks 14-15 | Blogs & Social Features |
| 11-12 | Weeks 16-17 | Admin & Deployment |
| 13 | Week 18 | Final Polish |

## Instructor Feedback Integration

All instructor feedback has been incorporated:

- ✅ **PDF Generation** - Implemented in Phase 8 (Cashflow Statements)
- ✅ **Sub-domain** - Implemented in Phase 12 (Deployment)
- ✅ **Blogs** - Implemented in Phase 9 (Blog System)
- ✅ **Photos and Biography** - Implemented in Phase 2 (User Profiles)
- ✅ **Cashflow Statements** - Implemented in Phase 8 (Financial Tracking)
- ✅ **Debit/Credit Tracking** - Implemented in Phase 8 (Transaction Management)

## Project Structure

```
SmartBasket/
├── backend/          # Node.js + Express API
├── frontend/         # React Application
├── docs/             # Documentation
└── README.md
```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed structure.

## Development Workflow

1. **Week 1-2:** Set up project structure and development environment
2. **Week 3-4:** Implement authentication and user profiles
3. **Week 5+:** Follow the phase-by-phase implementation plan

Refer to [IMPLEMENTATION_PHASES.md](./IMPLEMENTATION_PHASES.md) for detailed task breakdown.

## Team Collaboration

- Use feature branches for development
- Code review before merging to main
- Daily sync-ups to track progress
- Document API contracts early

## Resources

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Free cloud database
- [Heroku](https://www.heroku.com/) - Backend deployment
- [Netlify](https://www.netlify.com/) - Frontend deployment
- [Stripe](https://stripe.com/) - Payment processing (test mode)

## License

This project is for educational purposes.

---

**Note:** This is a course project. All features are designed to demonstrate full-stack web development skills using React, Node.js, Express, and MongoDB.

