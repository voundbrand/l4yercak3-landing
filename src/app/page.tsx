import { Background } from "@/components/background";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";
import { BookCallButton } from "@/components/book-call-button";
import { GoToAppButton } from "@/components/go-to-app-button";
import { UrgencyPill } from "@/components/urgency-pill";

export default function Home() {
  return (
    <main className="h-[100dvh] w-full">
      <div className="relative h-full w-full">
        <Background 
          src="/layercake-bg.png" 
          placeholder="/layercake-bg.png" 
        />
        
        {/* Urgency Pill - Top Center */}
        <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 z-10 px-4">
          <UrgencyPill />
        </div>
        
        {/* Action Buttons - Top Right */}
        <div className="absolute top-4 md:top-6 right-4 md:right-6 z-10 flex items-center gap-2 md:gap-3">
          <GoToAppButton />
          <BookCallButton />
        </div>
        
        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}
