import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import WorkerCard, { WorkerData } from "@/components/WorkerCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, Shield } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import ChatBotAI from '../components/chatbotapi';
// Sample worker data
const popularWorkers: WorkerData[] = [
  {
    id: "1",
    name: "James Wilson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    profession: "Plumber",
    rating: 4.9,
    reviewCount: 126,
    hourlyRate: 45,
    location: "San Francisco, CA",
    skills: ["Pipe Repair", "Installation", "Emergency Service"],
    description: "Professional plumber with 10+ years of experience. Specializing in both residential and commercial plumbing services.",
    availability: "Available next week",
    verified: true
  },
  {
    id: "2",
    name: "Sophia Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    profession: "Electrician",
    rating: 4.8,
    reviewCount: 94,
    hourlyRate: 55,
    location: "Oakland, CA",
    skills: ["Wiring", "Lighting", "Panel Upgrade"],
    description: "Licensed electrician with expertise in residential and light commercial electrical systems. Safety-focused and detail-oriented.",
    availability: "Available tomorrow",
    verified: true
  },
  {
    id: "3",
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    profession: "Carpenter",
    rating: 4.7,
    reviewCount: 78,
    hourlyRate: 50,
    location: "San Jose, CA",
    skills: ["Furniture", "Cabinetry", "Framing"],
    description: "Custom woodworking and general carpentry. From small repairs to complete renovations. Quality craftsmanship guaranteed.",
    availability: "Available this weekend",
    verified: false
  },
  {
    id: "4",
    name: "Emma Johnson",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    profession: "House Cleaner",
    rating: 4.9,
    reviewCount: 152,
    hourlyRate: 35,
    location: "Berkeley, CA",
    skills: ["Deep Cleaning", "Move-in/out", "Eco-Friendly"],
    description: "Thorough and efficient cleaning services. Using premium, eco-friendly cleaning products for a healthy home environment.",
    availability: "Available today",
    verified: true
  }
];

// Categories with icons
const categories = [
  { name: "Plumber", icon: "🔧", color: "bg-blue-100" },
  { name: "Electrician", icon: "⚡", color: "bg-yellow-100" },
  { name: "Carpenter", icon: "🪚", color: "bg-amber-100" },
  { name: "Cleaning", icon: "🧹", color: "bg-green-100" },
  { name: "Painting", icon: "🖌", color: "bg-purple-100" },
  { name: "Landscaping", icon: "👨‍🔧", color: "bg-emerald-100" },
  { name: "Moving", icon: "📦", color: "bg-orange-100" },
  { name: "Mason", icon: "🧱", color: "bg-cyan-100" }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    content: "I found an amazing electrician through SkillConnect. The booking process was seamless, and the work was completed perfectly.",
    author: "Sarah Thompson",
    role: "Homeowner",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg"
  },
  {
    id: 2,
    content: "As a plumber, joining SkillConnect has been great for my business. I've gained new clients and steady work.",
    author: "David Ramirez",
    role: "Plumber",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg"
  },
  {
    id: 3,
    content: "The verification process gave me confidence in hiring a carpenter for my home renovation. Excellent experience overall!",
    author: "Jennifer Wu",
    role: "Homeowner",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg"
  }
];
type User = {
  id: string;
  email: string;
  name?: string;
};
type IndexProps = {
  user: User | null;
};
const Index: React.FC<IndexProps & { setUser: (user: User | null) => void }> = ({ user, setUser }) => {
  const [isIntersecting, setIsIntersecting] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Chatbot Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 bg-primary p-3 rounded-full shadow-lg text-white hover:bg-primary-dark transition"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Render ChatbotAI Component */}
      <AnimatePresence>
  {showChatbot && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} // 🔹 Start smaller & faded
      animate={{ opacity: 1, scale: 1 }} // 🔹 Expand to full size smoothly
      exit={{ opacity: 0, scale: 0.8 }} // 🔹 Shrink out on close
      transition={{ duration: 0.3, ease: "easeInOut" }} // 🔹 Smooth animation
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]" // 🔹 Centered & add background overlay
    >
      <div className="w-[600px] h-[700px] bg-white border border-gray-300 shadow-2xl rounded-xl p-6 relative max-h-screen flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => setShowChatbot(false)}
          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 transition"
        >
          ✖
        </button>

        {/* Greeting Text */}
        <div className="text-center text-xl font-semibold text-gray-800 mb-4">
          🙏 Namaste! Mai aapki kya madad kar sakta hoon?
        </div>

        {/* Chatbot Component */}
        <div className="flex-1 overflow-hidden">
        {showChatbot && <ChatBotAI onClose={() => setShowChatbot(false)} />}

        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>




      <Navbar user={user} setUser={setUser} />

      <Hero />

      <FeaturesSection />

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Service Categories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Find the right skilled worker 
            </h2>
            <p className="text-lg text-muted-foreground">
              Browse through our diverse service categories to find the perfect match for your need.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <div
                id={`category-${index}`}
                key={index}
                className={`animate-on-scroll fade-up p-6 rounded-xl text-center bg-white border border-border shadow-smooth hover:shadow-elevation cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${isIntersecting[`category-${index}`] ? 'appear' : ''
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="font-medium">{category.name}</h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" className="group">
              View all categories
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Workers Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div className="max-w-2xl">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
               Best reviewed workers
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Our most in-demand workers near you !
              </h2>
              <p className="text-lg text-muted-foreground">
                Workers will be verified one the basis of their reviews.
              </p>
            </div>
            <Button asChild>
              <a href="/search" className="mt-4 md:mt-0">
                View all workers
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularWorkers.map((worker, index) => (
              <div
                id={`worker-${index}`}
                key={worker.id}
                className={`animate-on-scroll fade-up ${isIntersecting[`worker-${index}`] ? 'appear' : ''
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <WorkerCard worker={worker} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div
              id="stat-1"
              className={`animate-on-scroll fade-up ${isIntersecting['stat-1'] ? 'appear' : ''}`}
            >
              <div className="bg-white p-8 rounded-xl border border-border shadow-card">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">5,000+</h3>
                <p className="text-muted-foreground">Verified Workers</p>
              </div>
            </div>

            <div
              id="stat-2"
              className={`animate-on-scroll fade-up ${isIntersecting['stat-2'] ? 'appear' : ''}`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="bg-white p-8 rounded-xl border border-border shadow-card">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">10,000+</h3>
                <p className="text-muted-foreground">Completed Jobs</p>
              </div>
            </div>

            <div
              id="stat-3"
              className={`animate-on-scroll fade-up ${isIntersecting['stat-3'] ? 'appear' : ''}`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="bg-white p-8 rounded-xl border border-border shadow-card">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">95%</h3>
                <p className="text-muted-foreground">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              We would love to hear from you !
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                id={`testimonial-${index}`}
                key={testimonial.id}
                className={`animate-on-scroll fade-up ${isIntersecting[`testimonial-${index}`] ? 'appear' : ''
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="h-full bg-white p-8 rounded-xl border border-border shadow-smooth">
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-amber-400">★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground">"{testimonial.content}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="cta"
            className={`max-w-3xl mx-auto text-center animate-on-scroll fade-up ${isIntersecting['cta'] ? 'appear' : ''
              }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to hire the right worker for your job?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Thousand problems , one solution : GigConnect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="shadow-button">
                <a href="/search">Find a worker</a>
              </Button>
              <Button size="lg" variant="outline">
                <a href="/register">Become a worker</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
