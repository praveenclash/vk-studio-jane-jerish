import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Couple from "@/components/Couple";
import Story from "@/components/Story";
import EventsSchedule from "@/components/EventsSchedule";
import Gallery from "@/components/Gallery";
import Entourage from "@/components/Entourage";
import RsvpAndWishes from "@/components/RsvpAndWishes";
import WishesWall from "@/components/WishesWall";
import TravelAndAccommodations from "@/components/TravelAndAccommodations";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#231f20] flex flex-col font-sans selection:bg-[#c5a059]/20 selection:text-[#a27e36]">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
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

        {/* Bridal Party & Entourage */}
        <Entourage />

        {/* RSVP Form with SQL Backend Submission */}
        <RsvpAndWishes />

        {/* Live Guestbook / Wishes Wall */}
        <WishesWall />

        {/* Travel & Accommodations */}
        <TravelAndAccommodations />

        {/* Frequently Asked Questions */}
        <Faq />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
