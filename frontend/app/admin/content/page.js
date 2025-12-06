'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import './content.css'

export default function ContentManagementPage() {
  const [user, setUser] = useState(null)
  const [content, setContent] = useState([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAdminAndLoadContent()
  }, [])

  const checkAdminAndLoadContent = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    setUser(user)
    await loadContent()
  }

  const loadContent = async () => {
    const { data } = await supabase
      .from('exclusive_content')
      .select('*')
      .order('created_at', { ascending: false })
    
    setContent(data || [])
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    setUploading(true)
    setMessage('Uploading...')

    const formData = new FormData(e.target)
    const file = formData.get('file')
    const thumbnail = formData.get('thumbnail')
    
    try {
      // Upload main file
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `content/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('exclusive-content')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl: fileUrl } } = supabase.storage
        .from('exclusive-content')
        .getPublicUrl(filePath)

      // Upload thumbnail if provided
      let thumbnailUrl = null
      if (thumbnail && thumbnail.size > 0) {
        const thumbExt = thumbnail.name.split('.').pop()
        const thumbName = `thumb_${Date.now()}.${thumbExt}`
        const thumbPath = `thumbnails/${thumbName}`

        const { error: thumbError } = await supabase.storage
          .from('exclusive-content')
          .upload(thumbPath, thumbnail)

        if (!thumbError) {
          const { data: { publicUrl } } = supabase.storage
            .from('exclusive-content')
            .getPublicUrl(thumbPath)
          thumbnailUrl = publicUrl
        }
      }

      // Create database record
      const { error: dbError } = await supabase
        .from('exclusive_content')
        .insert({
          title: formData.get('title'),
          description: formData.get('description'),
          type: formData.get('type'),
          file_url: fileUrl,
          thumbnail_url: thumbnailUrl,
          file_size: file.size,
          is_published: formData.get('is_published') === 'on'
        })

      if (dbError) throw dbError

      setMessage('✅ Content uploaded successfully!')
      setShowForm(false)
      e.target.reset()
      await loadContent()
    } catch (error) {
      let errorMsg = error.message
      if (errorMsg.includes('row-level security')) {
        errorMsg = 'Admin access not configured. Please update your admin user ID in Supabase. See PHASE-3-STORAGE-SETUP.md'
      }
      setMessage(`❌ Error: ${errorMsg}`)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (item) => {
    if (!confirm(`Delete "${item.title}"?`)) return

    try {
      // Delete from storage
      const filePath = item.file_url.split('/').slice(-2).join('/')
      await supabase.storage.from('exclusive-content').remove([filePath])

      if (item.thumbnail_url) {
        const thumbPath = item.thumbnail_url.split('/').slice(-2).join('/')
        await supabase.storage.from('exclusive-content').remove([thumbPath])
      }

      // Delete from database
      const { error } = await supabase
        .from('exclusive_content')
        .delete()
        .eq('id', item.id)

      if (error) throw error

      setMessage('✅ Content deleted')
      await loadContent()
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    }
  }

  const togglePublish = async (item) => {
    const { error } = await supabase
      .from('exclusive_content')
      .update({ is_published: !item.is_published })
      .eq('id', item.id)

    if (!error) {
      await loadContent()
    }
  }

  const formatFileSize = (bytes) => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  return (
    <div className="content-management">
      <div className="content-header">
        <h1>Content Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="upload-toggle-btn"
        >
          {showForm ? 'Cancel' : '+ Upload New Content'}
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleUpload} className="upload-form">
          <div className="form-row">
            <div className="form-group">
              <label>Title *</label>
              <input type="text" name="title" required />
            </div>

            <div className="form-group">
              <label>Type *</label>
              <select name="type" required>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
                <option value="photo">Photo</option>
                <option value="download">Download</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="3"></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Content File *</label>
              <input type="file" name="file" required />
            </div>

            <div className="form-group">
              <label>Thumbnail (optional)</label>
              <input type="file" name="thumbnail" accept="image/*" />
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" name="is_published" defaultChecked />
              Publish immediately
            </label>
          </div>

          <button type="submit" disabled={uploading} className="submit-btn">
            {uploading ? 'Uploading...' : 'Upload Content'}
          </button>
        </form>
      )}

      <div className="content-list">
        <h2>Uploaded Content ({content.length})</h2>
        
        {content.length === 0 ? (
          <p className="empty-message">No content uploaded yet.</p>
        ) : (
          <div className="content-grid">
            {content.map((item) => (
              <div key={item.id} className="content-item">
                {item.thumbnail_url && (
                  <div className="item-thumbnail">
                    <img src={item.thumbnail_url} alt={item.title} />
                  </div>
                )}
                <div className="item-info">
                  <div className="item-header">
                    <span className={`type-badge ${item.type}`}>{item.type}</span>
                    <span className={`status-badge ${item.is_published ? 'published' : 'draft'}`}>
                      {item.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  {item.description && <p>{item.description}</p>}
                  <div className="item-meta">
                    <span>👁️ {item.view_count} views</span>
                    <span>📦 {formatFileSize(item.file_size)}</span>
                  </div>
                  <div className="item-actions">
                    <button
                      onClick={() => togglePublish(item)}
                      className="action-btn toggle-btn"
                    >
                      {item.is_published ? 'Unpublish' : 'Publish'}
                    </button>
                    <a
                      href={item.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn view-btn"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(item)}
                      className="action-btn delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
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
