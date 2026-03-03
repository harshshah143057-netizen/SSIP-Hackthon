import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MapPin, Users, AlertTriangle, TrendingUp, Satellite, Activity } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AgronomistDashboard() {
  const [selectedFarm, setSelectedFarm] = useState('all');
  
  const ndviData = [
    { date: 'Jan', ndvi: 0.3, predicted: 0.32 },
    { date: 'Feb', ndvi: 0.4, predicted: 0.42 },
    { date: 'Mar', ndvi: 0.6, predicted: 0.58 },
    { date: 'Apr', ndvi: 0.8, predicted: 0.85 },
    { date: 'May', ndvi: 0.7, predicted: 0.75 },
    { date: 'Jun', ndvi: 0.5, predicted: 0.52 }
  ];

  const yieldPredictions = [
    { crop: 'Wheat', current: 85, predicted: 92, farmers: 45 },
    { crop: 'Cotton', current: 70, predicted: 78, farmers: 32 },
    { crop: 'Corn', current: 90, predicted: 88, farmers: 28 },
    { crop: 'Rice', current: 75, predicted: 82, farmers: 38 }
  ];

  const farms = [
    { 
      id: 'farm1', 
      name: 'Rajeshbhai Patel Farm', 
      location: 'Mehsana, Gujarat',
      area: '25 acres',
      health: 78,
      alerts: 3,
      lastUpdate: '2 hours ago',
      crops: ['Wheat', 'Cotton'],
      ndvi: 0.72
    },
    { 
      id: 'farm2', 
      name: 'Kishorbhai Shah Farm', 
      location: 'Anand, Gujarat',
      area: '18 acres',
      health: 85,
      alerts: 1,
      lastUpdate: '4 hours ago',
      crops: ['Cotton', 'Corn'],
      ndvi: 0.81
    },
    { 
      id: 'farm3', 
      name: 'Rameshbhai Modi Farm', 
      location: 'Vadodara, Gujarat',
      area: '32 acres',
      health: 65,
      alerts: 5,
      lastUpdate: '1 hour ago',
      crops: ['Rice', 'Wheat'],
      ndvi: 0.58
    }
  ];

  const totalFarmers = farms.length;
  const avgHealth = farms.reduce((acc, farm) => acc + farm.health, 0) / farms.length;
  const totalAlerts = farms.reduce((acc, farm) => acc + farm.alerts, 0);
  const totalArea = farms.reduce((acc, farm) => acc + parseInt(farm.area), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl">Agronomist Dashboard</h1>
            <p className="text-muted-foreground">Dr. Priya Sharma - Senior Agricultural Advisor</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Satellite className="w-4 h-4 mr-2" />
              Update Satellite Data
            </Button>
            <Button size="sm">
              <Activity className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Farmers</p>
                  <p className="text-2xl">{totalFarmers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Area</p>
                  <p className="text-2xl">{totalArea} acres</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl">{totalAlerts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Health Score</p>
                  <p className="text-2xl">{Math.round(avgHealth)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="farms" className="w-full">
          <TabsList>
            <TabsTrigger value="farms">Farm Management</TabsTrigger>
            <TabsTrigger value="analytics">Crop Analytics</TabsTrigger>
            <TabsTrigger value="predictions">Yield Predictions</TabsTrigger>
            <TabsTrigger value="satellite">Satellite Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="farms" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Farm Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {farms.map((farm) => (
                    <div key={farm.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium">{farm.name}</h3>
                          <p className="text-sm text-muted-foreground">{farm.location}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm">{farm.area}</span>
                            <div className="flex gap-1">
                              {farm.crops.map((crop) => (
                                <Badge key={crop} variant="outline" className="text-xs">
                                  {crop}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Health Score:</span>
                            <Progress value={farm.health} className="w-20" />
                            <span className="text-sm">{farm.health}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">NDVI:</span>
                            <Badge variant={farm.ndvi > 0.7 ? 'default' : 'secondary'}>
                              {farm.ndvi.toFixed(2)}
                            </Badge>
                          </div>
                          {farm.alerts > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {farm.alerts} alerts
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-muted-foreground">Last updated: {farm.lastUpdate}</span>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>NDVI Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={ndviData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ndvi" stroke="#22c55e" strokeWidth={2} name="Actual NDVI" />
                    <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeDasharray="5 5" strokeWidth={2} name="Predicted NDVI" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Yield Predictions by Crop</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={yieldPredictions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="crop" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="current" fill="#94a3b8" name="Current Yield %" />
                    <Bar dataKey="predicted" fill="#22c55e" name="Predicted Yield %" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {yieldPredictions.map((crop) => (
                    <div key={crop.crop} className="text-center p-4 border rounded-lg">
                      <h4 className="font-medium">{crop.crop}</h4>
                      <p className="text-sm text-muted-foreground">{crop.farmers} farmers</p>
                      <div className="mt-2">
                        <span className="text-lg text-green-600">
                          {crop.predicted > crop.current ? '+' : ''}
                          {crop.predicted - crop.current}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="satellite" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Satellite Imagery Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1754776403499-52e7acdd45a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBjcm9wJTIwbW9uaXRvcmluZ3xlbnwxfHx8fDE3NTkyMDc5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Satellite crop monitoring"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-lg">
                    <h4 className="font-medium">Latest Sentinel-2 Data</h4>
                    <p className="text-sm text-muted-foreground">Updated: 6 hours ago</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="font-medium">NDVI Range</h4>
                    <p className="text-lg text-green-600">0.65 - 0.85</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="font-medium">Stress Areas</h4>
                    <p className="text-lg text-orange-600">12%</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="font-medium">Water Stress</h4>
                    <p className="text-lg text-red-600">8 fields</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="font-medium">Healthy Areas</h4>
                    <p className="text-lg text-green-600">78%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}