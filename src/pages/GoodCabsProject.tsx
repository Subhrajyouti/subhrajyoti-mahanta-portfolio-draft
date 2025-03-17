import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Database, 
  ExternalLink, 
  Github, 
  LineChart, 
  Lightbulb, 
  Monitor, 
  Rocket, 
  GraduationCap, 
  Link2, 
  FileText, 
  Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GoodCabsSidebar from "@/components/GoodCabsSidebar";

const GoodCabsProject = () => {
  // State to track if the navigation bar should be fixed
  const [isNavFixed, setIsNavFixed] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add scroll event listener to toggle fixed navigation
    const handleScroll = () => {
      // Get the hero section height - adjust this value as needed
      const heroHeight = window.innerHeight * 0.6; // 60vh
      
      // Check if we've scrolled past the hero section
      if (window.scrollY > heroHeight) {
        setIsNavFixed(true);
      } else {
        setIsNavFixed(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Navigation items
  const navItems = [
    { id: "overview", label: "Overview", icon: <Eye className="w-4 h-4" /> },
    { id: "data-setup", label: "Data Setup", icon: <Database className="w-4 h-4" /> },
    { id: "dashboard", label: "Dashboard", icon: <Monitor className="w-4 h-4" /> },
    { id: "insights", label: "Insights", icon: <Lightbulb className="w-4 h-4" /> },
    { id: "challenges", label: "Challenges", icon: <GraduationCap className="w-4 h-4" /> },
    { id: "files", label: "Files", icon: <Link2 className="w-4 h-4" /> },
    { id: "conclusion", label: "Conclusion", icon: <Rocket className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section with Cover Image */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img 
            src="/alexander-red-S9qxkJN0f4Q-unsplash.jpg" 
            alt="Yellow taxi cab on city street" 
            className="w-full h-full object-cover brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background flex flex-col justify-end pb-12">
            <div className="container max-w-5xl mx-auto px-4">
              <Link to="/" className="inline-flex items-center mb-6 text-white/90 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">GoodCabs Performance Analysis & Dashboard</h1>
              <p className="text-xl text-white/90 mb-6 max-w-2xl">
                A data-driven exploration of GoodCabs' operations—empowering insights for strategic decisions.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline" className="bg-white/20 text-white font-normal backdrop-blur-sm hover:-translate-y-0.5 transition-transform">Power BI</Badge>
                <Badge variant="outline" className="bg-white/20 text-white font-normal backdrop-blur-sm hover:-translate-y-0.5 transition-transform">PostgreSQL</Badge>
                <Badge variant="outline" className="bg-white/20 text-white font-normal backdrop-blur-sm hover:-translate-y-0.5 transition-transform">SQL</Badge>
                <Badge variant="outline" className="bg-white/20 text-white font-normal backdrop-blur-sm hover:-translate-y-0.5 transition-transform">Data Analysis</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Bar - Fixed on scroll */}
        <div className={`w-full bg-background border-b border-border/50 z-50 ${isNavFixed ? 'fixed top-0 left-0 shadow-md' : ''}`}>
          <div className="container max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-between overflow-x-auto py-2 no-scrollbar">
              <div className="flex items-center space-x-4">
                {navItems.map((item) => (
                  <a 
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center space-x-1 py-2 px-3 text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add padding when the navigation is fixed to prevent content jump */}
        {isNavFixed && <div className="h-12"></div>}

        {/* Main Content */}
        <div className="container max-w-5xl mx-auto px-4 py-8">
          {/* Overview Section */}
          <section id="overview" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Eye className="text-primary" /> Project Overview
            </h2>
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-border/50 hover:border-primary/30 shadow-md">
              <CardContent className="p-6">
                <p className="mb-4">
                  This project is an in-depth analysis of GoodCabs' operations, focusing on:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>Trip volume & revenue trends</li>
                  <li>New vs repeat passenger behavior</li>
                  <li>City-wise performance & customer satisfaction</li>
                  <li>Target vs actual business performance</li>
                </ul>
                
                <p className="mb-4">To achieve this, I:</p>
                <ul className="list-none space-y-2">
                  <li className="flex items-start">
                    <span className="inline-flex justify-center items-center h-5 w-5 text-[10px] rounded-full bg-primary text-white font-bold mr-2 mt-0.5">✓</span>
                    Designed a Power BI dashboard for interactive reporting
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex justify-center items-center h-5 w-5 text-[10px] rounded-full bg-primary text-white font-bold mr-2 mt-0.5">✓</span>
                    Structured a PostgreSQL database and imported data
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex justify-center items-center h-5 w-5 text-[10px] rounded-full bg-primary text-white font-bold mr-2 mt-0.5">✓</span>
                    Wrote SQL queries to extract key insights
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex justify-center items-center h-5 w-5 text-[10px] rounded-full bg-primary text-white font-bold mr-2 mt-0.5">✓</span>
                    Created data models to optimize Power BI relationships
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex justify-center items-center h-5 w-5 text-[10px] rounded-full bg-primary text-white font-bold mr-2 mt-0.5">✓</span>
                    Provided strategic recommendations for business growth
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>
            
          {/* Data Setup & SQL Queries Section */}
          <section id="data-setup" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Database className="text-primary" /> Data Setup & SQL Queries
            </h2>
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-border/50 hover:border-primary/30 shadow-md">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="db-creation">
                    <AccordionTrigger className="hover:text-primary text-base font-medium py-3">
                      Database Creation in PostgreSQL
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-card/20 p-4 rounded-md overflow-x-auto">
                        <pre className="text-sm">
                          {`CREATE DATABASE GoodCabs;`}
                        </pre>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="table-creation">
                    <AccordionTrigger className="hover:text-primary text-base font-medium py-3">
                      Creating Tables (Example Snippet)
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-card/20 p-4 rounded-md overflow-x-auto">
                        <pre className="text-sm">
                          {`CREATE TABLE IF NOT EXISTS dim_city (
    city_id VARCHAR(10) PRIMARY KEY,
    city_name VARCHAR(50) NOT NULL
);

-- Additional tables: dim_date, fact_passenger_summary, dim_repeat_trip_distribution,
-- fact_trips, city_target_passenger_rating, monthly_target_new_passengers,
-- monthly_target_trips, etc.`}
                        </pre>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="import-data">
                    <AccordionTrigger className="hover:text-primary text-base font-medium py-3">
                      Importing CSV Data
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-card/20 p-4 rounded-md overflow-x-auto">
                        <pre className="text-sm">
                          {`COPY dim_city FROM '/path/to/dim_city.csv' DELIMITER ',' CSV HEADER;
-- Continue for other tables in correct order`}
                        </pre>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="trip-analysis">
                    <AccordionTrigger className="hover:text-primary text-base font-medium py-3">
                      Trip Volume Analysis Query
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-card/20 p-4 rounded-md overflow-x-auto">
                        <pre className="text-sm">
                          {`-- Trip Volume Analysis by City
WITH trip_data AS (
  SELECT 
    city_name,
    trip_date,
    COUNT(*) as trip_count,
    SUM(fare_amount) as total_revenue,
    AVG(rating) as avg_rating
  FROM trips t
  JOIN cities c ON t.city_id = c.city_id
  WHERE trip_date BETWEEN '2022-01-01' AND '2022-12-31'
  GROUP BY city_name, trip_date
)
SELECT 
  city_name,
  SUM(trip_count) as yearly_trips,
  ROUND(SUM(total_revenue), 2) as yearly_revenue,
  ROUND(AVG(avg_rating), 1) as average_rating
FROM trip_data
GROUP BY city_name
ORDER BY yearly_revenue DESC;`}
                        </pre>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="customer-retention">
                    <AccordionTrigger className="hover:text-primary text-base font-medium py-3">
                      Customer Retention Analysis
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-card/20 p-4 rounded-md overflow-x-auto">
                        <pre className="text-sm">
                          {`-- New vs Repeat Customer Analysis
WITH customer_trips AS (
  SELECT 
    customer_id,
    MIN(trip_date) as first_trip_date,
    COUNT(*) as total_trips,
    SUM(fare_amount) as total_spent,
    AVG(rating) as avg_rating
  FROM trips
  GROUP BY customer_id
),
classified_customers AS (
  SELECT
    customer_id,
    CASE 
      WHEN total_trips = 1 THEN 'New' 
      WHEN total_trips BETWEEN 2 AND 5 THEN 'Occasional' 
      ELSE 'Regular' 
    END as customer_type,
    total_trips,
    total_spent,
    avg_rating
  FROM customer_trips
)
SELECT
  customer_type,
  COUNT(*) as customer_count,
  ROUND(AVG(total_trips), 1) as avg_trips_per_customer,
  ROUND(AVG(total_spent), 2) as avg_spend_per_customer,
  ROUND(AVG(avg_rating), 1) as avg_rating
FROM classified_customers
GROUP BY customer_type
ORDER BY avg_spend_per_customer DESC;`}
                        </pre>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </section>