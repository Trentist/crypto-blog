# Admin Dashboard Setup Guide

## Overview

The admin dashboard allows you to control which blog posts are visible on your blog. You can select/deselect posts without modifying them in Sanity. Your selections are stored locally in a TypeScript file.

## Features

- **Visual Dashboard**: See all your posts at a glance with thumbnails, titles, and metadata
- **Toggle Visibility**: One-click toggle to show/hide posts from the blog
- **Live Stats**: See counts of total, featured, and hidden posts
- **Local Storage**: Post selections stored in `data/selected-posts.json`
- **No Sanity Write Permissions Needed**: Dashboard only reads from Sanity

## Setup Instructions

### 1. Set Up Admin Password

Add an admin password to your `.env.local` file to protect the admin dashboard:

```env
# Your existing Sanity config
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01

# Admin Dashboard Password (REQUIRED)
ADMIN_PASSWORD=your-secure-password-here
```

⚠️ **Important**: 
- Choose a strong password!
- Never commit `.env.local` to git
- Change the default password before deploying

### 2. Initial Setup

The `data/selected-posts.ts` file contains your selected post IDs. When you toggle posts in the admin dashboard, this file is automatically updated. Initially, your existing selections are preserved.

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Log In to Admin Dashboard

1. Visit: `http://localhost:3000/admin`
2. You'll be redirected to the login page
3. Enter the password you set in `ADMIN_PASSWORD`
4. Click "Login"

### 5. Select Posts to Display

1. Once logged in, you'll see all posts from your Sanity CMS
2. Toggle posts ON (green) to show them on the blog
3. Toggle posts OFF (gray) to hide them from the blog
4. Changes are saved automatically to `data/selected-posts.ts`
5. Click "Logout" when done

## Using the Admin Dashboard

### Accessing the Dashboard

Visit: `http://localhost:3000/admin`

### Dashboard Features

#### Stats Overview
- **Total Posts**: All posts in your Sanity database
- **Featured Posts**: Posts visible on the blog
- **Hidden Posts**: Posts hidden from the blog

#### Post Management Table
- **Post Column**: Shows thumbnail, title, and excerpt
- **Author Column**: Post author name
- **Published Column**: Publication date
- **Categories Column**: All assigned categories
- **Visible Column**: Toggle switch to show/hide post

#### Toggle Post Visibility
Click the toggle switch in the **Visible** column:
- 🟢 **Green/On**: Post is visible on the blog
- ⚪ **Gray/Off**: Post is hidden from the blog

Changes are instant and automatically sync with your blog.

## How It Works

### Local Selection Storage
Post selections are stored in `data/selected-posts.ts`:
```typescript
// Selected post IDs - posts that will be visible on the blog
export const selectedPostIds: string[] = [
  "post-id-1",
  "post-id-2",
  "post-id-3",
]
```

### Frontend Filtering
The blog pages filter posts based on the selected post IDs:

- **Homepage**: Shows only selected posts (latest 6)
- **Blog Page**: Shows only selected posts with pagination
- **Category Pages**: Shows only selected posts in that category
- **Individual Posts**: All posts are still accessible by direct URL

### No Sanity Modifications
The system doesn't modify your Sanity content. It only:
1. Reads all posts from Sanity (read-only)
2. Stores selected post IDs locally
3. Filters blog pages based on selections

## Deployment

### Vercel/Production Deployment

When deploying to production (e.g., Vercel):

1. **Set environment variable** in your hosting platform:
   - **Vercel**: Project Settings → Environment Variables
   - Add key: `ADMIN_PASSWORD`
   - Add value: Your strong password
   - Apply to: Production, Preview, and Development

2. **Commit the `data` directory** to your git repository:
   ```bash
   git add data/selected-posts.ts
   git commit -m "Add selected posts configuration"
   git push
   ```

3. Deploy your application - your post selections will be included

**Note**: In production, the TypeScript file is read-only. To change selections in production, you'll need to:
- Update selections locally via the admin dashboard
- Commit and push the changes
- Redeploy

### Security Features

✅ **Password Protection**: The `/admin` route is protected with password authentication

**How it works:**
- Middleware checks for authentication cookie on `/admin` routes
- Unauthorized users are redirected to `/admin/login`
- Password is stored in environment variable
- Session cookie expires after 7 days
- Logout button available in dashboard

**For Production:**
1. Set a strong `ADMIN_PASSWORD` in your hosting platform's environment variables
2. Consider adding additional security:
   - Rate limiting for login attempts
   - Two-factor authentication
   - IP whitelisting
   - OAuth providers (GitHub, Google, etc.)

## Troubleshooting

### Posts Not Appearing on Blog
- Check that posts are toggled ON (green) in the admin dashboard
- Verify `data/selected-posts.ts` contains the post IDs
- Clear your browser cache and refresh

### Admin Dashboard Shows Empty
- Verify you have posts created in Sanity Studio
- Check browser console for error messages
- Verify your `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct

### "Failed to update post" Error
- Check that the `data` directory exists in your project root
- Verify file system permissions allow writing to `data/selected-posts.ts`
- Check browser console and terminal for detailed error messages

## API Routes

The admin dashboard uses the following API routes:

### POST `/api/admin/toggle-featured`
Toggles the featured status of a post.

**Request Body:**
```json
{
  "postId": "post-id-here",
  "featured": true
}
```

**Response:**
```json
{
  "success": true,
  "featured": true
}
```

## Files Modified/Created

### New Files
- `app/admin/page.tsx` - Admin dashboard UI (with logout)
- `app/admin/login/page.tsx` - Admin login page
- `app/api/admin/auth/route.ts` - Authentication API endpoint
- `app/api/admin/toggle-featured/route.ts` - API endpoint for toggling selections
- `app/api/admin/selected-posts/route.ts` - API endpoint for reading selections
- `data/selected-posts.ts` - Stores selected post IDs (TypeScript)
- `middleware.ts` - Protects admin routes with authentication

### Modified Files
- `sanity/lib/queries.ts` - Simplified queries (removed featured filtering from Sanity)
- `app/(blog)/page.tsx` - Added local filtering by selected IDs
- `app/(blog)/blog/page.tsx` - Added local filtering by selected IDs
- `app/(blog)/category/[slug]/page.tsx` - Added local filtering by selected IDs

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Ensure your Sanity token has the correct permissions
4. Try restarting the development server

---

**Need Help?** Check the main [README.md](README.md) for general setup instructions.

