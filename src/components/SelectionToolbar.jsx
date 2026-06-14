import { Volume2, Star, X, Loader2 } from 'lucide-react'

export default function SelectionToolbar({ word, hindiMeaning, isFetching, onSpeak, onSave, onDismiss }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-8"
      style={{
        background: 'linear-gradient(to top, var(--bg) 65%, transparent 100%)',
        paddingTop: '32px',
      }}
      onClick={e => e.stopPropagation()}
    >
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        {/* Word + dismiss */}
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
          <p className="font-bold text-base" style={{ color: 'var(--text)' }}>{word}</p>
          <button
            onPointerDown={e => { e.preventDefault(); onDismiss() }}
            className="p-1 rounded-lg"
            style={{ color: 'var(--text3)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Hindi meaning */}
        <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: 'var(--border)', minHeight: '48px' }}>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text3)' }}>हिंदी</span>
          {isFetching ? (
            <Loader2 size={14} className="animate-spin" style={{ color: 'var(--text2)' }} />
          ) : hindiMeaning ? (
            <p className="text-sm font-medium" style={{ color: '#a78bfa' }}>{hindiMeaning}</p>
          ) : (
            <p className="text-sm" style={{ color: 'var(--text3)' }}>—</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex">
          <button
            onPointerDown={e => { e.preventDefault(); onSpeak() }}
            className="flex-1 flex items-center justify-center gap-2 py-4"
            style={{ color: 'var(--text2)' }}
          >
            <Volume2 size={18} />
            <span className="text-sm font-semibold">Speak</span>
          </button>
          <div style={{ width: '1px', background: 'var(--border)' }} />
          <button
            onPointerDown={e => { e.preventDefault(); onSave() }}
            className="flex-1 flex items-center justify-center gap-2 py-4"
            style={{ color: '#f59e0b' }}
          >
            <Star size={18} />
            <span className="text-sm font-semibold">Save Word</span>
          </button>
        </div>
      </div>
    </div>
  )
}
