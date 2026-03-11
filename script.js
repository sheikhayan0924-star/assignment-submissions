// Student data storage
let studentData = {};
let uploadedFiles = [];

// Page navigation
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Student form submission
    document.getElementById('studentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const name = document.getElementById('name').value.trim();
        const age = document.getElementById('age').value.trim();
        const classValue = document.getElementById('class').value.trim();
        const course = document.getElementById('course').value.trim();
        
        if (!name || !age || !classValue || !course) {
            alert('Please fill in all fields');
            return;
        }
        
        // Store student data
        studentData = {
            name: name,
            age: age,
            class: classValue,
            course: course
        };
        
        navigateTo('uploadPage');
    });

    // File upload handling
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');

    uploadBox.addEventListener('click', () => {
        fileInput.click();
    });

    // Drag and drop
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.style.background = '#f8f9ff';
    });

    uploadBox.addEventListener('dragleave', () => {
        uploadBox.style.background = '';
    });

    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.style.background = '';
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    });

    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    });
});

function handleFiles(files) {
    files.forEach(file => {
        // Validate file type
        if (!file.type.match('image/(jpeg|png)')) {
            alert('Only JPG and PNG files are allowed');
            return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size should not exceed 5MB');
            return;
        }
        
        uploadedFiles.push(file);
        displayPreview(file);
    });
}

function displayPreview(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        
        const img = document.createElement('img');
        img.src = e.target.result;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '×';
        removeBtn.onclick = function() {
            const index = uploadedFiles.indexOf(file);
            if (index > -1) {
                uploadedFiles.splice(index, 1);
            }
            previewItem.remove();
        };
        
        previewItem.appendChild(img);
        previewItem.appendChild(removeBtn);
        previewContainer.appendChild(previewItem);
    };
    
    reader.readAsDataURL(file);
}

// Submit assignment
async function submitAssignment() {
    if (uploadedFiles.length === 0) {
        alert('Please upload at least one assignment image');
        return;
    }
    
    // Show loading overlay
    document.getElementById('loadingOverlay').classList.add('active');
    
    try {
        // Generate PDF from images
        const pdfBlob = await generatePDF();
        
        // Download the PDF
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `Assignment-${studentData.name}-${Date.now()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Wait a bit for download to start
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Prepare WhatsApp message
        const message = `*New Assignment Submission*\n\n` +
                       `Name: ${studentData.name}\n` +
                       `Age: ${studentData.age}\n` +
                       `Class: ${studentData.class}\n` +
                       `Course: ${studentData.course}\n` +
                       `Number of Pages: ${uploadedFiles.length}\n\n` +
                       `PDF has been downloaded. Please find the attached PDF file.\n\n` +
                       `*Thank You!* 🙏`;
        
        const whatsappNumber = '917019261034';
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Hide loading and show success
        document.getElementById('loadingOverlay').classList.remove('active');
        document.getElementById('successModal').classList.add('active');
        
        // Clean up
        URL.revokeObjectURL(pdfUrl);
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loadingOverlay').classList.remove('active');
        alert('An error occurred while creating PDF. Please try again.');
    }
}

// Generate PDF from uploaded images
async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const maxWidth = pageWidth - (margin * 2);
    const maxHeight = pageHeight - (margin * 2);
    
    // Add cover page
    pdf.setFontSize(24);
    pdf.setFont(undefined, 'bold');
    pdf.text('Assignment Submission', pageWidth / 2, 40, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Name: ${studentData.name}`, margin, 70);
    pdf.text(`Age: ${studentData.age}`, margin, 80);
    pdf.text(`Class: ${studentData.class}`, margin, 90);
    pdf.text(`Course: ${studentData.course}`, margin, 100);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, margin, 110);
    pdf.text(`Total Pages: ${uploadedFiles.length}`, margin, 120);
    
    // Process each image
    for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        
        // Read image as data URL
        const imageData = await readFileAsDataURL(file);
        
        // Get image dimensions
        const imgDimensions = await getImageDimensions(imageData);
        
        // Calculate scaled dimensions to fit page
        let imgWidth = imgDimensions.width;
        let imgHeight = imgDimensions.height;
        
        // Convert pixels to mm (rough conversion: 1mm ≈ 3.78 pixels at 96 DPI)
        imgWidth = imgWidth / 3.78;
        imgHeight = imgHeight / 3.78;
        
        // Scale to fit page while maintaining aspect ratio
        const widthRatio = maxWidth / imgWidth;
        const heightRatio = maxHeight / imgHeight;
        const ratio = Math.min(widthRatio, heightRatio);
        
        const finalWidth = imgWidth * ratio;
        const finalHeight = imgHeight * ratio;
        
        // Center the image on page
        const xPos = (pageWidth - finalWidth) / 2;
        const yPos = (pageHeight - finalHeight) / 2;
        
        // Add new page for each image (except first one already has cover)
        pdf.addPage();
        
        // Add image to PDF
        pdf.addImage(imageData, 'JPEG', xPos, yPos, finalWidth, finalHeight);
        
        // Add page number
        pdf.setFontSize(10);
        pdf.text(`Page ${i + 1} of ${uploadedFiles.length}`, pageWidth / 2, pageHeight - 5, { align: 'center' });
    }
    
    // Return PDF as blob
    return pdf.output('blob');
}

// Helper function to read file as data URL
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Helper function to get image dimensions
function getImageDimensions(dataUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve({ width: img.width, height: img.height });
        };
        img.onerror = reject;
        img.src = dataUrl;
    });
}

function resetForm() {
    // Reset all data
    studentData = {};
    uploadedFiles = [];
    const previewContainer = document.getElementById('previewContainer');
    const fileInput = document.getElementById('fileInput');
    
    previewContainer.innerHTML = '';
    document.getElementById('studentForm').reset();
    fileInput.value = '';
    
    // Close modal and go to welcome page
    document.getElementById('successModal').classList.remove('active');
    navigateTo('welcomePage');
}
