import { useApp } from '../context/AppContext'
import { CheckCircle, AlertCircle } from 'lucide-react'

export default function Toast() {
  const { toast } = useApp()
  if (!toast) return null

  return (
    <div
      key={toast.id}
      className="fixed top-6 left-1/2 z-[100] -translate-x-1/2 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-2xl text-sm font-medium animate-bounce-in"
      style={{
        background: toast.type === 'error' ? '#1f0a0a' : '#0a1f12',
        border: `1px solid ${toast.type === 'error' ? '#ef444440' : '#10b98140'}`,
        color: toast.type === 'error' ? '#f87171' : '#34d399',
        minWidth: '200px',
        maxWidth: '320px',
        textAlign: 'center',
      }}
    >
      {toast.type === 'error'
        ? <AlertCircle size={16} />
        : <CheckCircle size={16} />
      }
      {toast.message}
    </div>
  )
}
