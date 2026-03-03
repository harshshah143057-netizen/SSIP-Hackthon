import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, Wind, Sun, Wifi, WifiOff, Battery, AlertTriangle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SensorReading {
  timestamp: string;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  lightLevel: number;
}

interface Sensor {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  batteryLevel: number;
  lastUpdate: string;
  currentReadings: {
    soilMoisture: number;
    temperature: number;
    humidity: number;
    lightLevel: number;
  };
}

export function IoTDashboard() {
  const [sensors, setSensors] = useState<Sensor[]>([
    {
      id: 'IOT001',
      name: 'Field A Sensor',
      location: 'North Corner',
      status: 'online',
      batteryLevel: 85,
      lastUpdate: '2 minutes ago',
      currentReadings: {
        soilMoisture: 45,
        temperature: 28,
        humidity: 65,
        lightLevel: 78
      }
    },
    {
      id: 'IOT002',
      name: 'Field B Sensor',
      location: 'Center Plot',
      status: 'online',
      batteryLevel: 72,
      lastUpdate: '5 minutes ago',
      currentReadings: {
        soilMoisture: 32,
        temperature: 30,
        humidity: 58,
        lightLevel: 82
      }
    },
    {
      id: 'IOT003',
      name: 'Field C Sensor',
      location: 'South Corner',
      status: 'offline',
      batteryLevel: 15,
      lastUpdate: '2 hours ago',
      currentReadings: {
        soilMoisture: 0,
        temperature: 0,
        humidity: 0,
        lightLevel: 0
      }
    }
  ]);

  const [historicalData, setHistoricalData] = useState<SensorReading[]>([
    { timestamp: '6h ago', soilMoisture: 42, temperature: 25, humidity: 68, lightLevel: 45 },
    { timestamp: '5h ago', soilMoisture: 40, temperature: 26, humidity: 66, lightLevel: 55 },
    { timestamp: '4h ago', soilMoisture: 38, temperature: 27, humidity: 64, lightLevel: 65 },
    { timestamp: '3h ago', soilMoisture: 36, temperature: 28, humidity: 62, lightLevel: 75 },
    { timestamp: '2h ago', soilMoisture: 34, temperature: 29, humidity: 60, lightLevel: 80 },
    { timestamp: '1h ago', soilMoisture: 32, temperature: 30, humidity: 58, lightLevel: 82 }
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prevSensors => 
        prevSensors.map(sensor => {
          if (sensor.status === 'online') {
            return {
              ...sensor,
              currentReadings: {
                soilMoisture: Math.max(0, sensor.currentReadings.soilMoisture + (Math.random() - 0.5) * 2),
                temperature: Math.max(0, sensor.currentReadings.temperature + (Math.random() - 0.5) * 1),
                humidity: Math.max(0, Math.min(100, sensor.currentReadings.humidity + (Math.random() - 0.5) * 2)),
                lightLevel: Math.max(0, Math.min(100, sensor.currentReadings.lightLevel + (Math.random() - 0.5) * 3))
              },
              lastUpdate: 'Just now'
            };
          }
          return sensor;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSensorStatusColor = (status: string) => {
    return status === 'online' ? 'bg-green-500' : 'bg-red-500';
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'text-green-600';
    if (level > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSoilMoistureStatus = (moisture: number) => {
    if (moisture > 40) return { label: 'Optimal', color: 'text-green-600' };
    if (moisture > 25) return { label: 'Low', color: 'text-yellow-600' };
    return { label: 'Critical', color: 'text-red-600' };
  };

  const onlineSensors = sensors.filter(s => s.status === 'online').length;
  const offlineSensors = sensors.filter(s => s.status === 'offline').length;
  const criticalBattery = sensors.filter(s => s.batteryLevel < 20).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl">IoT Sensor Network</h1>
            <p className="text-muted-foreground">Real-time field monitoring system</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live Data
            </Badge>
          </div>
        </div>

        {/* Network Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Wifi className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Online Sensors</p>
                  <p className="text-2xl">{onlineSensors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <WifiOff className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Offline Sensors</p>
                  <p className="text-2xl">{offlineSensors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Battery className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Low Battery</p>
                  <p className="text-2xl">{criticalBattery}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sensor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sensors.map((sensor) => (
            <Card key={sensor.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{sensor.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{sensor.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getSensorStatusColor(sensor.status)}`} />
                    <span className="text-sm capitalize">{sensor.status}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Battery Level */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Battery className={`w-4 h-4 ${getBatteryColor(sensor.batteryLevel)}`} />
                    <span className="text-sm">Battery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={sensor.batteryLevel} className="w-16" />
                    <span className="text-sm">{sensor.batteryLevel}%</span>
                  </div>
                </div>

                {/* Sensor Readings */}
                {sensor.status === 'online' ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Soil Moisture</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{sensor.currentReadings.soilMoisture.toFixed(1)}%</span>
                        <p className={`text-xs ${getSoilMoistureStatus(sensor.currentReadings.soilMoisture).color}`}>
                          {getSoilMoistureStatus(sensor.currentReadings.soilMoisture).label}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-red-600" />
                        <span className="text-sm">Temperature</span>
                      </div>
                      <span className="font-medium">{sensor.currentReadings.temperature.toFixed(1)}°C</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wind className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">Humidity</span>
                      </div>
                      <span className="font-medium">{sensor.currentReadings.humidity.toFixed(1)}%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm">Light Level</span>
                      </div>
                      <span className="font-medium">{sensor.currentReadings.lightLevel.toFixed(1)}%</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    <WifiOff className="w-8 h-8 mx-auto mb-2" />
                    <p>Sensor Offline</p>
                  </div>
                )}

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">Last update: {sensor.lastUpdate}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Historical Data Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Soil Moisture Trends (Last 6 Hours)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="soilMoisture" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  name="Soil Moisture %" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Field Image with Sensor Locations */}
        <Card>
          <CardHeader>
            <CardTitle>Sensor Network Layout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1755719523098-227f4c486eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpb3QlMjBzZW5zb3JzJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzU5MTEwOTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="IoT sensors in agriculture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20">
                {/* Sensor location markers */}
                <div className="absolute top-4 left-4 bg-green-500 w-4 h-4 rounded-full animate-pulse" title="Field A Sensor - Online" />
                <div className="absolute top-1/2 left-1/2 bg-green-500 w-4 h-4 rounded-full animate-pulse" title="Field B Sensor - Online" />
                <div className="absolute bottom-4 right-4 bg-red-500 w-4 h-4 rounded-full" title="Field C Sensor - Offline" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}