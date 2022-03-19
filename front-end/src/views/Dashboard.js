import React, { useState } from 'react';
import AdminPanel from './dashboardViews/AdminPanel';
import UserMovies from './dashboardViews/UserMovies';
import UserReviews from './dashboardViews/UserReviews';
import UserStats from './dashboardViews/UserStats';
import UserSettings from './dashboardViews/UserSettings';
import DashboardTemplate from 'templates/DashboardTemplate';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('stats');

  const handleCurrentViewChange = (newView) => setCurrentView(newView);

  return (
    <DashboardTemplate
      handleViewChange={handleCurrentViewChange}
      currentView={currentView}
    >
      {currentView === 'movies' && <UserMovies />}
      {currentView === 'reviews' && <UserReviews />}
      {currentView === 'stats' && <UserStats />}
      {currentView === 'settings' && <UserSettings />}
      {currentView === 'admin' && <AdminPanel />}
    </DashboardTemplate>
  );
};

export default Dashboard;
