import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  Home, 
  Zap, 
  DollarSign, 
  TrendingUp, 
  Sun, 
  Leaf,
  ArrowLeft,
  RotateCcw
} from "lucide-react";
import { Link } from "react-router-dom";

const SolarCalculator = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [monthlyBill, setMonthlyBill] = useState<number>(200);
  const [roofArea, setRoofArea] = useState<number>(1000);
  const [location, setLocation] = useState<string>("");
  const [roofType, setRoofType] = useState<string>("");
  const [shadingLevel, setShadingLevel] = useState<string>("");
  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);

  const phases = [
    "Analyzing your location's solar potential...",
    "Calculating optimal panel configuration...",
    "Estimating energy production...",
    "Computing financial projections...",
    "Generating your personalized report..."
  ];

  const handleCalculate = async () => {
    setIsCalculating(true);
    setPhaseIndex(0);
    
    // Step through phases with 10 second intervals
    for (let i=0; i<phases.length-1; i++) {
      setPhaseIndex(i);
      await new Promise(res => setTimeout(res, 10));
    }
    
    // Start final phase
    setPhaseIndex(phases.length-1);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock calculation results
    const annualConsumption = monthlyBill * 12 * 10; // Rough estimate
    const systemSize = Math.round(annualConsumption / 1200); // kW
    const panelCount = Math.round(systemSize / 0.4); // Assuming 400W panels
    const installationCost = systemSize * 2500; // $2.5 per watt
    const annualSavings = monthlyBill * 12 * 0.9; // 90% offset
    const paybackPeriod = installationCost / annualSavings;
    const co2Reduction = systemSize * 1.5; // tons per year
    
    setResults({
      systemSize,
      panelCount,
      installationCost,
      annualSavings,
      monthlyProduction: Math.round(annualConsumption / 12),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      co2Reduction: Math.round(co2Reduction * 10) / 10,
      twentyYearSavings: Math.round(annualSavings * 20 - installationCost),
      roiPercentage: Math.round((annualSavings * 20 / installationCost) * 100)
    });
    
    setIsCalculating(false);
  };

  const resetCalculator = () => {
    setResults(null);
    setMonthlyBill(200);
    setRoofArea(1000);
    setLocation("");
    setRoofType("");
    setShadingLevel("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="text-center">
            <Sun className="h-16 w-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Solar Calculator
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get an instant estimate of your solar potential, savings, and environmental impact
            </p>
          </div>
        </div>

        {!results ? (
          // Input Form
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Solar Assessment
              </CardTitle>
              <CardDescription>
                Provide your details to get a personalized solar analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthly-bill">Monthly Electricity Bill ($)</Label>
                  <Input
                    id="monthly-bill"
                    type="number"
                    placeholder="200"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roof-area">Roof Area (sq ft)</Label>
                  <Input
                    id="roof-area"
                    type="number"
                    placeholder="1000"
                    value={roofArea}
                    onChange={(e) => setRoofArea(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location (City, State)</Label>
                <Input
                  id="location"
                  placeholder="e.g., Phoenix, AZ"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Roof Type</Label>
                  <Select value={roofType} onValueChange={setRoofType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select roof type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asphalt">Asphalt Shingles</SelectItem>
                      <SelectItem value="metal">Metal</SelectItem>
                      <SelectItem value="tile">Tile</SelectItem>
                      <SelectItem value="flat">Flat Roof</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Shading Level</Label>
                  <Select value={shadingLevel} onValueChange={setShadingLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shading" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Shading</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="heavy">Heavy Shading</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleCalculate} 
                className="w-full"
                disabled={!location || !roofType || !shadingLevel || isCalculating}
              >
                {isCalculating ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Calculating...
                  </div>
                ) : (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Solar Potential
                  </>
                )}
              </Button>

              {isCalculating && (
                <div className="space-y-3">
                  <Progress value={(phaseIndex + 1) / phases.length * 100} className="w-full" />
                  <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    {phases[phaseIndex]}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          // Results Display
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Size</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{results.systemSize} kW</div>
                  <p className="text-xs text-muted-foreground">
                    {results.panelCount} solar panels
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Installation Cost</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${results.installationCost.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Before tax credits
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Annual Savings</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${results.annualSavings.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Per year
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Payback Period:</span>
                    <Badge variant="secondary">{results.paybackPeriod} years</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>20-Year Savings:</span>
                    <span className="font-semibold text-green-600">
                      ${results.twentyYearSavings.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Return on Investment:</span>
                    <span className="font-semibold text-green-600">
                      {results.roiPercentage}%
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Monthly Production:</span>
                    <span>{results.monthlyProduction.toLocaleString()} kWh</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-500" />
                    Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {results.co2Reduction} tons
                    </div>
                    <p className="text-sm text-muted-foreground">
                      CO₂ reduced annually
                    </p>
                  </div>
                  <Separator />
                  <div className="text-sm text-muted-foreground text-center">
                    Equivalent to planting {Math.round(results.co2Reduction * 16)} trees every year
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button onClick={resetCalculator} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Calculate Again
              </Button>
              <Button>
                Get Detailed Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolarCalculator;
