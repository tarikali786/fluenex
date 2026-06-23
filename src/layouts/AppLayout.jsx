import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import BottomNav from '../components/BottomNav'
import Toast from '../components/Toast'
import { useApp } from '../context/AppContext'

export default function AppLayout() {
  const { settings } = useApp()
  const location = useLocation()

  // Reader screen occupies the full viewport — hide the bottom nav
  const isReader = /\/day\/\d+$/.test(location.pathname) || /\/grammar\/[^/]+\/read$/.test(location.pathname)

  useEffect(() => {
    document.body.classList.toggle('light', settings.theme === 'light')
  }, [settings.theme])

  return (
    <>
      <div
        className="min-h-svh flex flex-col"
        style={{ background: 'var(--bg)' }}
      >
        <main className={isReader ? 'flex-1' : 'flex-1 pb-[4.5rem]'}>
          <Outlet />
        </main>
        {!isReader && <BottomNav />}
      </div>
      <Toast />
    </>
  )
}
