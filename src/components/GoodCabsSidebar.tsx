
import React, { useState, useEffect } from "react";
import { 
  Eye, 
  Database, 
  Monitor, 
  Lightbulb, 
  GraduationCap, 
  Link2, 
  FileText, 
  Rocket,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const GoodCabsSidebar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFloating, setIsFloating] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    // Determine when to make the navigation bar float
    const handleScroll = () => {
      // Cover photo height + some additional pixels to start floating after 
      // we've scrolled past the initial position of the bar
      const triggerHeight = window.innerHeight * 0.6 + 100; 
      
      if (window.scrollY > triggerHeight) {
        setIsFloating(true);
      } else {
        setIsFloating(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Observe which section is currently in view to update active state
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 } // 20% of the element must be visible
    );

    // Observe all sections
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div 
      className={`w-full z-40 transition-all duration-300 ${
        isFloating 
          ? "fixed top-0 left-0 bg-background/95 backdrop-blur-md shadow-md border-b border-border/50" 
          : "relative"
      }`}
    >
      <div className={`container max-w-5xl mx-auto px-4 ${isFloating ? "py-2" : "py-4"}`}>
        <div 
          className="flex items-center justify-between cursor-pointer mb-1"
          onClick={() => setIsVisible(!isVisible)}
        >
          <h3 className="font-medium text-sm">
            {isFloating ? "GoodCabs Navigation" : "Jump to Section"}
          </h3>
          {isVisible ? (
            <ChevronUp size={18} className="text-primary" />
          ) : (
            <ChevronDown size={18} className="text-primary" />
          )}
        </div>
        
        {isVisible && (
          <div className="overflow-x-auto pb-2">
            <ToggleGroup 
              type="single" 
              value={activeSection}
              className="flex space-x-1 w-max min-w-full"
              onValueChange={(value) => {
                if (value) setActiveSection(value);
              }}
            >
              <NavToggleItem 
                value="overview" 
                icon={<Eye size={16} />} 
                label="Overview" 
                isActive={activeSection === "overview"} 
              />
              <NavToggleItem 
                value="data-setup" 
                icon={<Database size={16} />} 
                label="Data Setup" 
                isActive={activeSection === "data-setup"} 
              />
              <NavToggleItem 
                value="dashboard" 
                icon={<Monitor size={16} />} 
                label="Dashboard" 
                isActive={activeSection === "dashboard"} 
              />
              <NavToggleItem 
                value="insights" 
                icon={<Lightbulb size={16} />} 
                label="Insights" 
                isActive={activeSection === "insights"} 
              />
              <NavToggleItem 
                value="challenges" 
                icon={<GraduationCap size={16} />} 
                label="Challenges" 
                isActive={activeSection === "challenges"} 
              />
              <NavToggleItem 
                value="files" 
                icon={<FileText size={16} />} 
                label="Files" 
                isActive={activeSection === "files"} 
              />
              <NavToggleItem 
                value="conclusion" 
                icon={<Rocket size={16} />} 
                label="Conclusion" 
                isActive={activeSection === "conclusion"} 
              />
            </ToggleGroup>
          </div>
        )}
      </div>
    </div>
  );
};

const NavToggleItem = ({ 
  value, 
  icon, 
  label, 
  isActive 
}: { 
  value: string; 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean 
}) => {
  const handleClick = () => {
    const element = document.getElementById(value);
    if (element) {
      // Offset for the floating header
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <ToggleGroupItem
      value={value}
      onClick={handleClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap ${
        isActive 
          ? "bg-primary/15 text-primary" 
          : "hover:bg-primary/5"
      }`}
      aria-label={label}
    >
      <span className="text-primary">{icon}</span>
      {label}
    </ToggleGroupItem>
  );
};

export default GoodCabsSidebar;
