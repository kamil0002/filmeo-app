/* eslint-disable no-unused-vars */
import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import UserMovies from './UserMovies';
import UserReviews from './UserReviews';
import UserPayments from './UserPayments';
import UserSettings from './UserSettings';
import DashboardTemplate from 'templates/DashboardTemplate';

const Dashboard = () => {
  const params = useLocation();
  console.log(params);

  return (
    <DashboardTemplate>
      <AdminPanel />
    </DashboardTemplate>
  );
};

export default Dashboard;
