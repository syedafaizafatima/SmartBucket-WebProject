import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ShoppingLists from './pages/ShoppingLists';
import Recipes from './pages/Recipes';
import Subscriptions from './pages/Subscriptions';
import Financial from './pages/Financial';
import Blog from './pages/Blog';
import Admin from './pages/Admin';
import GroupBuys from './pages/GroupBuys';
import GroupBuyDetail from './pages/GroupBuyDetail';
import Notifications from './pages/Notifications';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          <Navbar onSidebarToggle={() => setShowSidebar(true)} />
          <Sidebar show={showSidebar} onHide={() => setShowSidebar(false)} />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/group-buys" element={<GroupBuys />} />
              <Route path="/group-buys/:id" element={<GroupBuyDetail />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/shopping-lists"
                element={
                  <ProtectedRoute>
                    <ShoppingLists />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subscriptions"
                element={
                  <ProtectedRoute>
                    <Subscriptions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/financial"
                element={
                  <ProtectedRoute>
                    <Financial />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

