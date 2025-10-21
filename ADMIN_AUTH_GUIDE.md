# Admin Authentication Guide

## 🔐 Overview

The admin dashboard is now protected with password-based authentication. No one can access `/admin` without the correct password.

## 🛡️ How It Works

### 1. **Environment Variable**
```env
ADMIN_PASSWORD=your-secure-password
```
- Set in `.env.local` for development
- Set in hosting platform for production
- Default: `change-this-password` (⚠️ CHANGE THIS!)

### 2. **Middleware Protection**
`middleware.ts` intercepts all `/admin/*` requests:
- ✅ Allows `/admin/login` without authentication
- ✅ Checks for valid authentication cookie
- ❌ Redirects unauthorized users to login page

### 3. **Login Flow**
```
User visits /admin
      ↓
Middleware checks auth cookie
      ↓
No valid cookie? → Redirect to /admin/login
      ↓
User enters password
      ↓
POST to /api/admin/auth
      ↓
Password matches? → Set HTTP-only cookie
      ↓
Redirect to /admin dashboard
```

### 4. **Session Management**
- **Cookie Name**: `admin-auth`
- **Type**: HTTP-only (JavaScript can't access)
- **Duration**: 7 days
- **Secure**: Yes in production
- **SameSite**: Lax

### 5. **Logout**
- Click "Logout" button in dashboard
- Sends DELETE to `/api/admin/auth`
- Cookie is deleted
- Redirects to login page

## 📋 Setup Steps

### Development

1. **Add password to `.env.local`:**
   ```env
   ADMIN_PASSWORD=my-dev-password
   ```

2. **Restart server:**
   ```bash
   npm run dev
   ```

3. **Test login:**
   - Visit `http://localhost:3000/admin`
   - Enter password
   - Access dashboard

### Production (Vercel)

1. **Go to Vercel Dashboard**
   - Select your project
   - Settings → Environment Variables

2. **Add variable:**
   - Name: `ADMIN_PASSWORD`
   - Value: `your-strong-production-password`
   - Environments: Production, Preview, Development

3. **Redeploy**
   - Trigger a new deployment
   - Or push new commit

## 🔒 Security Best Practices

### ✅ DO:
- Use strong, unique passwords (12+ characters)
- Use different passwords for dev/staging/production
- Store passwords in environment variables
- Use HTTPS in production (automatic on Vercel)
- Keep `.env.local` in `.gitignore`

### ❌ DON'T:
- Commit passwords to git
- Share passwords in code/docs
- Use weak passwords like "admin123"
- Reuse passwords from other services
- Store passwords in frontend code

## 🚀 Advanced Security (Optional)

For additional security, consider:

### 1. **Rate Limiting**
```typescript
// middleware.ts - Add rate limiting
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '10 s'),
})
```

### 2. **Two-Factor Authentication**
Use packages like `speakeasy` or `otplib` for TOTP:
```typescript
import speakeasy from 'speakeasy'

const secret = speakeasy.generateSecret()
const token = speakeasy.totp({ secret: secret.base32 })
```

### 3. **OAuth Providers**
Integrate with Next-Auth for GitHub/Google login:
```typescript
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
})
```

### 4. **IP Whitelisting**
Restrict access to specific IPs:
```typescript
// middleware.ts
const allowedIPs = ['123.456.789.0', '987.654.321.0']
const clientIP = request.ip || request.headers.get('x-forwarded-for')

if (!allowedIPs.includes(clientIP)) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}
```

## 🔍 Troubleshooting

### Can't login?
1. Check `.env.local` has `ADMIN_PASSWORD` set
2. Restart dev server after adding env var
3. Try clearing cookies and retry
4. Check browser console for errors

### Redirecting in a loop?
1. Clear all cookies for localhost
2. Check middleware.ts allows `/admin/login`
3. Verify cookie is being set (Network tab → Cookies)

### Works locally but not in production?
1. Verify `ADMIN_PASSWORD` is set in hosting platform
2. Check environment variable is applied to correct environment
3. Redeploy after adding environment variable
4. Check production logs for errors

### Cookie not persisting?
1. Ensure HTTPS in production
2. Check `secure` flag matches environment
3. Verify `sameSite` settings
4. Check cookie expiration time

## 📁 Related Files

- `middleware.ts` - Route protection
- `app/admin/login/page.tsx` - Login UI
- `app/api/admin/auth/route.ts` - Auth API
- `app/admin/page.tsx` - Dashboard with logout

## 🆘 Need Help?

Check these docs:
- [ADMIN_SETUP.md](./ADMIN_SETUP.md) - Full setup guide
- [ADMIN_SUMMARY.md](./ADMIN_SUMMARY.md) - System overview
- [QUICK_START_ADMIN.txt](./QUICK_START_ADMIN.txt) - Quick reference

---

**Remember:** The admin password is the only thing protecting your dashboard. Choose wisely! 🔐


