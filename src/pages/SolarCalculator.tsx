import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Calculator, Sun, Zap, DollarSign, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface CalculationResult {
  recommended_kw: number;
  yield_per_kwp: number;
  total_cost: number;
  subsidy_amount: number;
  net_cost: number;
  payback_period_years: number;
  irr_percentage: number;
  monthly_savings: number;
  annual_savings: number;
  lifetime_savings: number;
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

// Fallback calculation function
const calculateSolarPotential = (monthlyUnits: number, state: string, latlong: string): CalculationResult => {
  console.log('Using fallback calculation for:', { monthlyUnits, state, latlong });
  
  // Basic calculations based on typical solar parameters in India
  const averageTariff = 7; // Rs per unit
  const systemEfficiency = 0.8;
  const solarIrradiance = 5.5; // kWh/m²/day average for India
  const systemCostPerKw = 60000; // Rs per kW
  const subsidyRate = 0.4; // 40% subsidy
  
  const annualUnits = monthlyUnits * 12;
  const recommendedKw = Math.ceil((annualUnits) / (solarIrradiance * 365 * systemEfficiency));
  const yieldPerKwp = solarIrradiance * 365 * systemEfficiency;
  const totalCost = recommendedKw * systemCostPerKw;
  const subsidyAmount = totalCost * subsidyRate;
  const netCost = totalCost - subsidyAmount;
  const annualSavings = monthlyUnits * 12 * averageTariff;
  const monthlySavings = annualSavings / 12;
  const paybackPeriod = netCost / annualSavings;
  const lifetimeSavings = annualSavings * 25 - netCost;
  const irrPercentage = ((annualSavings * 25) / netCost - 1) / 25 * 100;

  return {
    recommended_kw: recommendedKw,
    yield_per_kwp: Math.round(yieldPerKwp),
    total_cost: totalCost,
    subsidy_amount: subsidyAmount,
    net_cost: netCost,
    payback_period_years: paybackPeriod,
    irr_percentage: irrPercentage,
    monthly_savings: monthlySavings,
    annual_savings: annualSavings,
    lifetime_savings: lifetimeSavings
  };
};

const SolarCalculator = () => {
  const [formData, setFormData] = useState({
    state: '',
    monthly_units: '',
    latlong: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      console.log('Attempting API call to sunlytics.onrender.com');
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
      console.log('API response received:', data);
      setResult(data);
      toast({
        title: "Calculation Complete",
        description: "Your solar potential has been calculated successfully!",
      });
    } catch (error) {
      console.error('API call failed, using fallback calculation:', error);
      
      // Use fallback calculation
      const fallbackResult = calculateSolarPotential(
        parseFloat(formData.monthly_units),
        formData.state,
        formData.latlong
      );
      
      setResult(fallbackResult);
      toast({
        title: "Calculation Complete",
        description: "Solar potential calculated using estimated parameters.",
        variant: "default",
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container max-w-4xl mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sun className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Solar Calculator</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate your solar potential, costs, and savings with our advanced solar calculator.
            Get personalized recommendations for your location and energy needs.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Solar Calculation Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map(state => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="text-sm text-destructive" role="alert" aria-live="polite">
                      {errors.state}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthly_units">Monthly Electricity Units (kWh) *</Label>
                  <Input
                    id="monthly_units"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 300"
                    value={formData.monthly_units}
                    onChange={(e) => handleInputChange('monthly_units', e.target.value)}
                    aria-describedby={errors.monthly_units ? "monthly_units_error" : undefined}
                  />
                  {errors.monthly_units && (
                    <p id="monthly_units_error" className="text-sm text-destructive" role="alert" aria-live="polite">
                      {errors.monthly_units}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="latlong">Location Coordinates *</Label>
                  <Input
                    id="latlong"
                    type="text"
                    placeholder="e.g., 26.44,91.41"
                    value={formData.latlong}
                    onChange={(e) => handleInputChange('latlong', e.target.value)}
                    aria-describedby={errors.latlong ? "latlong_error" : undefined}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter coordinates as latitude,longitude (you can find these on Google Maps)
                  </p>
                  {errors.latlong && (
                    <p id="latlong_error" className="text-sm text-destructive" role="alert" aria-live="polite">
                      {errors.latlong}
                    </p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                  aria-describedby="submit_help"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate Solar Potential
                    </>
                  )}
                </Button>
                <p id="submit_help" className="text-xs text-muted-foreground text-center">
                  This calculation typically takes a few seconds
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Your Solar Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                    <span className="font-medium">Recommended System Size</span>
                    <span className="text-lg font-bold text-primary">
                      {formatNumber(result.recommended_kw)} kW
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Annual Yield per kWp</span>
                    <span className="text-lg font-semibold">
                      {formatNumber(result.yield_per_kwp)} kWh
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Cost Analysis
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total System Cost:</span>
                      <span className="font-medium">{formatCurrency(result.total_cost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subsidy Amount:</span>
                      <span className="font-medium text-green-600">
                        -{formatCurrency(result.subsidy_amount)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-medium">Net Cost:</span>
                      <span className="font-bold">{formatCurrency(result.net_cost)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Savings & Returns
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Monthly Savings:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(result.monthly_savings)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual Savings:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(result.annual_savings)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lifetime Savings (25 years):</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(result.lifetime_savings)}
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
                        {formatNumber(result.irr_percentage)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <strong>Great Investment!</strong> With a payback period of {formatNumber(result.payback_period_years)} years 
                    and an IRR of {formatNumber(result.irr_percentage)}%, solar is an excellent investment for your property.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SolarCalculator;
