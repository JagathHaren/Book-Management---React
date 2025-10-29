import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import SingleBook from './pages/SingleBook';
import Cart from './pages/Cart';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="add" element={<AddBook />} />
          <Route path="S_details/:id" element={<SingleBook />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
