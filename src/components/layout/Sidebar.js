import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Video, 
  History, 
  Camera, 
  Thermometer,
  Bell, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/live', icon: Video, label: 'Live View' },
    { path: '/playback', icon: History, label: 'Playback' },
    { path: '/cameras', icon: Camera, label: 'Cameras' },
    { path: '/thermal', icon: Thermometer, label: 'Thermal' },
    { path: '/alerts', icon: Bell, label: 'Alerts' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`relative bg-white border-r border-gray-200 transition-all duration-300 ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      {/* LOGO MARSAMAROC SEULEMENT */}
      <div className="h-20 flex items-center justify-center border-b border-gray-100">
        <img 
          src="/logo-marsamaroc.png" 
          alt="Marsa Maroc" 
          className={`transition-all duration-300 ${collapsed ? 'h-8' : 'h-12'}`} 
        />
      </div>

      {/* MENU */}
      <nav className="p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'active' : ''} ${collapsed ? 'justify-center' : ''} mb-1`
            }
          >
            <item.icon size={20} />
            {!collapsed && <span className="ml-3 text-sm">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* TOGGLE BUTTON */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-50"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </div>
  );
};

export default Sidebar;