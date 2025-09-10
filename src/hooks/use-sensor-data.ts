import { useState, useEffect } from 'react';

export interface SensorReading {
  id: string;
  location: string;
  parameter: string;
  value: number;
  unit: string;
  status: 'online' | 'offline' | 'warning';
  lastUpdated: Date;
}

export interface ForecastData {
  timestamp: Date;
  rainfall: number;
  riskProbability: number;
  vibration: number;
  temperature: number;
}

export interface AlertData {
  id: string;
  type: 'high_risk' | 'sensor_failure' | 'weather_warning';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  location: string;
  timestamp: Date;
  acknowledged: boolean;
}

// Mock data generator
const generateSensorData = (): SensorReading[] => {
  const locations = ['Site A', 'Site B', 'Site C', 'Site D'];
  const parameters = [
    { name: 'Displacement', unit: 'mm', range: [0, 5] },
    { name: 'Strain', unit: 'μm/m', range: [0, 100] },
    { name: 'Pore Pressure', unit: 'kPa', range: [0, 200] },
    { name: 'Rainfall', unit: 'mm', range: [0, 50] },
    { name: 'Temperature', unit: '°C', range: [-5, 35] },
  ];

  return locations.flatMap((location, locIndex) =>
    parameters.map((param, paramIndex) => ({
      id: `sensor-${locIndex}-${paramIndex}`,
      location,
      parameter: param.name,
      value: Math.random() * (param.range[1] - param.range[0]) + param.range[0],
      unit: param.unit,
      status: Math.random() > 0.1 ? 'online' : Math.random() > 0.5 ? 'warning' : 'offline' as const,
      lastUpdated: new Date(Date.now() - Math.random() * 3600000), // Random time in last hour
    }))
  );
};

const generateForecastData = (): ForecastData[] => {
  return Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - (23 - i) * 3600000), // Last 24 hours
    rainfall: Math.random() * 20,
    riskProbability: Math.random() * 100,
    vibration: Math.random() * 10,
    temperature: 15 + Math.random() * 20,
  }));
};

const generateAlerts = (): AlertData[] => {
  const alertTypes = [
    { type: 'high_risk', severity: 'critical', message: 'Critical rockfall risk detected at monitoring zone' },
    { type: 'sensor_failure', severity: 'high', message: 'Displacement sensor offline - immediate attention required' },
    { type: 'weather_warning', severity: 'medium', message: 'Heavy rainfall forecast - increased monitoring recommended' },
  ] as const;

  const locations = ['Site A', 'Site B', 'Site C', 'Site D'];

  return Array.from({ length: 12 }, (_, i) => {
    const alert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    return {
      id: `alert-${i}`,
      type: alert.type,
      severity: alert.severity,
      message: alert.message,
      location: locations[Math.floor(Math.random() * locations.length)],
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 7), // Last 7 days
      acknowledged: Math.random() > 0.6,
    };
  });
};

export function useSensorData() {
  const [sensorData, setSensorData] = useState<SensorReading[]>([]);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      setSensorData(generateSensorData());
      setForecastData(generateForecastData());
      setAlerts(generateAlerts());
      setLoading(false);
    };

    loadData();

    // Set up real-time updates
    const interval = setInterval(() => {
      setSensorData(generateSensorData());
      setForecastData(prev => [
        ...prev.slice(1),
        {
          timestamp: new Date(),
          rainfall: Math.random() * 20,
          riskProbability: Math.random() * 100,
          vibration: Math.random() * 10,
          temperature: 15 + Math.random() * 20,
        }
      ]);
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, acknowledged: true }
          : alert
      )
    );
  };

  return {
    sensorData,
    forecastData,
    alerts,
    loading,
    acknowledgeAlert,
  };
}