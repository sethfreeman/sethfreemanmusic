'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import './admin.css'

export default function AdminDashboard() {
  const [importing, setImporting] = useState(false)
  const [message, setMessage] = useState('')
  const [stats, setStats] = useState(null)

  const handleCSVImport = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setImporting(true)
    setMessage('Processing CSV...')

    try {
      const text = await file.text()
      const lines = text.split('\n')
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
      
      // Find column indexes
      const emailIndex = headers.findIndex(h => h.includes('email'))
      if (emailIndex === -1) {
        throw new Error('No email column found in CSV')
      }
      
      const nameIndex = headers.findIndex(h => h.includes('account name') || h.includes('name') || h.includes('first'))
      const cityIndex = headers.findIndex(h => h === 'city')
      const stateIndex = headers.findIndex(h => h === 'state')
      const countryIndex = headers.findIndex(h => h === 'country')
      const postalCodeIndex = headers.findIndex(h => h.includes('postal'))
      const tagIndex = headers.findIndex(h => h === 'tag')
      const createdAtIndex = headers.findIndex(h => h.includes('fc created'))

      const contacts = []
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line) continue
        
        const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''))
        const email = values[emailIndex]
        
        if (email && email.includes('@')) {
          const contact = {
            email,
            name: nameIndex !== -1 ? values[nameIndex] : email.split('@')[0],
            city: cityIndex !== -1 ? values[cityIndex] : null,
            state: stateIndex !== -1 ? values[stateIndex] : null,
            country: countryIndex !== -1 ? values[countryIndex] : null,
            postal_code: postalCodeIndex !== -1 ? values[postalCodeIndex] : null,
            tag: tagIndex !== -1 ? values[tagIndex] : null,
            reverbnation_created_at: createdAtIndex !== -1 ? values[createdAtIndex] : null
          }
          contacts.push(contact)
        }
      }

      setMessage(`Found ${contacts.length} contacts. Importing...`)

      // Import contacts into contacts table (they'll sign up later via OAuth)
      let imported = 0
      let errors = []
      for (const contact of contacts) {
        const { error } = await supabase
          .from('contacts')
          .upsert(contact, { 
            onConflict: 'email',
            ignoreDuplicates: false 
          })
        
        if (error) {
          console.error('Import error for', contact.email, ':', error)
          errors.push(`${contact.email}: ${error.message}`)
        } else {
          imported++
        }
      }

      if (errors.length > 0) {
        setMessage(`⚠️ Imported ${imported} contacts with ${errors.length} errors. Check console for details.`)
        console.log('Import errors:', errors)
      } else {
        setMessage(`✅ Successfully imported ${imported} contacts!`)
      }
      loadStats()
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setImporting(false)
    }
  }

  const loadStats = async () => {
    const { count: totalContacts } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true })
    
    const { count: signedUpMembers } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true })
      .eq('signed_up', true)
    
    const { count: totalContent } = await supabase
      .from('exclusive_content')
      .select('*', { count: 'exact', head: true })

    setStats({ totalContacts, signedUpMembers, totalContent })
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Contacts</h3>
          <p className="stat-number">{stats?.totalContacts || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Signed Up Members</h3>
          <p className="stat-number">{stats?.signedUpMembers || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Exclusive Content</h3>
          <p className="stat-number">{stats?.totalContent || 0}</p>
        </div>
      </div>

      <div className="admin-section">
        <h2>Import Fans from CSV</h2>
        <p>Upload your ReverbNation CSV file to import fan contacts.</p>
        
        <div className="import-area">
          <input
            type="file"
            accept=".csv"
            onChange={handleCSVImport}
            disabled={importing}
            id="csv-upload"
          />
          <label htmlFor="csv-upload" className="upload-button">
            {importing ? 'Importing...' : 'Choose CSV File'}
          </label>
        </div>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : message.includes('❌') ? 'error' : 'info'}`}>
            {message}
          </div>
        )}
      </div>

      <div className="admin-section">
        <h2>Quick Links</h2>
        <div className="quick-links">
          <a href="/admin/fans" className="admin-link">Manage Fans</a>
          <a href="/admin/content" className="admin-link">Upload Content</a>
          <a href="/admin/events" className="admin-link">Manage Events</a>
          <a href="/admin/releases" className="admin-link">Manage Releases</a>
          <a href="/admin/newsletter" className="admin-link">Send Newsletter</a>
        </div>
      </div>
    </div>
  )
}
