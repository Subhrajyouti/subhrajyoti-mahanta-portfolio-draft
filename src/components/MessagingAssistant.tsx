
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageSquare, X, Send, ChevronDown, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const MessagingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hi there! I'm Subhrajyoti's virtual assistant. Ask me anything about his skills, experience, or projects!" 
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { role: "user" as const, content: inputValue.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate a delay before the assistant responds
    setTimeout(() => {
      const response = generateResponse(userMessage.content);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 800);
  };

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Check for skills related questions
    if (lowerQuestion.includes("skills") || lowerQuestion.includes("technology") || lowerQuestion.includes("technologies")) {
      return "Subhrajyoti is skilled in SQL (90%), Python (75%), R (35%), C (60%), and DAX (60%). His database skills include PostgreSQL (85%), SQLite (70%), and MySQL (65%). He's proficient with tools like Power BI (75%), MS Excel (95%), Tableau (60%), Pandas (80%), NumPy (75%), and data visualization libraries.";
    }
    
    // Check for experience related questions
    if (lowerQuestion.includes("experience") || lowerQuestion.includes("work")) {
      return "Subhrajyoti has experience as a Data Analyst, working with complex datasets to extract actionable insights. He has worked on various projects involving data cleaning, transformation, visualization, and analysis to drive business decisions.";
    }
    
    // Check for education related questions
    if (lowerQuestion.includes("education") || lowerQuestion.includes("study") || lowerQuestion.includes("degree")) {
      return "For details about Subhrajyoti's educational background, please check his resume which you can download from the Resume section of this website.";
    }
    
    // Check for project related questions
    if (lowerQuestion.includes("project") || lowerQuestion.includes("portfolio")) {
      return "Subhrajyoti has worked on several data analysis projects. You can explore them in detail in the Projects section of this portfolio. These projects showcase his ability to extract insights from complex datasets and present them in a compelling way.";
    }
    
    // Check for contact related questions
    if (lowerQuestion.includes("contact") || lowerQuestion.includes("email") || lowerQuestion.includes("phone") || lowerQuestion.includes("reach")) {
      return "You can contact Subhrajyoti via email at subhrajyoutimahanta@gmail.com, by phone at +91 6002967278, or connect with him on LinkedIn. There's also a contact form in the Contact section of this website.";
    }
    
    // Check for resume related questions
    if (lowerQuestion.includes("resume") || lowerQuestion.includes("cv")) {
      return "You can view or download Subhrajyoti's resume from the Resume section of this website. It contains detailed information about his professional experience, skills, and education.";
    }
    
    // Check for greetings
    if (lowerQuestion.includes("hi") || lowerQuestion.includes("hello") || lowerQuestion.includes("hey")) {
      return "Hello! How can I help you learn more about Subhrajyoti today?";
    }
    
    // Check for who questions
    if (lowerQuestion.includes("who") && (lowerQuestion.includes("you") || lowerQuestion.includes("are you"))) {
      return "I'm a virtual assistant created to help you learn more about Subhrajyoti Mahanta, a skilled Data Analyst. Feel free to ask me about his skills, experience, projects, or how to contact him!";
    }
    
    if (lowerQuestion.includes("who") && (lowerQuestion.includes("subhrajyoti") || lowerQuestion.includes("he"))) {
      return "Subhrajyoti Mahanta is a Data Analyst who specializes in turning complex datasets into actionable insights. He has expertise in SQL, Python, data visualization, and various analytical tools.";
    }
    
    // Default response
    return "I'm not sure about that, but you can learn more about Subhrajyoti's skills, experience, and projects by exploring this portfolio. Is there something specific you'd like to know about his data analysis background?";
  };

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={toggleAssistant}
        className={cn(
          "fixed bottom-6 right-6 rounded-full p-3 w-12 h-12 shadow-lg transition-all duration-300 z-50",
          isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </Button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-20 right-6 w-80 md:w-96 rounded-lg shadow-xl transition-all duration-300 transform z-40 overflow-hidden",
          isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-10 opacity-0 pointer-events-none"
        )}
      >
        <Card className="flex flex-col h-[480px] border-primary/20">
          {/* Header */}
          <div className="bg-primary/10 p-3 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-2">
              <Bot size={18} className="text-primary" />
              <h3 className="font-medium text-sm">Portfolio Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={toggleAssistant}
            >
              <X size={16} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col max-w-[85%] rounded-lg p-3 text-sm animate-fade-in",
                  msg.role === "user"
                    ? "ml-auto bg-primary/10 text-foreground"
                    : "mr-auto bg-muted text-foreground"
                )}
              >
                <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
                  {msg.role === "user" ? (
                    <>
                      <span>You</span>
                      <User size={12} />
                    </>
                  ) : (
                    <>
                      <Bot size={12} />
                      <span>Assistant</span>
                    </>
                  )}
                </div>
                {msg.content}
              </div>
            ))}
            {isTyping && (
              <div className="flex max-w-[85%] mr-auto bg-muted rounded-lg p-3 text-sm">
                <div className="flex space-x-1 items-center">
                  <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-border flex gap-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Subhrajyoti..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!inputValue.trim() || isTyping}
              className="bg-primary hover:bg-primary/90"
            >
              <Send size={16} />
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default MessagingAssistant;
