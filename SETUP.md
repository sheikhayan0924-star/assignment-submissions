# Quick Setup Guide

## How It Works Now - PDF Generation! 📄

When a student submits their assignment:
1. **All images are converted into ONE PDF file** with a cover page
2. PDF automatically downloads to their device
3. WhatsApp opens with your number and student details pre-filled
4. Student attaches the single PDF file (much easier than multiple images!)
5. You receive the complete assignment as a professional PDF

## PDF Features

✓ **Cover Page** with student details (Name, Age, Class, Course, Date)
✓ **All images** included as separate pages
✓ **Page numbers** on each page
✓ **Optimized sizing** - images fit perfectly on A4 pages
✓ **Professional format** - ready to print or view
✓ **Single file** - easier to send on WhatsApp than multiple images

## Setup

### Simple Setup (No Installation Required!)

1. Just open `index.html` in your browser
2. That's it! PDF generation works instantly

No server needed - everything runs in the browser!

## WhatsApp Number

Already configured: 917019261034

To change it, edit:
- `script.js` (line with whatsappNumber)
- `server.js` (line with whatsappNumber)

## Testing

1. Open the website
2. Click "Next" on welcome page
3. Click "Open" on home page
4. Fill student details
5. Upload test images
6. Click Submit
7. Images download automatically
8. WhatsApp opens with message
9. Attach downloaded images manually

## Limitations

WhatsApp Web API doesn't support automatic image sending due to security.
Students must manually attach the downloaded images.

## For Automatic Image Sending

You need WhatsApp Business API (paid service):
- Twilio WhatsApp API: https://www.twilio.com/whatsapp
- Meta WhatsApp Business API: https://developers.facebook.com/docs/whatsapp

Cost: ~$0.005 per message

## Troubleshooting

**Images not downloading?**
- Check browser popup blocker
- Allow downloads in browser settings

**WhatsApp not opening?**
- Make sure WhatsApp is installed
- Or use WhatsApp Web in browser

**Server not starting?**
- Install Node.js first
- Run `npm install` before `npm start`

## File Structure

```
├── index.html          # Main website
├── styles.css          # Design
├── script.js           # Frontend logic
├── server.js           # Backend (optional)
├── package.json        # Dependencies
├── uploads/            # Uploaded files (created automatically)
└── README.md          # Documentation
```

## Support

For issues or questions, check the browser console (F12) for error messages.
