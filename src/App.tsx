import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Instagram, Mail, MapPin, 
  ArrowRight, Download, Ruler, User, 
  Star, Briefcase, Camera, Send, ChevronRight,
  Sun, Moon
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';

// --- Constants & Data ---

/**
 * IMPORTANT: Replace these URLs with your actual modeling photos.
 * All photos are currently styled with 'grayscale' by default to match the 
 * premium black & white aesthetic requested.
 */
const IMAGES = {
  hero: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/4200eaf9-bf6c-428e-88e1-f76a7bf25e4e/fashion-editorial-1-90be9120-1782427612281.webp",
  about: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/4200eaf9-bf6c-428e-88e1-f76a7bf25e4e/editorial-2-5606529b-1782427612120.webp",
  categories: {
    fashion: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/4200eaf9-bf6c-428e-88e1-f76a7bf25e4e/fashion-editorial-1-90be9120-1782427612281.webp",
    editorial: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/4200eaf9-bf6c-428e-88e1-f76a7bf25e4e/editorial-2-5606529b-1782427612120.webp",
    commercial: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/4200eaf9-bf6c-428e-88e1-f76a7bf25e4e/commercial-1-6797364d-1782427611147.webp",
    lifestyle: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/4200eaf9-bf6c-428e-88e1-f76a7bf25e4e/lifestyle-1-b597f8d9-1782427611649.webp",
    streetwear: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/4200eaf9-bf6c-428e-88e1-f76a7bf25e4e/streetwear-1-e54b529e-1782427612335.webp",
    runway: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/4200eaf9-bf6c-428e-88e1-f76a7bf25e4e/runway-1-2507ef50-1782427611800.webp",
  }
};

const STATS = [
  { label: "Height", value: "183 cm (6'0\")" },
  { label: "Weight", value: "55 kg (121 lbs)" },
  { label: "Hair Color", value: "Black" },
  { label: "Eye Color", value: "Dark Brown" },
  { label: "Skin Tone", value: "Dark Brown" },
  { label: "Nationality", value: "Kenyan" },
];

const MEASUREMENTS = [
  { label: "Height", value: "183 cm / 6'0\"" },
  { label: "Weight", value: "55 kg / 121 lbs" },
  { label: "Chest", value: "To Be Updated" },
  { label: "Waist", value: "To Be Updated" },
  { label: "Hips", value: "To Be Updated" },
  { label: "Shoe Size", value: "To Be Updated" },
  { label: "Clothing Size", value: "To Be Updated" },
];

const SERVICES = [
  { title: "Fashion Modeling", icon: Star },
  { title: "Editorial Shoots", icon: Camera },
  { title: "Commercial Advertising", icon: Briefcase },
  { title: "Brand Collaborations", icon: Instagram },
  { title: "Product Promotions", icon: Star },
  { title: "Runway Shows", icon: User },
  { title: "Lifestyle Campaigns", icon: Camera },
  { title: "Creative Content Creation", icon: Briefcase },
];

const PORTFOLIO_CATEGORIES = [
  "Fashion", "Editorial", "Commercial", "Lifestyle", "Streetwear", "Runway", "Brand Campaigns"
];

// --- Components ---

const Navbar = ({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'Book Me', href: '#booking' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-serif font-bold tracking-widest text-foreground">
              RONOH <span className="text-[#D4AF37]">VINCENT</span>
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium hover:text-[#D4AF37] transition-colors tracking-widest uppercase"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
             <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-4 text-base font-medium hover:text-[#D4AF37] border-b border-muted last:border-0"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src={IMAGES.hero} 
        alt="Ronoh Vincent Hero" 
        className="w-full h-full object-cover brightness-50 grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
    </div>
    
    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-[#D4AF37] text-sm md:text-base tracking-[0.3em] uppercase mb-4 block">
          Professional Talent
        </span>
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tighter">
          RONOH <span className="block md:inline text-[#D4AF37]">VINCENT</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/80 font-light mb-10 tracking-wide">
          Fashion Model | Editorial Talent | Commercial Model
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-[#D4AF37] hover:bg-[#B8962E] text-white border-none px-8 py-6 text-lg rounded-none transition-all duration-300 w-full sm:w-auto uppercase tracking-widest">
            View Portfolio <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-none w-full sm:w-auto uppercase tracking-widest">
            Book Me
          </Button>
        </div>
      </motion.div>
    </div>

    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
      <div className="w-px h-12 bg-[#D4AF37]/50" />
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] overflow-hidden group"
        >
          <img 
            src={IMAGES.about} 
            alt="About Ronoh Vincent" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 border-2 border-[#D4AF37] m-4 translate-x-4 translate-y-4 -z-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 relative">
            About <span className="text-[#D4AF37]">Me</span>
            <div className="absolute -bottom-2 left-0 w-20 h-1 bg-[#D4AF37]" />
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            I am a <span className="text-foreground font-semibold">fashion and editorial model</span> passionate about bringing confidence, creativity, and authenticity to every project. With a strong presence both on camera and in front of live audiences, I aim to collaborate with brands, photographers, designers, and agencies to create impactful visual stories that leave a lasting impression.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Ronoh Vincent is an emerging fashion and editorial model recognized for his versatility, confidence, and ability to adapt to different creative concepts. Standing at 6'0", he brings a commanding presence, professionalism, and dedication to every shoot and runway appearance.
          </p>

          <div className="grid grid-cols-2 gap-y-6 gap-x-12 border-l border-[#D4AF37]/30 pl-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-xs uppercase tracking-widest text-[#D4AF37] mb-1">{stat.label}</p>
                <p className="text-lg font-medium">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex gap-4">
             <Button className="bg-[#D4AF37] hover:bg-[#B8962E] text-white rounded-none uppercase tracking-widest px-8">
               <Download className="mr-2 h-4 w-4" /> Comp Card
             </Button>
             <div className="flex items-center gap-4 ml-4">
               <a href="#" className="p-2 rounded-full border border-muted hover:border-[#D4AF37] transition-colors"><Instagram size={20} /></a>
               <a href="#" className="p-2 rounded-full border border-muted hover:border-[#D4AF37] transition-colors"><Mail size={20} /></a>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const StatsTable = () => (
  <section className="py-20 bg-muted/30">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
         <h2 className="text-3xl font-serif font-bold uppercase tracking-widest">Model <span className="text-[#D4AF37]">Statistics</span></h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-background p-8 md:p-12 shadow-2xl border border-[#D4AF37]/20">
        {MEASUREMENTS.map((m, idx) => (
          <div key={m.label} className={`flex justify-between items-center py-4 border-b last:border-0 ${idx === MEASUREMENTS.length - 1 && idx % 2 === 0 ? 'md:border-b-0' : ''}`}>
            <span className="text-muted-foreground font-medium uppercase tracking-tighter text-sm">{m.label}</span>
            <span className="font-serif font-semibold text-lg">{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("Fashion");

  const categoryImages: Record<string, string> = {
    "Fashion": IMAGES.categories.fashion,
    "Editorial": IMAGES.categories.editorial,
    "Commercial": IMAGES.categories.commercial,
    "Lifestyle": IMAGES.categories.lifestyle,
    "Streetwear": IMAGES.categories.streetwear,
    "Runway": IMAGES.categories.runway,
    "Brand Campaigns": IMAGES.categories.editorial,
  };

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">The <span className="text-[#D4AF37]">Portfolio</span></h2>
            <p className="text-muted-foreground max-w-xl">A curated selection of my professional work across various modeling genres.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all duration-300 ${activeCategory === cat ? 'bg-[#D4AF37] border-[#D4AF37] text-white' : 'hover:border-[#D4AF37]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="group relative aspect-[3/4] overflow-hidden bg-muted">
                  <img 
                    src={categoryImages[activeCategory] || IMAGES.categories.fashion} 
                    alt={`${activeCategory} photo ${i}`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="outline" className="text-white border-white rounded-none uppercase tracking-widest">
                      Full View
                    </Button>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Services = () => (
  <section id="services" className="py-24 bg-black text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Professional <span className="text-[#D4AF37]">Services</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Providing high-end modeling services with a focus on professionalism and artistic expression.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((service, idx) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="bg-white/5 border-white/10 hover:border-[#D4AF37]/50 transition-colors group h-full rounded-none">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors">
                  <service.icon className="w-8 h-8 text-[#D4AF37] group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-white">{service.title}</h3>
                <div className="w-8 h-px bg-[#D4AF37] mb-4" />
                <p className="text-gray-400 text-sm leading-relaxed">
                  Tailored solutions for brands and photographers seeking a professional edge.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    description: '',
    budget: '',
    date: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! Your booking request has been sent successfully.");
    setFormData({
      fullName: '',
      company: '',
      email: '',
      phone: '',
      projectType: '',
      description: '',
      budget: '',
      date: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="booking" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-serif font-bold mb-8">Book <span className="text-[#D4AF37]">Me</span></h2>
            <p className="text-muted-foreground mb-12">
              Interested in collaborating? Please fill out the form below with your project details, and I will get back to you as soon as possible.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-muted rounded-full text-[#D4AF37]">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Email</h4>
                  <p className="text-muted-foreground">kipkoechvincent163@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-muted rounded-full text-[#D4AF37]">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Location</h4>
                  <p className="text-muted-foreground">Kenya | Worldwide Availability</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 border border-[#D4AF37]/20 bg-[#D4AF37]/5">
              <h4 className="font-serif font-bold text-xl mb-4 text-[#D4AF37]">Professional Statement</h4>
              <p className="text-sm italic text-muted-foreground leading-relaxed">
                "Available for fashion editorials, commercial campaigns, brand partnerships, lifestyle shoots, and runway opportunities. Open to collaborating with agencies, photographers, designers, and brands seeking a professional and versatile model."
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Full Name</label>
                  <Input 
                    required 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="rounded-none border-muted focus:border-[#D4AF37] transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Company / Brand</label>
                  <Input 
                    required 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="rounded-none border-muted focus:border-[#D4AF37] transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Email Address</label>
                  <Input 
                    required 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-none border-muted focus:border-[#D4AF37] transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Phone Number</label>
                  <Input 
                    required 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="rounded-none border-muted focus:border-[#D4AF37] transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Project Type</label>
                  <select 
                    required 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full h-10 px-3 py-2 bg-transparent border border-muted focus:border-[#D4AF37] outline-none text-sm"
                  >
                    <option value="">Select a type</option>
                    {PORTFOLIO_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Preferred Date</label>
                  <Input 
                    required 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="rounded-none border-muted focus:border-[#D4AF37] transition-colors" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold">Budget Range</label>
                <Input 
                  required 
                  placeholder="e.g. $500 - $1000" 
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="rounded-none border-muted focus:border-[#D4AF37] transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold">Project Description</label>
                <Textarea 
                  required 
                  rows={5} 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="rounded-none border-muted focus:border-[#D4AF37] transition-colors" 
                />
              </div>
              <Button type="submit" className="w-full bg-black text-white hover:bg-[#D4AF37] hover:text-white transition-all duration-300 rounded-none py-6 uppercase tracking-[0.2em] font-bold">
                Send Request <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const InstagramFeed = () => (
  <section className="py-24 bg-muted/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-serif font-bold uppercase tracking-widest mb-4">Social <span className="text-[#D4AF37]">Feed</span></h2>
        <p className="text-muted-foreground">Follow @ronoh_vincent for latest updates and behind the scenes.</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {[
          IMAGES.categories.fashion,
          IMAGES.categories.editorial,
          IMAGES.categories.commercial,
          IMAGES.categories.lifestyle,
          IMAGES.categories.streetwear,
          IMAGES.categories.runway,
          IMAGES.categories.fashion,
          IMAGES.categories.editorial,
          IMAGES.categories.commercial,
          IMAGES.categories.lifestyle,
          IMAGES.categories.streetwear,
          IMAGES.categories.runway,
        ].map((img, i) => (
          <motion.a
            key={i}
            href="#"
            whileHover={{ scale: 1.05 }}
            className="aspect-square overflow-hidden relative group"
          >
            <img src={img} alt="Model Portfolio Highlight" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Instagram className="text-white w-6 h-6" />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black text-white py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-4xl font-serif font-bold tracking-[0.2em] mb-4">RONOH <span className="text-[#D4AF37]">VINCENT</span></h2>
        <p className="text-[#D4AF37] text-sm uppercase tracking-widest mb-8">Fashion Model | Editorial Talent | Commercial Model</p>
        <p className="text-gray-400 max-w-lg mb-12">Bringing confidence, creativity, and style to every frame.</p>
        <div className="flex gap-6">
          <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"><Instagram size={20} /></a>
          <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"><Mail size={20} /></a>
        </div>
      </div>
      
      <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Ronoh Vincent. All Rights Reserved.</p>
        <div className="text-center md:text-right">
          <p className="text-gray-400 text-sm max-w-md">
            Available for fashion editorials, commercial campaigns, brand collaborations, and runway opportunities worldwide.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#D4AF37] selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@100..900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif !important; }
        .font-sans { font-family: 'Inter', sans-serif !important; }
      ` }} />
      <Toaster position="top-center" />
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <main>
        <Hero />
        <About />
        <StatsTable />
        <Portfolio />
        <Services />
        <BookingForm />
        <InstagramFeed />
      </main>
      <Footer />
    </div>
  );
}
