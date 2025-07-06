
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, ExternalLink, Zap, TrendingUp, Home } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "Solar Calculator",
    description: "Advanced solar potential calculator with cost analysis, savings estimation, and ROI calculations for your location.",
    thumbnail: "/solar.jpg",
    link: "/calculator",
    tags: ["Solar", "Calculator", "Analytics"],
    type: "Tool",
    highlights: [
      {
        icon: <Zap className="h-5 w-5 text-yellow-500" />,
        text: "Generate FREE Electricity Forever",
        subtext: "No more monthly bills"
      },
      {
        icon: <TrendingUp className="h-5 w-5 text-green-500" />,
        text: "Save ₹2.5+ Lakhs Over 25 Years",
        subtext: "Return on investment guaranteed"
      },
      {
        icon: <Home className="h-5 w-5 text-blue-500" />,
        text: "Power Your Entire Home",
        subtext: "Complete energy independence"
      }
    ]
  }
];

const ProductsSection = () => {
  return (
    <section id="products" className="section-container">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="section-title text-left">Products</h2>
        </div>

        <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    {product.type}
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {product.description}
                    </CardDescription>
                  </div>
                  <Calculator className="h-5 w-5 text-muted-foreground ml-2" />
                </div>
              </CardHeader>
              
              <CardContent>
                {/* New appealing highlights section */}
                <div className="space-y-3 mb-6">
                  {product.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10">
                      <div className="mt-0.5">
                        {highlight.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-foreground">
                          {highlight.text}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {highlight.subtext}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link to={product.link}>
                  <Button className="w-full group/btn bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                    Start Saving Today
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
