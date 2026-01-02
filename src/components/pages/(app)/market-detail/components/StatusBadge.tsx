interface StatusBadgeProps {
  status: string
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    const lowerStatus = status?.toLowerCase()
    switch (lowerStatus) {
      case 'active': return { bg: 'bg-green-100', text: 'text-green-700', label: 'Active' }
      case 'closed': return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Closed' }
      case 'pending': return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' }
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Unknown' }
    }
  }

  const config = getStatusConfig(status)
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  )
}