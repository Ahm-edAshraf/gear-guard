import { Equipment } from '@/types';
import StatusBadge from './StatusBadge';
import Link from 'next/link';
import { Box, MapPin, Activity } from 'lucide-react';

interface EquipmentCardProps {
  equipment: Equipment;
}

export default function EquipmentCard({ equipment }: EquipmentCardProps) {
  return (
    <div className="card-brutal flex flex-col h-full group">
      {/* Image Preview */}
      <div className="h-48 w-full bg-[#1a1a1a] border-2 border-border mb-6 flex items-center justify-center text-border group-hover:text-accent transition-colors relative overflow-hidden">
        {equipment.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={equipment.image} alt={equipment.name} className="w-full h-full object-cover" />
        ) : (
          <Box size={48} strokeWidth={1} />
        )}
      </div>
      
      <div className="flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4 gap-2">
          <h3 className="text-xl font-bold font-sans uppercase leading-tight">
            {equipment.name}
          </h3>
          <StatusBadge status={equipment.status} />
        </div>
        
        <div className="space-y-3 font-mono text-sm text-gray-400 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-accent">CAT</span>
            <span className="uppercase">{equipment.category}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
            <span>{equipment.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-accent shrink-0" />
            <span>Condition: {equipment.condition}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t-2 border-border">
          <Link 
            href={`/book?equipment=${equipment.id}`}
            className="w-full btn-brutal-outline block text-center"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
