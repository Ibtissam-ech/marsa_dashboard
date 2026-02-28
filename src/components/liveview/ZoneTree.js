import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, Video, Thermometer } from 'lucide-react';

const ZoneTree = ({ data, onSelectCamera }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getIcon = (node) => {
    if (node.type === 'zone') return <Folder size={16} className="text-[#003A6B]" />;
    if (node.type === 'subzone') return <Folder size={16} className="text-blue-400" />;
    if (node.type === 'camera') {
      return node.thermal ? 
        <Thermometer size={16} className="text-orange-500" /> : 
        <Video size={16} className="text-gray-500" />;
    }
  };

  const renderNode = (node, level = 0) => {
    const isExpanded = expanded[node.id];
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id}>
        {/* Ligne du nœud */}
        <div 
          className={`flex items-center py-2 px-2 hover:bg-gray-50 rounded-lg cursor-pointer`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(node.id);
            } else if (node.type === 'camera') {
              onSelectCamera(node);
            }
          }}
        >
          {hasChildren && (
            <span className="mr-1">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}
          {!hasChildren && <span className="w-4 mr-1"></span>}
          <span className="mr-2">{getIcon(node)}</span>
          <span className="text-sm flex-1">{node.name}</span>
          {node.type === 'camera' && node.online && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              node.temperature > 75 ? 'bg-red-100 text-red-700' :
              node.temperature > 60 ? 'bg-orange-100 text-orange-700' :
              'bg-green-100 text-green-700'
            }`}>
              {node.temperature}°C
            </span>
          )}
          {node.type === 'camera' && !node.online && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              Hors ligne
            </span>
          )}
        </div>

        {/* Enfants (si expandé) */}
        {isExpanded && hasChildren && (
          <div>
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {data.map(node => renderNode(node))}
    </div>
  );
};

export default ZoneTree;
