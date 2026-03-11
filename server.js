const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

const app = express();
const PORT = 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only JPG and PNG files are allowed'));
    }
});

// Middleware
app.use(express.json());
app.use(express.static('.'));
app.use('/uploads', express.static('uploads'));

// Upload endpoint
app.post('/api/submit', upload.array('images', 10), async (req, res) => {
    try {
        const { name, age, class: classValue, course } = req.body;
        const files = req.files;
        
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }
        
        // Create ZIP file
        const zipFileName = `assignment-${name}-${Date.now()}.zip`;
        const zipFilePath = path.join('uploads', zipFileName);
        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver('zip', { zlib: { level: 9 } });
        
        output.on('close', function() {
            console.log('ZIP created:', archive.pointer() + ' total bytes');
        });
        
        archive.on('error', function(err) {
            throw err;
        });
        
        archive.pipe(output);
        
        // Add files to ZIP
        files.forEach((file, index) => {
            archive.file(file.path, { name: `assignment-${index + 1}${path.extname(file.filename)}` });
        });
        
        await archive.finalize();
        
        // Wait for ZIP to be created
        await new Promise(resolve => output.on('close', resolve));
        
        // Prepare WhatsApp message with file links
        const baseUrl = `http://localhost:${PORT}`;
        const imageLinks = files.map((file, index) => 
            `${baseUrl}/uploads/${file.filename}`
        ).join('\n');
        
        const message = `*New Assignment Submission*\n\n` +
                       `Name: ${name}\n` +
                       `Age: ${age}\n` +
                       `Class: ${classValue}\n` +
                       `Course: ${course}\n` +
                       `Number of Images: ${files.length}\n\n` +
                       `Download ZIP: ${baseUrl}/uploads/${zipFileName}\n\n` +
                       `Image Links:\n${imageLinks}`;
        
        const whatsappNumber = '917019261034';
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        console.log('Assignment submitted:', { name, age, classValue, course, filesCount: files.length });
        
        res.json({
            success: true,
            message: 'Assignment submitted successfully',
            whatsappUrl: whatsappUrl,
            downloadUrl: `/uploads/${zipFileName}`,
            imageUrls: files.map(f => `/uploads/${f.filename}`)
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
});

// Cleanup old files (optional - runs every hour)
setInterval(() => {
    const uploadDir = 'uploads/';
    if (fs.existsSync(uploadDir)) {
        const files = fs.readdirSync(uploadDir);
        const now = Date.now();
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        files.forEach(file => {
            const filePath = path.join(uploadDir, file);
            const stats = fs.statSync(filePath);
            if (now - stats.mtimeMs > maxAge) {
                fs.unlinkSync(filePath);
                console.log('Deleted old file:', file);
            }
        });
    }
}, 60 * 60 * 1000);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Upload your assignments and they will be sent to WhatsApp!');
});

