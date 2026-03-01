// Données simulées pour le développement

export const getCameras = () => {
  const zones = ['Quai A', 'Quai B', 'Atelier', 'Parking', 'Portique'];
  
  return Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: `Caméra ${String.fromCharCode(65 + Math.floor(i/6))}-${(i%6)+1}`,
    location: zones[Math.floor(Math.random() * zones.length)],
    type: Math.random() > 0.7 ? 'Thermique' : 'Standard',
    online: Math.random() > 0.1,
    temperature: Math.floor(40 + Math.random() * 50),
    zone: `Zone ${String.fromCharCode(65 + Math.floor(i/8))}`,
    subzone: `Sous-zone ${Math.floor(i/4) + 1}`,
    lastAlert: new Date(Date.now() - Math.random() * 86400000).toISOString()
  }));
};

export const getAlerts = () => {
  const severities = ['critical', 'warning', 'info'];
  const types = ['Température élevée', 'Moteur surchauffe', 'Capteur défectueux', 'Maintenance requise'];
  const cameras = getCameras().slice(0, 8);
  
  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    time: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString(),
    camera: cameras[i % cameras.length].name,
    cameraId: cameras[i % cameras.length].id,
    type: types[Math.floor(Math.random() * types.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    temperature: 50 + Math.floor(Math.random() * 40),
    acknowledged: Math.random() > 0.5,
    zone: cameras[i % cameras.length].zone,
    description: 'Seuil de température dépassé'
  })).sort((a, b) => new Date(b.time) - new Date(a.time));
};

export const getZones = () => {
  return [
    { 
      id: 1, 
      name: 'Zone A - Quai Est', 
      subzones: [
        { id: 101, name: 'Sous-zone A1', cameras: 4 },
        { id: 102, name: 'Sous-zone A2', cameras: 3 },
        { id: 103, name: 'Sous-zone A3', cameras: 2 }
      ]
    },
    { 
      id: 2, 
      name: 'Zone B - Quai Ouest', 
      subzones: [
        { id: 201, name: 'Sous-zone B1', cameras: 5 },
        { id: 202, name: 'Sous-zone B2', cameras: 4 },
        { id: 203, name: 'Sous-zone B3', cameras: 3 }
      ]
    },
    { 
      id: 3, 
      name: 'Zone C - Atelier', 
      subzones: [
        { id: 301, name: 'Sous-zone C1', cameras: 3 },
        { id: 302, name: 'Sous-zone C2', cameras: 2 },
        { id: 303, name: 'Sous-zone C3', cameras: 2 }
      ]
    }
  ];
};

export const getDashboardStats = () => {
  const cameras = getCameras();
  const alerts = getAlerts();
  
  // Générer des données d'historique de température sur 24h
  const temperatureHistory = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}h`,
    temperature: 45 + Math.floor(Math.random() * 35) // Entre 45 et 80°C
  }));
  
  return {
    totalCameras: cameras.length,
    onlineCameras: cameras.filter(c => c.online).length,
    offlineCameras: cameras.filter(c => !c.online).length,
    thermalCameras: cameras.filter(c => c.type === 'Thermique').length,
    activeAlerts: alerts.filter(a => !a.acknowledged).length,
    criticalAlerts: alerts.filter(a => a.severity === 'critical' && !a.acknowledged).length,
    warningAlerts: alerts.filter(a => a.severity === 'warning' && !a.acknowledged).length,
    avgTemperature: Math.round(cameras.reduce((acc, c) => acc + c.temperature, 0) / cameras.length),
    
    temperatureHistory: temperatureHistory,  // ← AJOUTÉ
    
    zoneStats: getZones().map(zone => ({
      name: zone.name,
      cameras: zone.subzones.reduce((acc, s) => acc + s.cameras, 0),
      alerts: Math.floor(Math.random() * 10)
    }))
  };
};

// DONNÉES HIÉRARCHIQUES COMPLÈTES
export const getFullHierarchy = () => {
  return [
    {
      id: 'zone-1',
      name: 'Zone A - Quai Est',
      type: 'zone',
      children: [
        {
          id: 'sszone-1-1',
          name: 'Sous-zone A1 - Portique',
          type: 'subzone',
          children: [
            {
              id: 'cam-1-1-1',
              name: 'Caméra A1-1 - Entrée',
              type: 'camera',
              online: true,
              temperature: 45,
              thermal: false
            },
            {
              id: 'cam-1-1-2',
              name: 'Caméra A1-2 - Moteurs',
              type: 'camera',
              online: true,
              temperature: 78,
              thermal: true
            },
            {
              id: 'sszone-1-1-1',
              name: 'Sous-sous-zone A1a',
              type: 'subzone',
              children: [
                {
                  id: 'cam-1-1-1-1',
                  name: 'Caméra A1a-1',
                  type: 'camera',
                  online: true,
                  temperature: 52,
                  thermal: false
                }
              ]
            }
          ]
        },
        {
          id: 'sszone-1-2',
          name: 'Sous-zone A2 - Atelier',
          type: 'subzone',
          children: [
            {
              id: 'cam-1-2-1',
              name: 'Caméra A2-1',
              type: 'camera',
              online: false,
              temperature: null,
              thermal: false
            },
            {
              id: 'cam-1-2-2',
              name: 'Caméra A2-2',
              type: 'camera',
              online: true,
              temperature: 63,
              thermal: true
            }
          ]
        }
      ]
    },
    {
      id: 'zone-2',
      name: 'Zone B - Quai Ouest',
      type: 'zone',
      children: [
        {
          id: 'sszone-2-1',
          name: 'Sous-zone B1 - Accueil',
          type: 'subzone',
          children: [
            {
              id: 'cam-2-1-1',
              name: 'Caméra B1-1',
              type: 'camera',
              online: true,
              temperature: 41,
              thermal: false
            },
            {
              id: 'cam-2-1-2',
              name: 'Caméra B1-2',
              type: 'camera',
              online: true,
              temperature: 55,
              thermal: false
            },
            {
              id: 'sszone-2-1-1',
              name: 'Sous-sous-zone B1a',
              type: 'subzone',
              children: [
                {
                  id: 'cam-2-1-1-1',
                  name: 'Caméra B1a-1',
                  type: 'camera',
                  online: true,
                  temperature: 82,
                  thermal: true
                }
              ]
            }
          ]
        },
        {
          id: 'sszone-2-2',
          name: 'Sous-zone B2 - Magasin',
          type: 'subzone',
          children: [
            {
              id: 'cam-2-2-1',
              name: 'Caméra B2-1',
              type: 'camera',
              online: true,
              temperature: 47,
              thermal: false
            }
          ]
        }
      ]
    },
    {
      id: 'zone-3',
      name: 'Zone C - Atelier Central',
      type: 'zone',
      children: [
        {
          id: 'sszone-3-1',
          name: 'Sous-zone C1 - Réparation',
          type: 'subzone',
          children: [
            {
              id: 'cam-3-1-1',
              name: 'Caméra C1-1',
              type: 'camera',
              online: true,
              temperature: 71,
              thermal: true
            }
          ]
        },
        {
          id: 'sszone-3-2',
          name: 'Sous-zone C2 - Stockage',
          type: 'subzone',
          children: [
            {
              id: 'cam-3-2-1',
              name: 'Caméra C2-1',
              type: 'camera',
              online: true,
              temperature: 38,
              thermal: false
            },
            {
              id: 'sszone-3-2-1',
              name: 'Sous-sous-zone C2a',
              type: 'subzone',
              children: [
                {
                  id: 'cam-3-2-1-1',
                  name: 'Caméra C2a-1',
                  type: 'camera',
                  online: true,
                  temperature: 59,
                  thermal: false
                }
              ]
            }
          ]
        }
      ]
    }
  ];
};

// Fonction pour récupérer toutes les caméras (pour recherche)
export const getAllCameras = () => {
  const cameras = [];
  const traverse = (node) => {
    if (node.type === 'camera') {
      cameras.push(node);
    } else if (node.children) {
      node.children.forEach(traverse);
    }
  };
  getFullHierarchy().forEach(traverse);
  return cameras;
};

// DONNÉES POUR PLAYBACK
export const getRecordings = () => {
  const cameras = getAllCameras().slice(0, 8);
  const now = new Date();
  
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - Math.floor(Math.random() * 7));
    date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0);
    
    const endDate = new Date(date);
    endDate.setMinutes(endDate.getMinutes() + 5 + Math.floor(Math.random() * 25));
    
    const camera = cameras[Math.floor(Math.random() * cameras.length)];
    
    return {
      id: `rec-${i + 1}`,
      cameraId: camera.id,
      cameraName: camera.name,
      zone: camera.zone || 'Zone principale',
      startTime: date.toISOString(),
      endTime: endDate.toISOString(),
      duration: Math.floor((endDate - date) / 1000 / 60), // en minutes
      hasThermal: camera.thermal || Math.random() > 0.7,
      fileSize: `${Math.floor(50 + Math.random() * 200)} MB`,
      tags: Math.random() > 0.5 ? ['Alerte température', 'Mouvement'] : [],
      thumbnail: null
    };
  }).sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
};

export const getTimelineEvents = (cameraId, date) => {
  // Simule des événements sur une timeline
  const events = [];
  const baseDate = date ? new Date(date) : new Date();
  baseDate.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < 24; i++) {
    if (Math.random() > 0.7) {
      const hour = i;
      const minute = Math.floor(Math.random() * 60);
      const eventDate = new Date(baseDate);
      eventDate.setHours(hour, minute, 0);
      
      events.push({
        id: `event-${i}`,
        time: eventDate.toISOString(),
        type: Math.random() > 0.5 ? 'alerte' : 'mouvement',
        severity: Math.random() > 0.7 ? 'critical' : 'warning',
        description: Math.random() > 0.5 ? 'Température élevée' : 'Mouvement détecté'
      });
    }
  }
  
  return events.sort((a, b) => new Date(a.time) - new Date(b.time));
};