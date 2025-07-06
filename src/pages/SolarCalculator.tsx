
import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Calculator, Zap, DollarSign, Calendar, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface SolarData {
  monthly_generation: number[];
  annual_generation: number;
  system_cost: number;
  annual_savings: number;
  payback_period: number;
  co2_reduction: number;
  roof_area_needed: number;
  num_panels: number;
}

interface ApiResponse {
  data: SolarData;
  message: string;
}

// Create a simple cache to store API responses
const apiCache = new Map<string, { data: ApiResponse; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const SolarCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SolarData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [location, setLocation] = useState('');
  const [monthlyBill, setMonthlyBill] = useState('');
  const [roofArea, setRoofArea] = useState('');
  const [systemSize, setSystemSize] = useState('');

  // Optimized API call function with caching and proper error handling
  const calculateSolar = useCallback(async () => {
    if (!location || !monthlyBill || !roofArea || !systemSize) {
      setError('Please fill in all fields');
      return;
    }

    // Create cache key
    const cacheKey = `${location}-${monthlyBill}-${roofArea}-${systemSize}`;
    
    // Check cache first
    const cached = apiCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('Using cached data');
      setData(cached.data.data);
      return;
    }

    setLoading(true);
    setError(null);
    
    const startTime = performance.now();
    console.log('Starting API call at:', new Date().toISOString());

    try {
      // Use AbortController for request timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout

      const response = await fetch('https://solar-calculator-s2jr.onrender.com/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          location: location.trim(),
          monthly_electricity_bill: parseFloat(monthlyBill),
          roof_area: parseFloat(roofArea),
          system_size: parseFloat(systemSize)
        })
      });

      clearTimeout(timeoutId);

      const endTime = performance.now();
      console.log(`API call completed in ${((endTime - startTime) / 1000).toFixed(2)} seconds`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();
      
      if (result.data) {
        setData(result.data);
        // Cache the successful response
        apiCache.set(cacheKey, { data: result, timestamp: Date.now() });
        console.log('Data received and cached successfully');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('API call failed:', err);
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Request timeout. Please try again.');
        } else {
          setError(err.message || 'Failed to calculate solar potential');
        }
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [location, monthlyBill, roofArea, systemSize]);

  // Memoized chart data to prevent unnecessary recalculations
  const chartData = useMemo(() => {
    if (!data?.monthly_generation) return [];
    
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    return data.monthly_generation.map((gen, index) => ({
      month: months[index],
      generation: Math.round(gen),
      savings: Math.round((gen / data.annual_generation) * data.annual_savings)
    }));
  }, [data]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    calculateSolar();
  }, [calculateSolar]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
            <Zap className="h-8 w-8 text-yellow-500" />
            Solar Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Calculate your solar potential and savings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Solar Analysis Input
              </CardTitle>
              <CardDescription>
                Enter your details to calculate solar potential
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., New York, NY"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="monthlyBill">Monthly Electricity Bill ($)</Label>
                  <Input
                    id="monthlyBill"
                    type="number"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(e.target.value)}
                    placeholder="e.g., 150"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="roofArea">Available Roof Area (sq ft)</Label>
                  <Input
                    id="roofArea"
                    type="number"
                    value={roofArea}
                    onChange={(e) => setRoofArea(e.target.value)}
                    placeholder="e.g., 1000"
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="systemSize">Desired System Size (kW)</Label>
                  <Input
                    id="systemSize"
                    type="number"
                    value={systemSize}
                    onChange={(e) => setSystemSize(e.target.value)}
                    placeholder="e.g., 8"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Calculating... (This may take up to 45 seconds)
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate Solar Potential
                    </>
                  )}
                </Button>

                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <p className="text-red-800 dark:text-red-200">{error}</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          {data && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Solar Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.round(data.annual_generation).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">kWh/year</p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">
                      ${Math.round(data.annual_savings).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Annual Savings</p>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-600">
                      {data.payback_period.toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Years Payback</p>
                  </div>
                  
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <span className="text-2xl">🌱</span>
                    <p className="text-2xl font-bold text-orange-600 mt-2">
                      {Math.round(data.co2_reduction).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">lbs CO₂ Reduced</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span>System Cost:</span>
                    <span className="font-semibold">${data.system_cost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of Panels:</span>
                    <span className="font-semibold">{data.num_panels}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Roof Area Needed:</span>
                    <span className="font-semibold">{Math.round(data.roof_area_needed)} sq ft</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Charts */}
        {data && chartData.length > 0 && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Monthly Generation</CardTitle>
                <CardDescription>Expected solar energy generation throughout the year</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="generation" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Generation (kWh)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Monthly Savings</CardTitle>
                <CardDescription>Expected monthly savings from solar energy</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="savings" 
                      fill="#10b981"
                      name="Savings ($)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolarCalculator;
