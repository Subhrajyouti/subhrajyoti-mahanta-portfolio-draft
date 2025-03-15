
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="max-w-4xl mx-auto w-full text-center space-y-6">
        <h1 className="text-[64px] font-medium leading-tight">
          Subhrajyoti Mahanta
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Data Analyst specializing in LIDAR sensor integration, data validation,
          and turning complex datasets into actionable insights.
        </p>

        <div className="flex justify-center gap-4 pt-8">
          <Button 
            className="bg-[#14161A] hover:bg-[#14161A]/90 text-white rounded-full px-8 py-6"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects
          </Button>
          <Button 
            variant="outline"
            className="border-gray-200 hover:bg-gray-50 rounded-full px-8 py-6"
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
