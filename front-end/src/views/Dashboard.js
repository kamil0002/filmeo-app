import React, { useState } from 'react';
import AdminPanel from './AdminPanel';
import UserMovies from './dashboardViews/UserMovies';
import UserReviews from './dashboardViews/UserReviews';
import UserPayments from './dashboardViews/UserPayments';
import UserSettings from './dashboardViews/UserSettings';
import DashboardTemplate from 'templates/DashboardTemplate';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('admin');

  const handleCurrentViewChange = (newView) => setCurrentView(newView);

  return (
    <DashboardTemplate
      handleViewChange={handleCurrentViewChange}
      currentView={currentView}
    >
      {currentView === 'movies' && <UserMovies />}
      {currentView === 'reviews' && <UserReviews />}
      {currentView === 'payments' && <UserPayments />}
      {currentView === 'settings' && <UserSettings />}
      {currentView === 'admin' && <AdminPanel />}
    </DashboardTemplate>
  );
};

export default Dashboard;
