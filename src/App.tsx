import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Layout } from '@/components/layout/layout';
import { Dashboard } from '@/pages/dashboard';
import { RiskMap } from '@/pages/risk-map';
import { SensorData } from '@/pages/sensor-data';
import { Alerts } from '@/pages/alerts';
import { Settings } from '@/pages/settings';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="rockfall-ui-theme">
      <Router>
        <div className="min-h-screen w-full bg-background">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/risk-map" element={<RiskMap />} />
              <Route path="/sensor-data" element={<SensorData />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;