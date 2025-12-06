'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import './members.css'

export default function MembersPage() {
  const [user, setUser] = useState(null)
  const [content, setContent] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUserAndLoadContent()
  }, [filter])

  const checkUserAndLoadContent = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    setUser(user)
    await loadContent()
  }

  const loadContent = async () => {
    let query = supabase
      .from('exclusive_content')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (filter !== 'all') {
      query = query.eq('type', filter)
    }

    const { data } = await query
    setContent(data || [])
    setLoading(false)
  }

  const handleView = async (item) => {
    // Increment view count
    await supabase.rpc('increment_view_count', { content_id: item.id })
    
    // Open content
    window.open(item.file_url, '_blank')
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return ''
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  if (loading) {
    return <div className="members-container"><p>Loading...</p></div>
  }

  return (
    <div className="members-container">
      <div className="members-header">
        <h1>🎵 Exclusive Content</h1>
        <p>Members-only music, videos, and downloads</p>
      </div>

      <div className="filter-tabs">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'video' ? 'active' : ''}
          onClick={() => setFilter('video')}
        >
          Videos
        </button>
        <button
          className={filter === 'audio' ? 'active' : ''}
          onClick={() => setFilter('audio')}
        >
          Audio
        </button>
        <button
          className={filter === 'photo' ? 'active' : ''}
          onClick={() => setFilter('photo')}
        >
          Photos
        </button>
        <button
          className={filter === 'download' ? 'active' : ''}
          onClick={() => setFilter('download')}
        >
          Downloads
        </button>
      </div>

      {content.length === 0 ? (
        <div className="empty-state">
          <p>No {filter !== 'all' ? filter : ''} content available yet.</p>
          <p>Check back soon for exclusive releases!</p>
        </div>
      ) : (
        <div className="content-grid">
          {content.map((item) => (
            <div key={item.id} className="content-card">
              {item.thumbnail_url && (
                <div className="content-thumbnail">
                  <img src={item.thumbnail_url} alt={item.title} />
                </div>
              )}
              <div className="content-info">
                <div className="content-type-badge">{item.type}</div>
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
                <div className="content-meta">
                  <span>👁️ {item.view_count} views</span>
                  {item.file_size && <span>📦 {formatFileSize(item.file_size)}</span>}
                </div>
                <button
                  onClick={() => handleView(item)}
                  className="view-btn"
                >
                  {item.type === 'download' ? 'Download' : 'View'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="back-link">
        <a href="/profile">← Back to Profile</a>
      </div>
    </div>
  )
}
