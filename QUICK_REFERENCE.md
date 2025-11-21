# SmartBasket - Quick Reference Guide

## Implementation Timeline Summary

### Phase 1-2: Foundation (Weeks 1-4)
**Setup + Authentication**
- Project setup, database design
- User registration/login
- User profiles with photos & biography

### Phase 3-4: Core Features (Weeks 5-8)
**Products + Price Comparison**
- Product search & filtering
- Price comparison engine

### Phase 5-6: Shopping Experience (Weeks 9-11)
**Lists + Recipes**
- Shopping lists (AI-powered)
- Recipe recommendations

### Phase 7-8: Business Features (Weeks 12-13)
**Subscriptions + Finance**
- Subscription management
- Cashflow tracking & PDF statements

### Phase 9-10: Content & Social (Weeks 14-15)
**Blogs + Collaboration**
- Blog system
- Social sharing & reviews

### Phase 11-12: Admin + Deployment (Weeks 16-17)
**Analytics + Launch**
- Admin dashboard
- Sub-domain setup & deployment

### Phase 13: Final Polish (Week 18)
**Documentation + Presentation**

---

## Instructor Feedback Items - Implementation Priority

### High Priority (Must Have)
1. **PDF Generation** → Phase 8 (Cashflow statements)
2. **Sub-domain** → Phase 12 (Deployment)
3. **Blogs** → Phase 9 (Blog System)
4. **Photos and Biography** → Phase 2 (User Profiles)
5. **Cashflow Statements** → Phase 8 (Financial Tracking)
6. **Debit/Credit Tracking** → Phase 8 (Transaction Management)

---

## Tech Stack (Finalized)

### Frontend
- React (JavaScript)
- React Router
- Axios
- Bootstrap 5 (CSS Framework)
- Chart.js (for analytics)
- JavaScript (ES6+)

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT (authentication)
- pdfkit or puppeteer (PDF generation)
- JavaScript (ES6+)

---

## Team Member Split Suggestions

### Member 1 Focus Areas:
- Backend APIs
- Database design
- Authentication
- Payment integration
- PDF generation
- Analytics backend

### Member 2 Focus Areas:
- Frontend UI/UX
- React components
- User interfaces
- Charts/visualizations
- Frontend PDF handling
- Admin dashboard UI

**Note:** Both should understand the full stack, but specialize in one area.

---

## Critical Path Features

These features are dependencies for others:

1. **User Authentication** (Phase 2) - Needed for everything
2. **Product Database** (Phase 3) - Needed for shopping lists, price comparison
3. **Shopping Lists** (Phase 5) - Needed for recipes, subscriptions
4. **Subscriptions** (Phase 7) - Needed for cashflow tracking
5. **Transactions** (Phase 8) - Needed for PDF statements

---

## Quick Start Checklist

- [ ] Initialize Git repository
- [ ] Set up backend (Node + Express)
- [ ] Set up frontend (React)
- [ ] Connect MongoDB
- [ ] Create basic folder structure
- [ ] Set up environment variables
- [ ] Create first API endpoint (test)
- [ ] Create first React component (test)

---

## Common Issues to Watch For

1. **CORS errors** - Configure CORS properly in Express
2. **JWT expiration** - Handle token refresh
3. **File uploads** - Use multer, configure size limits
4. **PDF generation** - Test with different data sizes
5. **Sub-domain routing** - Configure properly in deployment
6. **MongoDB connections** - Handle connection errors gracefully

---

## Resources Needed

- MongoDB Atlas account (free tier)
- Deployment platform (Heroku/Netlify - free tiers)
- Domain name (for sub-domains)
- Payment gateway account (Stripe/PayPal - test mode)
- Image storage (Cloudinary free tier or local)

---

## Weekly Milestones

- **Week 2:** Backend and frontend running locally
- **Week 4:** Users can register and login
- **Week 6:** Products searchable and filterable
- **Week 8:** Price comparison working
- **Week 10:** Shopping lists functional
- **Week 11:** Recipe recommendations working
- **Week 12:** Subscriptions created and managed
- **Week 13:** Cashflow PDFs generated
- **Week 14:** Blog system live
- **Week 15:** Social features working
- **Week 16:** Admin dashboard functional
- **Week 17:** Application deployed
- **Week 18:** Project complete and documented

