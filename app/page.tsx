'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Box, CalendarClock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-24 py-12"
    >
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] -z-10" />
        
        <motion.div variants={itemVariants} className="max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8">
            BOOK CAMPUS<br />
            <span className="text-accent">EQUIPMENT</span><br />
            WITHOUT CHAOS.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-mono max-w-2xl mb-12 border-l-4 border-accent pl-6">
            Reserve projectors, cameras, microphones, laptops, and event tools in seconds. Built for speed, utility, and accountability.
          </p>
          
          <div className="flex flex-wrap gap-6">
            <Link href="/equipment" className="btn-brutal text-lg">
              Browse Equipment <ArrowRight className="ml-2" />
            </Link>
            <Link href="/book" className="btn-brutal-outline text-lg">
              Create Booking
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Problem & Solution */}
      <section className="grid md:grid-cols-2 gap-12">
        <motion.div variants={itemVariants} className="card-brutal">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-red-500/20 text-red-500">
              <ShieldAlert size={32} />
            </div>
            <h2 className="text-2xl font-black">The Problem</h2>
          </div>
          <ul className="space-y-4 font-mono text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold mt-1">X</span>
              Equipment booking is manual, fragmented, and confusing.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold mt-1">X</span>
              Double bookings happen due to lack of real-time sync.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold mt-1">X</span>
              Late returns and damaged items are impossible to track.
            </li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="card-brutal !border-accent">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-accent/20 text-accent">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-black text-accent">The Solution</h2>
          </div>
          <ul className="space-y-4 font-mono text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold mt-1">/</span>
              Real-time availability and smart conflict prevention.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold mt-1">/</span>
              Instantly book equipment with automated validation.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold mt-1">/</span>
              Track pickup, return, overdue, and damage statuses.
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section>
        <motion.h2 variants={itemVariants} className="text-4xl font-black mb-12">Key Features</motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <CalendarClock size={24} />,
              title: "Conflict Check",
              desc: "Mathematical overlap detection prevents double booking of the same item."
            },
            {
              icon: <Box size={24} />,
              title: "Lifecycle Tracking",
              desc: "Monitor an item's state from 'Booked' to 'Picked Up' to 'Returned'."
            },
            {
              icon: <ShieldAlert size={24} />,
              title: "Overdue Detection",
              desc: "Automatically flag items that haven't been returned past their deadline."
            }
          ].map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants} className="p-6 border-t-4 border-border bg-[#141414] hover:bg-[#1a1a1a] transition-colors">
              <div className="text-accent mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="font-mono text-sm text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
