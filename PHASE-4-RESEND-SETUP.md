# Phase 4: Resend Email Setup

## Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Free tier includes:
   - 3,000 emails/month
   - 100 emails/day
   - Perfect for getting started!

## Step 2: Verify Your Domain

For production emails, you need to verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `sethfreemanmusic.com`
4. Resend will provide DNS records to add:
   - SPF record
   - DKIM records
   - DMARC record (optional but recommended)
5. Add these records to your domain's DNS settings
6. Wait for verification (usually 5-30 minutes)

### DNS Records Example:
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all

Type: TXT
Name: resend._domainkey
Value: [provided by Resend]

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@sethfreemanmusic.com
```

## Step 3: Get API Key

1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name it: "Seth Freeman Music - Production"
4. Copy the API key (starts with `re_`)

## Step 4: Add Environment Variable

### Local Development:
Add to `frontend/.env.local`:
```
RESEND_API_KEY=re_your_api_key_here
```

### Vercel Production:
1. Go to Vercel project → **Settings** → **Environment Variables**
2. Add:
   - Name: `RESEND_API_KEY`
   - Value: `re_your_api_key_here`
   - Environments: Production, Preview, Development
3. Click **Save**
4. Redeploy your app

## Step 5: Install Resend Package

```bash
cd frontend
npm install resend
```

## Step 6: Configure From Address

The newsletter sends from: `newsletter@sethfreemanmusic.com`

Make sure this email address is:
1. Using your verified domain
2. Set up to receive replies (optional)
3. Added to Resend's allowed senders

You can change the from address in `frontend/app/api/send-newsletter/route.js`:
```javascript
from: 'Seth Freeman Music <newsletter@sethfreemanmusic.com>'
```

## Step 7: Test Sending

1. Go to `/admin/newsletter` on your site
2. Write a test newsletter
3. Select "Members Only" (smaller list for testing)
4. Click "Send Newsletter"
5. Check your email to verify it looks good

## Testing Without Domain Verification

For testing before domain verification:

1. Use Resend's test mode
2. Emails will be sent but marked as "test"
3. Only emails you've verified in Resend will receive them
4. Add your personal email in Resend → **Settings** → **Verified Emails**

## Troubleshooting

### "Domain not verified"
- Wait 30 minutes after adding DNS records
- Check DNS propagation: `dig TXT sethfreemanmusic.com`
- Verify records are correct in your DNS provider

### "API key invalid"
- Make sure you copied the full key (starts with `re_`)
- Check environment variable is set correctly
- Restart your dev server or redeploy

### "Rate limit exceeded"
- Free tier: 100 emails/day
- Upgrade to Pro for higher limits
- Or batch send over multiple days

### Emails going to spam
- Verify your domain properly
- Add DMARC record
- Warm up your domain (start with small batches)
- Ask recipients to whitelist your email

## Best Practices

1. **Start Small**: Send to a small test group first
2. **Consistent Schedule**: Send newsletters regularly (monthly is good)
3. **Engaging Content**: Include events, new music, personal updates
4. **Mobile Friendly**: The template is responsive
5. **Track Results**: Monitor open rates in Resend dashboard
6. **Respect Unsubscribes**: Add unsubscribe link (coming in Phase 5)

## Resend Dashboard Features

- **Logs**: See all sent emails
- **Analytics**: Open rates, click rates
- **Webhooks**: Get notified of bounces, complaints
- **Templates**: Save reusable email templates

## Upgrade Options

Free tier is great to start, but consider upgrading if:
- You have more than 3,000 contacts
- You want to send more frequently
- You need advanced analytics
- You want priority support

Pro plan: $20/month for 50,000 emails

## Next Steps

After Phase 4 is working:
- Phase 5 will add unsubscribe functionality
- Consider adding email preferences (frequency, content types)
- Track which emails get the most engagement
