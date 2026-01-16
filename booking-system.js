// ============================================
// CONSULTATION BOOKING SYSTEM
// ============================================

// Configuration
const BUSINESS_HOURS = {
    start: 9,  // 9 AM
    end: 17,   // 5 PM
    timezone: 'America/New_York', // EST/EDT
    slotDuration: 30, // 30-minute slots
    workDays: [1, 2, 3, 4, 5] // Monday-Friday
};

// Store booked appointments (in production, this would be in a database)
let bookedAppointments = [];

// Calendar instance
let calendarInstance = null;
let selectedDate = null;
let selectedTime = null;

// ============================================
// INITIALIZE BOOKING SYSTEM
// ============================================
function initializeBookingSystem() {
    console.log('Initializing booking system...');
    
    // Check if required elements exist
    const timezoneDisplay = document.getElementById('timezoneDisplay');
    const consultationDate = document.getElementById('consultationDate');
    
    if (!timezoneDisplay || !consultationDate) {
        console.warn('⚠️ Consultation booking elements not found. They will be initialized when needed.');
        return;
    }
    
    try {
        // Get user's timezone
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        timezoneDisplay.textContent = `Times shown in your timezone (${userTimezone})`;
        
        // Initialize Flatpickr calendar
        initializeCalendar();
        
        // Setup time slot selection
        setupTimeSlotSelection();
        
        console.log('✅ Booking system initialized successfully');
    } catch (error) {
        console.error('❌ Error in initializeBookingSystem:', error);
    }
}

// ============================================
// INITIALIZE CALENDAR
// ============================================
function initializeCalendar() {
    const consultationDateInput = document.getElementById('consultationDate');
    
    calendarInstance = flatpickr(consultationDateInput, {
        minDate: 'today',
        maxDate: new Date().fp_incr(90), // 90 days out
        dateFormat: 'Y-m-d',
        disable: [
            // Disable weekends
            function(date) {
                return (date.getDay() === 0 || date.getDay() === 6);
            },
            // Disable past dates
            function(date) {
                return date < new Date().setHours(0, 0, 0, 0);
            }
        ],
        onChange: function(selectedDates, dateStr, instance) {
            selectedDate = dateStr;
            loadAvailableTimeSlots(dateStr);
            document.getElementById('consultationTime').value = '';
            document.getElementById('bookingSummary').style.display = 'none';
        },
        onReady: function(selectedDates, dateStr, instance) {
            // Style the calendar
            instance.calendarContainer.classList.add('consultation-calendar');
        }
    });
}

// ============================================
// LOAD AVAILABLE TIME SLOTS
// ============================================
function loadAvailableTimeSlots(date) {
    const timeSelect = document.getElementById('consultationTime');
    timeSelect.innerHTML = '<option value="">Select a time slot</option>';
    
    // Get user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Generate time slots
    const slots = generateTimeSlots(date, userTimezone);
    
    slots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot.value;
        option.textContent = slot.label;
        option.disabled = slot.isBooked;
        
        if (slot.isBooked) {
            option.textContent += ' (Unavailable)';
        }
        
        timeSelect.appendChild(option);
    });
    
    // Enable the time select
    timeSelect.disabled = false;
}

// ============================================
// GENERATE TIME SLOTS
// ============================================
function generateTimeSlots(date, userTimezone) {
    const slots = [];
    const selectedDate = new Date(date + 'T00:00:00');
    
    // Convert business hours from EST to user's timezone
    for (let hour = BUSINESS_HOURS.start; hour < BUSINESS_HOURS.end; hour++) {
        for (let minute = 0; minute < 60; minute += BUSINESS_HOURS.slotDuration) {
            // Create datetime in EST
            const slotTime = new Date(selectedDate);
            slotTime.setHours(hour, minute, 0, 0);
            
            // Convert to user's timezone for display
            const timeString = slotTime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: userTimezone
            });
            
            // Create ISO string for storage
            const isoString = slotTime.toISOString();
            
            // Check if slot is booked
            const isBooked = bookedAppointments.some(apt => 
                apt.datetime === isoString
            );
            
            // Don't show past time slots for today
            const now = new Date();
            const isPast = slotTime < now;
            
            if (!isPast) {
                slots.push({
                    value: isoString,
                    label: timeString,
                    isBooked: isBooked
                });
            }
        }
    }
    
    return slots;
}

// ============================================
// SETUP TIME SLOT SELECTION
// ============================================
function setupTimeSlotSelection() {
    const timeSelect = document.getElementById('consultationTime');
    
    timeSelect.addEventListener('change', function() {
        selectedTime = this.value;
        
        if (selectedTime) {
            // Show booking summary
            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const dateTime = new Date(selectedTime);
            
            const formattedDate = dateTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: userTimezone
            });
            
            const formattedTime = dateTime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: userTimezone
            });
            
            document.getElementById('selectedDateTime').textContent = 
                `${formattedDate} at ${formattedTime}`;
            document.getElementById('bookingSummary').style.display = 'block';
        } else {
            document.getElementById('bookingSummary').style.display = 'none';
        }
    });
}

// ============================================
// VALIDATE CONSULTATION BOOKING
// ============================================
function validateConsultationBooking() {
    if (selectedPackage === 'consultation') {
        if (!selectedDate || !selectedTime) {
            showToast('Please select a date and time for your consultation');
            return false;
        }
    }
    return true;
}

// ============================================
// BOOK CONSULTATION
// ============================================
function bookConsultation(formData) {
    // Add to booked appointments
    const appointment = {
        datetime: selectedTime,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        package: formData.packageName,
        amount: formData.amount,
        discountApplied: formData.discountApplied,
        bookingDate: new Date().toISOString()
    };
    
    bookedAppointments.push(appointment);
    
    // In production, save to database
    saveToLocalStorage();
    
    return appointment;
}

// ============================================
// SAVE TO LOCAL STORAGE (Temporary)
// ============================================
function saveToLocalStorage() {
    localStorage.setItem('bookedAppointments', JSON.stringify(bookedAppointments));
}

// ============================================
// LOAD FROM LOCAL STORAGE
// ============================================
function loadFromLocalStorage() {
    const stored = localStorage.getItem('bookedAppointments');
    if (stored) {
        bookedAppointments = JSON.parse(stored);
    }
}

// ============================================
// SEND CONFIRMATION EMAIL
// ============================================
async function sendConsultationConfirmation(appointment, formData) {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dateTime = new Date(selectedTime);
    
    const formattedDate = dateTime.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: userTimezone
    });
    
    const formattedTime = dateTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: userTimezone
    });
    
    // Email data
    const emailData = {
        to: formData.email,
        subject: 'Consultation Booking Confirmed - NikohlCreations',
        message: `
Hi ${formData.name},

Your consultation has been confirmed!

📅 Date: ${formattedDate}
🕐 Time: ${formattedTime} (${userTimezone})
📦 Package: ${formData.packageName}
💰 Amount: ${formData.amount}
${formData.discountApplied ? '🎓 Discount: COLLEGE (15% off)' : ''}

I'm looking forward to discussing your project!

Best regards,
Le'lah McKoy
NikohlCreations
lelahnikohl@gmail.com

---
Need to reschedule? Just reply to this email.
        `
    };
    
    // Log for now (in production, send real email)
    console.log('📧 Consultation Confirmation Email:', emailData);
    
    // Send notification to business owner
    const businessNotification = {
        to: 'lelahnikohl@gmail.com',
        subject: 'New Consultation Booked!',
        message: `
New consultation booking:

Customer: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Date/Time: ${formattedDate} at ${formattedTime}
Amount: ${formData.amount}
Discount: ${formData.discountApplied ? 'Yes (COLLEGE)' : 'No'}

Booking ID: ${appointment.bookingDate}
        `
    };
    
    console.log('📧 Business Notification:', businessNotification);
    
    return true;
}

// ============================================
// SHOW BOOKING CONFIRMATION
// ============================================
function showBookingConfirmation(appointment, formData) {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dateTime = new Date(selectedTime);
    
    const formattedDate = dateTime.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: userTimezone
    });
    
    const formattedTime = dateTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: userTimezone
    });
    
    // Create confirmation message
    const confirmationHTML = `
        <div class="confirmation-modal">
            <i class="fas fa-check-circle"></i>
            <h3>Booking Confirmed!</h3>
            <div class="confirmation-details">
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time:</strong> ${formattedTime}</p>
                <p><strong>Package:</strong> ${formData.packageName}</p>
                <p><strong>Amount:</strong> ${formData.amount}</p>
                ${formData.discountApplied ? '<p><strong>Discount:</strong> COLLEGE (15% off)</p>' : ''}
            </div>
            <p style="margin-top: 1rem; color: var(--text-secondary);">
                A confirmation email has been sent to ${formData.email}
            </p>
        </div>
    `;
    
    // Show in modal or as toast
    showToast('Consultation booked! Check your email for confirmation.');
    
    // You can also display the confirmation in the modal before closing
    console.log('✅ Booking confirmed:', confirmationHTML);
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Load existing bookings
    loadFromLocalStorage();
    
    // Initialize booking system
    initializeBookingSystem();
});

// Export functions for use in main script
window.consultationBooking = {
    validate: validateConsultationBooking,
    book: bookConsultation,
    sendConfirmation: sendConsultationConfirmation,
    showConfirmation: showBookingConfirmation
};
