
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "react-router-dom";
import { Coffee, LineChart, Database } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  slug: string;
}

const projects: Project[] = [
  {
    id: 9,
    title: "Monday Coffee Business Expansion Analysis",
    description: "Analyzing city performance to determine the best locations for business expansion using data-driven insights",
    image: "/coffee1.jpg",
    tags: ["SQL", "Data Analysis", "Weighted Scoring", "Decision Making"],
    slug: "new-project"
  },
  {
    id: 8,
    title: "Data Job Market Analysis",
    description: "An in-depth analysis of data science job market trends, salary distributions, and required skills across different industries",
    image: "/data_science.jpg",
    tags: ["Python", "Pandas", "Data Visualization", "Job Market Analysis"],
    slug: "data-job-market-analysis"
  },
  {
    id: 7,
    title: "GoodCabs Performance Analysis & Dashboard",
    description: "A data-driven analysis of GoodCabs' operations using SQL, Power BI, and PostgreSQL to provide strategic insights to the Chief of Operations",
    image: "/alexander-red-S9qxkJN0f4Q-unsplash.jpg",
    tags: ["Power BI", "PostgreSQL", "SQL", "Data Analysis"],
    slug: "goodcabs-analysis"
  },
  {
    id: 1,
    title: "LIDAR Sensor Data Validation",
    description: "Validation framework for LIDAR sensors in autonomous vehicle applications",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "OpenCV", "Sensor Data", "Machine Learning"],
    slug: "lidar-sensor-validation"
  },
  {
    id: 2,
    title: "EV Traffic Analysis Dashboard",
    description: "Interactive visualization dashboard for electric vehicle traffic patterns",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Tableau", "SQL", "Data Visualization", "Traffic Analysis"],
    slug: "ev-traffic-analysis"
  },
  {
    id: 3,
    title: "PostgreSQL Database Optimization",
    description: "Performance tuning and query optimization for large-scale sensor datasets",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["PostgreSQL", "Database Design", "Query Optimization"],
    slug: "postgresql-optimization"
  },
  {
    id: 4,
    title: "Real-time Data Processing Pipeline",
    description: "Scalable pipeline for processing and analyzing streaming sensor data",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Apache Kafka", "Data Pipeline", "Real-time Analytics"],
    slug: "realtime-data-pipeline"
  },
  {
    id: 5,
    title: "Predictive Maintenance Model",
    description: "ML model for predicting equipment failure based on sensor readings",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Machine Learning", "Python", "Pandas", "Scikit-learn"],
    slug: "predictive-maintenance"
  },
  {
    id: 6,
    title: "Data Quality Assessment Framework",
    description: "Automated system for evaluating and ensuring data quality in sensor datasets",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Data Quality", "Automation", "ETL"],
    slug: "data-quality-framework"
  }
];

const ProjectsSection = () => {
  const { theme } = useTheme();

  return (
    <section id="projects" className="section-container">
      <h2 className="section-title">Featured Projects</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-8">
            <Card className="overflow-hidden border border-border/50 shadow-md hover:shadow-xl transition-all">
              <img 
                src="/coffee2.jpg" 
                alt="Coffee shop" 
                className="w-full h-48 object-cover"
              />
            </Card>
            
            <Card className="overflow-hidden border border-border/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="p-5">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Coffee className="h-4 w-4 text-primary" /> Data-Driven Insights
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="inline-flex mt-1 justify-center items-center h-4 w-4 text-[8px] rounded-full bg-primary text-white font-bold">✓</span>
                    <span className="text-sm">25% of city populations are coffee consumers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-flex mt-1 justify-center items-center h-4 w-4 text-[8px] rounded-full bg-primary text-white font-bold">✓</span>
                    <span className="text-sm">Loyalty programs increase repeat visits by 18%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-flex mt-1 justify-center items-center h-4 w-4 text-[8px] rounded-full bg-primary text-white font-bold">✓</span>
                    <span className="text-sm">Highest revenue potential in urban locations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-flex mt-1 justify-center items-center h-4 w-4 text-[8px] rounded-full bg-primary text-white font-bold">✓</span>
                    <span className="text-sm">High rent areas require 35% more sales volume</span>
                  </li>
                </ul>
              </div>
            </Card>
            
            <Card className="overflow-hidden border border-border/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="p-5">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Link to="/" className="h-4 w-4 text-primary" /> Related Projects
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link to="/goodcabs-analysis" className="group flex items-start gap-3 hover:bg-accent/50 p-2 rounded-md transition-colors">
                      <LineChart className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium group-hover:text-primary transition-colors">GoodCabs Performance Analysis</h4>
                        <p className="text-xs text-muted-foreground">Data-driven insights for strategic decisions</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/data-job-market-analysis" className="group flex items-start gap-3 hover:bg-accent/50 p-2 rounded-md transition-colors">
                      <Database className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium group-hover:text-primary transition-colors">Data Job Market Analysis</h4>
                        <p className="text-xs text-muted-foreground">Exploring trends in data science careers</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  // Special routing for specific projects
  const projectUrl = project.slug === "goodcabs-analysis" 
    ? "/goodcabs-analysis" 
    : project.slug === "data-job-market-analysis"
    ? "/data-job-market-analysis"
    : project.slug === "new-project"
    ? "/new-project"
    : `/project/${project.slug}`;

  // Determine if external link (opens in new tab) or internal navigation
  const renderProjectLink = () => {
    return (
      <a 
        href={projectUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="group block h-full"
      >
        <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-500 bg-background border border-border/50 hover:border-primary/30 hover:-translate-y-2 shadow-md">
          <div className="relative overflow-hidden aspect-video">
            <img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-xl font-semibold mb-2 line-clamp-1">{project.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge variant="outline" className="font-normal">
                  +{project.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </Card>
      </a>
    );
  };

  return renderProjectLink();
};

export default ProjectsSection;
