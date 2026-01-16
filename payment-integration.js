// Payment and Email Integration Configuration
// Replace the placeholder values with your actual API keys

// ============================================
// STRIPE CONFIGURATION
// ============================================
// Get your keys from: https://dashboard.stripe.com/apikeys
const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_KEY_HERE'; // Replace with your key
// Note: Secret key goes in backend (not exposed in frontend)

// ============================================
// EMAILJS CONFIGURATION  
// ============================================
// Get your credentials from: https://dashboard.emailjs.com
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY_HERE',      // Your User ID
    serviceId: 'YOUR_SERVICE_ID_HERE',       // Your Email Service ID
    templateId: 'YOUR_TEMPLATE_ID_HERE'      // Your Template ID
};

// Your business email to receive notifications
const BUSINESS_EMAIL = 'lelahnikohl@gmail.com';

// ============================================
// Initialize EmailJS (Add this to script.js)
// ============================================
(function() {
    // Initialize EmailJS with your public key
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// ============================================
// ENHANCED BOOKING FORM SUBMISSION
// ============================================
// Replace the existing bookingForm.addEventListener in script.js with this:

const bookingFormEnhanced = document.getElementById('bookingForm');
bookingFormEnhanced.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        package: selectedPackage,
        packageName: document.getElementById('selectedPackageName').textContent,
        name: document.getElementById('bookingName').value,
        email: document.getElementById('bookingEmail').value,
        phone: document.getElementById('bookingPhone').value,
        amount: document.getElementById('totalAmount').textContent,
        discountApplied: discountApplied,
        expressDelivery: expressDeliveryAdded,
        discountCode: discountApplied ? 'COLLEGE' : 'None'
    };
    
    // Extract amount as number (remove $ and convert to cents for Stripe)
    const amountInDollars = parseFloat(formData.amount.replace('$', ''));
    const amountInCents = Math.round(amountInDollars * 100);
    
    // Show processing message
    const submitBtn = e.target.querySelector('.submit-booking-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing Payment...';
    submitBtn.disabled = true;
    
    try {
        // ============================================
        // STEP 1: Process Payment with Stripe
        // ============================================
        // Note: In production, you need a backend server to create payment intent
        // For now, this is a simulation. See PAYMENT_SETUP_GUIDE.md for full setup
        
        const paymentSuccessful = await simulatePayment(formData, amountInCents);
        
        if (paymentSuccessful) {
            // ============================================
            // STEP 2: Send Email Confirmation to Customer
            // ============================================
            await sendCustomerEmail(formData);
            
            // ============================================
            // STEP 3: Send Notification to Business (You)
            // ============================================
            await sendBusinessNotification(formData);
            
            // ============================================
            // STEP 4: Show Success Message
            // ============================================
            bookingModal.classList.remove('active');
            showToast('Booking confirmed! Check your email for confirmation.');
            bookingForm.reset();
            
            // Log success
            console.log('✅ Payment processed successfully');
            console.log('✅ Confirmation sent to:', formData.email);
            console.log('✅ Notification sent to:', BUSINESS_EMAIL);
            console.log('💰 Amount charged: $' + amountInDollars);
            
        } else {
            throw new Error('Payment failed');
        }
        
    } catch (error) {
        console.error('Error processing booking:', error);
        showToast('Payment failed. Please try again or contact us.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// ============================================
// PAYMENT SIMULATION (Replace with real Stripe)
// ============================================
async function simulatePayment(formData, amountInCents) {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In production, this would be:
    /*
    const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            amount: amountInCents,
            customerEmail: formData.email,
            customerName: formData.name,
            description: `${formData.packageName} - NikohlCreations`
        })
    });
    return response.ok;
    */
    
    // For now, simulate success
    console.log('💳 Simulated payment:', {
        amount: amountInCents / 100,
        customer: formData.name,
        email: formData.email
    });
    
    return true; // Simulate successful payment
}

// ============================================
// SEND EMAIL TO CUSTOMER
// ============================================
async function sendCustomerEmail(formData) {
    try {
        const templateParams = {
            to_email: formData.email,
            to_name: formData.name,
            package_name: formData.packageName,
            amount: formData.amount,
            express_delivery: formData.expressDelivery ? 'Yes' : 'No',
            discount_code: formData.discountCode,
            phone: formData.phone,
            business_email: BUSINESS_EMAIL
        };
        
        // Send email using EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        );
        
        console.log('✅ Customer email sent:', response);
        return true;
    } catch (error) {
        console.error('❌ Failed to send customer email:', error);
        // Don't fail the transaction if email fails
        return false;
    }
}

// ============================================
// SEND NOTIFICATION TO BUSINESS OWNER (YOU)
// ============================================
async function sendBusinessNotification(formData) {
    try {
        const templateParams = {
            to_email: BUSINESS_EMAIL,
            to_name: 'Le\'lah',
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone,
            package_name: formData.packageName,
            amount: formData.amount,
            express_delivery: formData.expressDelivery ? 'Yes' : 'No',
            discount_applied: formData.discountApplied ? 'Yes (COLLEGE - 15%)' : 'No',
            booking_date: new Date().toLocaleString()
        };
        
        // Send notification email
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            'template_notification', // Create a separate template for business notifications
            templateParams
        );
        
        console.log('✅ Business notification sent:', response);
        return true;
    } catch (error) {
        console.error('❌ Failed to send business notification:', error);
        return false;
    }
}

// ============================================
// ENHANCED CONTACT FORM (With Email)
// ============================================
const contactFormEnhanced = document.getElementById('contactForm');
contactFormEnhanced.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        message: document.getElementById('contactMessage').value
    };
    
    try {
        // Send contact form email
        const templateParams = {
            to_email: BUSINESS_EMAIL,
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            received_date: new Date().toLocaleString()
        };
        
        await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            'template_contact', // Create template for contact form
            templateParams
        );
        
        showToast('Message sent successfully! We\'ll get back to you soon.');
        contactForm.reset();
        
    } catch (error) {
        console.error('Error sending contact form:', error);
        showToast('Failed to send message. Please email us directly.');
    }
});

// ============================================
// INSTRUCTIONS FOR GOING LIVE
// ============================================
/*

TO MAKE THIS WORK WITH REAL PAYMENTS:

1. STRIPE SETUP
   ---------------
   a) Create Stripe account at stripe.com
   b) Add your bank account (Settings → Bank accounts)
   c) Get API keys (Developers → API keys)
   d) Replace STRIPE_PUBLISHABLE_KEY above
   e) Create a backend server (Node.js/Python) to handle secret key
   
2. EMAILJS SETUP
   ---------------
   a) Create account at emailjs.com
   b) Add email service (Gmail/Outlook)
   c) Create templates:
      - Customer booking confirmation
      - Business notification
      - Contact form
   d) Replace EMAILJS_CONFIG values above
   
3. ADD STRIPE SCRIPT
   ---------------
   Add to index.html <head>:
   <script src="https://js.stripe.com/v3/"></script>
   
4. ADD EMAILJS SCRIPT
   ---------------
   Add to index.html <head>:
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   
5. CREATE BACKEND API
   ---------------
   You need a simple server to securely process payments.
   I can help you set this up with:
   - Vercel serverless functions (recommended, free)
   - Netlify functions (also free)
   - Custom Node.js server
   
6. TEST MODE
   ---------------
   Test with Stripe test cards before going live:
   Card: 4242 4242 4242 4242
   Expiry: Any future date
   CVV: Any 3 digits
   
Need help with any step? Let me know!

*/
