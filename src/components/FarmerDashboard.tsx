import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Phone, MessageSquare, Droplets, Bug, Sun, CloudRain } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Alert {
  id: string;
  type: 'water' | 'pest' | 'weather';
  severity: 'low' | 'medium' | 'high';
  message: string;
  gujaratiMessage: string;
  timestamp: string;
}

export function FarmerDashboard() {
  const [language, setLanguage] = useState<'english' | 'gujarati'>('gujarati');
  
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'water',
      severity: 'high',
      message: 'Water stress detected in Field A. Immediate irrigation recommended.',
      gujaratiMessage: 'ખેતર A માં પાણીની તંગી જોવા મળી છે. તુરંત સિંચાઈ કરવાની સલાહ.',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'pest',
      severity: 'medium',
      message: 'Pest activity increasing in Field B. Monitor closely.',
      gujaratiMessage: 'ખેતર B માં જીવાતોની ગતિવિધિ વધી રહી છે. નજીકથી નિરીક્ષણ કરો.',
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      type: 'weather',
      severity: 'low',
      message: 'Rain expected in 3 days. Plan harvesting accordingly.',
      gujaratiMessage: '3 દિવસમાં વરસાદની અપેક્ષા. તે મુજબ કાપણીનું આયોજન કરો.',
      timestamp: '1 day ago'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'water': return <Droplets className="w-4 h-4" />;
      case 'pest': return <Bug className="w-4 h-4" />;
      case 'weather': return <CloudRain className="w-4 h-4" />;
      default: return <Sun className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const fieldData = [
    { name: language === 'gujarati' ? 'ખેતર A' : 'Field A', health: 75, crop: language === 'gujarati' ? 'ઘઉં' : 'Wheat', status: language === 'gujarati' ? 'સારું' : 'Good' },
    { name: language === 'gujarati' ? 'ખેતર B' : 'Field B', health: 60, crop: language === 'gujarati' ? 'કપાસ' : 'Cotton', status: language === 'gujarati' ? 'મધ્યમ' : 'Fair' },
    { name: language === 'gujarati' ? 'ખેતર C' : 'Field C', health: 85, crop: language === 'gujarati' ? 'મકાઈ' : 'Corn', status: language === 'gujarati' ? 'ઉત્તમ' : 'Excellent' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl">
              {language === 'gujarati' ? 'ખેડૂત ડેશબોર્ડ' : 'Farmer Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'gujarati' ? 'રાજેશભાઈ પટેલ' : 'Rajeshbhai Patel'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={language === 'gujarati' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('gujarati')}
            >
              ગુજરાતી
            </Button>
            <Button
              variant={language === 'english' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('english')}
            >
              English
            </Button>
          </div>
        </div>

        {/* Farm Overview */}
        <div className="relative h-48 rounded-lg overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1716248899980-cd202c37a0f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhZ3JpY3VsdHVyZSUyMGZhcm0lMjBmaWVsZHxlbnwxfHx8fDE3NTkyMDc5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Farm overview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-xl mb-2">
                {language === 'gujarati' ? 'તમારા ખેતરો' : 'Your Fields'}
              </h2>
              <p>
                {language === 'gujarati' ? '3 ખેતરો • કુલ 25 એકર' : '3 Fields • Total 25 Acres'}
              </p>
            </div>
          </div>
        </div>

        {/* Current Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              {language === 'gujarati' ? 'તાત્કાલિક ચેતવણીઓ' : 'Current Alerts'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert) => (
              <Alert key={alert.id} className="border-l-4 border-l-orange-500">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <AlertDescription>
                        {language === 'gujarati' ? alert.gujaratiMessage : alert.message}
                      </AlertDescription>
                      <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getSeverityColor(alert.severity)}>
                      {language === 'gujarati' 
                        ? (alert.severity === 'high' ? 'ગંભીર' : alert.severity === 'medium' ? 'મધ્યમ' : 'નાની')
                        : alert.severity
                      }
                    </Badge>
                  </div>
                </div>
              </Alert>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'gujarati' ? 'ઝડપી ક્રિયાઓ' : 'Quick Actions'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex flex-col gap-2">
                <Phone className="w-6 h-6" />
                {language === 'gujarati' ? 'સલાહકારને કૉલ કરો' : 'Call Advisor'}
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <MessageSquare className="w-6 h-6" />
                {language === 'gujarati' ? 'પ્રતિસાદ મોકલો' : 'Send Feedback'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Field Status */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'gujarati' ? 'ખેતરોની સ્થિતિ' : 'Field Status'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fieldData.map((field, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{field.name}</h3>
                    <p className="text-sm text-muted-foreground">{field.crop}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${field.health}%` }}
                        />
                      </div>
                      <span className="text-sm">{field.health}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{field.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}