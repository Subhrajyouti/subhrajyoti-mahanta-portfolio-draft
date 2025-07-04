
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Sun, Zap, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CalculationResults {
  systemSize: number;
  annualGeneration: number;
  monthlySavings: number;
  annualSavings: number;
  paybackPeriod: number;
  totalCost: number;
}

const SolarCalculator = () => {
  const [formData, setFormData] = useState({
    monthlyUnits: "",
    state: "",
    latLong: ""
  });
  
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep", "Puducherry", "Andaman and Nicobar Islands"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateSolar = async () => {
    setIsCalculating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const monthlyUnits = parseFloat(formData.monthlyUnits);
    
    if (!monthlyUnits || !formData.state || !formData.latLong) {
      setIsCalculating(false);
      return;
    }

    // Basic solar calculations based on monthly units
    const annualConsumption = monthlyUnits * 12;
    const systemSize = annualConsumption / 1200; // kW
    const annualGeneration = systemSize * 1200; // kWh per year
    const electricityRate = 0.12; // Default rate
    const annualSavings = annualGeneration * electricityRate;
    const monthlySavings = annualSavings / 12;
    const totalCost = systemSize * 3000; // $3000 per kW
    const paybackPeriod = totalCost / annualSavings;

    const calculationResults: CalculationResults = {
      systemSize: Math.round(systemSize * 100) / 100,
      annualGeneration: Math.round(annualGeneration),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      totalCost: Math.round(totalCost)
    };

    setResults(calculationResults);
    setIsCalculating(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Solar <span className="text-gradient">Calculator</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculate your solar potential and savings with our advanced solar calculator
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Solar Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="monthlyUnits">Monthly Units (kWh)</Label>
                <Input
                  id="monthlyUnits"
                  type="number"
                  placeholder="Enter your monthly electricity units"
                  value={formData.monthlyUnits}
                  onChange={(e) => handleInputChange("monthlyUnits", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="latLong">Latitude, Longitude</Label>
                <Input
                  id="latLong"
                  type="text"
                  placeholder="26.44,91.41"
                  value={formData.latLong}
                  onChange={(e) => handleInputChange("latLong", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Enter coordinates in format: latitude,longitude
                </p>
              </div>

              <Button 
                onClick={calculateSolar}
                disabled={isCalculating || !formData.monthlyUnits || !formData.state || !formData.latLong}
                className="w-full"
              >
                {isCalculating ? "Calculating..." : "Calculate Solar Potential"}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                Your Solar Potential
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!results ? (
                <div className="text-center py-12">
                  <Sun className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Enter your details to see your solar potential
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">System Size</span>
                      </div>
                      <p className="text-2xl font-bold">{results.systemSize} kW</p>
                    </div>

                    <div className="bg-green-500/10 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Sun className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Annual Generation</span>
                      </div>
                      <p className="text-2xl font-bold">{results.annualGeneration.toLocaleString()} kWh</p>
                    </div>

                    <div className="bg-blue-500/10 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Monthly Savings</span>
                      </div>
                      <p className="text-2xl font-bold">${results.monthlySavings}</p>
                    </div>

                    <div className="bg-orange-500/10 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium">Annual Savings</span>
                      </div>
                      <p className="text-2xl font-bold">${results.annualSavings.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Total System Cost:</span>
                      <span className="text-xl font-bold">${results.totalCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Payback Period:</span>
                      <span className="text-xl font-bold text-green-600">{results.paybackPeriod} years</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Get Detailed Quote
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>How Our Solar Calculator Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Energy Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    We analyze your energy consumption based on your monthly electricity units
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sun className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Location Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Calculate optimal system size based on your location and solar irradiance
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Savings Projection</h3>
                  <p className="text-sm text-muted-foreground">
                    Estimate your monthly and annual savings with solar energy
                  </p>
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
