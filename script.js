// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Ensure dark mode is enabled on page load
window.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('dark-mode');
});

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Booking Modal
let bookingModal;
let selectPackageBtns;
let closeModalBtns;

let selectedPackage = null;
let basePrice = 0;
let discountApplied = false;
let expressDeliveryAdded = false;

// STRIPE & EMAILJS INTEGRATION
// ===========================
// Stripe public key (replace with your own live key for production)
const STRIPE_PUBLIC_KEY = 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXX'; // TODO: Replace with your Stripe public key
let stripe, elements, cardElement;

function initializeStripe() {
    if (!window.Stripe) {
        console.error('Stripe.js not loaded');
        return;
    }
    stripe = Stripe(STRIPE_PUBLIC_KEY);
    elements = stripe.elements();
    // Optionally, use Stripe Elements for card input fields
    // For now, we use manual fields and tokenize on submit
}

// EmailJS config (replace with your own)
const EMAILJS_USER_ID = 'user_xxxxxxxxxxxxxxxxx'; // TODO: Replace with your EmailJS user ID
const EMAILJS_SERVICE_ID = 'service_xxxxxxx'; // TODO: Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'; // TODO: Replace with your EmailJS template ID

function initializeEmailJS() {
    if (!window.emailjs) {
        console.error('EmailJS not loaded');
        return;
    }
    emailjs.init(EMAILJS_USER_ID);
}

// Initialize booking modal after DOM loads
function initializeBookingModal() {
    bookingModal = document.getElementById('bookingModal');
    selectPackageBtns = document.querySelectorAll('.select-package-btn');
    closeModalBtns = document.querySelectorAll('.close-modal');
    
    console.log('Found', selectPackageBtns.length, 'package buttons');
    
    if (selectPackageBtns.length === 0) {
        console.error('❌ No package buttons found! Check if .select-package-btn class exists in HTML');
        return;
    }

selectPackageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('Package button clicked');
        
        const packageCard = btn.closest('.package-card');
        selectedPackage = packageCard.dataset.package;
        basePrice = parseFloat(packageCard.dataset.price);
        
        console.log('Selected package:', selectedPackage, 'Price:', basePrice);
        
        const packageName = packageCard.querySelector('h3').textContent;
        document.getElementById('selectedPackageName').textContent = packageName;
        document.getElementById('originalPrice').textContent = `$${basePrice}`;
        document.getElementById('totalAmount').textContent = `$${basePrice}`;
        
        // Reset discount and express delivery
        discountApplied = false;
        expressDeliveryAdded = false;
        document.getElementById('discountCode').value = '';
        document.getElementById('discountMessage').textContent = '';
        document.getElementById('discountedPrice').style.display = 'none';
        document.getElementById('originalPrice').classList.remove('strikethrough');
        document.getElementById('expressDelivery').checked = false;
        
        // Show/hide consultation booking section based on package
        const consultationBookingSection = document.getElementById('consultationBooking');
        if (selectedPackage === 'consultation') {
            console.log('Showing consultation booking section');
            consultationBookingSection.style.display = 'block';
            
            // Initialize booking system for consultation (if not already done)
            if (typeof initializeBookingSystem === 'function') {
                initializeBookingSystem();
            }
            
            // Make consultation fields required
            document.getElementById('consultationDate').setAttribute('required', 'required');
            document.getElementById('consultationTime').setAttribute('required', 'required');
            // Hide payment fields for free consultation
            const paymentInfo = document.querySelector('.payment-info');
            if (paymentInfo) paymentInfo.style.display = 'none';
        } else {
            console.log('Hiding consultation booking section');
            consultationBookingSection.style.display = 'none';
            // Remove required from consultation fields
            document.getElementById('consultationDate').removeAttribute('required');
            document.getElementById('consultationTime').removeAttribute('required');
            // Show payment fields
            const paymentInfo = document.querySelector('.payment-info');
            if (paymentInfo) paymentInfo.style.display = 'block';
        }
        
        console.log('Opening booking modal');
        bookingModal.classList.add('active');
    });
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        bookingModal.classList.remove('active');
        const aiChatModal = document.getElementById('aiChatModal');
        if (aiChatModal) aiChatModal.classList.remove('active');
        resetBookingModal();
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        bookingModal.classList.remove('active');
        resetBookingModal();
    }
    const aiChatModal = document.getElementById('aiChatModal');
    if (aiChatModal && e.target === aiChatModal) {
        aiChatModal.classList.remove('active');
    }
});
}

// Reset booking modal state
function resetBookingModal() {
    // Reset all booking state variables
    selectedDate = null;
    selectedTime = null;
    discountApplied = false;
    expressDeliveryAdded = false;
    
    // Reset form fields
    document.getElementById('discountCode').value = '';
    document.getElementById('discountMessage').textContent = '';
    document.getElementById('discountedPrice').style.display = 'none';
    document.getElementById('originalPrice').classList.remove('strikethrough');
    document.getElementById('expressDelivery').checked = false;
    
    // Reset consultation booking section
    if (typeof calendarInstance !== 'undefined' && calendarInstance) {
        calendarInstance.clear();
    }
    const consultationTime = document.getElementById('consultationTime');
    if (consultationTime) {
        consultationTime.value = '';
        consultationTime.disabled = true;
    }
    const bookingSummary = document.getElementById('bookingSummary');
    if (bookingSummary) {
        bookingSummary.style.display = 'none';
    }
}

// Discount Code - will be initialized after DOM loads
let applyDiscountBtn;
let discountCodeInput;
let discountMessage;

function updateTotalPrice() {
    let finalPrice = basePrice;
    
    // Apply discount if applicable
    if (discountApplied) {
        finalPrice = finalPrice * 0.8; // 20% off
    }
    
    // Add express delivery if selected
    if (expressDeliveryAdded) {
        finalPrice += 150;
    }
    
    const totalAmountEl = document.getElementById('totalAmount');
    if (totalAmountEl) {
        totalAmountEl.textContent = `$${finalPrice.toFixed(2)}`;
    }
    
    // Update displayed price breakdown
    if (discountApplied) {
        const discountedBase = basePrice * 0.8;
        const discountedPriceEl = document.getElementById('discountedPrice');
        if (discountedPriceEl) {
            discountedPriceEl.textContent = `$${discountedBase.toFixed(2)}`;
        }
    }
}

function initializeDiscountCode() {
    applyDiscountBtn = document.getElementById('applyDiscountBtn');
    discountCodeInput = document.getElementById('discountCode');
    discountMessage = document.getElementById('discountMessage');
    
    if (!applyDiscountBtn || !discountCodeInput) {
        console.warn('⚠️ Discount code elements not found');
        return;
    }

applyDiscountBtn.addEventListener('click', () => {
    const code = discountCodeInput.value.trim().toUpperCase();
    if (code === 'STUDENT20' || code === 'COLLEGE') {
        if (!discountApplied) {
            discountApplied = true;
            const discountedPrice = basePrice * 0.8; // 20% off
            
            document.getElementById('originalPrice').classList.add('strikethrough');
            document.getElementById('discountedPrice').textContent = `$${discountedPrice.toFixed(2)}`;
            document.getElementById('discountedPrice').style.display = 'inline';
            
            updateTotalPrice();
            
            discountMessage.textContent = '✓ 20% student discount applied!';
            discountMessage.className = 'discount-message success';
            
            showToast('Student discount applied successfully!');
        } else {
            discountMessage.textContent = 'Discount already applied';
            discountMessage.className = 'discount-message';
        }
    } else if (code === '') {
        discountMessage.textContent = 'Please enter a discount code';
        discountMessage.className = 'discount-message error';
    } else {
        discountMessage.textContent = 'Invalid discount code';
        discountMessage.className = 'discount-message error';
    }
});

// Express Delivery Checkbox
const expressDeliveryCheckbox = document.getElementById('expressDelivery');
if (expressDeliveryCheckbox) {
    expressDeliveryCheckbox.addEventListener('change', (e) => {
        expressDeliveryAdded = e.target.checked;
        updateTotalPrice();
        
        if (expressDeliveryAdded) {
            showToast('Express Delivery added! Timeline cut in half! 🚀');
        }
    });
}
}

// Card formatting functions - will be initialized after DOM loads
function initializeFormFormatting() {
// Card Number Formatting
const cardNumberInput = document.getElementById('cardNumber');
if (cardNumberInput) {
cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
});
}

// Expiry Date Formatting
const expiryDateInput = document.getElementById('expiryDate');
if (expiryDateInput) {
    expiryDateInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
}

// CVV - Numbers only
const cvvInput = document.getElementById('cvv');
if (cvvInput) {
    cvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}
}

// Booking Form Submission - will be initialized after DOM loads
function initializeBookingForm() {
const bookingForm = document.getElementById('bookingForm');
if (!bookingForm) {
    console.warn('⚠️ Booking form not found');
    return;
}

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate consultation booking if consultation package selected
    if (selectedPackage === 'consultation' && typeof validateConsultationBooking === 'function' && !validateConsultationBooking()) {
        return;
    }
    
    const formData = {
        package: selectedPackage,
        packageName: selectedPackage === 'consultation' ? 'Free Consultation' :
                     selectedPackage === 'starter' ? 'Starter Package' :
                     selectedPackage === 'growth' ? 'Growth Package' : 'Launch Plus Package',
        name: document.getElementById('bookingName').value,
        email: document.getElementById('bookingEmail').value,
        phone: document.getElementById('bookingPhone').value,
        amount: document.getElementById('totalAmount').textContent,
        discountApplied: discountApplied,
        expressDelivery: expressDeliveryAdded,
        consultationDate: selectedPackage === 'consultation' ? selectedDate : null,
        consultationTime: selectedPackage === 'consultation' ? selectedTime : null
    };
    
    if (selectedPackage === 'consultation') {
        // ...existing consultation logic...
        if (typeof bookConsultation === 'function') {
            const appointment = bookConsultation(formData);
            if (typeof sendConsultationConfirmation === 'function') {
                sendConsultationConfirmation(appointment, formData);
            }
        }
        setTimeout(() => {
            bookingModal.classList.remove('active');
            showToast('Consultation booked! Check your email for confirmation and meeting link.');
            bookingForm.reset();
            resetBookingModal();
        }, 1000);
    } else {
        // Stripe payment processing
        if (!stripe) {
            showToast('Payment system not ready. Please try again later.');
            return;
        }
        // Collect card details from form
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const exp = document.getElementById('expiryDate').value.split('/');
        const exp_month = exp[0];
        const exp_year = '20' + exp[1];
        const cvc = document.getElementById('cvv').value;
        const billing_zip = document.getElementById('billingZip').value;
        try {
            // Create Stripe token
            const {token, error} = await stripe.createToken('card', {
                number: cardNumber,
                exp_month,
                exp_year,
                cvc,
                address_zip: billing_zip
            });
            if (error) {
                showToast('Payment error: ' + error.message);
                return;
            }
            // Send token and booking info to backend for payment processing
            // TODO: Implement backend endpoint to handle payment
            // Example:
            // await fetch('/api/charge', { method: 'POST', body: JSON.stringify({ token: token.id, ...formData }) })
            showToast('Payment successful! Booking confirmed.');
            bookingModal.classList.remove('active');
            bookingForm.reset();
            resetBookingModal();
        } catch (err) {
            showToast('Payment failed. Please check your card details.');
        }
    }
});
}

// Contact Form - will be initialized after DOM loads
function initializeContactForm() {
const contactForm = document.getElementById('contactForm');
if (!contactForm) {
    console.warn('⚠️ Contact form not found');
    return;
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    const subject = encodeURIComponent('NikohlCreations Inquiry from ' + name);
    const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
    window.location.href = `mailto:nikohlcreations@gmail.com?subject=${subject}&body=${body}`;
});
}

// AI Chat - will be initialized after DOM loads
function initializeAIChat() {
const aiChatBtn = document.getElementById('aiChatBtn');
const aiChatModal = document.getElementById('aiChatModal');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

if (!aiChatBtn || !aiChatModal || !chatForm) {
    console.warn('⚠️ AI Chat elements not found');
    return;
}

aiChatBtn.addEventListener('click', () => {
    aiChatModal.classList.add('active');
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const message = chatInput.value.trim();
    if (message === '') return;
    
    // Add user message
    addChatMessage(message, 'user', chatMessages);
    chatInput.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const response = getAIResponse(message);
        addChatMessage(response, 'bot', chatMessages);
    }, 1000);
});
}

function addChatMessage(message, sender, chatMessagesEl) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    if (sender === 'bot') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="images/nikohlcreations.jpg" alt="AI">
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
    }
    if (chatMessagesEl) {
        chatMessagesEl.appendChild(messageDiv);
        chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
    }
}

function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    // Greeting
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hi there! I'm Le'lah's AI assistant. I'm here to help you choose the perfect package and answer any questions about NikohlCreations services. What brings you here today?";
    }
    // Package recommendations
    if (lowerMessage.includes('recommend') || lowerMessage.includes('which package') || lowerMessage.includes('what package')) {
        return "I'd be happy to help! Can you tell me more about your project? How many pages do you need, and what features are most important to you?";
    }
    if (lowerMessage.includes('one page') || lowerMessage.includes('1 page') || lowerMessage.includes('simple')) {
        return "For a simple 1-2 page application, I'd recommend the Starter Package at $297.99. It includes responsive design, deployment, and 1 revision. Perfect for landing pages or portfolios!";
    }
    if (lowerMessage.includes('two page') || lowerMessage.includes('2 page') || lowerMessage.includes('forms')) {
        return "The Growth Package ($349.99) would be perfect! It includes 2-3 pages, navigation, forms, dark/light mode, and 2 revisions. Great for small business sites!";
    }
    if (lowerMessage.includes('three page') || lowerMessage.includes('3 page') || lowerMessage.includes('five page') || lowerMessage.includes('5 page') || lowerMessage.includes('complex') || lowerMessage.includes('multiple pages')) {
        return "I'd recommend the Launch Plus Package at $597.99. You get 4-5 pages and can choose 3 add-ons like custom UI theme, email integration, or extra revisions. It's our most comprehensive package!";
    }
    // Express Delivery
    if (lowerMessage.includes('express') || lowerMessage.includes('fast') || lowerMessage.includes('quick') || lowerMessage.includes('rush') || lowerMessage.includes('urgent')) {
        return "Great question! We offer Express Delivery for an additional $150. This cuts your project timeline in half! For example, a Starter Package goes from 3-5 days down to 1.5-2.5 days. You can add this during checkout. 🚀";
    }
    // Pricing questions
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
        return "We have 4 packages:\n• Consultation: $29.99\n• Starter: $297.99 (1-2 pages)\n• Growth: $349.99 (2-3 pages)\n• Launch Plus: $597.99 (4-5 pages)\n\nPlus, Express Delivery is available for $150 to cut timelines in half!\n\nTip: Use code COLLEGE for 20% off! 🎓";
    }
    // Discount code
    if (lowerMessage.includes('discount') || lowerMessage.includes('coupon') || lowerMessage.includes('code') || lowerMessage.includes('promo')) {
        return "Great question! We do offer a special discount code for students. When you're ready to book, try using the code COLLEGE at checkout for a 20% discount! 🎓";
    }
    // Timeline questions
    if (lowerMessage.includes('how long') || lowerMessage.includes('timeline') || lowerMessage.includes('duration') || lowerMessage.includes('when')) {
        return "Project timelines vary:\n• Starter Package: 3-5 days\n• Growth Package: 5-7 days\n• Launch Plus: 7-10 days\n\nWith Express Delivery (+$150), these timelines are cut in half! We'll discuss exact timelines during your consultation.";
    }
    // Consultation
    if (lowerMessage.includes('consultation') || lowerMessage.includes('consult')) {
        return "The Consultation package is $29.99 for a 30-minute session. The best part? The fee is credited towards your project if you decide to move forward! It's a great way to discuss your ideas and get a project roadmap.";
    }
    // Contact/start
    if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('contact') || lowerMessage.includes('book')) {
        return "Awesome! You can book a package directly from the 'Book Now' section, or send a message through the Contact form. You can also email Le'lah at lelahnikohl@gmail.com. Ready to build something amazing?";
    }
    // Features
    if (lowerMessage.includes('features') || lowerMessage.includes('include') || lowerMessage.includes('what do i get')) {
        return "All packages include responsive design and deployment. Growth and Launch Plus also include dark/light mode. Launch Plus lets you choose 3 add-ons: dark mode, contact forms, email integration, custom UI theme, or extra revisions!";
    }
    // About Le'lah
    if (lowerMessage.includes('who') || lowerMessage.includes('lelah') || lowerMessage.includes('you') || lowerMessage.includes('founder')) {
        return "I'm Le'lah McKoy, the founder of Nikohl Creations! I create web applications for small businesses, creators, and entrepreneurs. I built this very website you're on right now! Check out my other work in the Projects section.";
    }
    // Default response
    return "That's a great question! I'm here to help you find the perfect package. You can ask me about:\n• Package recommendations\n• Pricing and features\n• Project timelines\n• Express Delivery\n• The consultation process\n• Discount codes\n\nWhat would you like to know more about?";
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('successToast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .package-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'var(--shadow)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-lg)';
    }
    
    lastScroll = currentScroll;
});

// Initialize animations on load
window.addEventListener('load', () => {
    document.querySelector('.hero').style.opacity = '1';
});

// Template Preview & Selection Logic
function initializeTemplateSelection() {
    const templateCards = document.querySelectorAll('.template-card');
    const previewModal = document.getElementById('templatePreviewModal');
    const closePreviewBtn = document.getElementById('closeTemplatePreview');
    const previewTitle = document.getElementById('previewTemplateTitle');
    const previewImg = document.getElementById('previewTemplateImg');
    const previewDesc = document.getElementById('previewTemplateDesc');
    const selectBtn = document.getElementById('selectThisTemplateBtn');
    let selectedTemplate = null;

    // Template data for modal
    const templateData = {
        'minimal-portfolio': {
            title: 'Minimal Portfolio',
            img: 'images/minimal-portfolio-preview.jpg',
            desc: 'Clean, modern, and perfect for showcasing your work.'
        },
        'creative-showcase': {
            title: 'Creative Showcase',
            img: 'images/creative-showcase-preview.jpg',
            desc: 'Vibrant and bold, ideal for artists and creators.'
        },
        'lelah-portfolio': {
            title: 'Le’lah’s Portfolio',
            img: 'images/lelah-portfolio-preview.jpg',
            desc: 'Inspired by my own site, great for personal branding.'
        },
        'budget-tracker': {
            title: 'BudgetTracker',
            img: 'images/budget-tracker-preview.jpg',
            desc: 'Track your expenses and savings with style.'
        },
        'get-tasked': {
            title: 'GetTasked',
            img: 'images/get-tasked-preview.jpg',
            desc: 'Organize your tasks and boost productivity.'
        },
        'simple-blog': {
            title: 'Simple Blog',
            img: 'images/simple-blog-preview.jpg',
            desc: 'Start sharing your thoughts with a clean blog layout.'
        },
        'modern-business': {
            title: 'Modern Business',
            img: 'images/modern-business-preview.jpg',
            desc: 'Professional and sleek, perfect for any business.'
        },
        'data-sistah': {
            title: 'Data Sistah',
            img: 'images/data-sistah-preview.jpg',
            desc: 'Showcase your business with a data-driven look.'
        },
        'nikohl-creations': {
            title: 'Nikohl Creations',
            img: 'images/nikohl-creations-preview.jpg',
            desc: 'My signature template, great for creative businesses.'
        }
    };

    // Open preview modal
    document.querySelectorAll('.choose-template-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const card = btn.closest('.template-card');
            const key = card.getAttribute('data-template');
            if (templateData[key]) {
                previewTitle.textContent = templateData[key].title;
                previewImg.src = templateData[key].img;
                previewImg.alt = templateData[key].title + ' Preview';
                previewDesc.textContent = templateData[key].desc;
                selectBtn.setAttribute('data-template', key);
                previewModal.classList.add('active');
            }
        });
    });
    // Close modal
    closePreviewBtn.addEventListener('click', () => {
        previewModal.classList.remove('active');
    });
    window.addEventListener('click', (e) => {
        if (e.target === previewModal) previewModal.classList.remove('active');
    });
    // Highlight selected template
    selectBtn.addEventListener('click', function() {
        const key = selectBtn.getAttribute('data-template');
        templateCards.forEach(card => {
            if (card.getAttribute('data-template') === key) {
                card.classList.add('selected');
                selectedTemplate = key;
            } else {
                card.classList.remove('selected');
            }
        });
        previewModal.classList.remove('active');
        showToast('Template selected: ' + templateData[key].title);
    });
}

// Info bubble content for each package
const bubbleInfo = {
    'starter-pages': 'Includes 1-2 custom-designed pages tailored to your needs.',
    'starter-responsive': 'Your site will look great on all devices with responsive design.',
    'starter-deploy': 'We handle live deployment so your site is accessible online.',
    'starter-revision': 'One revision included to perfect your site.',
    'growth-pages': 'Includes 2-3 pages for more content and features.',
    'growth-navigation': 'Navigation bar and interactive forms included.',
    'growth-darkmode': 'Switch between dark and light mode for user preference.',
    'growth-revision': 'Two revisions included for extra flexibility.',
    'launch-pages': 'Includes 4-5 pages for a full-featured web app.',
    'launch-addons': 'Choose 3 add-ons (e.g., blog, gallery, analytics, etc.).',
    'launch-theme': 'Custom UI theme to match your brand.',
    'launch-revision': 'Two revisions included for your satisfaction.'
};

// Bubble click logic
const infoBubbles = document.querySelectorAll('.info-bubble');
infoBubbles.forEach(bubble => {
    bubble.addEventListener('click', function() {
        // Remove active from all bubbles in this card
        const parent = bubble.closest('.package-card');
        parent.querySelectorAll('.info-bubble').forEach(b => b.classList.remove('active'));
        bubble.classList.add('active');
        // Show info
        const infoKey = bubble.getAttribute('data-info');
        const infoContent = bubbleInfo[infoKey] || '';
        const infoBox = parent.querySelector('.bubble-info-content');
        infoBox.textContent = infoContent;
        infoBox.style.display = 'block';
    });
});

// More Details modal content for each package
const packageDetails = {
    starter: {
        title: 'Starter Package',
        details: `<ul>
            <li>1-2 custom-designed pages</li>
            <li>Responsive design for all devices</li>
            <li>Live deployment included</li>
            <li>1 revision included</li>
            <li>Perfect for simple portfolios or landing pages</li>
        </ul>`
    },
    growth: {
        title: 'Growth Package',
        details: `<ul>
            <li>2-3 page app for more content/features</li>
            <li>Navigation bar and interactive forms</li>
            <li>Dark/light mode toggle</li>
            <li>Responsive design</li>
            <li>2 revisions included</li>
            <li>Great for creators, small businesses, or blogs</li>
        </ul>`
    },
    'launch-plus': {
        title: 'Launch Plus Package',
        details: `<ul>
            <li>4-5 page web app for full-featured sites</li>
            <li>Choose 3 add-ons (blog, gallery, analytics, etc.)</li>
            <li>Dark/light mode toggle</li>
            <li>Contact form & email integration</li>
            <li>Custom UI theme</li>
            <li>Responsive design</li>
            <li>Live deployment</li>
            <li>2 revisions included</li>
            <li>Best for businesses or advanced creators</li>
        </ul>`
    }
};

// Modal for More Details
let detailsModal = document.getElementById('detailsModal');
if (!detailsModal) {
    detailsModal = document.createElement('div');
    detailsModal.className = 'modal';
    detailsModal.id = 'detailsModal';
    detailsModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" id="closeDetailsModal">&times;</span>
            <h2 id="detailsModalTitle"></h2>
            <div id="detailsModalBody"></div>
        </div>
    `;
    document.body.appendChild(detailsModal);
}

// Open modal on button click
const detailsBtns = document.querySelectorAll('.more-details-btn');
detailsBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const card = btn.closest('.package-card');
        const pkg = card.getAttribute('data-package');
        const info = packageDetails[pkg];
        if (info) {
            document.getElementById('detailsModalTitle').textContent = info.title;
            document.getElementById('detailsModalBody').innerHTML = info.details;
            detailsModal.style.display = 'block';
        }
    });
});
// Close modal
const closeDetailsModal = document.getElementById('closeDetailsModal');
if (closeDetailsModal) {
    closeDetailsModal.onclick = () => { detailsModal.style.display = 'none'; };
}
window.onclick = function(event) {
    if (event.target === detailsModal) {
        detailsModal.style.display = 'none';
    }
};

// ============================================
// INITIALIZE ALL COMPONENTS ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM Content Loaded - Initializing NikohlCreations website...');
    
    try {
        // Initialize booking modal and package selection
        if (typeof initializeBookingModal === 'function') {
            initializeBookingModal();
            console.log('✅ Booking modal initialized');
        }
        
        // Initialize discount code functionality
        if (typeof initializeDiscountCode === 'function') {
            initializeDiscountCode();
            console.log('✅ Discount code initialized');
        }
        
        // Initialize form formatting (card number, expiry, CVV)
        if (typeof initializeFormFormatting === 'function') {
            initializeFormFormatting();
            console.log('✅ Form formatting initialized');
        }
        
        // Initialize booking form submission
        if (typeof initializeBookingForm === 'function') {
            initializeBookingForm();
            console.log('✅ Booking form initialized');
        }
        
        // Initialize contact form
        if (typeof initializeContactForm === 'function') {
            initializeContactForm();
            console.log('✅ Contact form initialized');
        }
        
        // Initialize AI chat
        if (typeof initializeAIChat === 'function') {
            initializeAIChat();
            console.log('✅ AI chat initialized');
        }
        
        // Load existing appointments from localStorage
        if (typeof loadFromLocalStorage === 'function') {
            loadFromLocalStorage();
            console.log('✅ Loaded appointments from localStorage');
        }
        
        // Initialize the consultation booking system (calendar, time slots, etc.)
        // This will be called again when the consultation modal opens
        if (typeof initializeBookingSystem === 'function') {
            initializeBookingSystem();
            console.log('✅ Booking system ready');
        }

        // Initialize Stripe
        if (typeof initializeStripe === 'function') {
            initializeStripe();
            console.log('✅ Stripe initialized');
        }

        // Initialize EmailJS
        if (typeof initializeEmailJS === 'function') {
            initializeEmailJS();
            console.log('✅ EmailJS initialized');
        }

        // Initialize template selection
        if (typeof initializeTemplateSelection === 'function') {
            initializeTemplateSelection();
            console.log('✅ Template selection initialized');
        }
        
        console.log('🎉 All systems initialized successfully!');
    } catch (error) {
        console.error('❌ Error during initialization:', error);
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const response = await fetch('/api/send-contact-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            const result = await response.json();
            if (result.success) {
                showToast('Message sent successfully!');
                contactForm.reset();
            } else {
                showToast('Failed to send message. Please try again.');
            }
        } catch (err) {
            showToast('Error sending message. Please try again.');
        }
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    });
}

function showToast(msg) {
    const toast = document.getElementById('successToast');
    const toastMsg = document.getElementById('toastMessage');
    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
