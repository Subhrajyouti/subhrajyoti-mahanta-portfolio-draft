import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import DataJobSidebar from "@/components/DataJobSidebar";
import { 
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent 
} from "@/components/ui/collapsible";

const DataJobMarketAnalysis = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="text-lg font-bold text-foreground transition-all duration-300 hover:text-primary"
            >
              Subhrajyoti<span className="text-primary">.</span>
            </Link>
            
            <Button asChild variant="ghost" size="sm" className="gap-1">
              <Link to="/#projects">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Projects</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <DataJobSidebar />
      
      <main className="flex-grow">
        {/* Hero */}
        <div className="relative h-96">
          <div className="absolute inset-0">
            <img 
              src="/data-science.jpg" 
              alt="Data Job Market Analysis" 
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold mb-4">Data Job Market Analysis</h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                An in-depth analysis of job market trends for Data Analysts, identifying the most in-demand and high-paying skills.
              </p>
              
              <div className="flex flex-wrap gap-2 mt-6">
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">Pandas</Badge>
                <Badge variant="secondary">Matplotlib</Badge>
                <Badge variant="secondary">Seaborn</Badge>
                <Badge variant="secondary">Excel</Badge>
                <Badge variant="secondary">Power BI</Badge>
                <Badge variant="secondary">GitHub</Badge>
                <Badge variant="secondary">Jupyter Notebooks</Badge>
              </div>
              
              <div className="flex gap-4 mt-8">
                <Button asChild variant="default" size="sm" className="gap-2">
                  <a href="https://github.com/Subhrajyouti/Data-Job-Market-Analysis" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    View Code
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Project Overview */}
              <section id="overview" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p>
                    This project aims to uncover the most valuable skills in the data job market, focusing on Data Analyst roles. 
                    By analyzing job postings, salary data, and skill trends, I identified the skills that maximize employability and earnings. 
                    Using Python, Excel, and visualization techniques, I examined how salaries and skill demand fluctuate over time.
                  </p>
                </div>
              </section>
              
              {/* Objective */}
              <section id="objective" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">Objective</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ul>
                    <li>Identify top-paying & high-demand skills for Data Analysts.</li>
                    <li>Analyze salary distributions across different job titles.</li>
                    <li>Investigate skill trends over time to highlight growing demands.</li>
                    <li>Help data professionals prioritize learning efforts for career growth.</li>
                  </ul>
                </div>
              </section>
              
              {/* Data Description */}
              <section id="data-description" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">Data Description & Data Model</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ul>
                    <li><strong>Dataset Source:</strong> Data from Luke Barousse's Python Course on job postings.</li>
                    <li><strong>Key Columns:</strong> Job titles, salaries, locations, skills required.</li>
                    <li><strong>Data Processing Steps:</strong>
                      <ul>
                        <li>Removed duplicates and standardized job titles.</li>
                        <li>Converted job posting dates into a structured time series.</li>
                        <li>Filtered for United States-based jobs to ensure consistency.</li>
                      </ul>
                    </li>
                  </ul>
                  <div className="my-8">
                    <img 
                      src="/data_model.png" 
                      alt="Data Model" 
                      className="w-full rounded-lg border border-border/50"
                    />
                  </div>
                </div>
              </section>
              
              {/* Methodology */}
              <section id="methodology" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">Methodology</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ul>
                    <li><strong>Data Cleaning:</strong> Removed null values, formatted dates, and standardized skill names.</li>
                    <li><strong>Exploratory Analysis:</strong> Used Python (Pandas, Seaborn, Matplotlib) for data insights.</li>
                    <li><strong>Trend Analysis:</strong> Grouped job postings by time to see skill demand shifts.</li>
                    <li><strong>Salary Insights:</strong> Compared salary distributions for different roles & locations.</li>
                    <li><strong>Visualization Techniques:</strong> Used bar charts, scatter plots, line graphs to display results.</li>
                  </ul>
                </div>
              </section>
              
              {/* Key Insights */}
              <section id="key-insights" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">Key Insights</h2>
                
                {/* Insight 1 */}
                <div className="mb-8">
                  <Collapsible>
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <h3 className="text-xl font-medium">📌 1. What are the most demanded skills for the top 3 most popular data roles?</h3>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 px-4">
                      <div className="bg-muted/30 p-4 rounded-lg mb-4 overflow-x-auto">
                        <pre className="text-sm">
                          <code>
{`fig, ax = plt.subplots(len(job_titles), 1)

for i, job_title in enumerate(job_titles):
    df_plot = df_skills_perc[df_skills_perc['job_title_short'] == job_title].head(5)[::-1]
    sns.barplot(data=df_plot, x='skill_percent', y='job_skills', ax=ax[i], hue='skill_count', palette='dark:b_r')

plt.show()`}
                          </code>
                        </pre>
                      </div>
                      <div className="my-6">
                        <img 
                          src="/q1.jpg" 
                          alt="Most demanded skills visualization" 
                          className="w-full rounded-lg border border-border/50"
                        />
                      </div>
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <h4 className="text-lg font-medium">Key Insights:</h4>
                        <ul>
                          <li>SQL is the most requested skill for Data Analysts & Data Scientists, appearing in over 50% of job postings.</li>
                          <li>Python is the most in-demand skill for Data Engineers (68%).</li>
                          <li>AWS, Azure, and Spark are crucial for Data Engineers, while Excel & Tableau remain essential for Data Analysts.</li>
                        </ul>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
                
                {/* Insight 2 */}
                <div className="mb-8">
                  <Collapsible>
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <h3 className="text-xl font-medium">📌 2. How are in-demand skills trending for Data Analysts?</h3>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 px-4">
                      <div className="bg-muted/30 p-4 rounded-lg mb-4 overflow-x-auto">
                        <pre className="text-sm">
                          <code>
{`from matplotlib.ticker import PercentFormatter

df_plot = df_DA_US_percent.iloc[:, :5]
sns.lineplot(data=df_plot, dashes=False, legend='full', palette='tab10')

plt.gca().yaxis.set_major_formatter(PercentFormatter(decimals=0))

plt.show()`}
                          </code>
                        </pre>
                      </div>
                      <div className="my-6">
                        <img 
                          src="/q2.jpg" 
                          alt="Skills trend visualization" 
                          className="w-full rounded-lg border border-border/50"
                        />
                      </div>
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <h4 className="text-lg font-medium">Key Insights:</h4>
                        <ul>
                          <li>SQL remains the most in-demand skill but is seeing a slight decline.</li>
                          <li>Excel demand increased sharply from September, overtaking Python & Tableau.</li>
                          <li>Power BI is gaining traction, although it is still less common than SQL/Tableau.</li>
                        </ul>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
                
                {/* Insight 3 */}
                <div className="mb-8">
                  <Collapsible>
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <h3 className="text-xl font-medium">📌 3. How well do jobs and skills pay for Data Analysts?</h3>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 px-4">
                      <div className="bg-muted/30 p-4 rounded-lg mb-4 overflow-x-auto">
                        <pre className="text-sm">
                          <code>
{`sns.boxplot(data=df_US_top6, x='salary_year_avg', y='job_title_short', order=job_order)

ticks_x = plt.FuncFormatter(lambda value, pos: f'${Math.floor(value/1000)}K')
plt.gca().xaxis.set_major_formatter(ticks_x)
plt.show()`}
                          </code>
                        </pre>
                      </div>
                      <div className="my-6">
                        <img 
                          src="/q3.jpg" 
                          alt="Salary distribution visualization" 
                          className="w-full rounded-lg border border-border/50"
                        />
                      </div>
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <h4 className="text-lg font-medium">Key Insights:</h4>
                        <ul>
                          <li>Senior Data Scientists have the highest salary potential (up to $600K).</li>
                          <li>Data Engineers earn significantly more than Data Analysts.</li>
                          <li>Salary increases with seniority and specialization.</li>
                        </ul>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
                
                {/* Insight 4 */}
                <div className="mb-8">
                  <Collapsible>
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <h3 className="text-xl font-medium">📌 4. What are the highest-paid and most in-demand skills for Data Analysts?</h3>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 px-4">
                      <div className="bg-muted/30 p-4 rounded-lg mb-4 overflow-x-auto">
                        <pre className="text-sm">
                          <code>
{`fig, ax = plt.subplots(2, 1)  

sns.barplot(data=df_DA_top_pay, x='median', y=df_DA_top_pay.index, hue='median', ax=ax[0], palette='dark:b_r')
sns.barplot(data=df_DA_skills, x='median', y=df_DA_skills.index, hue='median', ax=ax[1], palette='light:b')

plt.show()`}
                          </code>
                        </pre>
                      </div>
                      <div className="my-6">
                        <img 
                          src="/q4.jpg" 
                          alt="Highest-paid skills visualization" 
                          className="w-full rounded-lg border border-border/50"
                        />
                      </div>
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <h4 className="text-lg font-medium">Key Insights:</h4>
                        <ul>
                          <li>High-paying skills: dplyr, Bitbucket, Gitlab (up to $200K).</li>
                          <li>Most in-demand skills: Excel, PowerPoint, SQL.</li>
                          <li>Balancing specialized & fundamental skills is key for maximizing opportunities.</li>
                        </ul>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
                
                {/* Insight 5 */}
                <div className="mb-8">
                  <Collapsible>
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <h3 className="text-xl font-medium">📌 5. What are the most optimal skills to learn for Data Analysts?</h3>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 px-4">
                      <div className="bg-muted/30 p-4 rounded-lg mb-4 overflow-x-auto">
                        <pre className="text-sm">
                          <code>
{`from adjustText import adjust_text
import matplotlib.pyplot as plt

plt.scatter(df_DA_skills_high_demand['skill_percent'], df_DA_skills_high_demand['median_salary'])
plt.show()`}
                          </code>
                        </pre>
                      </div>
                      <div className="my-6">
                        <img 
                          src="/q5.jpg" 
                          alt="Optimal skills visualization" 
                          className="w-full rounded-lg border border-border/50"
                        />
                      </div>
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <h4 className="text-lg font-medium">Key Insights:</h4>
                        <ul>
                          <li>Oracle skills have the highest median salary ($97K) but are less common.</li>
                          <li>Python & Tableau balance high salaries with steady demand.</li>
                          <li>SQL is widely required but doesn't command the highest salaries.</li>
                          <li>Cloud technologies (AWS, Azure) are becoming more lucrative.</li>
                        </ul>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </section>
              
              {/* Challenges */}
              <section id="challenges" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">Challenges & Learnings</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ul>
                    <li><strong>Handling Data Variations:</strong> Managing different job titles across datasets.</li>
                    <li><strong>Visual Complexity:</strong> Designing effective salary & demand comparisons.</li>
                    <li><strong>Market Trends:</strong> Keeping up with fast-changing skill requirements.</li>
                  </ul>
                </div>
              </section>
              
              {/* Files */}
              <section id="files" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">Project Files & Links</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ul>
                    <li><strong>GitHub Repository:</strong> <a href="https://github.com/Subhrajyouti/Data-Job-Market-Analysis" target="_blank" rel="noopener noreferrer">https://github.com/Subhrajyouti/Data-Job-Market-Analysis</a></li>
                    <li>
                      <strong>Jupyter Notebooks:</strong>
                      <ul>
                        <li><a href="https://github.com/Subhrajyouti/Data-Job-Market-Analysis/blob/main/2_Skill_Demand.ipynb" target="_blank" rel="noopener noreferrer">2_Skill_Demand.ipynb</a></li>
                        <li><a href="https://github.com/Subhrajyouti/Data-Job-Market-Analysis/blob/main/3_Skills_Trend.ipynb" target="_blank" rel="noopener noreferrer">3_Skills_Trend.ipynb</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </section>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div className="rounded-xl border border-border/50 overflow-hidden">
                  <img 
                    src="/data_science2.jpg" 
                    alt="Data Job Market Analysis" 
                    className="w-full aspect-video object-cover"
                  />
                </div>
                
                <div className="rounded-xl border border-border/50 p-6 space-y-4">
                  <h3 className="text-lg font-medium">Key Project Insights</h3>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <p className="text-sm">SQL remains the most in-demand skill across data roles</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <p className="text-sm">Data Engineer roles command 30% higher salaries than Analysts</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <p className="text-sm">Cloud technology skills (AWS, Azure) show fastest growth</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <p className="text-sm">Excel demand increased 24% in Q4 2023</p>
                    </li>
                  </ul>
                </div>
                
                <div className="rounded-xl border border-border/50 p-6 space-y-4">
                  <h3 className="text-lg font-medium">Related Projects</h3>
                  <div className="space-y-3">
                    <Link 
                      to="/goodcabs-analysis"
                      className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <h4 className="font-medium">GoodCabs Performance Analysis</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        A data-driven analysis of GoodCabs' operations using SQL and Power BI
                      </p>
                    </Link>
                    <Link 
                      to="/project/lidar-sensor-validation"
                      className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <h4 className="font-medium">LIDAR Sensor Data Validation</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        Validation framework for LIDAR sensors in autonomous vehicle applications
                      </p>
                    </Link>
                    <Link 
                      to="/project/postgresql-optimization"
                      className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <h4 className="font-medium">PostgreSQL Database Optimization</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        Performance tuning and query optimization for large-scale sensor datasets
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DataJobMarketAnalysis;
