import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Couple from "@/components/Couple";
import Story from "@/components/Story";
import EventsSchedule from "@/components/EventsSchedule";
import Gallery from "@/components/Gallery";
import RsvpAndWishes from "@/components/RsvpAndWishes";
import WishesWall from "@/components/WishesWall";
import TravelAndAccommodations from "@/components/TravelAndAccommodations";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen min-h-[100dvh] w-full max-w-full overflow-x-hidden bg-[#0b0907] text-[#fcfbf7] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#f6e29f]">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* Hero with Countdown */}
        <Hero />

        {/* Bride and Groom */}
        <Couple />

        {/* Love Story Timeline */}
        <Story />

        {/* Wedding Ceremonies & Schedule */}
        <EventsSchedule />

        {/* Photo Gallery & Lightbox */}
        <Gallery />

        {/* RSVP Form with SQL Backend Submission */}
        <RsvpAndWishes />

        {/* Live Guestbook / Wishes Wall */}
        <WishesWall />

        {/* Travel & Accommodations */}
        <TravelAndAccommodations />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
