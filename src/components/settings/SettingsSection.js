import React from 'react';
import { ChevronRight } from 'lucide-react';

const SettingsSection = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon size={20} className="text-[#003A6B]" />
          </div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        <ChevronRight
          size={20}
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          {children}
        </div>
      )}
    </div>
  );
};

export default SettingsSection;

