import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { MapPin, TrendingDown, TrendingUp, Users, Download, FileText } from 'lucide-react';

export function PolicymakerDashboard() {
  const regionalData = [
    { region: 'Mehsana', farmers: 2450, avgYield: 85, healthScore: 78, alerts: 45 },
    { region: 'Anand', farmers: 1890, avgYield: 92, healthScore: 85, alerts: 23 },
    { region: 'Vadodara', farmers: 3200, avgYield: 88, healthScore: 82, alerts: 67 },
    { region: 'Surat', farmers: 2100, avgYield: 75, healthScore: 70, alerts: 89 },
    { region: 'Rajkot', farmers: 2800, avgYield: 90, healthScore: 87, alerts: 34 }
  ];

  const cropDistribution = [
    { name: 'Cotton', value: 35, color: '#22c55e' },
    { name: 'Wheat', value: 28, color: '#f59e0b' },
    { name: 'Rice', value: 20, color: '#3b82f6' },
    { name: 'Corn', value: 12, color: '#8b5cf6' },
    { name: 'Others', value: 5, color: '#ef4444' }
  ];

  const yieldTrends = [
    { year: '2020', cotton: 78, wheat: 82, rice: 75, corn: 85 },
    { year: '2021', cotton: 82, wheat: 85, rice: 78, corn: 88 },
    { year: '2022', cotton: 85, wheat: 88, rice: 80, corn: 90 },
    { year: '2023', cotton: 88, wheat: 90, rice: 83, corn: 92 },
    { year: '2024', cotton: 90, wheat: 92, rice: 85, corn: 94 }
  ];

  const interventionImpact = [
    { month: 'Jan', beforeIntervention: 65, afterIntervention: 75 },
    { month: 'Feb', beforeIntervention: 68, afterIntervention: 78 },
    { month: 'Mar', beforeIntervention: 70, afterIntervention: 82 },
    { month: 'Apr', beforeIntervention: 72, afterIntervention: 85 },
    { month: 'May', beforeIntervention: 74, afterIntervention: 87 },
    { month: 'Jun', beforeIntervention: 76, afterIntervention: 89 }
  ];

  const riskAreas = [
    { district: 'North Gujarat', risk: 'Water Shortage', severity: 'High', affected: 2500, trend: 'increasing' },
    { district: 'Central Gujarat', risk: 'Pest Outbreak', severity: 'Medium', affected: 1200, trend: 'stable' },
    { district: 'South Gujarat', risk: 'Soil Degradation', severity: 'Low', affected: 800, trend: 'decreasing' },
    { district: 'Saurashtra', risk: 'Climate Stress', severity: 'Medium', affected: 1800, trend: 'increasing' }
  ];

  const totalFarmers = regionalData.reduce((acc, region) => acc + region.farmers, 0);
  const avgYield = regionalData.reduce((acc, region) => acc + region.avgYield, 0) / regionalData.length;
  const totalAlerts = regionalData.reduce((acc, region) => acc + region.alerts, 0);
  const avgHealthScore = regionalData.reduce((acc, region) => acc + region.healthScore, 0) / regionalData.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl">Gujarat Agriculture Policy Dashboard</h1>
            <p className="text-muted-foreground">Agricultural Department - Government of Gujarat</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* State Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Registered Farmers</p>
                  <p className="text-2xl">{(totalFarmers / 1000).toFixed(1)}K</p>
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
                  <p className="text-sm text-muted-foreground">Avg Yield Efficiency</p>
                  <p className="text-2xl">{Math.round(avgYield)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Risk Areas</p>
                  <p className="text-2xl">{totalAlerts}</p>
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
                  <p className="text-sm text-muted-foreground">State Health Score</p>
                  <p className="text-2xl">{Math.round(avgHealthScore)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="regional" className="w-full">
          <TabsList>
            <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
            <TabsTrigger value="crops">Crop Distribution</TabsTrigger>
            <TabsTrigger value="trends">Yield Trends</TabsTrigger>
            <TabsTrigger value="interventions">Policy Impact</TabsTrigger>
            <TabsTrigger value="risks">Risk Management</TabsTrigger>
          </TabsList>

          <TabsContent value="regional" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>District-wise Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionalData.map((region) => (
                    <div key={region.region} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{region.region} District</h3>
                          <p className="text-sm text-muted-foreground">{region.farmers.toLocaleString()} registered farmers</p>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <div className="text-center">
                            <p className="text-muted-foreground">Yield Efficiency</p>
                            <p className="font-medium">{region.avgYield}%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-muted-foreground">Health Score</p>
                            <p className="font-medium">{region.healthScore}%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-muted-foreground">Risk Alerts</p>
                            <Badge variant={region.alerts > 50 ? 'destructive' : 'default'}>
                              {region.alerts}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crops" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Crop Distribution Across Gujarat</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={cropDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {cropDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Crop Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cropDistribution.map((crop) => (
                      <div key={crop.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: crop.color }}
                          />
                          <span>{crop.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">{crop.value}%</span>
                          <p className="text-xs text-muted-foreground">of total cultivation</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>5-Year Yield Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={yieldTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cotton" stroke="#22c55e" strokeWidth={2} name="Cotton" />
                    <Line type="monotone" dataKey="wheat" stroke="#f59e0b" strokeWidth={2} name="Wheat" />
                    <Line type="monotone" dataKey="rice" stroke="#3b82f6" strokeWidth={2} name="Rice" />
                    <Line type="monotone" dataKey="corn" stroke="#8b5cf6" strokeWidth={2} name="Corn" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interventions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Advisory System Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={interventionImpact}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="beforeIntervention" stackId="1" stroke="#94a3b8" fill="#94a3b8" name="Before AI System" />
                    <Area type="monotone" dataKey="afterIntervention" stackId="2" stroke="#22c55e" fill="#22c55e" name="After AI System" />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Impact Summary:</strong> The AI-powered advisory system has resulted in an average 
                    15% improvement in crop health scores across participating districts since implementation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment by District</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskAreas.map((risk, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{risk.district}</h4>
                          <p className="text-sm text-muted-foreground">{risk.risk}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge 
                            variant={
                              risk.severity === 'High' ? 'destructive' : 
                              risk.severity === 'Medium' ? 'default' : 'secondary'
                            }
                          >
                            {risk.severity} Risk
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm font-medium">{risk.affected.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">farmers affected</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {risk.trend === 'increasing' ? (
                              <TrendingUp className="w-4 h-4 text-red-500" />
                            ) : risk.trend === 'decreasing' ? (
                              <TrendingDown className="w-4 h-4 text-green-500" />
                            ) : (
                              <div className="w-4 h-4" />
                            )}
                            <span className="text-xs capitalize">{risk.trend}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}