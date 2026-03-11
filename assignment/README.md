# 📝 Student Assignment Completion Center

A modern, mobile-friendly web application for students to submit their college assignments. The system automatically converts multiple images into a professional PDF and facilitates WhatsApp submission.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- 🎨 **Attractive Welcome Page** - Eye-catching design with animated elements
- 📋 **Student Details Form** - Collect name, age, class, and course information
- 📤 **Multi-Image Upload** - Drag & drop or click to upload multiple images (JPG/PNG)
- 🖼️ **Image Preview** - Preview uploaded images with remove option
- 📄 **Automatic PDF Generation** - Converts all images into one professional PDF with:
  - Cover page with student details
  - All images as separate pages
  - Page numbers
  - Optimized A4 format
- 💬 **WhatsApp Integration** - Automatically opens WhatsApp with pre-filled message
- 📱 **Mobile Responsive** - Works perfectly on all devices
- ⚡ **No Backend Required** - Runs entirely in the browser
- 🎭 **Smooth Animations** - Professional transitions and loading states

## 🚀 Quick Start

### Option 1: Simple (No Installation)

1. Download or clone this repository
2. Open `index.html` in your web browser
3. That's it! Start using immediately

### Option 2: With Local Server

```bash
# Clone the repository
git clone https://github.com/yourusername/student-assignment-center.git

# Navigate to directory
cd student-assignment-center

# Install dependencies (optional)
npm install

# Start server (optional)
npm start

# Open in browser
http://localhost:3000
```

## 📖 How It Works

1. **Welcome Screen** - Students see an attractive landing page
2. **Home Page** - Overview of services and features
3. **Student Details** - Fill in personal and course information
4. **Upload Assignment** - Upload multiple assignment images
5. **PDF Generation** - System creates a professional PDF automatically
6. **WhatsApp Submission** - PDF downloads and WhatsApp opens with pre-filled message
7. **Done!** - Student attaches the PDF and sends

## 🛠️ Technologies Used

- **HTML5** - Structure and semantics
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Interactive functionality
- **jsPDF** - Client-side PDF generation
- **WhatsApp API** - Message integration
- **Express.js** - Optional backend server
- **Multer** - File upload handling (server mode)

## 📁 Project Structure

```
student-assignment-center/
├── index.html              # Main HTML file
├── styles.css              # All styling and animations
├── script.js               # Frontend logic and PDF generation
├── server.js               # Optional backend server
├── package.json            # Node.js dependencies
├── README.md              # This file
├── SETUP.md               # Detailed setup instructions
├── TEST-CHECKLIST.md      # Testing guide
└── .gitignore             # Git ignore rules
```

## ⚙️ Configuration

### WhatsApp Number

Update the WhatsApp number in `script.js`:

```javascript
const whatsappNumber = '917019261034'; // Replace with your number
```

Also update in `server.js` if using backend:

```javascript
const whatsappNumber = '917019261034'; // Replace with your number
```

### Customization

**Change Colors:**
Edit `styles.css` - main gradient:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

**Modify Features:**
Edit feature cards in `index.html` starting at line 35

**Add Form Fields:**
Add new form groups in `index.html` and update `script.js`

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security & Validation

- File type validation (JPG, PNG only)
- File size limit (5MB per image)
- Form field validation
- XSS protection
- Secure file handling

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For issues or questions:
- Open an issue on GitHub
- Check the [TEST-CHECKLIST.md](TEST-CHECKLIST.md) for troubleshooting

## 🎯 Future Enhancements

- [ ] Email notification option
- [ ] Cloud storage integration
- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Assignment tracking system
- [ ] Automatic WhatsApp image sending (requires WhatsApp Business API)

## 👨‍💻 Author

Your Name - [Your GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- jsPDF library for PDF generation
- WhatsApp for messaging API
- All contributors and users

---

**Made with ❤️ for students**

⭐ Star this repo if you find it helpful!
