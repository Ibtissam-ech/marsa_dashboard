import React from 'react';
import CameraTile from './CameraTile';

const CameraGrid = ({ cameras, onCameraSelect, layout = 'grid' }) => {
  const getGridClass = () => {
    if (layout === 'list') return 'grid-cols-1';
    if (layout === 'compact') return 'grid-cols-4 md:grid-cols-6';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  };

  return (
    <div className={`grid ${getGridClass()} gap-4`}>
      {cameras.map((camera) => (
        <CameraTile 
          key={camera.id} 
          camera={camera}
          onClick={onCameraSelect}
        />
      ))}
    </div>
  );
};

export default CameraGrid;
