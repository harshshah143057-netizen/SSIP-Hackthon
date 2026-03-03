import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { ArrowLeft, Users, Microscope, MapPin, Cpu, Satellite, Bell, BarChart3 } from 'lucide-react';
import { FarmerDashboard } from './components/FarmerDashboard';
import { AgronomistDashboard } from './components/AgronomistDashboard';
import { PolicymakerDashboard } from './components/PolicymakerDashboard';
import { IoTDashboard } from './components/IoTDashboard';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

type UserRole = 'farmer' | 'agronomist' | 'policymaker' | 'iot' | null;

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>(null);

  const roles = [
    {
      id: 'farmer' as const,
      title: 'Farmer Portal',
      gujaratiTitle: 'ખેડૂત પોર્ટલ',
      description: 'Real-time crop alerts and recommendations in your local language',
      gujaratiDescription: 'તમારી સ્થાનિક ભાષામાં વાસ્તવિક સમયની પાક ચેતવણીઓ અને ભલામણો',
      icon: Users,
      color: 'bg-green-500',
      features: ['SMS Alerts in Gujarati', 'Voice Call Advisory', 'Field Health Monitoring', 'Weather Predictions']
    },
    {
      id: 'agronomist' as const,
      title: 'Agronomist Dashboard',
      gujaratiTitle: 'કૃષિ સલાહકાર ડેશબોર્ડ',
      description: 'Advanced analytics and farmer management tools',
      gujaratiDescription: 'અદ્યતન વિશ્લેષણ અને ખેડૂત વ્યવસ્થાપન સાધનો',
      icon: Microscope,
      color: 'bg-blue-500',
      features: ['NDVI Analysis', 'Yield Predictions', 'Multi-farm Management', 'Satellite Data Integration']
    },
    {
      id: 'policymaker' as const,
      title: 'Policy Dashboard',
      gujaratiTitle: 'નીતિ ડેશબોર્ડ',
      description: 'Regional insights and policy impact analysis',
      gujaratiDescription: 'પ્રાદેશિક આંતરદૃષ્ટિ અને નીતિ પ્રભાવ વિશ્લેષણ',
      icon: MapPin,
      color: 'bg-purple-500',
      features: ['State-wide Monitoring', 'Risk Assessment', 'Impact Analysis', 'Regional Reports']
    },
    {
      id: 'iot' as const,
      title: 'IoT Monitoring',
      gujaratiTitle: 'IoT મોનિટરિંગ',
      description: 'Live sensor data and field monitoring network',
      gujaratiDescription: 'લાઇવ સેન્સર ડેટા અને ફીલ્ડ મોનિટરિંગ નેટવર્ક',
      icon: Cpu,
      color: 'bg-orange-500',
      features: ['Real-time Sensors', 'Edge Processing', 'Network Status', 'Predictive Maintenance']
    }
  ];

  const renderDashboard = () => {
    switch (currentRole) {
      case 'farmer':
        return <FarmerDashboard />;
      case 'agronomist':
        return <AgronomistDashboard />;
      case 'policymaker':
        return <PolicymakerDashboard />;
      case 'iot':
        return <IoTDashboard />;
      default:
        return null;
    }
  };

  if (currentRole) {
    return (
      <div className="min-h-screen">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentRole(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">AI System Active</span>
            </div>
          </div>
        </div>
        {renderDashboard()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Satellite className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl">CropGuard AI</h1>
              <p className="text-sm text-muted-foreground">Smart Agriculture Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              System Online
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">
            AI-Powered Crop Health Monitoring
          </h2>
          <h3 className="text-2xl text-muted-foreground mb-6">
            AI-સંચાલિત પાક આરોગ્ય નિરીક્ષણ
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Advanced satellite imagery, IoT sensors, and machine learning combine to deliver 
            real-time crop insights, predictive alerts, and actionable recommendations to farmers 
            across Gujarat in their native language.
          </p>
          
          {/* Platform Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-2xl text-green-600 mb-2">12.5K+</div>
              <div className="text-sm text-muted-foreground">Active Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-blue-600 mb-2">85%</div>
              <div className="text-sm text-muted-foreground">Yield Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-purple-600 mb-2">156</div>
              <div className="text-sm text-muted-foreground">IoT Sensors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-orange-600 mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoring</div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-64 rounded-2xl overflow-hidden mb-12">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhZ3JpY3VsdHVyZSUyMHRlY2hub2xvZ3klMjBzbWFydCUyMGZhcm1pbmd8ZW58MXx8fHwxNzU5MjA4MTY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Smart farming technology"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h4 className="text-xl mb-2">Technology Stack</h4>
              <div className="flex gap-3">
                <Badge className="bg-white/20 text-white border-white/30">Satellite Data</Badge>
                <Badge className="bg-white/20 text-white border-white/30">IoT Sensors</Badge>
                <Badge className="bg-white/20 text-white border-white/30">AI/ML</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Edge Computing</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Role Selection */}
        <div>
          <h3 className="text-2xl mb-2 text-center">Choose Your Portal</h3>
          <p className="text-muted-foreground text-center mb-8">તમારું પોર્ટલ પસંદ કરો</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => {
              const IconComponent = role.icon;
              return (
                <Card
                  key={role.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
                  onClick={() => setCurrentRole(role.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${role.color} text-white group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{role.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mb-3">{role.gujaratiTitle}</p>
                        <p className="text-sm">{role.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{role.gujaratiDescription}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Key Features:</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {role.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            <div className="w-1 h-1 bg-green-500 rounded-full" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* System Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-4">
                <Bell className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium mb-2">Real-time Alerts</h4>
              <p className="text-sm text-muted-foreground">
                SMS and voice alerts in Gujarati for immediate action on crop stress, pest detection, and weather warnings.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-4">
                <Satellite className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">Satellite Monitoring</h4>
              <p className="text-sm text-muted-foreground">
                Sentinel-2 and Landsat imagery for NDVI analysis, crop health assessment, and yield predictions.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-medium mb-2">Predictive Analytics</h4>
              <p className="text-sm text-muted-foreground">
                AI-powered yield forecasting, pest outbreak prediction, and climate-adaptive recommendations.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-white/20 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            CropGuard AI Platform - Empowering Gujarat's Farmers with Technology
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            CropGuard AI પ્લેટફોર્મ - ટેક્નોલોજી સાથે ગુજરાતના ખેડૂતોને સશક્ત બનાવવું
          </p>
        </div>
      </footer>
    </div>
  );
}