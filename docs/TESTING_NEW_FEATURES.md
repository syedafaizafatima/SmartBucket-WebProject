# Testing the New Features - Quick Start Guide

## Prerequisites
- Node.js installed
- MongoDB running (local or Atlas)
- Both backend and frontend dependencies installed

---

## Quick Start

### 1. Start the Backend
```bash
cd backend
npm install  # If not already done
npm run dev  # or npm start
```

Backend should be running on `http://localhost:5000`

### 2. Start the Frontend
```bash
cd frontend
npm install  # If not already done
npm start
```

Frontend should open at `http://localhost:3000`

---

## Testing Reviews & Ratings ⭐

### Step-by-Step:

1. **View Existing Reviews**
   - Go to Products page
   - Click on any product
   - Scroll down to see "Customer Reviews" section
   - View rating distribution chart

2. **Write a Review** (Requires Login)
   - Make sure you're logged in
   - On product detail page, click "Write a Review"
   - Select star rating (1-5)
   - Enter review title
   - Enter review comment
   - Click "Submit Review"
   - See your review appear at the top

3. **Mark Reviews as Helpful**
   - Click the "👍 Helpful" button on any review
   - See the count increase
   - Click again to toggle off

4. **Delete Your Review**
   - Find your own review
   - Click "Delete" button
   - Confirm deletion

### Expected Behavior:
- ✅ Can only review each product once
- ✅ Rating automatically updates product average
- ✅ Rating distribution updates in real-time
- ✅ Only review owner can delete their review

---

## Testing Group Buying 👥

### Step-by-Step:

1. **View Group Buys**
   - Click "Group Buys" in navigation menu
   - See list of active group buying campaigns
   - View progress bars showing participation

2. **Create Group Buy** (Requires Login)
   - Click "+ Create Group Buy" button
   - Select a product from dropdown
   - Fill in:
     - Title (auto-filled based on product)
     - Description
     - Target Quantity (minimum 2)
     - Original Price (auto-filled from product)
     - Group Price (must be less than original)
     - Expires At (future date)
     - Delivery Date (optional)
     - Delivery Address (optional)
     - Payment Method
   - Click "Create Group Buy"
   - See your new group buy in the list

3. **Join Group Buy**
   - Click on any active group buy card
   - View details and participants
   - Click "Join Group Buy" button
   - See yourself added to participants list
   - Watch progress bar update

4. **Leave Group Buy**
   - On a group buy you've joined
   - Click "Leave Group Buy" button
   - Confirm action
   - See progress bar decrease

5. **Complete Group Buy**
   - Create a group buy with target quantity 2
   - Join it (creator counts as 1)
   - Use another account or ask someone to join
   - Watch status change to "Completed"

### Expected Behavior:
- ✅ Progress bar shows current/target quantity
- ✅ Days remaining countdown
- ✅ Auto-complete when target reached
- ✅ Savings calculation displayed
- ✅ Creator cannot leave (only delete)
- ✅ Participants can leave before completion

---

## Testing Notifications 🔔

### Step-by-Step:

1. **View Notification Bell** (Requires Login)
   - Look at navbar after login
   - See bell icon (🔔)
   - Red badge shows unread count

2. **Trigger Notifications**
   
   **Method 1: Through Group Buys**
   - Join a group buy
   - System should create notification
   - See unread count increase
   
   **Method 2: Create Test Notification (If Admin)**
   - Use API directly or create admin interface
   - POST to `/api/notifications`
   
   **Method 3: Through Reviews**
   - Have someone mark your review as helpful
   - Get notification

3. **View Notifications**
   - Click notification bell
   - See dropdown with latest 5 notifications
   - Click "View All Notifications"
   - See full notifications page

4. **Mark as Read**
   - Click on any unread notification
   - See it marked as read
   - Badge count decreases
   - Background color changes

5. **Filter Notifications**
   - On notifications page
   - Click "All" or "Unread" badges
   - See filtered results

6. **Delete Notifications**
   - Click "Delete" on individual notification
   - Or click "Delete All" to clear all
   - Confirm action

### Expected Behavior:
- ✅ Bell shows unread count
- ✅ Dropdown shows latest 5 notifications
- ✅ Clicking notification marks as read
- ✅ Clicking notification navigates to related page
- ✅ Real-time updates every 30 seconds
- ✅ Icons match notification type

---

## Testing with Multiple Users

### Scenario 1: Review Interactions
1. **User A:** Create review on Product X
2. **User B:** Mark User A's review as helpful
3. **User A:** Should get notification
4. **User A:** Click notification to view review

### Scenario 2: Group Buying Flow
1. **User A:** Create group buy (target: 5 items)
2. **User B:** Join group buy (2 items)
3. **User C:** Join group buy (2 items)
4. **User D:** Join group buy (1 item)
5. **All Users:** See completion notification
6. **All Users:** See status change to "Completed"

---

## Common Test Scenarios

### Test 1: Review Validation
- Try to review same product twice → Should fail
- Try to review without login → Should redirect to login
- Try to delete someone else's review → Should fail

### Test 2: Group Buy Permissions
- Creator tries to leave group buy → Should fail (must delete)
- Non-member tries to leave → Should fail
- Join expired group buy → Should fail
- Join full group buy → Should fail

### Test 3: Notifications
- Mark notification as read multiple times → Should work
- Delete notification → Should remove permanently
- Click notification with link → Should navigate
- Click notification without link → Should just mark read

---

## API Testing (Optional)

Use Postman, Insomnia, or curl to test APIs directly:

### Reviews
```bash
# Get reviews for a product
GET /api/reviews/product/:productId

# Create review (requires auth token)
POST /api/reviews
{
  "product": "product_id",
  "rating": 5,
  "title": "Great product!",
  "comment": "I love this product..."
}

# Mark review as helpful
PUT /api/reviews/:reviewId/helpful
```

### Group Buys
```bash
# Get all active group buys
GET /api/group-buys?status=active

# Create group buy (requires auth token)
POST /api/group-buys
{
  "product": "product_id",
  "title": "Group Buy: Rice 10kg",
  "description": "Let's buy together!",
  "targetQuantity": 5,
  "originalPrice": 50,
  "groupPrice": 40,
  "expiresAt": "2024-12-31"
}

# Join group buy
POST /api/group-buys/:id/join
{
  "quantity": 1
}
```

### Notifications
```bash
# Get user notifications (requires auth token)
GET /api/notifications

# Get unread count
GET /api/notifications/unread/count

# Mark as read
PUT /api/notifications/:id/read

# Mark all as read
PUT /api/notifications/read-all
```

---

## Troubleshooting

### Issue: Can't see notification bell
**Solution:** Make sure you're logged in. Notification bell only shows for authenticated users.

### Issue: Group buy not completing
**Solution:** Check if currentQuantity >= targetQuantity. Both creator and participants count.

### Issue: Can't create review
**Solution:** 
- Make sure you're logged in
- Check if you already reviewed this product
- Verify product exists

### Issue: Notifications not updating
**Solution:** 
- Check browser console for errors
- Verify backend is running
- Wait 30 seconds for auto-refresh
- Manually refresh page

### Issue: MongoDB connection error
**Solution:**
- Check if MongoDB is running
- Verify connection string in backend/.env
- Check if you have proper permissions

---

## Sample Data for Testing

### Create Test Products
```bash
cd backend
npm run seed  # If seed script exists
```

Or manually create products through admin panel or API.

### Create Test Users
1. Register at `/register`
2. Create multiple accounts with different emails
3. Use one as admin (update role in database)

### Test Accounts Suggestion
- user1@test.com (regular user)
- user2@test.com (regular user)
- admin@test.com (admin - update role in DB)

---

## Success Criteria

After testing, you should be able to:

✅ **Reviews:**
- Write and view reviews
- See rating distribution
- Mark reviews as helpful
- Delete own reviews

✅ **Group Buying:**
- Create group buying campaigns
- Join and leave group buys
- See real-time progress
- Complete group buys when target reached

✅ **Notifications:**
- See notification bell with unread count
- Receive notifications for activities
- Mark notifications as read
- Navigate from notifications

---

## Next Steps After Testing

1. **If Everything Works:**
   - Move to deployment (Phase 12)
   - Add more test data
   - Consider optional enhancements

2. **If Issues Found:**
   - Check browser console for errors
   - Check backend logs
   - Review API responses
   - Check MongoDB data

3. **For Production:**
   - Set up proper environment variables
   - Configure MongoDB Atlas
   - Enable production mode
   - Set up monitoring

---

## Need Help?

Check these files for reference:
- `IMPLEMENTATION_STATUS.md` - Overall project status
- `NEW_FEATURES_IMPLEMENTED.md` - Detailed feature documentation
- `README.md` - General project information
- Backend logs in terminal
- Browser console (F12) for frontend errors

Happy Testing! 🎉

