# Testing Guide for NikohlCreations Website

This guide will help you test all features of the website to ensure everything is working correctly.

## 🚀 Getting Started

1. Start the local server:
   ```bash
   python3 -m http.server 8000
   ```

2. Open your browser to: `http://localhost:8000`

## ✅ Feature Testing Checklist

### 1. Basic Navigation
- [ ] Click on navigation links (Book Now, About, Projects, Contact)
- [ ] Test smooth scrolling to each section
- [ ] Test mobile menu toggle (resize browser or use mobile device)
- [ ] Verify all links work correctly

### 2. Theme Toggle
- [ ] Click the theme toggle button (moon/sun icon)
- [ ] Verify dark mode activates
- [ ] Refresh page - dark mode should persist
- [ ] Toggle back to light mode
- [ ] Check that preference is saved in localStorage

### 3. Consultation Booking System

#### Step-by-Step Test:
1. **Select Consultation Package**
   - [ ] Click "Select Package" on the Free Consultation card ($49.99)
   - [ ] Booking modal should open
   - [ ] Calendar and time slot section should be visible
   - [ ] Payment fields should be hidden (it's a consultation, not a purchase yet)

2. **Select Date**
   - [ ] Click on the date picker input field
   - [ ] Verify calendar opens with Flatpickr
   - [ ] Try clicking on a weekend date - it should be disabled
   - [ ] Try clicking on a past date - it should be disabled
   - [ ] Select a valid weekday date (Monday-Friday)
   - [ ] Verify timezone is displayed correctly

3. **Select Time Slot**
   - [ ] Time slot dropdown should activate after selecting a date
   - [ ] Verify time slots are shown in your local timezone
   - [ ] Select a time slot
   - [ ] Verify booking summary appears showing selected date/time

4. **Complete Booking**
   - [ ] Fill in Name, Email, and Phone fields
   - [ ] Click "Confirm Booking"
   - [ ] Verify success message appears
   - [ ] Check browser console for booking confirmation log
   - [ ] Open same date again - verify the time slot is now marked as "Unavailable"

5. **Test Validation**
   - [ ] Try to submit without selecting a date - should show error toast
   - [ ] Try to submit without selecting a time - should show error toast
   - [ ] Try to submit with missing contact info - should show validation errors

### 4. Regular Package Booking

#### Test Starter Package:
1. **Select Package**
   - [ ] Click "Select Package" on Starter Package ($297.99)
   - [ ] Verify modal opens with correct package name and price
   - [ ] Consultation booking section should be hidden
   - [ ] Payment fields should be visible

2. **Apply Discount Code**
   - [ ] Enter "COLLEGE" in discount code field
   - [ ] Click "Apply"
   - [ ] Verify 15% discount is applied
   - [ ] Original price should have strikethrough
   - [ ] New price should show: $253.29 (297.99 * 0.85)
   - [ ] Try applying code again - should show "already applied" message
   - [ ] Try invalid code - should show error message

3. **Add Express Delivery**
   - [ ] Check the "Express Delivery" checkbox
   - [ ] Verify $150 is added to total
   - [ ] With discount: $253.29 + $150 = $403.29
   - [ ] Verify toast notification appears
   - [ ] Uncheck the box - total should decrease

4. **Fill Payment Information**
   - [ ] Enter name, email, phone
   - [ ] Enter card number (formatting should auto-add spaces)
   - [ ] Enter expiry date (should auto-format as MM/YY)
   - [ ] Enter CVV (should only accept numbers)
   - [ ] Submit form
   - [ ] Verify success message and modal closes

5. **Repeat for Other Packages**
   - [ ] Test Growth Package ($449.99, 2-3 pages)
   - [ ] Test Launch Plus Package ($697.99, 4-5 pages)

### 5. AI Assistant Chatbot

1. **Open Chat**
   - [ ] Click "Ask AI for Help" button in contact section
   - [ ] Verify chat modal opens
   - [ ] Verify Le'lah's avatar is displayed

2. **Test Conversations**
   Try these prompts and verify responses:
   - [ ] "Hi" - Should get greeting
   - [ ] "What packages do you offer?" - Should list all packages
   - [ ] "How much does it cost?" - Should show all pricing
   - [ ] "Do you have any discounts?" - Should mention COLLEGE code
   - [ ] "What is express delivery?" - Should explain +$150 option
   - [ ] "How long will it take?" - Should give timeline info
   - [ ] "Tell me about consultation" - Should explain consultation package
   - [ ] "Who are you?" - Should introduce Le'lah
   - [ ] Random question - Should give helpful default response

3. **Test Chat Features**
   - [ ] Send multiple messages
   - [ ] Verify chat scrolls to show latest messages
   - [ ] Verify AI avatar appears on AI messages
   - [ ] Close and reopen chat - messages should persist

### 6. Contact Form

1. **Fill Form**
   - [ ] Enter name
   - [ ] Enter email
   - [ ] Enter message
   - [ ] Submit form

2. **Verify**
   - [ ] Success toast should appear
   - [ ] Form should clear
   - [ ] Check console for form data log

### 7. Visual Elements

1. **Hero Section**
   - [ ] Verify animated rainbow gradient title
   - [ ] Check that title has glowing effect
   - [ ] Verify CTA button works

2. **About Section**
   - [ ] Verify Le'lah's profile photo displays correctly
   - [ ] Check image positioning and filters
   - [ ] Verify text uses Playfair Display font
   - [ ] Test "Get in Touch" button

3. **Projects Section**
   - [ ] Verify "NikohlCreations" project has "Created by Me!" badge
   - [ ] Test all project links
   - [ ] Verify social media links work:
     - GitHub
     - LinkedIn
     - Instagram

4. **Package Cards**
   - [ ] Hover over cards - should have hover effects
   - [ ] Verify all pricing shows .99 format
   - [ ] Check package descriptions match requirements:
     - Consultation: 30-min session
     - Starter: 1-2 pages
     - Growth: 2-3 pages
     - Launch Plus: 4-5 pages

### 8. Responsive Design

1. **Desktop** (1920px+)
   - [ ] Layout looks good
   - [ ] All sections properly spaced
   - [ ] Navigation horizontal

2. **Tablet** (768px - 1024px)
   - [ ] Grid adjusts appropriately
   - [ ] Images scale properly
   - [ ] Text remains readable

3. **Mobile** (320px - 767px)
   - [ ] Hamburger menu appears
   - [ ] Mobile menu works correctly
   - [ ] Cards stack vertically
   - [ ] Forms are usable
   - [ ] Booking modal fits screen
   - [ ] Calendar works on mobile

### 9. Performance & Animation

1. **Scroll Animations**
   - [ ] Scroll down page
   - [ ] Verify sections fade in and slide up
   - [ ] All animations smooth (no jank)

2. **Modal Animations**
   - [ ] Open/close booking modal - smooth transition
   - [ ] Open/close chat modal - smooth transition

3. **Page Load**
   - [ ] Hero section fades in on load
   - [ ] No flash of unstyled content

### 10. Browser Console

1. **Check for Errors**
   - [ ] Open DevTools (F12)
   - [ ] Check Console tab - should have no errors
   - [ ] Look for "Booking system initialized" log on page load

2. **Check localStorage**
   - [ ] Application tab > Local Storage
   - [ ] Should see: `theme`, `bookedAppointments`

## 🐛 Common Issues & Solutions

### Calendar Not Showing
- **Cause**: Flatpickr CDN not loaded
- **Fix**: Check network tab, ensure CDN link is accessible

### Time Slots Not Populating
- **Cause**: Date not selected or JavaScript error
- **Fix**: Check console for errors, ensure booking-system.js is loaded

### Discount Code Not Working
- **Cause**: Case sensitivity or typo
- **Fix**: Ensure code is "COLLEGE" (all caps)

### Timezone Issues
- **Cause**: Browser timezone detection
- **Fix**: Verify `Intl.DateTimeFormat().resolvedOptions().timeZone` works in console

### Payment Fields Not Showing
- **Cause**: Selected consultation package
- **Fix**: This is expected behavior - consultations don't require payment upfront

## 📊 Test Results Template

Use this template to document your test results:

```
Date: ___________
Browser: ___________
Device: ___________

✅ Passed Tests:
- Navigation
- Theme toggle
- ...

❌ Failed Tests:
- Issue description
- Steps to reproduce
- ...

📝 Notes:
- Additional observations
- ...
```

## 🚀 Next Steps After Testing

Once all tests pass:

1. **Deploy to Production**
   - Choose hosting: Netlify, Vercel, or GitHub Pages
   - Update API endpoints in payment-integration.js
   - Configure email service (see PAYMENT_SETUP_GUIDE.md)

2. **Set Up Real Backend**
   - Replace localStorage with database
   - Implement real payment processing
   - Configure email confirmations

3. **Monitor & Optimize**
   - Set up Google Analytics
   - Monitor booking conversion rates
   - Gather user feedback

## 📞 Support

If you encounter issues during testing:
- Check browser console for errors
- Verify all files are properly linked
- Ensure local server is running
- Review PAYMENT_SETUP_GUIDE.md for backend setup

---

Happy Testing! 🎉
