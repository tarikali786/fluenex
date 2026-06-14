import { useApp } from '../context/AppContext'

const THEMES = [
  { value: 'dark',  label: 'Dark',  icon: '🌙' },
  { value: 'light', label: 'Light', icon: '☀️' },
]

const FONT_SIZES = [
  { value: 'small',       label: 'Small'       },
  { value: 'medium',      label: 'Medium'      },
  { value: 'large',       label: 'Large'       },
  { value: 'extra-large', label: 'Extra Large' },
]

const READING_MODES = [
  { value: 'beginner',     label: 'Beginner',     detail: '1x → 2x speed' },
  { value: 'intermediate', label: 'Intermediate', detail: '1x → 3x speed' },
  { value: 'advanced',     label: 'Advanced',     detail: '1x → 4x speed' },
]

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-wider mb-2 px-1" style={{ color: 'var(--text3)' }}>
        {title}
      </p>
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        {children}
      </div>
    </div>
  )
}

function Radio({ checked, color = '#7c3aed' }) {
  return (
    <div
      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
      style={{ borderColor: checked ? color : 'var(--border)', background: checked ? color : 'transparent' }}
    >
      {checked && <div className="w-2 h-2 rounded-full bg-white" />}
    </div>
  )
}

export default function Settings() {
  const { settings, updateSetting, resetAllData } = useApp()

  function handleReset() {
    if (window.confirm('Reset all data? This will clear your progress, vocabulary, and achievements.')) {
      resetAllData()
    }
  }

  return (
    <div className="px-4 pt-14 pb-6 max-w-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text2)' }}>Customize your experience</p>
      </div>

      {/* Theme */}
      <Section title="Theme">
        <div className="flex">
          {THEMES.map(({ value, label, icon }, idx) => (
            <button
              key={value}
              onClick={() => updateSetting('theme', value)}
              className="flex-1 py-4 flex flex-col items-center gap-1.5 transition-all"
              style={{
                background: settings.theme === value ? 'rgba(124,58,237,0.12)' : 'transparent',
                color: settings.theme === value ? '#a78bfa' : 'var(--text2)',
                borderRight: idx < THEMES.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <span className="text-xl">{icon}</span>
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* Font Size */}
      <Section title="Font Size">
        {FONT_SIZES.map(({ value, label }, idx) => (
          <button
            key={value}
            onClick={() => updateSetting('fontSize', value)}
            className="w-full flex items-center justify-between px-4 py-3.5 transition-all"
            style={{ borderBottom: idx < FONT_SIZES.length - 1 ? '1px solid var(--surface)' : 'none' }}
          >
            <span className="text-sm" style={{ color: 'var(--text)' }}>{label}</span>
            <Radio checked={settings.fontSize === value} />
          </button>
        ))}
      </Section>

      {/* Reading Mode */}
      <Section title="Reading Mode">
        {READING_MODES.map(({ value, label, detail }, idx) => (
          <button
            key={value}
            onClick={() => updateSetting('readingMode', value)}
            className="w-full flex items-center justify-between px-4 py-3.5 transition-all"
            style={{ borderBottom: idx < READING_MODES.length - 1 ? '1px solid var(--surface)' : 'none' }}
          >
            <div className="text-left">
              <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{label}</p>
              <p className="text-xs" style={{ color: 'var(--text3)' }}>{detail}</p>
            </div>
            <Radio checked={settings.readingMode === value} />
          </button>
        ))}
      </Section>

      {/* Data */}
      <Section title="Data">
        <button onClick={handleReset} className="w-full px-4 py-3.5 text-left text-sm font-medium" style={{ color: '#ef4444' }}>
          Reset All Data
        </button>
      </Section>

      <p className="text-center text-xs mt-8" style={{ color: 'var(--text3)' }}>
        FLUENEX · Build Fluency Every Day
      </p>
    </div>
  )
}
