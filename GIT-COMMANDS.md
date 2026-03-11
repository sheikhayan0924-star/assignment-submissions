# Git Commands for Upload

## First Time Setup

### 1. Initialize Git Repository

```bash
git init
```

### 2. Add All Files

```bash
git add .
```

### 3. Create First Commit

```bash
git commit -m "Initial commit: Student Assignment Completion Center with PDF generation"
```

### 4. Create GitHub Repository

Go to GitHub.com and create a new repository named `student-assignment-center`

**Repository Description (for GitHub):**
```
📝 Modern web app for students to submit college assignments. Converts multiple images to PDF and integrates with WhatsApp. Mobile-friendly, no backend required. Built with HTML5, CSS3, JavaScript & jsPDF.
```

**Topics/Tags to add:**
```
assignment-management
student-portal
pdf-generation
whatsapp-integration
javascript
html5
css3
jspdf
mobile-responsive
web-application
```

### 5. Connect to GitHub

```bash
git remote add origin https://github.com/yourusername/student-assignment-center.git
```

Replace `yourusername` with your actual GitHub username.

### 6. Push to GitHub

```bash
git branch -M main
git push -u origin main
```

## Future Updates

### Add Changes

```bash
git add .
```

### Commit Changes

```bash
git commit -m "Description of changes"
```

### Push Changes

```bash
git push
```

## Common Git Commands

### Check Status

```bash
git status
```

### View Commit History

```bash
git log
```

### Create New Branch

```bash
git checkout -b feature-name
```

### Switch Branch

```bash
git checkout main
```

### Pull Latest Changes

```bash
git pull
```

## GitHub Repository Settings

### About Section

**Description:**
```
Modern web application for college students to submit assignments. Features automatic PDF generation from images and WhatsApp integration.
```

**Website:**
```
https://yourusername.github.io/student-assignment-center
```

**Topics:**
- assignment-management
- student-portal
- pdf-generation
- whatsapp-integration
- javascript
- html5-css3
- mobile-responsive
- jspdf
- web-app
- education

### Enable GitHub Pages (Optional)

1. Go to repository Settings
2. Scroll to "Pages" section
3. Source: Deploy from branch
4. Branch: main
5. Folder: / (root)
6. Save

Your site will be live at: `https://yourusername.github.io/student-assignment-center`

## README Badges

Add these to your README.md for a professional look:

```markdown
![GitHub stars](https://img.shields.io/github/stars/yourusername/student-assignment-center?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/student-assignment-center?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/student-assignment-center)
![GitHub license](https://img.shields.io/github/license/yourusername/student-assignment-center)
```

## Complete Upload Script

Copy and paste this entire script:

```bash
# Initialize repository
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: Student Assignment Completion Center

Features:
- Attractive welcome page with animations
- Student details form with validation
- Multi-image upload with preview
- Automatic PDF generation with cover page
- WhatsApp integration with pre-filled message
- Mobile responsive design
- No backend required - runs in browser"

# Add remote (replace yourusername)
git remote add origin https://github.com/yourusername/student-assignment-center.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Troubleshooting

### If remote already exists:

```bash
git remote remove origin
git remote add origin https://github.com/yourusername/student-assignment-center.git
```

### If push is rejected:

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### If you need to force push (use carefully):

```bash
git push -f origin main
```

## After Upload

1. ✅ Check repository on GitHub
2. ✅ Verify all files are uploaded
3. ✅ Test GitHub Pages (if enabled)
4. ✅ Add repository description and topics
5. ✅ Share the link!

Your repository will be live at:
`https://github.com/yourusername/student-assignment-center`
