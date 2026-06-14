import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Lock, PlayCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getCategoryById } from '../data/categories'
import { CHALLENGE_CONTENT } from '../data/challengeContent'

export default function ChallengeDetail() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const { getCategoryProgress, isDayComplete } = useApp()

  const category = getCategoryById(categoryId)
  const days = CHALLENGE_CONTENT[categoryId] || []
  const prog = getCategoryProgress(categoryId)

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-svh px-6 text-center">
        <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>Category not found</p>
        <button onClick={() => navigate('/challenge')} className="text-sm underline" style={{ color: '#a78bfa' }}>
          Back to Challenges
        </button>
      </div>
    )
  }

  function getDayStatus(day) {
    if (isDayComplete(categoryId, day)) return 'done'
    if (day === 1) return 'available'
    if (isDayComplete(categoryId, day - 1)) return 'available'
    return 'locked'
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Sticky header */}
      <div
        className="sticky top-0 z-10 px-4 pt-12 pb-4"
        style={{ background: 'var(--bg-t95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--surface)' }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 mb-4 text-sm"
          style={{ color: 'var(--text2)' }}
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text)' }}>{category.name}</h1>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>{category.description}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-xl p-3 border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--text3)' }}>
            <span>{prog.completed} of 40 days complete</span>
            <span>{prog.percentage}%</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${prog.percentage}%`, background: category.color }}
            />
          </div>
        </div>
      </div>

      {/* Day list */}
      <div className="px-4 pt-3 pb-6 space-y-2">
        {days.map(({ day, title }) => {
          const status = getDayStatus(day)
          const isLocked = status === 'locked'
          const isDone = status === 'done'

          return (
            <button
              key={day}
              disabled={isLocked}
              onClick={() => !isLocked && navigate(`/challenge/${categoryId}/day/${day}`)}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all
                ${isLocked ? 'cursor-not-allowed opacity-35' : 'active:scale-[0.98]'}`}
              style={{
                background: 'var(--card)',
                borderColor: isDone ? `${category.color}35` : 'var(--border)',
              }}
            >
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: isDone
                    ? `${category.color}20`
                    : isLocked ? 'var(--surface)' : 'rgba(124,58,237,0.12)',
                  color: isDone ? category.color : isLocked ? 'var(--text3)' : '#a78bfa',
                }}
              >
                {isDone ? <CheckCircle2 size={15} /> : isLocked ? <Lock size={13} /> : day}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium" style={{ color: 'var(--text3)' }}>Day {day}</p>
                <p className="text-sm font-medium truncate" style={{ color: isLocked ? 'var(--text3)' : 'var(--text)' }}>
                  {title}
                </p>
              </div>

              {!isLocked && !isDone && (
                <PlayCircle size={18} className="flex-shrink-0" style={{ color: category.color }} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
