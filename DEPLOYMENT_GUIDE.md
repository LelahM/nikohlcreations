# 🚀 GitHub & Deployment Guide

This guide will walk you through pushing your code to GitHub and deploying it to a live website.

## 📋 Prerequisites

- GitHub account (free): [github.com/signup](https://github.com/signup)
- Git installed (you already have this! ✅)

---

## Part 1: Push to GitHub

### Step 1: Create a New Repository on GitHub

1. Go to [github.com](https://github.com)
2. Click the **"+"** button in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name**: `nikohlcreations` (or `Nikohl.Creations`)
   - **Description**: "NikohlCreations - Professional web development services website"
   - **Public** or **Private**: Choose **Public** (required for free hosting)
   - **DO NOT** check "Add README" (we already have one)
   - **DO NOT** add .gitignore or license (we already have .gitignore)
4. Click **"Create repository"**

### Step 2: Connect Your Local Code to GitHub

After creating the repository, GitHub will show you commands. Copy the **repository URL** (it looks like: `https://github.com/YOUR-USERNAME/nikohlcreations.git`)

Then run these commands in your terminal:

```bash
cd /Users/lelahmckoy/Nikohl.Creations

# Add the remote repository
git remote add origin https://github.com/YOUR-USERNAME/nikohlcreations.git

# Push your code to GitHub
git push -u origin main
```

**Replace `YOUR-USERNAME`** with your actual GitHub username!

✅ **Your code is now on GitHub!**

---

## Part 2: Deploy Your Website (3 Easy Options)

### Option 1: Netlify (RECOMMENDED - Easiest!)

**Why Netlify?** 
- ✅ Free forever
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Deploys in seconds
- ✅ Automatic deploys when you push to GitHub

**Steps:**

1. **Sign Up**
   - Go to [netlify.com](https://www.netlify.com/)
   - Click "Sign up" → Sign up with GitHub

2. **Deploy Your Site**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub
   - Select your `nikohlcreations` repository
   - **Build settings**: Leave everything blank (it's a static site)
   - Click **"Deploy site"**

3. **Your Site is Live!**
   - Netlify will give you a URL like: `random-name-123.netlify.app`
   - Click on it to see your live site! 🎉

4. **Change the URL** (Optional)
   - Go to "Site settings" → "Change site name"
   - Change to: `nikohlcreations.netlify.app`

5. **Add Custom Domain** (Optional)
   - Go to "Domain settings" → "Add custom domain"
   - Enter your domain (like `nikohlcreations.com`)
   - Follow the DNS instructions

**🎉 Done! Your site is live and will auto-update when you push to GitHub!**

---

### Option 2: Vercel

**Steps:**

1. Go to [vercel.com](https://vercel.com/)
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your `nikohlcreations` repository
5. Click "Deploy"
6. Your site is live at: `nikohlcreations.vercel.app`

---

### Option 3: GitHub Pages (Free, but more limited)

**Steps:**

1. Go to your GitHub repository
2. Click "Settings" → "Pages" (in the left sidebar)
3. Under "Source", select "Deploy from a branch"
4. Select branch: **main**
5. Select folder: **/ (root)**
6. Click "Save"
7. Wait 2-3 minutes
8. Your site will be live at: `https://YOUR-USERNAME.github.io/nikohlcreations/`

**⚠️ Note:** GitHub Pages has limitations:
- You'll need to update all your links (CSS, JS, images) to include the repo name
- No server-side functionality

---

## Part 3: Test Your Live Site

Once deployed, test these features:

- ✅ Click through all navigation links
- ✅ Try the theme toggle
- ✅ Test mobile responsiveness (resize browser)
- ✅ Book a consultation (select date/time)
- ✅ Apply the COLLEGE discount code
- ✅ Test the AI chatbot
- ✅ Submit the contact form
- ✅ Check all package buttons work

---

## Part 4: Making Updates

After deployment, whenever you want to update your site:

```bash
# 1. Make your changes to the code

# 2. Stage your changes
git add .

# 3. Commit with a message
git commit -m "Description of what you changed"

# 4. Push to GitHub
git push

# 5. Your site auto-updates! (Netlify/Vercel)
```

---

## Part 5: Next Steps After Deployment

### A. Set Up EmailJS (for real email confirmations)

1. Sign up at [emailjs.com](https://www.emailjs.com/) (200 emails/month free)
2. Create email templates for:
   - Consultation bookings
   - Package purchases
   - Contact form submissions
3. Get your API keys
4. Update `booking-system.js` and `payment-integration.js`

**See PAYMENT_SETUP_GUIDE.md for detailed instructions**

### B. Set Up Stripe (for real payments)

1. Sign up at [stripe.com](https://stripe.com/)
2. Get your API keys (test mode first!)
3. Update `payment-integration.js`
4. Set up webhook endpoints

**See PAYMENT_SETUP_GUIDE.md for detailed instructions**

### C. Replace localStorage with Database

For production, replace localStorage with a real database:
- **Firebase** (free tier): [firebase.google.com](https://firebase.google.com/)
- **Supabase** (free tier): [supabase.com](https://supabase.com/)
- **MongoDB Atlas** (free tier): [mongodb.com/atlas](https://www.mongodb.com/atlas)

---

## 🎯 Quick Commands Reference

```bash
# Check status
git status

# Stage all changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest changes (if working on multiple devices)
git pull

# View commit history
git log --oneline

# Create a new branch for testing
git checkout -b testing-new-feature

# Switch back to main branch
git checkout main
```

---

## 🆘 Troubleshooting

### "Authentication failed" when pushing
- Make sure you're logged into GitHub
- You may need to set up a Personal Access Token
- Go to GitHub → Settings → Developer settings → Personal access tokens
- Create a token and use it as your password

### Site not updating after push
- **Netlify/Vercel**: Check the deploy log for errors
- **GitHub Pages**: Can take 2-3 minutes to update
- Clear your browser cache (Cmd+Shift+R on Mac)

### Images not showing on live site
- Make sure image paths are relative: `images/nikohlcreations.jpg`
- NOT absolute: `/Users/lelahmckoy/...`

### JavaScript errors on live site
- Open browser console (F12) to see errors
- Check that all files are properly linked in `index.html`
- Verify all CDN links (Flatpickr, Font Awesome) are working

---

## 📊 Deployment Comparison

| Feature | Netlify | Vercel | GitHub Pages |
|---------|---------|--------|--------------|
| **Ease of Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Speed** | Very Fast | Very Fast | Fast |
| **Free Tier** | Generous | Generous | Limited |
| **Custom Domain** | ✅ Free | ✅ Free | ✅ Free |
| **Auto Deploy** | ✅ Yes | ✅ Yes | ✅ Yes |
| **SSL/HTTPS** | ✅ Auto | ✅ Auto | ✅ Auto |
| **Serverless Functions** | ✅ Yes | ✅ Yes | ❌ No |
| **Best For** | Static sites | React/Next.js | Simple sites |

**Recommendation:** Use **Netlify** - it's the easiest and most flexible!

---

## 🎉 Success Checklist

After following this guide, you should have:

- ✅ Code pushed to GitHub
- ✅ Live website with a URL
- ✅ HTTPS enabled automatically
- ✅ Automatic deployments set up
- ✅ Site accessible from anywhere in the world
- ✅ Ready to share with clients!

---

## 📱 Share Your Site

Once live, share your site:
- Add the URL to your Instagram bio (@nikohlcreations)
- Add it to your LinkedIn profile
- Share on social media
- Add to your email signature
- Create business cards with the URL

**Your URL format:**
- Netlify: `nikohlcreations.netlify.app`
- Vercel: `nikohlcreations.vercel.app`
- GitHub Pages: `yourusername.github.io/nikohlcreations`

---

## 💡 Pro Tips

1. **Use Netlify Forms** for contact form (no backend needed!)
   - Add `netlify` attribute to your forms
   - Get email notifications automatically

2. **Set up analytics** (free)
   - Google Analytics
   - Netlify Analytics
   - Simple Analytics

3. **Monitor uptime** (free)
   - UptimeRobot: [uptimerobot.com](https://uptimerobot.com/)
   - Get alerts if your site goes down

4. **Speed test your site**
   - [pagespeed.web.dev](https://pagespeed.web.dev/)
   - [gtmetrix.com](https://gtmetrix.com/)

---

**Need help?** Check the troubleshooting section or review QUICKSTART.md and README.md

**Ready to go live?** Follow Part 1, then choose your deployment platform in Part 2!

🚀 **Let's deploy!**
