export const CATEGORIES = [
  {
    id: 'daily-speaking',
    name: 'Daily Speaking',
    icon: '💬',
    color: '#7c3aed',
    description: 'Everyday conversations and common expressions',
  },
  {
    id: 'job-interview',
    name: 'Job Interview',
    icon: '💼',
    color: '#0891b2',
    description: 'Professional language for career success',
  },
  {
    id: 'travel-english',
    name: 'Travel English',
    icon: '✈️',
    color: '#059669',
    description: 'Navigate the world with confidence',
  },
  {
    id: 'office-communication',
    name: 'Office Communication',
    icon: '🏢',
    color: '#d97706',
    description: 'Workplace emails, meetings, and collaboration',
  },
  {
    id: 'technology-english',
    name: 'Technology English',
    icon: '💻',
    color: '#dc2626',
    description: 'Tech vocabulary for the digital age',
  },
]

export function getCategoryById(id) {
  return CATEGORIES.find(c => c.id === id) || null
}
