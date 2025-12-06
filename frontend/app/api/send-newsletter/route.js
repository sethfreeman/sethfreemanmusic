import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY not configured. See PHASE-4-RESEND-SETUP.md' },
        { status: 500 }
      )
    }

    const { subject, introBlurb, recipients, events, releases } = await request.json()

    if (!recipients || recipients.length === 0) {
      return NextResponse.json(
        { error: 'No recipients provided' },
        { status: 400 }
      )
    }

    // Build HTML email (events and releases can be empty arrays)
    const html = buildNewsletterHTML(introBlurb, events || [], releases || [])

    // Send emails (Resend supports batch sending)
    const emailAddresses = recipients.map(r => r.email)
    
    const { data, error } = await resend.emails.send({
      from: 'Seth Freeman Music <newsletter@sethfreemanmusic.com>',
      to: emailAddresses,
      subject: subject,
      html: html,
      replyTo: 'seth@sethfreemanmusic.com'
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      sent: recipients.length,
      messageId: data?.id 
    })

  } catch (error) {
    console.error('Newsletter send error:', error)
    return NextResponse.json(
      { error: error.message || 'Unknown error occurred' },
      { status: 500 }
    )
  }
}

function buildNewsletterHTML(introBlurb, events, releases) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seth Freeman Music Newsletter</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background: white;
      border-radius: 8px;
      padding: 40px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #4a9eff;
    }
    .header h1 {
      margin: 0;
      color: #333;
      font-size: 28px;
    }
    .intro {
      margin-bottom: 30px;
      font-size: 16px;
      white-space: pre-wrap;
    }
    .section {
      margin: 30px 0;
    }
    .section h2 {
      color: #4a9eff;
      font-size: 20px;
      margin-bottom: 15px;
    }
    .item {
      padding: 15px;
      margin-bottom: 10px;
      background: #f9f9f9;
      border-radius: 5px;
      border-left: 3px solid #4a9eff;
    }
    .item strong {
      color: #333;
      font-size: 16px;
    }
    .item-meta {
      color: #666;
      font-size: 14px;
      margin-top: 5px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
    .footer a {
      color: #4a9eff;
      text-decoration: none;
    }
    .social-links {
      margin: 20px 0;
      text-align: center;
    }
    .social-links a {
      display: inline-block;
      margin: 0 10px;
      color: #4a9eff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎵 Seth Freeman Music</h1>
    </div>

    <div class="intro">
      ${introBlurb}
    </div>

    ${events && events.length > 0 ? `
    <div class="section">
      <h2>🎸 Upcoming Shows</h2>
      ${events.map(event => `
        <div class="item">
          <strong>${event.title}</strong>
          <div class="item-meta">
            📅 ${new Date(event.event_date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
            ${event.venue ? `<br>📍 ${event.venue}` : ''}
            ${event.location ? `<br>${event.location}` : ''}
            ${event.ticket_url ? `<br><a href="${event.ticket_url}" style="color: #4a9eff;">Get Tickets</a>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${releases && releases.length > 0 ? `
    <div class="section">
      <h2>🎵 New Music</h2>
      ${releases.map(release => `
        <div class="item">
          <strong>${release.title}</strong>
          <div class="item-meta">
            Released: ${new Date(release.release_date).toLocaleDateString()}
            ${release.description ? `<br>${release.description}` : ''}
            ${release.spotify_url ? `<br><a href="${release.spotify_url}" style="color: #4a9eff;">Listen on Spotify</a>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <div class="social-links">
      <a href="https://www.instagram.com/sethfreemanmusic/">Instagram</a> •
      <a href="https://www.facebook.com/sethfreemanmusic">Facebook</a> •
      <a href="https://www.youtube.com/@SethFreeman">YouTube</a> •
      <a href="https://open.spotify.com/artist/4VTNwGyq01beyw46MzTa67">Spotify</a>
    </div>

    <div class="footer">
      <p>Thanks for being part of the Seth Freeman Music community!</p>
      <p>
        <a href="https://sethfreemanmusic.com">Visit Website</a> •
        <a href="https://sethfreemanmusic.com/members">Members Area</a>
      </p>
      <p style="font-size: 12px; color: #999; margin-top: 20px;">
        You're receiving this because you signed up for updates from Seth Freeman Music.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim()
}
