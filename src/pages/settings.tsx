import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Settings as SettingsIcon, Bell, Mail, Phone, Save, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface ThresholdSettings {
  rainfall: number[];
  vibration: number[];
  displacement: number[];
  temperature: number[];
}

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  criticalOnly: boolean;
}

export function Settings() {
  const [thresholds, setThresholds] = useState<ThresholdSettings>({
    rainfall: [25],
    vibration: [5],
    displacement: [3],
    temperature: [30],
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    sms: false,
    push: true,
    criticalOnly: false,
  });

  const [emailAddress, setEmailAddress] = useState('admin@rockfall-system.com');
  const [phoneNumber, setPhoneNumber] = useState('+1 234 567 8900');

  const handleSave = () => {
    // In a real app, this would save to backend
    toast.success('Settings saved successfully');
  };

  const handleThresholdChange = (parameter: keyof ThresholdSettings, value: number[]) => {
    setThresholds(prev => ({
      ...prev,
      [parameter]: value
    }));
  };

  const handleNotificationChange = (setting: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">Configure alert thresholds and notifications</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Alert Thresholds */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Alert Thresholds
              </CardTitle>
              <CardDescription>
                Configure when alerts are triggered based on sensor readings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="rainfall-threshold">Rainfall Warning (mm/hour)</Label>
                <div className="px-3">
                  <Slider
                    id="rainfall-threshold"
                    min={0}
                    max={100}
                    step={5}
                    value={thresholds.rainfall}
                    onValueChange={(value) => handleThresholdChange('rainfall', value)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0</span>
                    <span className="font-medium">{thresholds.rainfall[0]} mm/h</span>
                    <span>100</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vibration-threshold">Ground Vibration (mg)</Label>
                <div className="px-3">
                  <Slider
                    id="vibration-threshold"
                    min={0}
                    max={20}
                    step={0.5}
                    value={thresholds.vibration}
                    onValueChange={(value) => handleThresholdChange('vibration', value)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0</span>
                    <span className="font-medium">{thresholds.vibration[0]} mg</span>
                    <span>20</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="displacement-threshold">Displacement Warning (mm)</Label>
                <div className="px-3">
                  <Slider
                    id="displacement-threshold"
                    min={0}
                    max={10}
                    step={0.1}
                    value={thresholds.displacement}
                    onValueChange={(value) => handleThresholdChange('displacement', value)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0</span>
                    <span className="font-medium">{thresholds.displacement[0]} mm</span>
                    <span>10</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperature-threshold">Temperature Alert (°C)</Label>
                <div className="px-3">
                  <Slider
                    id="temperature-threshold"
                    min={-10}
                    max={50}
                    step={1}
                    value={thresholds.temperature}
                    onValueChange={(value) => handleThresholdChange('temperature', value)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>-10</span>
                    <span className="font-medium">{thresholds.temperature[0]}°C</span>
                    <span>50</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>
                General system settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monitoring-interval">Data Collection Interval</Label>
                <Select defaultValue="5">
                  <SelectTrigger id="monitoring-interval">
                    <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 minute</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-retention">Data Retention Period</Label>
                <Select defaultValue="90">
                  <SelectTrigger id="data-retention">
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to receive alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive critical alerts via SMS
                    </p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Browser and mobile push notifications
                    </p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Critical Alerts Only</Label>
                    <p className="text-sm text-muted-foreground">
                      Only notify for critical severity alerts
                    </p>
                  </div>
                  <Switch
                    checked={notifications.criticalOnly}
                    onCheckedChange={(checked) => handleNotificationChange('criticalOnly', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Update your contact details for notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Backup</span>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">System Uptime</span>
                  <span className="text-sm text-muted-foreground">15 days, 4 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Sensors</span>
                  <span className="text-sm text-green-600">18/20 online</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}