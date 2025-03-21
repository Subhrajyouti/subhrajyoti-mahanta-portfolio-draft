
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

const IntroVideo = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle intersection observer for lazy loading
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !videoLoaded) {
          setVideoLoaded(true);
          observer.disconnect();
        }
      });
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [videoLoaded]);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section id="intro" className="section-container">
      <h2 className="section-title">Introduction</h2>
      <div className="mt-10 max-w-4xl mx-auto">
        <div 
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden group shadow-lg"
        >
          <AspectRatio ratio={16/9} className="bg-muted/30">
            {isPlaying ? (
              <iframe 
                ref={iframeRef}
                src="https://player.vimeo.com/video/1068016143?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&autoplay=1"
                className="w-full h-full absolute inset-0 rounded-2xl"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
                loading="lazy"
                title="Introduction Video"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted/20">
                <div 
                  className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
                  onClick={handlePlayClick}
                  aria-label="Play introduction video"
                >
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
                <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white text-lg font-medium">Watch my introduction video</p>
                  <p className="text-white/80 text-sm">Learn about my background and expertise in data analysis</p>
                </div>
              </div>
            )}
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

export default IntroVideo;
