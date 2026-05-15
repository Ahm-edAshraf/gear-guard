import { DashboardStats } from '@/lib/dashboard';
import { Box, Layers, Activity, CheckSquare, CornerDownLeft, AlertCircle, AlertOctagon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardStatsCards({ stats }: { stats: DashboardStats }) {
  const statItems = [
    { label: 'Total Equipment', value: stats.totalEquipment, icon: <Box size={20} />, color: 'text-gray-400' },
    { label: 'Total Logs', value: stats.totalBookings, icon: <Layers size={20} />, color: 'text-gray-400' },
    { label: 'Active', value: stats.activeBookings, icon: <Activity size={20} />, color: 'text-accent' },
    { label: 'Picked Up', value: stats.pickedUpItems, icon: <CheckSquare size={20} />, color: 'text-blue-500' },
    { label: 'Returned', value: stats.returnedItems, icon: <CornerDownLeft size={20} />, color: 'text-green-500' },
    { label: 'Overdue', value: stats.overdueItems, icon: <AlertCircle size={20} />, color: 'text-red-500' },
    { label: 'Damaged', value: stats.damagedItems, icon: <AlertOctagon size={20} />, color: 'text-red-500' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {statItems.map((item, index) => (
        <motion.div 
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-[#141414] border border-border p-4 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-gray-500 transition-colors"
        >
          <div className={`absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity ${item.color}`}>
            <div className="scale-[3]">{item.icon}</div>
          </div>
          
          <div className={`${item.color} mb-2`}>{item.icon}</div>
          <span className="text-3xl font-black font-mono mb-1">{item.value}</span>
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
