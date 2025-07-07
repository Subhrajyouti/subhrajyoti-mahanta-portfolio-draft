import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Zap, DollarSign, TreePine, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { scrollToTop } from "@/hooks/useScrollToTop";

const SolarCalculator = () => {
  const [monthlyBill, setMonthlyBill] = useState<number>(0);
  const [roofArea, setRoofArea] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculateSolarPotential = () => {
    if (!monthlyBill || !roofArea || !location) return;

    // Solar panel efficiency and other factors
    const panelEfficiency = 0.20; // 20% efficiency
    const systemEfficiency = 0.85; // 85% system efficiency
    const panelArea = 2; // 2 square meters per panel
    const panelWattage = 400; // 400W per panel
    
    // Location-based solar irradiance (kWh/m²/year)
    const solarIrradiance: { [key: string]: number } = {
      "north": 1200,
      "south": 1600,
      "east": 1400,
      "west": 1400,
      "central": 1500
    };

    const irradiance = solarIrradiance[location] || 1400;
    
    // Calculate number of panels that can fit
    const maxPanels = Math.floor(roofArea / panelArea);
    
    // Calculate system size in kW
    const systemSize = (maxPanels * panelWattage) / 1000;
    
    // Calculate annual energy production
    const annualProduction = systemSize * irradiance;
    
    // Calculate monthly production
    const monthlyProduction = annualProduction / 12;
    
    // Estimate current consumption from monthly bill (assuming $0.15/kWh)
    const currentConsumption = monthlyBill / 0.15;
    
    // Calculate savings
    const monthlySavings = Math.min(monthlyProduction * 0.15, monthlyBill);
    const annualSavings = monthlySavings * 12;
    
    // Calculate payback period (assuming $3/W installation cost)
    const systemCost = systemSize * 3000;
    const paybackPeriod = systemCost / annualSavings;
    
    // Calculate CO2 offset (0.5 kg CO2 per kWh)
    const co2Offset = annualProduction * 0.5;

    setResults({
      systemSize: systemSize.toFixed(1),
      annualProduction: annualProduction.toFixed(0),
      monthlyProduction: monthlyProduction.toFixed(0),
      monthlySavings: monthlySavings.toFixed(0),
      annualSavings: annualSavings.toFixed(0),
      systemCost: systemCost.toFixed(0),
      paybackPeriod: paybackPeriod.toFixed(1),
      co2Offset: co2Offset.toFixed(0),
      maxPanels
    });
  };

  const handleCalculateAgain = () => {
    setResults(null);
    setMonthlyBill(0);
    setRoofArea(0);
    setLocation("");
    // Scroll to top when calculating again
    scrollToTop();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-4"
              onClick={() => scrollToTop()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold mb-2">Solar Calculator</h1>
            <p className="text-muted-foreground">
              Calculate your solar potential and estimated savings
            </p>
          </div>

          {!results ? (
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Solar Potential Calculator
                </CardTitle>
                <CardDescription>
                  Enter your details to calculate your solar energy potential
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 rounded-b-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthly-bill">Monthly Electricity Bill ($)</Label>
                    <Input
                      id="monthly-bill"
                      type="number"
                      placeholder="e.g., 150"
                      value={monthlyBill || ""}
                      onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roof-area">Available Roof Area (m²)</Label>
                    <Input
                      id="roof-area"
                      type="number"
                      placeholder="e.g., 50"
                      value={roofArea || ""}
                      onChange={(e) => setRoofArea(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="north">Northern Region</SelectItem>
                      <SelectItem value="south">Southern Region</SelectItem>
                      <SelectItem value="east">Eastern Region</SelectItem>
                      <SelectItem value="west">Western Region</SelectItem>
                      <SelectItem value="central">Central Region</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={calculateSolarPotential}
                  className="w-full"
                  disabled={!monthlyBill || !roofArea || !location}
                >
                  Calculate Solar Potential
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      System Size
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="rounded-b-lg">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="text-2xl font-bold">{results.systemSize} kW</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {results.maxPanels} solar panels
                    </p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Annual Savings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="rounded-b-lg">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span className="text-2xl font-bold">${results.annualSavings}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      ${results.monthlySavings}/month
                    </p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Payback Period
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="rounded-b-lg">
                    <div className="flex items-center gap-2">
                      <Calculator className="h-4 w-4 text-blue-500" />
                      <span className="text-2xl font-bold">{results.paybackPeriod} years</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      System cost: ${results.systemCost}
                    </p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      CO₂ Offset
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="rounded-b-lg">
                    <div className="flex items-center gap-2">
                      <TreePine className="h-4 w-4 text-green-600" />
                      <span className="text-2xl font-bold">{results.co2Offset} kg</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      CO₂ per year
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Energy Production Details</CardTitle>
                </CardHeader>
                <CardContent className="rounded-b-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Annual Production</h4>
                      <p className="text-2xl font-bold text-primary">{results.annualProduction} kWh</p>
                      <p className="text-sm text-muted-foreground">
                        Average monthly: {results.monthlyProduction} kWh
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Environmental Impact</h4>
                      <p className="text-sm">
                        Your solar system will offset <strong>{results.co2Offset} kg</strong> of CO₂ 
                        emissions annually, equivalent to planting approximately{" "}
                        <strong>{Math.round(Number(results.co2Offset) / 25)}</strong> trees.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button onClick={handleCalculateAgain} variant="outline">
                  Calculate Again
                </Button>
                <Link to="/#contact">
                  <Button>Get Quote</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SolarCalculator;
