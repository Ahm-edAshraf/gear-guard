'use client';

import { useState, useEffect } from 'react';
import { loadEquipment } from '@/lib/storage';
import { Equipment } from '@/types';
import EquipmentCard from '@/components/EquipmentCard';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setEquipment(loadEquipment());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const categories = ['All', 'Presentation', 'Media', 'Audio', 'Computing', 'Accessories'];

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">EQUIPMENT CATALOGUE</h1>
          <p className="font-mono text-gray-400 border-l-2 border-accent pl-4">
            Browse and reserve available campus resources.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text" 
              placeholder="SEARCH ASSETS..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-brutal pl-10 w-full sm:w-64"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input-brutal pl-10 appearance-none bg-[#0f0f0f]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredEquipment.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-border">
          <p className="font-mono text-xl text-gray-500 uppercase">No equipment found matching criteria.</p>
        </div>
      ) : (
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {filteredEquipment.map((item, index) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <EquipmentCard equipment={item} eager={index < 4} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
