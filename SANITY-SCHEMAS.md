# Sanity CMS - Content Schemas

This document defines all the content types (schemas) needed for the Green Style website in Sanity CMS.

---

## Schema Overview

### Content Types
1. **Page** - Generic pages (About, Contact, etc.)
2. **Service** - Service offerings (CFO, CFP, Training)
3. **Product** - Eco-friendly products
4. **ProductCategory** - Product categories
5. **Post** - Blog posts/news (optional)
6. **CaseStudy** - Project case studies
7. **TeamMember** - Team member profiles
8. **Settings** - Site-wide settings

### Object Types (Reusable)
- **SEO** - Meta tags and SEO data
- **Link** - Internal/external links
- **Hero** - Hero section content
- **CTA** - Call-to-action blocks

---

## 1. Page Schema

Generic page content for About, Contact, etc.

```typescript
// schemas/page.ts
export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {name: 'heading', type: 'string', title: 'Heading'},
        {name: 'subheading', type: 'text', title: 'Subheading'},
        {name: 'image', type: 'image', title: 'Background Image'},
      ],
    },
    {
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          fields: [
            {name: 'alt', type: 'string', title: 'Alt Text'},
            {name: 'caption', type: 'string', title: 'Caption'},
          ],
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}
```

---

## 2. Service Schema

For CFO, CFP, Training, and other services

```typescript
// schemas/service.ts
export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          {title: 'Carbon Footprint Organization (CFO)', value: 'cfo'},
          {title: 'Carbon Footprint Product (CFP)', value: 'cfp'},
          {title: 'Environmental Training', value: 'training'},
          {title: 'Consulting', value: 'consulting'},
          {title: 'Other', value: 'other'},
        ],
      },
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for cards and previews',
    },
    {
      name: 'icon',
      title: 'Icon/Image',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    },
    {
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Benefit Title'},
            {name: 'description', type: 'text', title: 'Description'},
            {name: 'icon', type: 'string', title: 'Icon Name (optional)'},
          ],
        },
      ],
    },
    {
      name: 'process',
      title: 'Process/How It Works',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'step', type: 'number', title: 'Step Number'},
            {name: 'title', type: 'string', title: 'Step Title'},
            {name: 'description', type: 'text', title: 'Description'},
          ],
        },
      ],
    },
    {
      name: 'pricing',
      title: 'Pricing Information',
      type: 'object',
      fields: [
        {name: 'showPricing', type: 'boolean', title: 'Show Pricing'},
        {name: 'price', type: 'string', title: 'Price'},
        {name: 'pricingNote', type: 'text', title: 'Pricing Note'},
      ],
    },
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {name: 'text', type: 'string', title: 'CTA Text'},
        {name: 'buttonText', type: 'string', title: 'Button Text'},
      ],
    },
    {
      name: 'relatedCaseStudies',
      title: 'Related Case Studies',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'caseStudy'}]}],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}
```

---

## 3. Product Schema

For eco-friendly products

```typescript
// schemas/product.ts
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'productCategory'}],
    },
    {
      name: 'ecoType',
      title: 'Eco-Friendly Type',
      type: 'string',
      options: {
        list: [
          {title: 'Certified Eco-Friendly', value: 'certified'},
          {title: 'Eco-Friendly (Not Certified)', value: 'uncertified'},
          {title: 'Promotes Eco-Friendly Usage', value: 'promotes'},
        ],
      },
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', type: 'string', title: 'Alt Text'},
          ],
        },
      ],
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'value', type: 'string', title: 'Value'},
          ],
        },
      ],
    },
    {
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Certification Name'},
            {name: 'logo', type: 'image', title: 'Certification Logo'},
          ],
        },
      ],
    },
    {
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        {name: 'showPrice', type: 'boolean', title: 'Show Price'},
        {name: 'price', type: 'number', title: 'Price (THB)'},
        {name: 'priceNote', type: 'string', title: 'Price Note'},
      ],
    },
    {
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}
```

---

## 4. Product Category Schema

```typescript
// schemas/productCategory.ts
export default {
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Category Image',
      type: 'image',
    },
  ],
}
```

---

## 5. Case Study Schema

```typescript
// schemas/caseStudy.ts
export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
    },
    {
      name: 'client',
      title: 'Client Name',
      type: 'string',
    },
    {
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'string',
    },
    {
      name: 'service',
      title: 'Related Service',
      type: 'reference',
      to: [{type: 'service'}],
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    },
    {
      name: 'challenge',
      title: 'Challenge',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'solution',
      title: 'Solution',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'metric', type: 'string', title: 'Metric'},
            {name: 'value', type: 'string', title: 'Value'},
            {name: 'description', type: 'text', title: 'Description'},
          ],
        },
      ],
    },
    {
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        {name: 'quote', type: 'text', title: 'Quote'},
        {name: 'author', type: 'string', title: 'Author'},
        {name: 'position', type: 'string', title: 'Position'},
      ],
    },
    {
      name: 'featured',
      title: 'Featured Case Study',
      type: 'boolean',
      initialValue: false,
    },
  ],
}
```

---

## 6. Settings Schema

Site-wide settings

```typescript
// schemas/settings.ts
export default {
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {name: 'email', type: 'string', title: 'Email'},
        {name: 'phone', type: 'string', title: 'Phone'},
        {name: 'address', type: 'text', title: 'Address'},
        {name: 'googleMapsUrl', type: 'url', title: 'Google Maps URL'},
      ],
    },
    {
      name: 'social',
      title: 'Social Media',
      type: 'object',
      fields: [
        {name: 'facebook', type: 'url', title: 'Facebook'},
        {name: 'instagram', type: 'url', title: 'Instagram'},
        {name: 'line', type: 'string', title: 'LINE ID'},
        {name: 'linkedin', type: 'url', title: 'LinkedIn'},
      ],
    },
    {
      name: 'footer',
      title: 'Footer Content',
      type: 'object',
      fields: [
        {name: 'aboutText', type: 'text', title: 'About Text'},
        {name: 'copyrightText', type: 'string', title: 'Copyright Text'},
      ],
    },
  ],
}
```

---

## 7. SEO Object Type (Reusable)

```typescript
// schemas/objects/seo.ts
export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (Rule: any) => Rule.max(60),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.max(160),
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing',
    },
  ],
}
```

---

## Schema Index File

```typescript
// schemas/index.ts
import page from './page'
import service from './service'
import product from './product'
import productCategory from './productCategory'
import caseStudy from './caseStudy'
import settings from './settings'
import seo from './objects/seo'

export const schemaTypes = [
  // Documents
  page,
  service,
  product,
  productCategory,
  caseStudy,
  settings,

  // Objects
  seo,
]
```

---

## Implementation Checklist

- [ ] Create schema files in `sanity/schemas/` directory
- [ ] Create objects subdirectory for reusable types
- [ ] Update `sanity/schemas/index.ts` to export all schemas
- [ ] Import schemas in `sanity.config.ts`
- [ ] Test schemas in Sanity Studio
- [ ] Create sample content for each type
- [ ] Set up document permissions (if needed)

---

## Next Steps

After creating these schemas:
1. Add them to your Sanity project
2. Deploy Sanity Studio
3. Create sample content
4. Build Next.js components to fetch and display this data
5. Implement GROQ queries for data fetching
