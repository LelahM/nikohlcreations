# NikohlCreations Website

**Building apps to Boost You.**

A modern, responsive website for NikohlCreations - offering web development services for small businesses, creators, and entrepreneurs.

## Features

### 🎨 Design
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark/Light Mode**: Toggle between themes with preference saved locally
- **Modern UI**: Clean, professional design with smooth animations
- **Fancy Typography**: Uses Playfair Display for headings and Inter for body text

### 📦 Sections

#### 1. Book Now
- 4 service packages with detailed pricing and features:
  - **Consultation** - $49.99 (with calendar booking system)
  - **Starter Package** - $297.99 (1-2 pages)
  - **Growth Package** - $449.99 (2-3 pages)
  - **Launch Plus Package** - $697.99 (4-5 pages)
- **Express Delivery option** - Add $150 to cut timeline in half! 🚀
- Integrated booking modal with payment form
- **Discount code functionality**: Use code `COLLEGE` for 15% off
- **Consultation Booking System**:
  - Interactive calendar with Flatpickr
  - Business hours: Monday-Friday, 9 AM - 5 PM EST
  - 30-minute time slots
  - Automatic timezone detection and conversion
  - Real-time availability checking
  - Booking summary preview
  - Email confirmations for bookings
- Email/phone confirmation on booking
- Real-time price calculation with discount and express delivery

#### 2. About Me
- Personal introduction from Le'lah McKoy
- **Profile picture of Le'lah** with animated frame
- Call-to-action button linking to contact section

#### 3. Projects
- Showcase of personal projects:
  - **NikohlCreations Website** (this site!) - Highlighted as Le'lah's own creation
  - [www.lelahmckoy.com](https://www.lelahmckoy.com)
  - [GetTasked](https://gettasked.vercel.app)
- Social media links:
  - GitHub
  - LinkedIn: [linkedin.com/in/lelahmckoy](https://www.linkedin.com/in/lelahmckoy)
  - Instagram: [@nikohlcreations](https://www.instagram.com/nikohlcreations)

#### 4. Contact
- Email: lelahnikohl@gmail.com
- Contact form with fields for name, email, and message
- **AI assistant chatbot that looks like Le'lah** to help users book services

### 🤖 AI Assistant
- Interactive chatbot with Le'lah's avatar to answer questions about packages
- Provides package recommendations based on user needs
- Information about pricing, features, and timelines
- Details about Express Delivery option
- Reveals discount code hint when asked
- Personalized responses about Le'lah and her work

### 💳 Payment Features
- Credit card input with formatting
- Expiry date and CVV fields
- Discount code application (COLLEGE for 15% off)
- **Express Delivery checkbox** to add $150 and cut timeline in half
- Real-time price calculation with discounts and add-ons
- Booking confirmation (simulated)

## Getting Started

### Option 1: Simple Setup (Recommended)
1. Open the `index.html` file in your web browser
2. No server required - it works as a static site!

### Option 2: Using a Local Server
For better development experience:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server -p 8000
```

Then visit: `http://localhost:8000`

## Usage

### Navigation
- Click on navigation links to smoothly scroll to sections
- Mobile menu available on smaller screens

### Booking a Package
1. Scroll to "Book Now" section
2. Click "Select Package" on your desired package
3. Fill in your details in the booking modal
4. Optional: Enter discount code `COLLEGE` for 15% off
5. Optional: Check "Express Delivery" to cut timeline in half (+$150)
6. Complete payment information
7. Review total price (with discounts/add-ons applied)
8. Submit booking

### Using the AI Assistant
1. Navigate to the Contact section
2. Click "Chat with AI Assistant"
3. Chat with Le'lah's AI assistant (look for her avatar!)
4. Ask questions about packages, pricing, features, or Express Delivery
5. The AI will provide helpful recommendations

### Contact Form
1. Go to the Contact section
2. Fill in your name, email, and message
3. Click "Send Message"

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* ... more variables */
}
```

### Packages
Update package information in `index.html` by editing the `.package-card` elements.

### AI Responses
Modify the `getAIResponse()` function in `script.js` to customize chatbot responses.

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Vanilla JS for interactivity
- **Flatpickr**: Date/time picker for consultation booking
- **Font Awesome**: Icons
- **Google Fonts**: Playfair Display & Inter

## Consultation Booking System

The website includes a complete consultation booking system with the following features:

### Features
- **Interactive Calendar**: Select available dates (Monday-Friday only)
- **Time Slot Selection**: 30-minute slots between 9 AM - 5 PM EST
- **Timezone Support**: Automatically detects user's timezone and converts times
- **Availability Management**: Prevents double-booking (currently uses localStorage)
- **Booking Summary**: Preview selected date/time before confirming
- **Email Confirmations**: Sends confirmation emails to both customer and business

### Files
- `booking-system.js`: Core booking logic, calendar initialization, and validation
- `script.js`: Integration with main booking flow
- `styles.css`: Consultation booking styles

### How It Works
1. User selects "Free Consultation" package
2. Calendar and time slot selector appear in booking modal
3. User picks available date and time (automatically converted to their timezone)
4. System validates selection and prevents double-booking
5. Booking is stored (localStorage for demo, database for production)
6. Confirmation email sent to customer with meeting details

### Customization
Edit business hours in `booking-system.js`:
```javascript
const BUSINESS_HOURS = {
    start: 9,  // 9 AM
    end: 17,   // 5 PM
    timezone: 'America/New_York', // EST/EDT
    slotDuration: 30, // 30-minute slots
    workDays: [1, 2, 3, 4, 5] // Monday-Friday
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Future Enhancements

To make this a fully functional production site, consider adding:

1. **Backend Integration** (See PAYMENT_SETUP_GUIDE.md)
   - Payment processing (Stripe, PayPal)
   - Email service (SendGrid, EmailJS)
   - **Database for consultation bookings** (replace localStorage)
   - SMS notifications (Twilio)
   - Video meeting integration (Zoom, Google Meet)

2. **Enhanced Features**
   - User accounts and dashboard
   - Admin panel to manage consultation availability
   - Booking management (reschedule, cancel)
   - Automated reminder emails
   - Project portfolio with more details
   - Blog section
   - Reviews/testimonials
   - Live chat support

3. **Analytics**
   - Google Analytics
   - Conversion tracking
   - User behavior analysis
   - Booking funnel optimization

## Contact

Le'lah McKoy  
Email: lelahnikohl@gmail.com  
Website: [www.lelahmckoy.com](https://www.lelahmckoy.com)  
LinkedIn: [linkedin.com/in/lelahmckoy](https://www.linkedin.com/in/lelahmckoy)  
Instagram: [@nikohlcreations](https://www.instagram.com/nikohlcreations)

---

© 2026 NikohlCreations. All rights reserved.
