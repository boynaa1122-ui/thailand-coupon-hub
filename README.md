# Deals Thai - Modern Coupon & Deals Website

A production-ready coupon and deals platform for Thailand built with Next.js 15, TypeScript, Tailwind CSS, and Supabase. Inspired by Google Pixel design and Material Design 3 principles.

![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)

## 🎯 Features

### Public Pages
- ✨ **Modern Home Page** with trending and featured coupons
- 🏷️ **Coupon Categories** with full filtering and sorting
- 📄 **Coupon Details** with affiliate links and expiry tracking
- 📚 **Blog Section** with rich content and categories
- 🔍 **Advanced Search** with multiple filters
- 📈 **Trending Section** based on real-time analytics
- ℹ️ **About, Contact, Privacy Policy** pages
- 🎨 **Material Design 3 UI** with light/dark mode
- 📱 **Fully Responsive** (mobile-first design)

### Admin Dashboard
- 🔐 **Secure Authentication** with Supabase Auth
- ➕ **Create/Edit/Delete Coupons** with image upload
- ✍️ **Rich Text Blog Editor** with markdown support
- 📂 **Category Management** with customizable ordering
- 🏢 **Brand Management** with logos
- 📊 **Analytics Dashboard** with statistics
- 🎯 **SEO Management** for all content
- 👥 **Admin User Management**
- ⚙️ **Settings Management** (site-wide configuration)

### Coupon Features
- 🔤 **Copy Coupon Code** with one-click copying
- 🔗 **Affiliate Links** with commission tracking
- ⏰ **Expiry Date Tracking** with visual indicators
- 📸 **Product Images** with lazy loading
- 🏷️ **Discount Display** (percentage or fixed amount)
- 🔗 **Direct Links** to merchant websites
- 🔄 **Related Coupons** suggestions
- 📈 **View/Click Analytics**

### Blog Features
- ✨ **Rich Content Editor** with markdown
- 📷 **Featured Images** with ALT text
- 📂 **Category Organization**
- 🏷️ **SEO Optimization** (title, description, keywords)
- 📖 **Reading Time** estimation
- 🔗 **Related Articles** suggestions
- 📊 **View Tracking**
- 💬 **Social Sharing** ready

### SEO Optimization
- 🤖 **Dynamic Meta Tags** for all pages
- 🔗 **Open Graph** tags for social sharing
- 🐦 **Twitter Cards** integration
- 📋 **JSON-LD Structured Data**
- 🗺️ **Dynamic Sitemap** generation
- 🤖 **robots.txt** configuration
- 🔗 **Canonical URLs** for all pages
- 🥚 **Breadcrumb Navigation**
- 📚 **Internal Linking** structure
- 🎯 **SEO-Friendly URLs** with slugs

### Performance
- ⚡ **Server-Side Rendering (SSR)** for dynamic pages
- 🖼️ **Automatic Image Optimization** (WebP, AVIF)
- 💤 **Lazy Loading** for images and components
- ⏱️ **Fast Page Navigation** with prefetching
- 🗜️ **Minified & Optimized** code
- 📦 **Code Splitting** for optimal bundle size
- 🎯 **Lighthouse Score 90+**

### Security
- 🔐 **Row Level Security (RLS)** on database
- 👤 **Supabase Authentication** integration
- 🛡️ **CSRF Protection** via Next.js
- 🔒 **Secure API Routes** with authentication
- 🚫 **XSS Prevention** with sanitization
- 🔐 **Environment Variables** with encryption
- 📝 **SQL Injection Protection** with parameterized queries

### Design System
- 🎨 **Material Design 3** inspired
- 🌓 **Light & Dark Mode** support
- 🎪 **Smooth Animations** (fade, slide, scale)
- 📐 **8px Grid System** for consistency
- 🎨 **Rounded Cards** with soft shadows
- 🔤 **Beautiful Typography** with proper hierarchy
- 🎯 **Accessible Design** (WCAG compliant)
- 📱 **Mobile-First** responsive approach

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git
- Supabase account
- Vercel account (for deployment)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/deals-thai.git
cd deals-thai

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Add your Supabase credentials to .env.local
# See DEPLOYMENT_GUIDE.md for detailed setup

# Run development server
npm run dev

# Open http://localhost:3000
```

### First Time Setup

1. **Initialize Database**:
   - Follow the Database Setup section in `DEPLOYMENT_GUIDE.md`
   - Run SQL schema in Supabase dashboard

2. **Create Admin User**:
   - Sign up via Supabase Auth
   - Add user to `admin_users` table via Supabase dashboard
   - Set role to 'admin'

3. **Access Admin Dashboard**:
   - Go to `/admin/login`
   - Use your Supabase credentials
   - Start adding coupons and content

4. **Configure Settings**:
   - Go to `/admin/settings`
   - Add site name, description, contact info
   - Setup Google Analytics

---

## 📁 Project Structure

```
deals-thai/
├── app/                 # Next.js App Router
│   ├── (public)/        # Public pages
│   │   ├── page.tsx          # Home page
│   │   ├── categories/       # Categories page
│   │   ├── [slug]/           # Category detail
│   │   ├── coupon/[id]/      # Coupon detail
│   │   ├── blog/             # Blog listing
│   │   ├── blog/[slug]/      # Blog post detail
│   │   ├── search/           # Search page
│   │   ├── trending/         # Trending coupons
│   │   ├── about/            # About page
│   │   ├── contact/          # Contact page
│   │   ├── privacy/          # Privacy policy
│   │   └── 404/              # 404 page
│   ├── admin/           # Admin dashboard
│   │   ├── login/            # Admin login
│   │   ├── dashboard/        # Dashboard
│   │   ├── coupons/          # Coupon management
│   │   ├── blog/             # Blog management
│   │   ├── categories/       # Category management
│   │   ├── brands/           # Brand management
│   │   ├── analytics/        # Analytics
│   │   ├── settings/         # Settings
│   │   ├── users/            # User management
│   │   └── layout.tsx        # Admin layout
│   ├── api/             # API routes
│   │   ├── coupons/          # Coupon API
│   │   ├── blog/             # Blog API
│   │   ├── categories/       # Category API
│   │   ├── analytics/        # Analytics tracking
│   │   ├── search/           # Search API
│   │   └── contact/          # Contact form API
│   ├── sitemap.xml.ts   # Dynamic sitemap
│   ├── robots.txt.ts    # robots.txt
│   ├── layout.tsx       # Root layout
│   └── error.tsx        # Error handling
├── components/          # Reusable React components
│   ├── ui/              # Basic UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── Badge.tsx
│   │   ├── Skeleton.tsx
│   │   └── ...
│   ├── layout/          # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── ...
│   ├── sections/        # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedCoupons.tsx
│   │   ├── TrendingCoupons.tsx
│   │   └── ...
│   ├── coupon/          # Coupon-specific components
│   │   ├── CouponCard.tsx
│   │   ├── CouponDetail.tsx
│   │   ├── CouponForm.tsx
│   │   └── ...
│   ├── blog/            # Blog-specific components
│   │   ├── BlogCard.tsx
│   │   ├── BlogDetail.tsx
│   │   ├── BlogForm.tsx
│   │   └── ...
│   └── admin/           # Admin-specific components
│       ├── AdminNav.tsx
│       ├── StatsCard.tsx
│       └── ...
├── lib/                 # Utility functions
│   ├── supabase.ts      # Supabase client
│   ├── auth.ts          # Auth utilities
│   ├── seo.ts           # SEO utilities
│   ├── analytics.ts     # Analytics utilities
│   ├── validators.ts    # Form validators
│   └── ...
├── hooks/               # Custom React hooks
│   ├── useAuth.ts
│   ├── useSupabase.ts
│   ├── useTheme.ts
│   ├── usePagination.ts
│   └── ...
├── stores/              # Zustand stores
│   ├── authStore.ts
│   ├── uiStore.ts
│   └── ...
├── services/            # API services
│   ├── couponService.ts
│   ├── blogService.ts
│   ├── authService.ts
│   └── ...
├── styles/              # Global styles
│   ├── globals.css
│   └── ...
└── types/               # TypeScript types
    └── index.ts
├── public/                  # Static files
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── scripts/                 # Utility scripts
│   ├── seed.js             # Database seeding
│   └── generate-sitemap.js # Sitemap generation
├── supabase/schema.sql     # PostgreSQL schema
├── .env.example            # Environment template
├── .env.local             # Local environment (git ignored)
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies
└── README.md             # This file
```

---

## 🎨 Design System

### Colors (Material Design 3)
- **Primary**: Vibrant Purple (#8b5cf6)
- **Secondary**: Cyan Accent (#06b6d4)
- **Success**: Green (#22c55e)
- **Warning**: Amber (#f59e0b)
- **Accent**: Red (#ef4444)
- **Neutral**: Gray scale (50-900)

### Typography
- **Display**: Georgia (headings, hero text)
- **Body**: System fonts (content readability)
- **Mono**: SF Mono (code blocks)

### Spacing
8px-based grid system:
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 20px
- 2xl: 24px

### Shadows
- Elevation 1: Subtle
- Elevation 2-4: Cards and modals
- Elevation 5+: High priority elements

### Animations
- **Fade**: 300ms ease-in-out
- **Slide**: 300ms ease-out
- **Scale**: 300ms ease-out

---

## 🔌 API Endpoints

### Public API

#### Coupons
```
GET    /api/coupons                    # List all coupons
GET    /api/coupons/[id]               # Get coupon detail
GET    /api/coupons/trending           # Get trending
GET    /api/coupons/featured           # Get featured
GET    /api/coupons/search             # Search coupons
```

#### Blog
```
GET    /api/blog                       # List posts
GET    /api/blog/[slug]                # Get post detail
GET    /api/blog/trending              # Trending posts
```

#### Categories
```
GET    /api/categories                 # List all categories
GET    /api/categories/[slug]          # Get category
```

#### Search & Analytics
```
GET    /api/search                     # Search everything
POST   /api/analytics                  # Track events
```

### Admin API (Protected)

#### Coupon Management
```
POST   /api/admin/coupons              # Create coupon
PUT    /api/admin/coupons/[id]         # Update coupon
DELETE /api/admin/coupons/[id]         # Delete coupon
```

#### Blog Management
```
POST   /api/admin/blog                 # Create post
PUT    /api/admin/blog/[id]            # Update post
DELETE /api/admin/blog/[id]            # Delete post
```

---

## 🔐 Environment Variables

See `.env.example` for complete list. Key variables:

```env
NEXT_PUBLIC_SUPABASE_URL              # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY         # Supabase public key
SUPABASE_SERVICE_ROLE_KEY             # Service role key (admin)
NEXT_PUBLIC_APP_URL                   # Your domain
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID       # GA tracking ID
SMTP_*                                # Email configuration
```

---

## 📊 Database Schema

Key tables:
- **categories**: Coupon categories
- **brands**: Brand information
- **coupons**: Coupon listings with analytics
- **blog_categories**: Blog post categories
- **blog_posts**: Blog articles
- **admin_users**: Admin account management
- **analytics**: Event tracking
- **settings**: Site configuration

See `supabase/schema.sql` for full schema.

---

## 🚀 Deployment

### To Vercel
```bash
# See DEPLOYMENT_GUIDE.md for complete instructions

# Quick steps:
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Add environment variables
4. Deploy
```

### Local Production Build
```bash
npm run build
npm start
```

---

## 📈 Performance Metrics

Target metrics:
- **Lighthouse Score**: 90+
- **Core Web Vitals**:
  - LCP: < 2.5s
  - FID: < 100ms
  - CLS: < 0.1
- **Time to First Byte**: < 600ms
- **First Contentful Paint**: < 1.8s

---

## 🧪 Testing

```bash
# Lint code
npm run lint

# Type check
npm run type-check

# Build test
npm run build
```

---

## 📝 Content Management

### Adding Coupons
1. Go to `/admin/coupons`
2. Click "New Coupon"
3. Fill in details (Thai language)
4. Upload product image
5. Set category and brand
6. Configure SEO
7. Publish

### Adding Blog Posts
1. Go to `/admin/blog`
2. Click "New Post"
3. Write content in markdown
4. Add featured image
5. Set category
6. Configure SEO
7. Publish

### Managing Categories
1. Go to `/admin/categories`
2. Create/edit categories
3. Set display order
4. Add category icon/image

---

## 🐛 Troubleshooting

### Build Issues
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection
- Check Supabase credentials in `.env.local`
- Verify RLS policies
- Check Supabase project status

### Image Not Loading
- Verify image URL in Supabase Storage
- Check CORS configuration
- Ensure image bucket is public

---

## 📚 Documentation

- **Deployment**: See `DEPLOYMENT_GUIDE.md`
- **Database**: See `supabase/schema.sql`
- **Types**: See `types.ts`

---

## 📄 License

MIT License - See LICENSE file

---

## 👥 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📞 Support

For issues and questions:
- Check documentation
- Review GitHub Issues
- Contact: contact@yourdomain.com

---

## 🎯 Roadmap

- [ ] Multi-language support (EN, TH, other languages)
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] User accounts & favorites
- [ ] Reviews and ratings
- [ ] Advanced analytics
- [ ] Bulk coupon import
- [ ] API for partners
- [ ] Coupon comparison tool
- [ ] Browser extension

---

**Built with ❤️ for Thailand's savvy shoppers**
