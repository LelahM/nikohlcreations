# 🎯 Quick GitHub Commands

## Your Next Steps (Copy & Paste These)

### 1. Create Repository on GitHub
Go to: https://github.com/new
- Name: `nikohlcreations`
- Public ✅
- Don't check any boxes
- Click "Create repository"

### 2. Push Your Code

**Replace YOUR-USERNAME with your GitHub username:**

```bash
cd /Users/lelahmckoy/Nikohl.Creations

# Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/nikohlcreations.git

# Push to GitHub
git push -u origin main
```

**Example:** If your username is `lelahmckoy`, use:
```bash
git remote add origin https://github.com/lelahmckoy/nikohlcreations.git
git push -u origin main
```

---

## Future Updates (After Initial Push)

Every time you make changes:

```bash
# 1. Check what changed
git status

# 2. Stage all changes
git add .

# 3. Commit with a message
git commit -m "Updated contact form" 

# 4. Push to GitHub
git push
```

---

## Common Commands

```bash
# View commit history
git log --oneline

# Undo last commit (keeps changes)
git reset --soft HEAD~1

# See what changed in a file
git diff filename

# Discard local changes
git checkout -- filename

# Pull latest from GitHub
git pull
```

---

## Troubleshooting

### Authentication Error?
GitHub no longer accepts passwords. Use a Personal Access Token:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Classic"
3. Select scopes: `repo`
4. Copy the token
5. Use it as your password when pushing

### Wrong remote URL?
```bash
# Remove wrong remote
git remote remove origin

# Add correct one
git remote add origin https://github.com/YOUR-USERNAME/nikohlcreations.git
```

### Already have a remote?
```bash
# Check current remote
git remote -v

# Change it
git remote set-url origin https://github.com/YOUR-USERNAME/nikohlcreations.git
```

---

## What's Been Committed?

✅ index.html - Main website
✅ styles.css - All styling  
✅ script.js - JavaScript functionality
✅ booking-system.js - Consultation booking
✅ payment-integration.js - Payment setup code
✅ images/nikohlcreations.jpg - Your profile photo
✅ All documentation (README.md, guides, etc.)

Files **NOT** committed (per .gitignore):
❌ script.js.backup
❌ script-fixed.js
❌ debug.html
❌ test-integration.html

---

## After Deployment

Your workflow:
1. Make changes locally
2. Test at http://localhost:8000
3. `git add .` → `git commit -m "message"` → `git push`
4. Netlify/Vercel auto-deploys!

---

**Need the full guide?** → Read DEPLOYMENT_GUIDE.md
**Ready to deploy?** → Follow the 3 steps above! 🚀
