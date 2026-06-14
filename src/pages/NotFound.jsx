import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div
      className="flex flex-col items-center justify-center min-h-svh px-6 text-center"
      style={{ background: '#0a0a0f' }}
    >
      <p
        className="text-8xl font-bold mb-4"
        style={{ color: '#1a1a28' }}
      >
        404
      </p>
      <h1 className="text-xl font-bold mb-2" style={{ color: '#f1f1f5' }}>
        Page Not Found
      </h1>
      <p className="text-sm mb-8" style={{ color: '#8b8ba8' }}>
        The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-7 py-3 rounded-2xl font-semibold text-white"
        style={{ background: '#7c3aed' }}
      >
        Go Home
      </button>
    </div>
  )
}
