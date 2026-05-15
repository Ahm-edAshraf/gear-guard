import clsx from 'clsx';

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (s: string) => {
    switch (s) {
      case 'Available':
      case 'Returned':
        return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'In Use':
      case 'Picked Up':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      case 'Booked':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'Overdue':
      case 'Damaged':
      case 'Needs Repair':
        return 'bg-red-500/20 text-red-500 border-red-500/50';
      case 'Maintenance':
      case 'Cancelled':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <span className={clsx(
      "inline-flex items-center px-2.5 py-0.5 rounded-none border font-mono text-xs uppercase tracking-wider font-bold",
      getStatusConfig(status)
    )}>
      {status}
    </span>
  );
}
