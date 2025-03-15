
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-navy mb-6">
            Subhrajyoti Mahanta
          </h1>
        </div>
        
        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Data Analyst specializing in LIDAR sensor integration, data validation, and turning complex datasets into actionable insights.
          </p>
        </div>

        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
          <div className="relative rounded-2xl overflow-hidden mb-12 max-w-4xl mx-auto">
            <div className="aspect-w-16 aspect-h-9 bg-navy-light/10 backdrop-blur-sm flex items-center justify-center">
              <p className="text-navy/60">Video Introduction Coming Soon</p>
            </div>
          </div>
        </div>

        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="bg-accent hover:bg-accent-light text-white transition-colors duration-300"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline"
              className="border-navy hover:bg-navy hover:text-white transition-colors duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
