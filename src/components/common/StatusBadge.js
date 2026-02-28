import React from 'react';

const StatusBadge = ({ status, type = 'default' }) => {
  const getStyles = () => {
    switch(status) {
      case 'online':
      case 'success':
      case 'normal':
        return 'bg-green-100 text-green-700';
      case 'offline':
        return 'bg-gray-100 text-gray-700';
      case 'warning':
        return 'bg-orange-100 text-orange-700';
      case 'critical':
      case 'error':
        return 'bg-red-100 text-red-700';
      case 'info':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getLabel = () => {
    if (type !== 'default') return type;
    switch(status) {
      case 'online': return 'En ligne';
      case 'offline': return 'Hors ligne';
      case 'warning': return 'Avertissement';
      case 'critical': return 'Critique';
      case 'success': return 'Succès';
      case 'normal': return 'Normal';
      case 'info': return 'Info';
      default: return status;
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStyles()}`}>
      {getLabel()}
    </span>
  );
};

export default StatusBadge;
