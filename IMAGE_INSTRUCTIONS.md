# How to Add Your Personal Images

This website uses placeholder images that you should replace with your actual photos. Here's how:

## 📸 Images You Need

### 1. Profile Picture (About Me Section)
- **Location in code**: `index.html` line with About Me section
- **Current placeholder**: `https://via.placeholder.com/300x300/6366f1/ffffff?text=Le'lah+McKoy`
- **Recommended size**: 300x300 pixels (square)
- **Format**: JPG or PNG
- **Where to save**: Create an `images` folder and save as `profile.jpg`

### 2. AI Assistant Avatar (Contact Section & Chat)
- **Multiple locations** in `index.html`:
  - Contact section AI assistant
  - Chat modal header
  - Chat message avatars
- **Current placeholder**: `https://via.placeholder.com/60x60/6366f1/ffffff?text=LM`
- **Recommended size**: 60x60 pixels (square)
- **Format**: PNG with transparent background (optional)
- **Where to save**: `images/avatar.png`

## 🛠️ Steps to Replace

### Step 1: Create Images Folder
```bash
cd /Users/lelahmckoy/Nikohl.Creations
mkdir images
```

### Step 2: Add Your Photos
1. Copy your profile photo to `images/profile.jpg`
2. Copy your avatar (could be same photo or different) to `images/avatar.png`

### Step 3: Update HTML
Open `index.html` and replace all placeholder URLs:

**For Profile Picture (About Me section):**
```html
<!-- Find this line (around line 199): -->
<img src="https://via.placeholder.com/300x300/6366f1/ffffff?text=Le'lah+McKoy" alt="Le'lah McKoy" class="profile-image">

<!-- Replace with: -->
<img src="images/profile.jpg" alt="Le'lah McKoy" class="profile-image">
```

**For AI Assistant Avatars (multiple locations):**
```html
<!-- Find these lines and replace all occurrences: -->
<img src="https://via.placeholder.com/60x60/6366f1/ffffff?text=LM" alt="Le'lah McKoy AI Assistant">
<img src="https://via.placeholder.com/50x50/ffffff/6366f1?text=LM" alt="Le'lah McKoy AI">
<img src="https://via.placeholder.com/40x40/6366f1/ffffff?text=LM" alt="AI">

<!-- Replace with: -->
<img src="images/avatar.png" alt="Le'lah McKoy AI Assistant">
<img src="images/avatar.png" alt="Le'lah McKoy AI">
<img src="images/avatar.png" alt="AI">
```

### Step 4: Update JavaScript
Open `script.js` and update the avatar URL in the chat function (around line 190):

```javascript
// Find this line:
<img src="https://via.placeholder.com/40x40/6366f1/ffffff?text=LM" alt="AI">

// Replace with:
<img src="images/avatar.png" alt="AI">
```

## 📝 Quick Find & Replace

You can use VS Code's find and replace feature:

1. Press `Cmd+Shift+F` to open search across all files
2. Search for: `https://via.placeholder.com/300x300/6366f1/ffffff?text=Le'lah+McKoy`
3. Replace with: `images/profile.jpg`
4. Click "Replace All"

5. Search for: `https://via.placeholder.com/60x60/6366f1/ffffff?text=LM`
6. Replace with: `images/avatar.png`
7. Click "Replace All"

8. Search for: `https://via.placeholder.com/50x50/ffffff/6366f1?text=LM`
9. Replace with: `images/avatar.png`
10. Click "Replace All"

11. Search for: `https://via.placeholder.com/40x40/6366f1/ffffff?text=LM`
12. Replace with: `images/avatar.png`
13. Click "Replace All"

## 💡 Tips

- **Photo quality**: Use high-quality photos for best results
- **Square format**: Make sure your profile photo is square (1:1 ratio)
- **File size**: Optimize images to keep them under 500KB each
- **Backup**: Keep original placeholders in case you want to revert

## 🎨 Optional: Favicon

Add a favicon (website icon that appears in browser tabs):

1. Create a 32x32 pixel icon and save as `favicon.ico`
2. Add this line in the `<head>` section of `index.html`:
```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
```

## ✅ Testing

After replacing images:
1. Refresh the website in your browser
2. Check the About Me section for your profile picture
3. Open the AI chat and verify your avatar appears
4. Test on mobile to ensure images load properly

---

**Need help?** If images don't appear:
- Check file paths are correct
- Ensure image files are in the `images` folder
- Try hard refresh: `Cmd+Shift+R` (Chrome/Firefox)
- Check browser console for errors (F12 → Console tab)
