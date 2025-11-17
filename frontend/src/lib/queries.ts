// GROQ queries for fetching data from Sanity

// Get all services
export const servicesQuery = `*[_type == "service"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  category,
  shortDescription,
  icon,
  featured
}`

// Get single service by slug
export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  shortDescription,
  icon,
  overview,
  benefits,
  process,
  pricing,
  cta,
  relatedCaseStudies[]-> {
    _id,
    title,
    slug,
    summary,
    featuredImage
  },
  seo
}`

// Get featured services (for homepage)
export const featuredServicesQuery = `*[_type == "service" && featured == true] | order(_createdAt desc) [0...3] {
  _id,
  title,
  slug,
  category,
  shortDescription,
  icon
}`

// Get all products
export const productsQuery = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  slug,
  category->{name, slug},
  ecoType,
  images,
  shortDescription,
  pricing,
  inStock,
  featured
}`

// Get single product by slug
export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  category->{name, slug},
  ecoType,
  images,
  shortDescription,
  description,
  specifications,
  certifications,
  pricing,
  inStock,
  seo
}`

// Get featured products
export const featuredProductsQuery = `*[_type == "product" && featured == true] | order(_createdAt desc) [0...6] {
  _id,
  name,
  slug,
  images,
  shortDescription,
  pricing,
  ecoType
}`

// Get page by slug
export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  hero,
  content,
  seo
}`

// Get all case studies
export const caseStudiesQuery = `*[_type == "caseStudy"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  client,
  clientLogo,
  industry,
  featuredImage,
  summary,
  featured
}`

// Get single case study by slug
export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  client,
  clientLogo,
  industry,
  service->{title, slug},
  featuredImage,
  summary,
  challenge,
  solution,
  results,
  testimonial
}`

// Get site settings
export const settingsQuery = `*[_type == "settings"][0] {
  _id,
  siteName,
  logo,
  contact,
  social,
  footer
}`

// Get product categories
export const productCategoriesQuery = `*[_type == "productCategory"] | order(name asc) {
  _id,
  name,
  slug,
  description,
  image
}`
