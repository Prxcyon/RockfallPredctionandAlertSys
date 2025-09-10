import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Radio, Search, Filter, Download, RefreshCw } from 'lucide-react';
import { useSensorData } from '@/hooks/use-sensor-data';

export function SensorData() {
  const { sensorData, loading } = useSensorData();
  const [searchTerm, setSearchTerm] = useState('');
  const [parameterFilter, setParameterFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const filteredData = sensorData.filter(sensor => {
    const matchesSearch = sensor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sensor.parameter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesParameter = parameterFilter === 'all' || sensor.parameter === parameterFilter;
    const matchesLocation = locationFilter === 'all' || sensor.location === locationFilter;
    
    return matchesSearch && matchesParameter && matchesLocation;
  });

  const uniqueParameters = [...new Set(sensorData.map(s => s.parameter))];
  const uniqueLocations = [...new Set(sensorData.map(s => s.location))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'outline';
      case 'warning': return 'secondary';
      case 'offline': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return '🟢';
      case 'warning': return '🟡';
      case 'offline': return '🔴';
      default: return '⚪';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Sensor Data</h1>
          <p className="text-muted-foreground">Real-time monitoring system status</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sensors</CardTitle>
            <Radio className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensorData.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online</CardTitle>
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {sensorData.filter(s => s.status === 'online').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warning</CardTitle>
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {sensorData.filter(s => s.status === 'warning').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offline</CardTitle>
            <div className="w-2 h-2 bg-red-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {sensorData.filter(s => s.status === 'offline').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sensors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={parameterFilter} onValueChange={setParameterFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Parameter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Parameters</SelectItem>
                {uniqueParameters.map(param => (
                  <SelectItem key={param} value={param}>{param}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setParameterFilter('all');
                setLocationFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Live Sensor Readings</CardTitle>
          <CardDescription>
            Real-time data from {filteredData.length} active sensors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sensor ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Parameter</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((sensor) => (
                <TableRow key={sensor.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-sm">{sensor.id}</TableCell>
                  <TableCell>{sensor.location}</TableCell>
                  <TableCell>{sensor.parameter}</TableCell>
                  <TableCell className="font-mono">
                    {sensor.value.toFixed(2)} {sensor.unit}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(sensor.status)} className="gap-1">
                      <span>{getStatusIcon(sensor.status)}</span>
                      {sensor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {sensor.lastUpdated.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No sensors match your current filters
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}