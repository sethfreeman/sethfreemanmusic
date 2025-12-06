'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import './Navbar.css'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        checkIfAdmin(session.user.id)
      } else {
        setIsAdmin(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    if (user) {
      await checkIfAdmin(user.id)
    }
  }

  const checkIfAdmin = async (userId) => {
    // Check if user is admin by calling the database function
    const { data, error } = await supabase.rpc('is_admin')
    if (!error && data === true) {
      setIsAdmin(true)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsAdmin(false)
    setShowMenu(false)
    window.location.href = '/'
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Seth Freeman</h1>
        <p className="tagline">Singer / Songwriter</p>
      </div>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/music">Music</Link></li>
        <li><Link href="/photos">Photos</Link></li>
        <li><Link href="/video">Video</Link></li>
        <li><Link href="/bio">Bio</Link></li>
        <li><Link href="/shows">Tour</Link></li>
        <li><Link href="/members" className="members-link">Members</Link></li>
        {isAdmin && (
          <li><Link href="/admin" className="admin-link">Admin</Link></li>
        )}
        {user ? (
          <li className="user-menu">
            <button onClick={() => setShowMenu(!showMenu)} className="user-button">
              👤
            </button>
            {showMenu && (
              <div className="user-dropdown">
                <div className="user-info">
                  <strong>{user.email}</strong>
                  {isAdmin && <span className="admin-badge">Admin</span>}
                </div>
                <Link href="/profile" onClick={() => setShowMenu(false)}>
                  My Profile
                </Link>
                <Link href="/members" onClick={() => setShowMenu(false)}>
                  Exclusive Content
                </Link>
                <button onClick={handleSignOut} className="sign-out-button">
                  Sign Out
                </button>
              </div>
            )}
          </li>
        ) : (
          <li><Link href="/login" className="login-link">Sign In</Link></li>
        )}
      </ul>
    </nav>
  )
}
