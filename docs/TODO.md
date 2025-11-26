# Green Style Website - TODO List

**Project Status**: 🟢 In Development
**Last Updated**: 2025-11-17

---

## 🎯 Current Sprint

### Phase 1: Foundation ✅ COMPLETED
- [x] Project documentation setup
- [x] Next.js frontend structure
- [x] Tailwind CSS configuration
- [x] Component architecture
- [x] Development server running

---

## 📋 Immediate Next Steps

### 🔴 High Priority - This Week

#### 1. Sanity CMS Setup
- [ ] Create Sanity project
  ```bash
  npm create sanity@latest
  ```
- [ ] Implement schemas from `SANITY-SCHEMAS.md`:
  - [ ] Page schema
  - [ ] Service schema
  - [ ] Product schema
  - [ ] Product Category schema
  - [ ] Case Study schema
  - [ ] Settings schema
  - [ ] SEO object type
- [ ] Deploy Sanity Studio
- [ ] Create sample content for testing
- [ ] Get Sanity Project ID and API token
- [ ] Update `.env.local` with credentials

#### 2. Content Migration
- [ ] Extract all content from old website
- [ ] Organize content by page/section
- [ ] Prepare images and media files
- [ ] Upload to Sanity CMS
- [ ] Create content for:
  - [ ] Homepage
  - [ ] About page
  - [ ] Services (CFO, CFP, Training)
  - [ ] Products
  - [ ] Contact info

#### 3. Homepage Enhancements
- [ ] Add real company logo
- [ ] Replace placeholder images
- [ ] Connect to Sanity for dynamic content
- [ ] Add real statistics/numbers
- [ ] Test and optimize performance

---

### 🟡 Medium Priority - Next Week

#### 4. Additional Pages
- [ ] About Us page
  - [ ] Company history section
  - [ ] Mission & Vision
  - [ ] Team members (if applicable)
  - [ ] Certifications & partnerships

- [ ] Services Pages
  - [ ] Services overview/listing page
  - [ ] Individual service pages:
    - [ ] CFO (Carbon Footprint Organization)
    - [ ] CFP (Carbon Footprint Product)
    - [ ] Environmental Training
  - [ ] Benefits sections
  - [ ] Process/how it works
  - [ ] Pricing/quotation CTA

- [ ] Products Section
  - [ ] Products listing page
  - [ ] Product filtering by category
  - [ ] Individual product pages
  - [ ] Product search functionality
  - [ ] E-commerce integration (if needed)

- [ ] Case Studies/Portfolio
  - [ ] Case studies listing
  - [ ] Individual case study pages
  - [ ] Client testimonials
  - [ ] Results/metrics display

- [ ] Contact Page
  - [ ] Contact form
  - [ ] Google Maps integration
  - [ ] Contact information display
  - [ ] Office hours
  - [ ] Social media links

#### 5. Components & Features
- [ ] Search functionality
- [ ] Newsletter signup form
- [ ] Contact form with validation
- [ ] Loading states for all pages
- [ ] Error handling pages (404, 500)
- [ ] Breadcrumb navigation
- [ ] Share buttons for services/products
- [ ] Print-friendly layouts

---

### 🟢 Low Priority - Future

#### 6. Advanced Features
- [ ] Blog/News section (optional)
- [ ] Multi-language support (Thai/English)
- [ ] Client portal (for reports)
- [ ] Online booking system
- [ ] Live chat integration
- [ ] Carbon calculator tool
- [ ] Product comparison feature
- [ ] Reviews/ratings system

#### 7. Optimization
- [ ] Image optimization (WebP, lazy loading)
- [ ] SEO optimization
  - [ ] Meta tags for all pages
  - [ ] Sitemap generation
  - [ ] Robots.txt
  - [ ] Schema.org markup
  - [ ] Open Graph tags
- [ ] Performance optimization
  - [ ] Lighthouse score > 90
  - [ ] Core Web Vitals optimization
  - [ ] Bundle size optimization
- [ ] Accessibility improvements
  - [ ] WCAG 2.1 AA compliance
  - [ ] Keyboard navigation
  - [ ] Screen reader testing
  - [ ] Alt text for all images

#### 8. Testing
- [ ] Cross-browser testing
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
- [ ] Mobile device testing
  - [ ] iOS Safari
  - [ ] Android Chrome
  - [ ] Various screen sizes
- [ ] Form validation testing
- [ ] Link checking
- [ ] Performance testing

#### 9. Deployment
- [ ] Set up Vercel project
- [ ] Configure environment variables
- [ ] Set up custom domain
- [ ] SSL certificate
- [ ] CDN configuration
- [ ] Analytics setup (Google Analytics)
- [ ] Error tracking (Sentry, optional)
- [ ] Staging environment
- [ ] Production deployment

---

## 🐛 Known Issues / Bugs

*No known issues yet - add as discovered*

---

## 💡 Ideas / Future Enhancements

- [ ] Carbon footprint calculator widget
- [ ] Interactive sustainability quiz
- [ ] Video testimonials
- [ ] Virtual tour of office/facility
- [ ] Downloadable resources (whitepapers, guides)
- [ ] Client success stories with metrics
- [ ] Real-time chat support
- [ ] Mobile app (future consideration)

---

## 📝 Content Needs

### Required Content (From Client)
- [ ] Company logo (SVG, PNG - various sizes)
- [ ] Favicon
- [ ] Company photos
  - [ ] Office/workplace
  - [ ] Team members
  - [ ] Training sessions
  - [ ] Projects/case studies
- [ ] Product photos (high-resolution)
- [ ] Certification logos/badges
- [ ] Client logos (with permission)
- [ ] Contact details:
  - [ ] Full address
  - [ ] Phone number(s)
  - [ ] Email address(es)
  - [ ] Business hours
  - [ ] Social media handles
  - [ ] LINE ID
- [ ] Company registration details
- [ ] Service pricing (if applicable)
- [ ] Product pricing
- [ ] Terms of service
- [ ] Privacy policy
- [ ] Testimonials/reviews

---

## 🎨 Design Tasks

- [ ] Get/create company logo
- [ ] Source hero images
- [ ] Design service icons
- [ ] Create social media graphics
- [ ] Design email templates (for contact forms)
- [ ] Create favicon set
- [ ] Prepare Open Graph images

---

## 📊 Analytics & Tracking

- [ ] Set up Google Analytics 4
- [ ] Set up Google Search Console
- [ ] Facebook Pixel (if needed)
- [ ] Conversion tracking setup
- [ ] Event tracking configuration
- [ ] Heatmap tools (Hotjar, optional)

---

## 🔐 Security & Compliance

- [ ] HTTPS/SSL certificate
- [ ] Environment variables secured
- [ ] Form spam protection
- [ ] GDPR compliance (if applicable)
- [ ] Privacy policy implementation
- [ ] Cookie consent (if needed)
- [ ] Regular backups setup

---

## 📚 Documentation Tasks

- [ ] Update README with final deployment info
- [ ] Create user guide for CMS
- [ ] Document custom components
- [ ] API documentation (if applicable)
- [ ] Maintenance guide
- [ ] Troubleshooting guide

---

## ✅ Completed Tasks

### Foundation (Week 1)
- ✅ Created comprehensive project documentation
  - ✅ PROJECT-OVERVIEW.md
  - ✅ SITEMAP.md
  - ✅ DESIGN-REQUIREMENTS.md
  - ✅ CONTENT-CHECKLIST.md
  - ✅ TECHNICAL-SPECS.md
  - ✅ SETUP-GUIDE.md
  - ✅ SANITY-SCHEMAS.md
  - ✅ CLAUDE.md (coding guidelines)
  - ✅ TODO.md (this file)

- ✅ Next.js Frontend Setup
  - ✅ Created project structure
  - ✅ Configured TypeScript
  - ✅ Set up Tailwind CSS with custom theme
  - ✅ Configured Thai fonts (Sarabun, Prompt)
  - ✅ Installed all dependencies
  - ✅ Created Sanity client configuration
  - ✅ Created GROQ queries
  - ✅ Set up utility functions

- ✅ Layout Components
  - ✅ Header with navigation
  - ✅ Footer with company info
  - ✅ Root layout with fonts
  - ✅ Mobile-responsive menu

- ✅ Homepage Sections (Initial)
  - ✅ Hero section
  - ✅ About section
  - ✅ Featured Services section
  - ✅ Featured Products section
  - ✅ CTA section

- ✅ Development Environment
  - ✅ Dev server running (http://localhost:3000)
  - ✅ Environment variables template created
  - ✅ Git ignore configured

---

## 📅 Timeline

### Week 1 (Current) ✅
- Project setup and foundation

### Week 2 (Next)
- Sanity CMS setup
- Content migration
- Homepage finalization

### Week 3
- Additional pages (About, Services)
- Product catalog
- Contact form

### Week 4
- Case studies
- Testing
- Optimization

### Week 5
- Final testing
- Deployment
- Launch

---

## 🎯 Success Metrics

### Technical Goals
- [ ] Lighthouse Performance score > 90
- [ ] Mobile-friendly test passed
- [ ] All pages load in < 3 seconds
- [ ] Zero console errors
- [ ] WCAG 2.1 AA compliance

### Business Goals
- [ ] All services clearly presented
- [ ] Easy quotation request process
- [ ] Product catalog functional
- [ ] Contact forms working
- [ ] Mobile traffic supported

---

## 📞 Questions for Client

- [ ] Do you have a company logo? (Vector format preferred)
- [ ] Do you need e-commerce functionality for products?
- [ ] Do you want English language support?
- [ ] Do you have product photos?
- [ ] Do you want a blog/news section?
- [ ] What is your preferred domain name?
- [ ] Do you have existing hosting?
- [ ] What is your launch deadline?
- [ ] Do you need ongoing maintenance?

---

## 🔄 Weekly Review Checklist

*Review every week:*
- [ ] Update TODO.md with completed tasks
- [ ] Review timeline and adjust if needed
- [ ] Document any blockers
- [ ] Plan next week's priorities
- [ ] Update client on progress

---

**Notes**:
- Keep this file updated as you progress
- Mark items complete with [x]
- Add new tasks as they come up
- Prioritize based on project needs
