'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import './newsletter.css'

export default function NewsletterPage() {
  const [user, setUser] = useState(null)
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')
  const [contacts, setContacts] = useState([])
  const [events, setEvents] = useState([])
  const [releases, setReleases] = useState([])
  const [history, setHistory] = useState([])
  const router = useRouter()

  useEffect(() => {
    checkAdminAndLoadData()
  }, [])

  const checkAdminAndLoadData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    setUser(user)
    await loadData()
  }

  const loadData = async () => {
    // Load contacts
    const { data: contactsData } = await supabase
      .from('contacts')
      .select('email, name')
      .order('email')
    setContacts(contactsData || [])

    // Load recent events
    const { data: eventsData } = await supabase
      .from('events')
      .select('*')
      .eq('is_published', true)
      .gte('event_date', new Date().toISOString())
      .order('event_date', { ascending: true })
      .limit(5)
    setEvents(eventsData || [])

    // Load recent releases
    const { data: releasesData } = await supabase
      .from('releases')
      .select('*')
      .eq('is_published', true)
      .order('release_date', { ascending: false })
      .limit(3)
    setReleases(releasesData || [])

    // Load newsletter history
    const { data: historyData } = await supabase
      .from('newsletters')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    setHistory(historyData || [])
  }

  const handleSend = async (e) => {
    e.preventDefault()
    setSending(true)
    setMessage('Preparing newsletter...')

    const formData = new FormData(e.target)
    const subject = formData.get('subject')
    const introBlurb = formData.get('intro_blurb')
    const recipientType = formData.get('recipient_type')

    try {
      // Get recipients based on type
      let recipients = contacts
      if (recipientType === 'test') {
        // Send only to admin (current user)
        recipients = [{ email: user.email, name: user.user_metadata?.name || 'Admin' }]
      } else if (recipientType === 'members') {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('email, name')
        recipients = profiles || []
      }

      if (recipients.length === 0) {
        throw new Error('No recipients found')
      }

      setMessage(`Sending to ${recipients.length} recipients...`)

      // Send via API route
      const response = await fetch('/api/send-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          introBlurb,
          recipients,
          events: events || [],
          releases: releases || []
        })
      })

      let result
      try {
        result = await response.json()
      } catch (parseError) {
        throw new Error('Server returned invalid response. Check that RESEND_API_KEY is configured.')
      }

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send newsletter')
      }

      // Save to database
      await supabase.from('newsletters').insert({
        subject,
        intro_blurb: introBlurb,
        sent_at: new Date().toISOString(),
        recipient_count: recipients.length,
        status: 'sent'
      })

      setMessage(`✅ Newsletter sent to ${recipients.length} recipients!`)
      e.target.reset()
      await loadData()
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="newsletter-page">
      <h1>Send Newsletter</h1>

      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : message.includes('❌') ? 'error' : 'info'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSend} className="newsletter-form">
        <div className="form-group">
          <label>Subject Line *</label>
          <input
            type="text"
            name="subject"
            defaultValue="Seth Freeman Music - December Update"
            required
          />
        </div>

        <div className="form-group">
          <label>Introduction Message *</label>
          <textarea
            name="intro_blurb"
            rows="4"
            defaultValue="Hey everyone! Here's what's new this month..."
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Send To</label>
          <select name="recipient_type" required>
            <option value="test">Test (Admin Only)</option>
            <option value="all">All Contacts ({contacts.length})</option>
            <option value="members">Members Only</option>
          </select>
        </div>

        <div className="preview-section">
          <h3>Newsletter Preview</h3>
          <div className="preview-content">
            <p><strong>Your intro message will appear here</strong></p>
            
            {events.length > 0 && (
              <div className="preview-block">
                <h4>🎸 Upcoming Shows</h4>
                {events.map(event => (
                  <div key={event.id} className="preview-item">
                    <strong>{event.title}</strong> - {new Date(event.event_date).toLocaleDateString()}
                    {event.location && <span> at {event.location}</span>}
                  </div>
                ))}
              </div>
            )}

            {releases.length > 0 && (
              <div className="preview-block">
                <h4>🎵 New Music</h4>
                {releases.map(release => (
                  <div key={release.id} className="preview-item">
                    <strong>{release.title}</strong> - {new Date(release.release_date).toLocaleDateString()}
                  </div>
                ))}
              </div>
            )}

            {events.length === 0 && releases.length === 0 && (
              <p className="empty-preview">
                Add events or releases to include them in the newsletter
              </p>
            )}
          </div>
        </div>

        <button type="submit" disabled={sending} className="send-btn">
          {sending ? 'Sending...' : 'Send Newsletter'}
        </button>
      </form>

      <div className="newsletter-history">
        <h2>Newsletter History</h2>
        {history.length === 0 ? (
          <p className="empty-message">No newsletters sent yet</p>
        ) : (
          <div className="history-list">
            {history.map(item => (
              <div key={item.id} className="history-item">
                <div className="history-header">
                  <h3>{item.subject}</h3>
                  <span className={`status-badge ${item.status}`}>{item.status}</span>
                </div>
                <p className="history-meta">
                  Sent to {item.recipient_count} recipients on{' '}
                  {new Date(item.sent_at || item.created_at).toLocaleDateString()}
                </p>
                {item.intro_blurb && (
                  <p className="history-preview">{item.intro_blurb.substring(0, 100)}...</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="back-link">
        <a href="/admin">← Back to Dashboard</a>
      </div>
    </div>
  )
}
