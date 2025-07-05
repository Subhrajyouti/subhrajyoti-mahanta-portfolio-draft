import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Calculator, Sun, Zap, DollarSign, Calendar, Cloud, Trees } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface ApiResponse {
  recommended_kw: number;
  yield_per_kwp: number;
  total_yield_kwh_year1: number;
  total_cost: number;
  state_subsidy: number;
  central_subsidy: number;
  net_cost: number;
  npv: number;
  irr_percent: number;
  payback_period_years: number;
  lifetime_savings: number;
  co2_avoided_kg: number;
  trees_saved_equivalent: number;
}

interface CalculationResult {
  recommendedKw: number;
  yieldPerKwp: number;
  year1Yield: number;
  totalCost: number;
  stateSubsidy: number;
  centralSubsidy: number;
  netCost: number;
  npv: number;
  irrPercent: number;
  paybackYears: number;
  lifetimeSavings: number;
  co2Kg: number;
  treesSaved: number;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Puducherry', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Andaman and Nicobar Islands'
];

const LoadingPhase = ({ phase, message, icon: Icon, isActive, isCompleted }: {
  phase: number;
  message: string;
  icon: React.ElementType;
  isActive: boolean;
  isCompleted: boolean;
}) => {
  if (!isActive && !isCompleted) return null;
  
  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-500 animate-fade-in ${
      isActive ? 'bg-primary/10 border border-primary/20' : isCompleted ? 'bg-green-50 border border-green-200' : 'bg-muted/30'
    }`}>
      <div className={`p-2 rounded-full transition-all duration-300 ${
        isActive ? 'bg-primary text-primary-foreground' : isCompleted ? 'bg-green-500 text-white' : 'bg-muted'
      }`}>
        {isActive ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Icon className="h-5 w-5" />
        )}
      </div>
      <span className={`font-medium transition-colors ${
        isActive ? 'text-primary' : isCompleted ? 'text-green-700' : 'text-muted-foreground'
      }`}>
        {message}
      </span>
    </div>
  );
};

const AnimatedCounter = ({ value, suffix = '', prefix = '' }: {
  value: number;
  suffix?: string;
  prefix?: string;
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  React.useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-bold text-2xl">
      {prefix}{displayValue.toLocaleString('en-IN')}{suffix}
    </span>
  );
};

const SolarCalculator = () => {
  const [formData, setFormData] = useState({
    state: '',
    monthly_units: '',
    latlong: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const loadingPhases = [
    { message: "🌥️ Analyzing solar data for your location...", icon: Cloud },
    { message: "☀️ Calculating solar potential at your location...", icon: Sun },
    { message: "📊 Creating detailed financial modeling for your usage...", icon: DollarSign },
    { message: "✅ Preparing your personalized solar report...", icon: Calculator }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.state) {
      newErrors.state = 'Please select a state';
    }

    if (!formData.monthly_units) {
      newErrors.monthly_units = 'Please enter monthly electricity units';
    } else {
      const units = parseFloat(formData.monthly_units);
      if (isNaN(units) || units <= 0) {
        newErrors.monthly_units = 'Please enter a valid number greater than 0';
      }
    }

    if (!formData.latlong) {
      newErrors.latlong = 'Please enter latitude and longitude';
    } else {
      const latlongPattern = /^-?\d+\.?\d*,-?\d+\.?\d*$/;
      if (!latlongPattern.test(formData.latlong)) {
        newErrors.latlong = 'Please enter coordinates in format: latitude,longitude (e.g., 26.44,91.41)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

<<<<<<< HEAD
  const validateApiResponse = (data: any): data is ApiResponse => {
  const requiredFields = [
    'recommended_kw',
    'yield_per_kwp',
    'total_yield_kwh_year1',
    'total_cost',
    'state_subsidy',
    'central_subsidy',
   'net_cost',
    'npv',
    'irr_percent',
    'payback_period_years',
    'lifetime_savings',
    'co2_avoided_kg',
    'trees_saved_equivalent',
  ];

    for (const field of requiredFields) {
      if (!(field in data) || typeof data[field] !== 'number') {
        console.error(`Missing or invalid field: ${field}`, data);
        return false;
      }
    }
    return true;
  };

  const transformApiResponse = (apiData: ApiResponse): CalculationResult => {
  // derive monthly/annual savings from the 25-yr lifetime total
  const annualSavings = apiData.lifetime_savings / 25;  const monthlySavings = annualSavings / 12;

  return {
    recommended_system_size_kw: apiData.recommended_kw,
    annual_energy_generation_kwh: apiData.total_yield_kwh_year1,
    system_cost_rs: apiData.total_cost,
    subsidy_amount_rs: apiData.state_subsidy + apiData.central_subsidy,
    net_system_cost_rs: apiData.net_cost,
    monthly_savings_rs: monthlySavings,
    annual_savings_rs: annualSavings,
    payback_period_years: apiData.payback_period_years,
    lifetime_savings_25_years_rs: apiData.lifetime_savings,
    irr_percent: apiData.irr_percent,
  };
};

=======
  const simulateLoadingPhases = async () => {
    setCompletedPhases([]);
    for (let i = 0; i < loadingPhases.length; i++) {
      setLoadingPhase(i);
      await new Promise(resolve => setTimeout(resolve, 8000));
      setCompletedPhases(prev => [...prev, i]);
    }
  };

>>>>>>> 229ba078b69d1379e225418f6e8a0e756131e77e
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setResult(null);
    setShowResults(false);
    setLoadingPhase(0);

    try {
<<<<<<< HEAD
      console.log('Making API call to sunlytics.onrender.com');
=======
      // Start loading animation
      const loadingPromise = simulateLoadingPhases();
      
>>>>>>> 229ba078b69d1379e225418f6e8a0e756131e77e
      const response = await fetch('https://sunlytics.onrender.com/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          state: formData.state,
          monthly_units: parseFloat(formData.monthly_units),
          latlong: formData.latlong
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
<<<<<<< HEAD
      console.log('API response received:', data);

      if (!validateApiResponse(data)) {
        throw new Error('Invalid API response structure');
      }

      const transformedResult = transformApiResponse(data);
      setResult(transformedResult);
=======
      
      // Wait for loading animation to complete
      await loadingPromise;
      
      setResult(data);
      setTimeout(() => setShowResults(true), 500);
      
>>>>>>> 229ba078b69d1379e225418f6e8a0e756131e77e
      toast({
        title: "Calculation Complete",
        description: "Your solar potential has been calculated successfully!",
      });
    } catch (error) {
      console.error('API call failed:', error);
      toast({
        title: "Calculation Failed",
        description: "Unable to calculate solar potential. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number, decimals: number = 1) => {
    return num.toFixed(decimals);
  };

  // Calculate environmental metrics
  const calculateEnvironmentalMetrics = (result: CalculationResult) => {
    const annualGeneration = result.recommended_kw * result.yield_per_kwp;
    const co2Avoided = Math.round(annualGeneration * 0.82); // kg CO2 per kWh
    const treesEquivalent = Math.round(co2Avoided / 22); // 22kg CO2 per tree per year
    return { co2Avoided, treesEquivalent };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Image Section */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <img 
          src="/solar.jpg" 
          alt="Solar panels against blue sky" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Sunlytics</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
              Discover your solar potential with our advanced calculator
            </p>
          </div>
        </div>
      </div>
      
      <div className="container max-w-6xl mx-auto px-4 py-16">
        {!loading && !result && (
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-card/80">
              <CardHeader className="text-center pb-6">
                <CardTitle className="flex items-center justify-center gap-3 text-xl">
                  <Calculator className="h-5 w-5 text-primary" />
                  Solar Calculation Form
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Enter your details to get started with your solar journey
                </p>
              </CardHeader>
<<<<<<< HEAD
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                    <span className="font-medium">Recommended System Size</span>
                    <span className="text-lg font-bold text-primary">
                      {formatNumber(result.recommended_system_size_kw)} kW
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Annual Energy Generation</span>
                    <span className="text-lg font-semibold">
                      {formatNumber(result.annual_energy_generation_kwh)} kWh
                    </span>
=======
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-medium">Select Your State *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger className="h-10 text-sm">
                        <SelectValue placeholder="Choose your state from the list" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {INDIAN_STATES.map(state => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.state && (
                      <p className="text-xs text-destructive flex items-center gap-2" role="alert">
                        {errors.state}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthly_units" className="text-sm font-medium">
                      Monthly Electricity Units (kWh) *
                    </Label>
                    <Input
                      id="monthly_units"
                      type="number"
                      step="0.1"
                      placeholder="Enter your average monthly consumption (e.g., 300)"
                      value={formData.monthly_units}
                      onChange={(e) => handleInputChange('monthly_units', e.target.value)}
                      className="h-10 text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      💡 Check your electricity bill for average monthly units consumed
                    </p>
                    {errors.monthly_units && (
                      <p className="text-xs text-destructive flex items-center gap-2" role="alert">
                        {errors.monthly_units}
                      </p>
                    )}
>>>>>>> 229ba078b69d1379e225418f6e8a0e756131e77e
                  </div>

<<<<<<< HEAD
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Cost Analysis
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total System Cost:</span>
                      <span className="font-medium">{formatCurrency(result.system_cost_rs)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subsidy Amount:</span>
                      <span className="font-medium text-green-600">
                        -{formatCurrency(result.subsidy_amount_rs)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-medium">Net Cost:</span>
                      <span className="font-bold">{formatCurrency(result.net_system_cost_rs)}</span>
                    </div>
=======
                  <div className="space-y-2">
                    <Label htmlFor="latlong" className="text-sm font-medium">
                      Location Coordinates *
                    </Label>
                    <Input
                      id="latlong"
                      type="text"
                      placeholder="Enter as latitude,longitude (e.g., 26.44,91.41)"
                      value={formData.latlong}
                      onChange={(e) => handleInputChange('latlong', e.target.value)}
                      className="h-10 text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      🗺️ You can find these coordinates on Google Maps by right-clicking your location
                    </p>
                    {errors.latlong && (
                      <p className="text-xs text-destructive flex items-center gap-2" role="alert">
                        {errors.latlong}
                      </p>
                    )}
>>>>>>> 229ba078b69d1379e225418f6e8a0e756131e77e
                  </div>

<<<<<<< HEAD
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Savings & Returns
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Monthly Savings:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(result.monthly_savings_rs)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual Savings:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(result.annual_savings_rs)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lifetime Savings (25 years):</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(result.lifetime_savings_25_years_rs)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span>Payback Period:</span>
                      <span className="font-medium">
                        {formatNumber(result.payback_period_years)} years
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Internal Rate of Return:</span>
                      <span className="font-medium">
                        {formatNumber(result.irr_percent)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <strong>Great Investment!</strong> With a payback period of {formatNumber(result.payback_period_years)} years 
                    and an IRR of {formatNumber(result.irr_percent)}%, solar is an excellent investment for your property.
                  </p>
                </div>
=======
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 transition-all duration-300 transform hover:scale-105"
                    disabled={loading}
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate My Solar Potential
                    <Sun className="ml-2 h-4 w-4" />
                  </Button>
                </form>
>>>>>>> 229ba078b69d1379e225418f6e8a0e756131e77e
              </CardContent>
            </Card>
          </div>
        )}

        {/* Loading Animation */}
        {loading && (
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Analyzing Your Solar Potential</CardTitle>
                <p className="text-muted-foreground">Please wait while we process your data...</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="w-full bg-muted rounded-full h-3 mb-8">
                  <div 
                    className="bg-gradient-to-r from-primary to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${((completedPhases.length) / loadingPhases.length) * 100}%` }}
                  ></div>
                </div>
                
                {loadingPhases.map((phase, index) => (
                  <LoadingPhase
                    key={index}
                    phase={index}
                    message={phase.message}
                    icon={phase.icon}
                    isActive={index === loadingPhase}
                    isCompleted={completedPhases.includes(index)}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Dashboard */}
        {result && showResults && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Your Personalized Solar Report</h2>
              <p className="text-xl text-muted-foreground">
                Based on your location and energy consumption patterns
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Solar  Card */}
              <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full w-fit">
                    <Sun className="h-8 w-8 text-blue-600 animate-pulse" />
                  </div>
                  <CardTitle className="text-xl text-blue-700 dark:text-blue-300">
                    Solar Output & Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                  <div className="space-y-4">
                    <div className="p-4 bg-white/50 dark:bg-white/5 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Recommended System Size</p>
                      <AnimatedCounter value={result.recommended_kw} suffix=" kW" />
                    </div>
                    
                    <div className="p-4 bg-white/50 dark:bg-white/5 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Solar Yield per kWp/Year</p>
                      <AnimatedCounter value={result.yield_per_kwp} suffix=" kWh" />
                    </div>
                    
                    <div className="p-4 bg-white/50 dark:bg-white/5 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Annual Energy Generation</p>
                      <AnimatedCounter value={result.recommended_kw * result.yield_per_kwp} suffix=" kWh" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Metrics Card */}
              <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-full w-fit">
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-green-700 dark:text-green-300">
                    Financial Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-center p-3 bg-white/50 dark:bg-white/5 rounded-lg">
                      <p className="text-muted-foreground">Total Cost</p>
                      <p className="font-semibold">{formatCurrency(result.total_cost)}</p>
                    </div>
                    <div className="text-center p-3 bg-white/50 dark:bg-white/5 rounded-lg">
                      <p className="text-muted-foreground">Subsidy</p>
                      <p className="font-semibold text-green-600">-{formatCurrency(result.subsidy_amount)}</p>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Net Investment</p>
                    <AnimatedCounter value={result.net_cost} prefix="₹" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2">
                      <span className="text-sm">Monthly Savings:</span>
                      <span className="font-semibold text-green-600">{formatCurrency(result.monthly_savings)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2">
                      <span className="text-sm">Payback Period:</span>
                      <span className="font-semibold">{formatNumber(result.payback_period_years)} years</span>
                    </div>
                    <div className="flex justify-between items-center p-2">
                      <span className="text-sm">IRR:</span>
                      <span className="font-semibold">{formatNumber(result.irr_percentage)}%</span>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg">
                    <p className="text-sm mb-1">25-Year Lifetime Savings</p>
                    <AnimatedCounter value={result.lifetime_savings} prefix="₹" />
                  </div>
                </CardContent>
              </Card>

              {/* Environmental Impact Card */}
              <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full w-fit">
                    <Trees className="h-8 w-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl text-emerald-700 dark:text-emerald-300">
                    Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                  {(() => {
                    const { co2Avoided, treesEquivalent } = calculateEnvironmentalMetrics(result);
                    return (
                      <>
                        <div className="p-4 bg-white/50 dark:bg-white/5 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-2">Annual CO₂ Emissions Avoided</p>
                          <div className="flex items-center justify-center gap-2">
                            <AnimatedCounter value={co2Avoided} suffix=" kg" />
                          </div>
                          <p className="text-xs text-emerald-600 mt-1">Equivalent to removing a car from road for 6 months</p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-white/5 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-2">Trees Saved Equivalent</p>
                          <div className="flex items-center justify-center gap-2">
                            <Trees className="h-6 w-6 text-emerald-600" />
                            <AnimatedCounter value={treesEquivalent} suffix=" trees" />
                          </div>
                          <p className="text-xs text-emerald-600 mt-1">Your contribution to a greener planet</p>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg">
                          <p className="text-sm font-medium">🌍 Make a Difference</p>
                          <p className="text-xs mt-1">Join thousands of Indians reducing carbon footprint</p>
                        </div>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Ready to Go Solar?</h3>
                  <p className="text-muted-foreground mb-6">
                    Take the next step towards energy independence and start saving on your electricity bills today.
                  </p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <Button size="lg" className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90">
                      Schedule Free Consultation
                    </Button>
                    <Button variant="outline" size="lg">
                      Download Detailed Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Informational Section */}
        <div className="mt-20 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-muted/30 to-muted/10">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3">
                <Sun className="h-8 w-8 text-primary" />
                India's Solar Revolution: Powering Homes Sustainably
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                In recent years, residential solar power has rapidly grown in India, boosted by government incentives, 
                technological advancements, and increased environmental awareness. Installing rooftop solar panels can 
                significantly reduce electricity bills, contribute positively to the environment, and enhance energy independence. 
                Join the millions of Indians already benefiting from clean, renewable solar energy.
              </p>
              <div className="flex justify-center gap-8 mt-8 text-sm text-muted-foreground">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10GW+</div>
                  <div>Rooftop Solar Installed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">₹78,000</div>
                  <div>Average Subsidy Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5-7 Years</div>
                  <div>Typical Payback Period</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SolarCalculator;
