# 🚀 Quick Start Guide - NikohlCreations Website

Welcome! This guide will help you get your NikohlCreations website up and running in minutes.

## 📋 Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Python 3 installed (for local testing)
- Text editor (VS Code recommended)

## ⚡ Quick Start (3 Steps)

### Step 1: Start the Server

Open Terminal and navigate to the project folder:

```bash
cd /Users/lelahmckoy/Nikohl.Creations
python3 -m http.server 8000
```

### Step 2: Open in Browser

Open your browser and go to:
```
http://localhost:8000
```

### Step 3: Test the Site

✅ You should see:
- Beautiful hero section with animated title
- Book Now section with 4 packages
- About Me section with your photo
- Projects showcase
- Contact form with AI assistant

That's it! Your site is running locally! 🎉

## 🎯 Key Features to Try

### 1. Book a Consultation (30 seconds)
1. Click "Select Package" on Free Consultation
2. Pick a date from the calendar
3. Select a time slot
4. Fill in your details
5. Click "Confirm Booking"

### 2. Apply Discount Code
1. Select any package
2. Enter code: **COLLEGE**
3. Get 15% off instantly!

### 3. Add Express Delivery
- Check the "Express Delivery" box
- Cuts timeline in half for just $150!

### 4. Chat with AI Assistant
1. Click "Ask AI for Help" in Contact section
2. Ask questions like:
   - "What packages do you offer?"
   - "How much does it cost?"
   - "Do you have any discounts?"

## 📁 File Structure

```
Nikohl.Creations/
├── index.html              # Main website
├── styles.css              # All styling
├── script.js               # Main functionality
├── booking-system.js       # Consultation booking
├── payment-integration.js  # Payment setup (for production)
├── images/
│   └── nikohlcreations.jpg # Your profile photo
└── Documentation:
    ├── README.md                  # Full documentation
    ├── PAYMENT_SETUP_GUIDE.md    # Payment & email setup
    ├── IMAGE_INSTRUCTIONS.md     # How to replace images
    └── TESTING_GUIDE.md          # Complete testing checklist
```

## 🎨 Customization Quickstart

### Change Colors

Edit `styles.css` (line ~1-15):

```css
:root {
    --primary-color: #6366f1;     /* Main purple */
    --secondary-color: #8b5cf6;   /* Secondary purple */
    --accent-color: #ec4899;      /* Pink accent */
}
```

### Update Pricing

Edit `index.html` - find the package cards and update:
- `data-price` attribute
- Displayed price in `<h2>`

### Change Business Hours

Edit `booking-system.js` (line ~6-11):

```javascript
const BUSINESS_HOURS = {
    start: 9,    // 9 AM
    end: 17,     // 5 PM
    timezone: 'America/New_York',
    slotDuration: 30,
    workDays: [1, 2, 3, 4, 5]  // Mon-Fri
};
```

## 🚀 Deploy to Production

### Option 1: Netlify (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Done! You get a free URL

### Option 2: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your project
3. Click "Deploy"

### Option 3: GitHub Pages
1. Push code to GitHub
2. Go to Settings > Pages
3. Select branch and save

## 💳 Add Real Payment Processing

To accept real payments (currently simulated):

1. **Read PAYMENT_SETUP_GUIDE.md** for detailed instructions
2. Sign up for Stripe (free account)
3. Get API keys
4. Update `payment-integration.js`
5. Set up email service (EmailJS)

**Cost**: $0 setup, ~3% per transaction

## 📧 Enable Email Confirmations

To send real confirmation emails:

1. Sign up for EmailJS (free tier: 200 emails/month)
2. Create email templates
3. Update `booking-system.js` with your credentials
4. Test with your own email

See **PAYMENT_SETUP_GUIDE.md** for step-by-step instructions.

## 🔧 Common First-Time Issues

### Issue: Calendar Not Working
**Solution**: Make sure Flatpickr CDN is loaded (check index.html line ~416)

### Issue: Images Not Showing
**Solution**: 
- Ensure images are in `/images/` folder
- Check image filenames match exactly

### Issue: Theme Not Saving
**Solution**: Browser localStorage must be enabled

### Issue: Discount Code Not Working
**Solution**: Type **COLLEGE** in all caps

## 📝 What's Next?

After getting comfortable with the site:

1. ✅ **Read TESTING_GUIDE.md** - Test all features thoroughly
2. ✅ **Update IMAGE_INSTRUCTIONS.md** - Replace placeholder images with your own
3. ✅ **Read PAYMENT_SETUP_GUIDE.md** - Set up real payments & emails
4. ✅ **Deploy to production** - Make your site live!
5. ✅ **Share your URL** - Start getting bookings!

## 🎓 Learn More

- **Full Documentation**: See README.md
- **Testing Checklist**: See TESTING_GUIDE.md  
- **Payment Setup**: See PAYMENT_SETUP_GUIDE.md
- **Image Guide**: See IMAGE_INSTRUCTIONS.md

## 💡 Pro Tips

1. **Test on Mobile**: Resize browser to test responsive design
2. **Use Dark Mode**: Toggle with the moon/sun icon
3. **Check Console**: Press F12 to see logs and errors
4. **Try All Packages**: Test each booking flow
5. **Book a Consultation**: The calendar system is fully functional!

## 🆘 Need Help?

If you get stuck:

1. Check the browser console (F12) for errors
2. Read the error message - they're usually helpful!
3. Review the relevant documentation file
4. Make sure all files are in the correct locations
5. Verify the server is running on port 8000

## 🎉 You're All Set!

Your NikohlCreations website is ready to go! The consultation booking system is fully integrated and working. You can:

- ✅ Accept consultation bookings with calendar
- ✅ Show package pricing with discounts
- ✅ Offer express delivery option
- ✅ Chat with AI assistant
- ✅ Showcase your projects

**Next step**: Test everything with TESTING_GUIDE.md, then deploy! 🚀

---

**Made with ❤️ by Le'lah McKoy | NikohlCreations**

*Need consultation help? Book a free session on the website!*
