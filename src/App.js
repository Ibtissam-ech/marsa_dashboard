import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LiveViewPage from './pages/LiveViewPage';
import PlaybackPage from './pages/PlaybackPage';
import CamerasPage from './pages/CamerasPage';
import ThermalPage from './pages/ThermalPage';
import AlertsPage from './pages/AlertsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/live" element={<LiveViewPage />} />
        <Route path="/playback" element={<PlaybackPage />} />
        <Route path="/cameras" element={<CamerasPage />} />
        <Route path="/thermal" element={<ThermalPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;