'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import './profile.css'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    setUser(user)
    
    // Load profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    
    setProfile(profile)
    setLoading(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)

    const formData = new FormData(e.target)
    const updates = {
      name: formData.get('name'),
      city: formData.get('city'),
      state: formData.get('state'),
      country: formData.get('country'),
      postal_code: formData.get('postal_code'),
      updated_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)

    if (!error) {
      setProfile({ ...profile, ...updates })
      setEditing(false)
    }

    setSaving(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return <div className="profile-container"><p>Loading...</p></div>
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button onClick={handleSignOut} className="sign-out-btn">Sign Out</button>
      </div>

      <div className="profile-card">
        <div className="membership-status">
          <h2>✅ Active Member</h2>
          <p>You have access to exclusive content</p>
        </div>

        {!editing ? (
          <div className="profile-info">
            <div className="info-row">
              <label>Email:</label>
              <span>{profile?.email}</span>
            </div>
            <div className="info-row">
              <label>Name:</label>
              <span>{profile?.name || 'Not set'}</span>
            </div>
            <div className="info-row">
              <label>Location:</label>
              <span>
                {[profile?.city, profile?.state, profile?.country]
                  .filter(Boolean)
                  .join(', ') || 'Not set'}
              </span>
            </div>
            <div className="info-row">
              <label>Member Since:</label>
              <span>{new Date(profile?.created_at).toLocaleDateString()}</span>
            </div>

            <button onClick={() => setEditing(true)} className="edit-btn">
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSave} className="profile-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                defaultValue={profile?.name}
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                defaultValue={profile?.city}
              />
            </div>
            <div className="form-group">
              <label>State/Province</label>
              <input
                type="text"
                name="state"
                defaultValue={profile?.state}
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                defaultValue={profile?.country}
              />
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                name="postal_code"
                defaultValue={profile?.postal_code}
              />
            </div>

            <div className="form-actions">
              <button type="submit" disabled={saving} className="save-btn">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="profile-links">
        <a href="/members" className="profile-link">
          🎵 Browse Exclusive Content
        </a>
      </div>
    </div>
  )
}
