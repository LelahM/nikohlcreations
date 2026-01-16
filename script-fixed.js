// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

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

// ==========================
// BOOKING MODAL
// ==========================
let bookingModal;
let selectPackageBtns;
let closeModalBtns;
let selectedPackage = null;
let basePrice = 0;
let discountApplied = false;
let expressDeliveryAdded = false;

function initializeBookingModal() {
    bookingModal = document.getElementById('bookingModal');
    selectPackageBtns = document.querySelectorAll('.select-package-btn');
    closeModalBtns = document.querySelectorAll('.close-modal');
    
    console.log('Found', selectPackageBtns.length, 'package buttons');
    
    if (selectPackageBtns.length === 0) {
        console.error('❌ No package buttons found!');
        return;
    }

    selectPackageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('✅ Package button clicked');
            
            const packageCard = btn.closest('.package-card');
            selectedPackage = packageCard.dataset.package;
            basePrice = parseFloat(packageCard.dataset.price);
            
            console.log('Selected:', selectedPackage, 'Price:', basePrice);
            
            const packageName = packageCard.querySelector('h3').textContent;
            document.getElementById('selectedPackageName').textContent = packageName;
            document.getElementById('originalPrice').textContent = `$${basePrice}`;
            document.getElementById('totalAmount').textContent = `$${basePrice}`;
            
            // Reset
            discountApplied = false;
            expressDeliveryAdded = false;
            document.getElementById('discountCode').value = '';
            document.getElementById('discountMessage').textContent = '';
            document.getElementById('discountedPrice').style.display = 'none';
            document.getElementById('originalPrice').classList.remove('strikethrough');
            document.getElementById('expressDelivery').checked = false;
            
            // Show/hide consultation section
            const consultationBookingSection = document.getElementById('consultationBooking');
            if (selectedPackage === 'consultation') {
                consultationBookingSection.style.display = 'block';
                document.getElementById('consultationDate').setAttribute('required', 'required');
                document.getElementById('consultationTime').setAttribute('required', 'required');
                const paymentInfo = document.querySelector('.payment-info');
                if (paymentInfo) paymentInfo.style.display = 'none';
                
                // Initialize booking system for consultation
                if (typeof initializeBookingSystem === 'function') {
                    initializeBookingSystem();
                }
            } else {
                consultationBookingSection.style.display = 'none';
                document.getElementById('consultationDate').removeAttribute('required');
                document.getElementById('consultationTime').removeAttribute('required');
                const paymentInfo = document.querySelector('.payment-info');
                if (paymentInfo) paymentInfo.style.display = 'block';
            }
            
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

function resetBookingModal() {
    if (typeof selectedDate !== 'undefined') selectedDate = null;
    if (typeof selectedTime !== 'undefined') selectedTime = null;
    discountApplied = false;
    expressDeliveryAdded = false;
    
    document.getElementById('discountCode').value = '';
    document.getElementById('discountMessage').textContent = '';
    document.getElementById('discountedPrice').style.display = 'none';
    document.getElementById('originalPrice').classList.remove('strikethrough');
    document.getElementById('expressDelivery').checked = false;
    
    // Reset consultation fields
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

// ==========================
// DISCOUNT CODE
// ==========================
function updateTotalPrice() {
    let finalPrice = basePrice;
    
    if (discountApplied) {
        finalPrice = finalPrice * 0.85; // 15% off
    }
    
    if (expressDeliveryAdded) {
        finalPrice += 150;
    }
    
    const totalAmountEl = document.getElementById('totalAmount');
    if (totalAmountEl) {
        totalAmountEl.textContent = `$${finalPrice.toFixed(2)}`;
    }
    
    if (discountApplied) {
        const discountedBase = basePrice * 0.85;
        const discountedPriceEl = document.getElementById('discountedPrice');
        if (discountedPriceEl) {
            discountedPriceEl.textContent = `$${discountedBase.toFixed(2)}`;
        }
    }
}

function initializeDiscountCode() {
    const applyDiscountBtn = document.getElementById('applyDiscountBtn');
    const discountCodeInput = document.getElementById('discountCode');
    const discountMessage = document.getElementById('discountMessage');
    
    if (!applyDiscountBtn || !discountCodeInput) {
        console.warn('⚠️ Discount code elements not found');
        return;
    }

    applyDiscountBtn.addEventListener('click', () => {
        const code = discountCodeInput.value.trim().toUpperCase();
        
        if (code === 'COLLEGE') {
            if (!discountApplied) {
                discountApplied = true;
                const discountedPrice = basePrice * 0.85;
                
                document.getElementById('originalPrice').classList.add('strikethrough');
                document.getElementById('discountedPrice').textContent = `$${discountedPrice.toFixed(2)}`;
                document.getElementById('discountedPrice').style.display = 'inline';
                
                updateTotalPrice();
                
                discountMessage.textContent = '✓ 15% COLLEGE discount applied!';
                discountMessage.className = 'discount-message success';
                
                showToast('Discount applied successfully!');
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

    // Express Delivery
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

// ==========================
// FORM FORMATTING
// ==========================
function initializeFormFormatting() {
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

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

    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
}

// ==========================
// BOOKING FORM
// ==========================
function initializeBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    if (!bookingForm) {
        console.warn('⚠️ Booking form not found');
        return;
    }

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate consultation
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
            consultationDate: selectedPackage === 'consultation' && typeof selectedDate !== 'undefined' ? selectedDate : null,
            consultationTime: selectedPackage === 'consultation' && typeof selectedTime !== 'undefined' ? selectedTime : null
        };
        
        if (selectedPackage === 'consultation') {
            if (typeof bookConsultation === 'function') {
                const appointment = bookConsultation(formData);
                if (typeof sendConsultationConfirmation === 'function') {
                    sendConsultationConfirmation(appointment, formData);
                }
            }
            
            setTimeout(() => {
                bookingModal.classList.remove('active');
                showToast('Consultation booked! Check your email for confirmation.');
                bookingForm.reset();
                resetBookingModal();
            }, 1000);
        } else {
            setTimeout(() => {
                bookingModal.classList.remove('active');
                showToast('Booking confirmed! Check your email for confirmation.');
                bookingForm.reset();
                resetBookingModal();
                
                console.log('Booking confirmation sent to:', formData.email);
                console.log('Booking details:', formData);
            }, 1000);
        }
    });
}

// ==========================
// CONTACT FORM
// ==========================
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.warn('⚠️ Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            message: document.getElementById('contactMessage').value
        };
        
        setTimeout(() => {
            showToast('Message sent successfully! We\'ll get back to you soon.');
            contactForm.reset();
            console.log('Contact form submitted:', formData);
        }, 1000);
    });
}

// ==========================
// AI CHAT
// ==========================
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
        
        addChatMessage(message, 'user', chatMessages);
        chatInput.value = '';
        
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
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hi there! I'm Le'lah's AI assistant. I'm here to help you choose the perfect package and answer any questions about NikohlCreations services. What brings you here today?";
    }
    
    if (lowerMessage.includes('recommend') || lowerMessage.includes('which package') || lowerMessage.includes('what package')) {
        return "I'd be happy to help! Can you tell me more about your project? How many pages do you need, and what features are most important to you?";
    }
    
    if (lowerMessage.includes('one page') || lowerMessage.includes('1 page') || lowerMessage.includes('simple')) {
        return "For a simple 1-2 page application, I'd recommend the Starter Package at $297.99. It includes responsive design, deployment, and 1 revision. Perfect for landing pages or portfolios!";
    }
    
    if (lowerMessage.includes('two page') || lowerMessage.includes('2 page') || lowerMessage.includes('forms')) {
        return "The Growth Package ($449.99) would be perfect! It includes 2-3 pages, navigation, forms, dark/light mode, and 2 revisions. Great for small business sites!";
    }
    
    if (lowerMessage.includes('three page') || lowerMessage.includes('3 page') || lowerMessage.includes('five page') || lowerMessage.includes('5 page') || lowerMessage.includes('complex') || lowerMessage.includes('multiple pages')) {
        return "I'd recommend the Launch Plus Package at $697.99. You get 4-5 pages and can choose 3 add-ons like custom UI theme, email integration, or extra revisions. It's our most comprehensive package!";
    }
    
    if (lowerMessage.includes('express') || lowerMessage.includes('fast') || lowerMessage.includes('quick') || lowerMessage.includes('rush') || lowerMessage.includes('urgent')) {
        return "Great question! We offer Express Delivery for an additional $150. This cuts your project timeline in half! For example, a Starter Package goes from 3-5 days down to 1.5-2.5 days. You can add this during checkout. 🚀";
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
        return "We have 4 packages:\n• Consultation: $49.99\n• Starter: $297.99 (1-2 pages)\n• Growth: $449.99 (2-3 pages)\n• Launch Plus: $697.99 (4-5 pages)\n\nPlus, Express Delivery is available for $150 to cut timelines in half!\n\nTip: Use code COLLEGE for 15% off! 🎓";
    }
    
    if (lowerMessage.includes('discount') || lowerMessage.includes('coupon') || lowerMessage.includes('code') || lowerMessage.includes('promo')) {
        return "Great question! We do offer a special discount code for students. When you're ready to book, try using the code COLLEGE at checkout for a 15% discount! 🎓";
    }
    
    if (lowerMessage.includes('how long') || lowerMessage.includes('timeline') || lowerMessage.includes('duration') || lowerMessage.includes('when')) {
        return "Project timelines vary:\n• Starter Package: 3-5 days\n• Growth Package: 5-7 days\n• Launch Plus: 7-10 days\n\nWith Express Delivery (+$150), these timelines are cut in half! We'll discuss exact timelines during your consultation.";
    }
    
    if (lowerMessage.includes('consultation') || lowerMessage.includes('consult')) {
        return "The Consultation package is $49.99 for a 30-minute session. The best part? The fee is credited towards your project if you decide to move forward! It's a great way to discuss your ideas and get a project roadmap.";
    }
    
    if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('contact') || lowerMessage.includes('book')) {
        return "Awesome! You can book a package directly from the 'Book Now' section, or send a message through the Contact form. You can also email Le'lah at lelahnikohl@gmail.com. Ready to build something amazing?";
    }
    
    if (lowerMessage.includes('features') || lowerMessage.includes('include') || lowerMessage.includes('what do i get')) {
        return "All packages include responsive design and deployment. Growth and Launch Plus also include dark/light mode. Launch Plus lets you choose 3 add-ons: dark mode, contact forms, email integration, custom UI theme, or extra revisions!";
    }
    
    if (lowerMessage.includes('who') || lowerMessage.includes('lelah') || lowerMessage.includes('you') || lowerMessage.includes('founder')) {
        return "I'm Le'lah McKoy, the founder of Nikohl Creations! I create web applications for small businesses, creators, and entrepreneurs. I built this very website you're on right now! Check out my other work in the Projects section.";
    }
    
    return "That's a great question! I'm here to help you find the perfect package. You can ask me about:\n• Package recommendations\n• Pricing and features\n• Project timelines\n• Express Delivery\n• The consultation process\n• Discount codes\n\nWhat would you like to know more about?";
}

// ==========================
// UTILITIES
// ==========================
function showToast(message) {
    const toast = document.getElementById('successToast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==========================
// SCROLL ANIMATIONS
// ==========================
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

window.addEventListener('load', () => {
    document.querySelector('.hero').style.opacity = '1';
});

// ==========================
// INITIALIZE ON DOM LOADED
// ==========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing NikohlCreations website...');
    
    try {
        initializeBookingModal();
        console.log('✅ Booking modal');
        
        initializeDiscountCode();
        console.log('✅ Discount code');
        
        initializeFormFormatting();
        console.log('✅ Form formatting');
        
        initializeBookingForm();
        console.log('✅ Booking form');
        
        initializeContactForm();
        console.log('✅ Contact form');
        
        initializeAIChat();
        console.log('✅ AI chat');
        
        if (typeof loadFromLocalStorage === 'function') {
            loadFromLocalStorage();
            console.log('✅ Loaded appointments');
        }
        
        if (typeof initializeBookingSystem === 'function') {
            initializeBookingSystem();
            console.log('✅ Booking system ready');
        }
        
        console.log('🎉 All systems ready!');
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
});
