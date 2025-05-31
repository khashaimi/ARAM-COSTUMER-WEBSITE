// DOM Elements
const feedbackBtn = document.getElementById('feedbackBtn');
const heroFeedbackBtn = document.getElementById('heroFeedbackBtn');
const modal = document.getElementById('feedbackModal');
const closeBtn = document.querySelector('.close');
const feedbackForm = document.getElementById('feedbackForm');
const langToggle = document.getElementById('langToggle');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

// Language Switching Function
function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
}

// Check for saved language preference
const savedLanguage = localStorage.getItem('language') || 'en';
setLanguage(savedLanguage);

// Event Listeners
window.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        // Toggle between hamburger and X icon
        const icon = mobileMenuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Language toggle button
    langToggle.addEventListener('click', function() {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
    });
    
    // Open modal when feedback button is clicked
    feedbackBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });
    
    // For Arabic feedback button
    document.getElementById('feedbackBtn-ar').addEventListener('click', function() {
        modal.style.display = 'block';
    });
    
    // Open modal when hero feedback button is clicked
    heroFeedbackBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });
    
    // For Arabic hero feedback button
    document.getElementById('heroFeedbackBtn-ar').addEventListener('click', function() {
        modal.style.display = 'block';
    });
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Form submission
    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate form
        if (validateForm()) {
            // Get form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                location: document.documentElement.lang === 'en' ? 
                          document.getElementById('location').value : 
                          document.getElementById('location-ar').value,
                buildingName: document.getElementById('buildingName').value,
                apartmentNumber: document.getElementById('apartmentNumber').value,
                issueNote: document.getElementById('issueNote').value
            };
            
            // Create email content
            const subject = document.documentElement.lang === 'en' ? 
                           'ARAM SYSTEMS Feedback Form Submission' : 
                           'نموذج ملاحظات أنظمة آرام';
            
            const body = document.documentElement.lang === 'en' ?
                `Full Name: ${formData.fullName}\n` +
                `Phone Number: ${formData.phoneNumber}\n` +
                `Location: ${formData.location}\n` +
                `Building Name: ${formData.buildingName}\n` +
                `Apartment Number: ${formData.apartmentNumber}\n` +
                `Issue Description: ${formData.issueNote}` :
                `الاسم الكامل: ${formData.fullName}\n` +
                `رقم الهاتف: ${formData.phoneNumber}\n` +
                `الموقع: ${formData.location}\n` +
                `اسم المبنى: ${formData.buildingName}\n` +
                `رقم الشقة: ${formData.apartmentNumber}\n` +
                `وصف المشكلة: ${formData.issueNote}`;
            
            // Create mailto link
            const mailtoLink = `mailto:khaledelhushaimi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Log for debugging
            console.log('Form Data:', formData);
            
            // Show success message based on language
            if (document.documentElement.lang === 'en') {
                alert('Thank you for your feedback! Your email client will open to send the details.');
            } else {
                alert('شكرا على ملاحظاتك! سيتم فتح برنامج البريد الإلكتروني لإرسال التفاصيل.');
            }
            
            // Reset form and close modal
            feedbackForm.reset();
            modal.style.display = 'none';
        }
    });
});

// Form validation
function validateForm() {
    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const location = document.documentElement.lang === 'en' ? 
                    document.getElementById('location').value : 
                    document.getElementById('location-ar').value;
    const buildingName = document.getElementById('buildingName').value;
    const apartmentNumber = document.getElementById('apartmentNumber').value;
    const issueNote = document.getElementById('issueNote').value;
    
    // Simple validation
    if (!fullName || !phoneNumber || !location || !buildingName || !apartmentNumber || !issueNote) {
        if (document.documentElement.lang === 'en') {
            alert('Please fill in all required fields.');
        } else {
            alert('يرجى ملء جميع الحقول المطلوبة.');
        }
        return false;
    }
    
    // Phone number validation (simple pattern for Saudi Arabia)
    const phonePattern = /^(\+966|0)?5\d{8}$/;
    if (!phonePattern.test(phoneNumber)) {
        if (document.documentElement.lang === 'en') {
            alert('Please enter a valid Saudi Arabian phone number.');
        } else {
            alert('يرجى إدخال رقم هاتف سعودي صالح.');
        }
        return false;
    }
    
    return true;
}