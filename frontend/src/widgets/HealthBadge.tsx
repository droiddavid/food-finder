import { useQuery } from '@tanstack/react-query';
import { getHealth } from '../lib/api';

export default function HealthBadge() {
     const { data, isLoading, isError } = useQuery({ queryKey: ['health'], queryFn: getHealth, refetchInterval: 15000 });

     const status = isLoading ? '...' : isError ? 'DOWN' : data?.status ?? 'UNKNOWN';

     const color = status === 'UP' ? 'bg-green-500' : status === 'DOWN' ? 'bg-red-500' : 'bg-yellow-500';

     return (
          <span className={`text-white text-xs px-2 py-1 rounded ${color}`}>API: {status}</span>
     );
}