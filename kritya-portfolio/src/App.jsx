import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Mail, Linkedin, Github, ExternalLink, Award, Briefcase, GraduationCap, Code, Palette, TrendingUp, Sparkles, Heart, Zap, Star, ArrowRight, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState([])
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const heroRef = useRef(null)

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.5 + 0.2,
    }))
    setParticles(newParticles)
  }, [])

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight,
      })))
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'achievements', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const skills = {
    'Business & Entrepreneurship': {
      skills: ['Project Management', 'Market Analysis', 'Business Strategy', 'Consulting'],
      color: 'from-purple-500 to-pink-500',
      icon: '💼'
    },
    'Design & Development': {
      skills: ['UI/UX Designing', 'Pitch Deck Design', 'Canva', 'Figma', 'HTML', 'CSS', 'React'],
      color: 'from-blue-500 to-cyan-500',
      icon: '🎨'
    },
    'Technology': {
      skills: ['Numpy', 'Pandas', 'Seaborn', 'Matplotlib', 'Product Development'],
      color: 'from-green-500 to-emerald-500',
      icon: '⚡'
    }
  }

  const experiences = [
    {
      title: 'StyleSync Startup',
      role: 'Founder & Developer',
      description: 'Built MVP for virtual closet recommendation system with occasion-based clothing recommendations',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-600',
      period: '2024 - Present',
      tags: ['Startup', 'MVP', 'Product Development']
    },
    {
      title: 'Gofloww',
      role: 'Business Development Intern',
      description: 'Working with sales and marketing team, leading Facebook and LinkedIn community',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600',
      period: '2024 - Present',
      tags: ['Business Development', 'Community Management', 'Marketing']
    },
    {
      title: 'Student Alumni Interaction Cell, IIT (BHU)',
      role: 'Student Executive',
      description: 'Organizing reunions and alumni meets, designing brochures',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600',
      period: '2024',
      tags: ['Leadership', 'Event Management', 'Design']
    },
    {
      title: 'TechneX \'25',
      role: 'Public Relations Team Member',
      description: 'Contributing to one of the largest technical festivals',
      icon: <Code className="w-6 h-6" />,
      color: 'from-orange-500 to-red-600',
      period: '2025',
      tags: ['Public Relations', 'Technical Festival', 'Team Collaboration']
    }
  ]

  const projects = [
    {
      title: 'Design Rush | E-Summit | IIT (BHU)',
      description: 'UI design for Prodes Learn with user flow analysis and wireframes in Figma',
      tags: ['UI/UX', 'Figma', 'Design Competition'],
      emoji: '🎨',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      title: 'Land Cover Prediction Model',
      description: 'Logistic Regression model for land cover types using NDVI time-series data from satellite imagery',
      tags: ['Machine Learning', 'Python', 'Data Science'],
      emoji: '🛰️',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      title: 'Sustainable Health Ecosystem',
      description: 'Building futuristic health solutions for Prodnosis 5.O at TechneX\'25',
      tags: ['Healthcare', 'Innovation', 'Product Development'],
      emoji: '🏥',
      gradient: 'from-green-600 to-emerald-600'
    }
  ]

  const achievements = [
    { text: 'First Runner up - Google Startup Weekend', emoji: '🏆', color: 'from-yellow-400 to-orange-500' },
    { text: 'Top 3 team - Inter IIT league by TPS', emoji: '🥉', color: 'from-bronze-400 to-orange-600' },
    { text: 'National Winners - Prodnosis 5.0 at Technex\'25 (IIT BHU)', emoji: '🏅', color: 'from-gold-400 to-yellow-600' },
    { text: 'First Runner up - Kotler\'s Maniac by B.A.S.H 7.0', emoji: '🥈', color: 'from-gray-400 to-gray-600' },
    { text: 'First Position - CaseX: Case Study Competition (E-Summit\' 25)', emoji: '🥇', color: 'from-yellow-400 to-gold-500' },
    { text: 'First Runner up - Xpanse: B-Plan Competition (E-Summit\' 25)', emoji: '🏆', color: 'from-purple-400 to-pink-500' },
    { text: 'First Runner up - AdVenture: Branding Competition (E-Summit\' 25)', emoji: '🎯', color: 'from-red-400 to-pink-500' },
    { text: 'Second Runner up - The Founder\'s Gambit (E-Summit\' 25)', emoji: '🎮', color: 'from-blue-400 to-purple-500' },
    { text: 'First Position - Masquerades skit performance (AAGMAN\' 25)', emoji: '🎭', color: 'from-indigo-400 to-purple-500' },
    { text: 'First Runner up - Short Film Making Competition (The Cine Club, IIT BHU)', emoji: '🎬', color: 'from-teal-400 to-blue-500' }
  ]

  const FloatingElement = ({ children, delay = 0, duration = 4 }) => (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )

  const GeometricShape = ({ className, delay = 0 }) => (
    <motion.div
      className={className}
      animate={{
        rotate: [0, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        delay,
        ease: "linear"
      }}
    />
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden relative">
      {/* Advanced Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
          style={{ y: backgroundY }}
        />
        
        {/* Animated geometric shapes */}
        <GeometricShape 
          className="absolute top-20 left-20 w-32 h-32 border-2 border-purple-500/30 rounded-full"
          delay={0}
        />
        <GeometricShape 
          className="absolute top-40 right-32 w-24 h-24 border-2 border-cyan-500/30 transform rotate-45"
          delay={5}
        />
        <GeometricShape 
          className="absolute bottom-32 left-1/4 w-40 h-40 border-2 border-pink-500/30 rounded-full"
          delay={10}
        />
        
        {/* Animated gradient blobs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, -150, 100, 0],
            y: [0, 100, -50, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, 200, -100, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.opacity,
              width: particle.size,
              height: particle.size,
            }}
          />
        ))}

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Mouse follower with trail effect */}
        <motion.div
          className="absolute w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-screen filter blur-sm"
          animate={{
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              <FloatingElement>
                ✨ Kritya
              </FloatingElement>
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Skills', 'Experience', 'Projects', 'Achievements', 'Contact'].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 hover:text-purple-400 hover:scale-110 ${
                    activeSection === item.toLowerCase() ? 'text-purple-400' : 'text-gray-300'
                  }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section 
        id="home" 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <FloatingElement delay={0.2}>
              <div className="text-8xl mb-6">🚀</div>
            </FloatingElement>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              KRITYA
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              PANDEY
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <p className="text-xl md:text-2xl mb-4 font-light tracking-wide text-gray-300">
              BUSINESS DEVELOPMENT & PRODUCT DESIGN ENTHUSIAST
            </p>
            <p className="text-lg md:text-xl text-purple-300 flex items-center justify-center gap-2">
              <GraduationCap className="w-6 h-6" />
              IIT (BHU), Varanasi '29
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          >
            <motion.div whileHover={{ scale: 1.05, rotate: 2 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg border-0 shadow-lg shadow-purple-500/25 rounded-full"
              >
                <Heart className="w-5 h-5 mr-2" />
                Get in Touch
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, rotate: -2 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => scrollToSection('projects')}
                variant="outline" 
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900 px-8 py-4 text-lg shadow-lg shadow-purple-500/25 rounded-full"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                View Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="cursor-pointer"
              onClick={() => scrollToSection('about')}
            >
              <ChevronDown className="w-8 h-8 text-purple-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800/30 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4">
              <FloatingElement>🌟</FloatingElement>
              About Me
              <FloatingElement delay={0.5}>✨</FloatingElement>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-yellow-400" />
                Professional Background
              </h3>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  Passionate business development and product design enthusiast with a proven track record in building innovative solutions and leading successful ventures. Currently pursuing my undergraduate degree at IIT (BHU), Varanasi.
                </p>
                <p>
                  I combine business acumen with design thinking to create impactful solutions. My interests include studying business strategies, critically examining market dynamics, designing user-centric products, and reading novels.
                </p>
                <p>
                  Currently working as a Business Development Intern at Gofloww, where I lead community initiatives and work closely with sales and marketing teams.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: Award, title: "10+ Awards", desc: "Competition wins", color: "from-yellow-400 to-orange-500", emoji: "🏆" },
                { icon: Briefcase, title: "Startup Founder", desc: "Built StyleSync MVP", color: "from-purple-400 to-pink-500", emoji: "🚀" },
                { icon: GraduationCap, title: "IIT Student", desc: "IIT (BHU), Varanasi", color: "from-blue-400 to-cyan-500", emoji: "🎓" },
                { icon: Palette, title: "Design Expert", desc: "UI/UX & Product Design", color: "from-green-400 to-emerald-500", emoji: "🎨" }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 group"
                >
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4">
              <FloatingElement>🛠️</FloatingElement>
              Skills & Technologies
              <FloatingElement delay={0.3}>⚡</FloatingElement>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto"></div>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, data], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -10 }}
                className="group"
              >
                <Card className="h-full bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-purple-500 transition-all duration-500 rounded-2xl overflow-hidden">
                  <CardHeader className="text-center pb-4">
                    <div className="text-5xl mb-4">{data.icon}</div>
                    <CardTitle className={`text-2xl bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}>
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {data.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: skillIndex * 0.1 }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Badge 
                            variant="secondary" 
                            className={`text-sm bg-gradient-to-r ${data.color}/20 text-purple-300 border-purple-500/30 hover:border-purple-400 transition-all duration-300`}
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-800/30 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4">
              <FloatingElement>💼</FloatingElement>
              Experience
              <FloatingElement delay={0.4}>🚀</FloatingElement>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto"></div>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotate: 1 }}
                className="group"
              >
                <Card className="h-full bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 rounded-2xl overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`p-4 bg-gradient-to-r ${exp.color} rounded-xl text-white group-hover:scale-110 transition-transform`}>
                        {exp.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-xl text-white">{exp.title}</CardTitle>
                          <span className="text-sm text-purple-400 font-medium">{exp.period}</span>
                        </div>
                        <CardDescription className="text-purple-400 font-medium text-lg">{exp.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-purple-500/30 text-purple-300 hover:border-purple-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4">
              <FloatingElement>🎯</FloatingElement>
              Featured Projects
              <FloatingElement delay={0.2}>💡</FloatingElement>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto"></div>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="group"
              >
                <Card className="h-full bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 rounded-2xl overflow-hidden">
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{project.emoji}</div>
                    <CardTitle className="text-xl text-white leading-tight">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.div
                          key={tag}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: tagIndex * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge 
                            variant="outline" 
                            className={`text-xs bg-gradient-to-r ${project.gradient}/20 border-purple-500/30 text-purple-300 hover:border-purple-400`}
                          >
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-gray-800/30 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4">
              <FloatingElement>🏆</FloatingElement>
              Awards & Achievements
              <FloatingElement delay={0.6}>🌟</FloatingElement>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto"></div>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotate: 1 }}
                className="group"
              >
                <div className="flex items-center gap-6 p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/25">
                  <div className={`text-4xl p-4 bg-gradient-to-r ${achievement.color} rounded-full group-hover:scale-110 transition-transform`}>
                    {achievement.emoji}
                  </div>
                  <p className="text-gray-300 flex-1 leading-relaxed">{achievement.text}</p>
                  <Star className="w-6 h-6 text-yellow-400 group-hover:rotate-12 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 flex items-center justify-center gap-4">
              <FloatingElement>💌</FloatingElement>
              Let's Connect
              <FloatingElement delay={0.3}>🤝</FloatingElement>
            </h2>
            <div className="w-32 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Feel free to reach out for collaborations, opportunities, or just a friendly chat about business, design, or technology! ✨
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05, rotate: 2 }} whileTap={{ scale: 0.95 }}>
              <Button 
                asChild
                className="bg-white text-purple-600 hover:bg-purple-50 px-10 py-4 text-lg shadow-2xl shadow-purple-500/25 rounded-full"
              >
                <a href="mailto:krityapandey30@gmail.com" className="flex items-center gap-3">
                  <Mail className="w-6 h-6" />
                  Email Me
                  <Heart className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, rotate: -2 }} whileTap={{ scale: 0.95 }}>
              <Button 
                asChild
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-10 py-4 text-lg shadow-2xl shadow-purple-500/25 rounded-full"
              >
                <a 
                  href="https://www.linkedin.com/in/kritya-pandey-13a748326" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Linkedin className="w-6 h-6" />
                  LinkedIn
                  <Sparkles className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400 flex items-center justify-center gap-2 text-lg"
          >
            © 2025 Kritya Pandey. Built with passion and purpose.
            <Heart className="w-5 h-5 text-red-400" />
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </motion.p>
        </div>
      </footer>
    </div>
  )
}

export default App

