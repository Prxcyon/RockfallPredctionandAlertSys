import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Map, Layers, Download, Info } from 'lucide-react';

// Place your new map image at public/risk-map.jpg (or change the URL below)
const MAP_IMAGE_URL = '/risk-map.jpg';

const riskZones = [
  { id: 'zone-1', name: 'Zone A', risk: 'low', position: { left: '55%', top: '28%' }, color: '#10B981' },
  { id: 'zone-2', name: 'Zone B', risk: 'medium', position: { left: '78%', top: '56%' }, color: '#F59E0B' },
  { id: 'zone-3', name: 'Zone C', risk: 'high', position: { left: '12%', top: '52%' }, color: '#EF4444' },
  { id: 'zone-4', name: 'Zone D', risk: 'low', position: { left: '82%', top: '82%' }, color: '#10B981' },
];

const mapLayers = [
  { id: 'satellite', name: 'Satellite View', active: true },
  { id: 'dem', name: 'Digital Elevation Model', active: false },
  { id: 'drone', name: 'Drone Imagery', active: false },
  { id: 'geological', name: 'Geological Survey', active: false },
];

export function RiskMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Risk Assessment Map</h1>
          <p className="text-muted-foreground">Interactive geological hazard zones</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by risk level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="high">High Risk Only</SelectItem>
              <SelectItem value="medium">Medium Risk Only</SelectItem>
              <SelectItem value="low">Low Risk Only</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Map Controls */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Map Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mapLayers.map((layer) => (
                <div key={layer.id} className="flex items-center justify-between">
                  <span className="text-sm">{layer.name}</span>
                  <input 
                    type="checkbox" 
                    defaultChecked={layer.active}
                    className="rounded border-border"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Zones Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {riskZones.map((zone) => (
                <div key={zone.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: zone.color }}
                    />
                    <span className="text-sm">{zone.name}</span>
                  </div>
                  <Badge 
                    variant={
                      zone.risk === 'high' ? 'destructive' : 
                      zone.risk === 'medium' ? 'secondary' : 
                      'outline'
                    }
                  >
                    {zone.risk}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Map Container */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                Geological Risk Assessment
              </CardTitle>
              <CardDescription>
                Interactive map showing vulnerable zones and monitoring stations
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {/* Map */}
              <div className="relative w-full rounded-lg overflow-hidden">
                {/* Keep a responsive height that allows page to scroll normally */}
                <div 
                  className="relative w-full aspect-[16/9] md:h-[70vh] md:aspect-auto"
                >
                  <img
                    src={MAP_IMAGE_URL}
                    alt="Geotechnical risk potential map"
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* Risk zone markers */}
                  {riskZones.map((zone) => (
                    <div
                      key={zone.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      style={{ left: zone.position.left, top: zone.position.top }}
                    >
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                        style={{ backgroundColor: zone.color }}
                      />
                      <div className="mt-1 text-xs font-medium text-center bg-white/90 dark:bg-black/60 text-foreground rounded px-2 py-1 shadow">
                        {zone.name}
                      </div>
                    </div>
                  ))}

                  {/* Map overlay info */}
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/60 rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Live Monitoring Active</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      4 zones • 16 sensors • Last updated 2 min ago
                    </p>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/60 rounded-lg p-3 shadow-lg">
                    <h4 className="text-sm font-medium mb-2">Risk Levels</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-xs">Low Risk</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="text-xs">Medium Risk</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-xs">High Risk</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}