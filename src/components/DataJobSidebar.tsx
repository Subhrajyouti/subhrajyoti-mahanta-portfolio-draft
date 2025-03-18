
import React from "react";
import { cn } from "@/lib/utils";

const DataJobSidebar = () => {
  return (
    <div className="sticky top-16 h-[calc(100vh-4rem)] bg-muted/50 border-r border-border/50 w-64 shrink-0 hidden lg:block">
      <div className="py-6 px-4">
        <div className="font-semibold text-lg mb-6">Data Job Market Analysis</div>
        <nav className="space-y-1">
          <SidebarLink href="#overview">Project Overview</SidebarLink>
          <SidebarLink href="#objective">Objective</SidebarLink>
          <SidebarLink href="#data-description">Data Description</SidebarLink>
          <SidebarLink href="#methodology">Methodology</SidebarLink>
          <SidebarLink href="#key-insights">Key Insights</SidebarLink>
          <SidebarIndentedLink href="#key-insights">1. Most Demanded Skills</SidebarIndentedLink>
          <SidebarIndentedLink href="#key-insights">2. Skill Trends</SidebarIndentedLink>
          <SidebarIndentedLink href="#key-insights">3. Salary Analysis</SidebarIndentedLink>
          <SidebarIndentedLink href="#key-insights">4. High-Paid Skills</SidebarIndentedLink>
          <SidebarIndentedLink href="#key-insights">5. Optimal Skills</SidebarIndentedLink>
          <SidebarLink href="#challenges">Challenges & Learnings</SidebarLink>
          <SidebarLink href="#files">Project Files</SidebarLink>
        </nav>
      </div>
    </div>
  );
};

const SidebarLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className={cn(
      "flex items-center px-2 py-2 text-sm font-medium rounded-md",
      "text-foreground hover:bg-muted hover:text-primary transition-colors"
    )}
  >
    {children}
  </a>
);

const SidebarIndentedLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className={cn(
      "flex items-center pl-6 py-1.5 text-xs font-medium rounded-md",
      "text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
    )}
  >
    {children}
  </a>
);

export default DataJobSidebar;
