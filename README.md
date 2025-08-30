# Travel Services Platform

A comprehensive multi-service travel platform built with React, TypeScript, Tailwind CSS, and Vite. The platform offers Car Rentals, Real Estate, Hotel Booking, Airport Transfers, and Tours services.

## 🚀 Features

- **Car Rentals**: Browse and book vehicles with detailed specifications
- **Real Estate**: Property listings for sale and rent
- **Hotel Booking**: Hotel search and reservation system
- **Airport Transfers**: Professional transfer services
- **Tours**: Guided tour packages and experiences
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety and developer experience
- **GraphQL Integration**: Efficient data fetching with MongoDB backend

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Git
- MongoDB (for backend)
- GraphQL server setup

## 🛠 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd travel-services-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:4000/graphql
VITE_APP_NAME=Travel Services Platform
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### 4. Install Required Dependencies
```bash
npm install @apollo/client graphql
npm install @types/react @types/react-dom
npm install lucide-react
npm install react-router-dom
npm install date-fns
npm install react-hook-form
npm install @hookform/resolvers yup
```

### 5. Development Dependencies
```bash
npm install -D @types/node
npm install -D autoprefixer postcss
npm install -D eslint @typescript-eslint/eslint-plugin
npm install -D prettier eslint-config-prettier
```

## 🏗 Project Structure

### Core Technologies
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Data Fetching**: Apollo Client (GraphQL)
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form
- **Date Handling**: date-fns
- **Icons**: Lucide React

### Key Directories

#### `/src/components/`
Reusable UI components organized by service:
- `common/`: Shared components (Header, Footer, SearchBar)
- `car-rentals/`: Car-specific components
- `real-estate/`: Property-related components
- `hotels/`: Hotel booking components
- `transfers/`: Transfer service components
- `tours/`: Tour package components

#### `/src/pages/`
Main page components for each service

#### `/src/types/`
TypeScript type definitions for all services

#### `/src/graphql/`
GraphQL queries, mutations, and fragments

#### `/src/hooks/`
Custom React hooks for data fetching and business logic

## 📊 Sample Data Structure

### Car Rentals
```typescript
interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: 'economy' | 'compact' | 'luxury' | 'suv' | 'minivan';
  pricePerDay: number;
  features: string[];
  transmission: 'manual' | 'automatic';
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  seats: number;
  images: string[];
  location: string;
  available: boolean;
}
```

### Real Estate
```typescript
interface Property {
  id: string;
  title: string;
  type: 'apartment' | 'house' | 'villa' | 'condo' | 'studio';
  listingType: 'sale' | 'rent';
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  features: string[];
  images: string[];
  description: string;
  available: boolean;
}
```

### Hotels
```typescript
interface Hotel {
  id: string;
  name: string;
  rating: number;
  location: string;
  pricePerNight: number;
  amenities: string[];
  roomTypes: RoomType[];
  images: string[];
  description: string;
  checkInTime: string;
  checkOutTime: string;
}
```

### Airport Transfers
```typescript
interface Transfer {
  id: string;
  vehicleType: 'sedan' | 'suv' | 'minivan' | 'luxury' | 'bus';
  capacity: number;
  pricePerKm: number;
  basePrice: number;
  features: string[];
  duration: string;
  pickup: string;
  destination: string;
  available: boolean;
}
```

### Tours
```typescript
interface Tour {
  id: string;
  title: string;
  category: 'cultural' | 'adventure' | 'nature' | 'city' | 'food';
  duration: string;
  price: number;
  groupSize: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  highlights: string[];
  included: string[];
  images: string[];
  description: string;
  schedule: string[];
}
```

## 🔧 Development

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
npm run lint:fix
```

## 🎨 Styling Guidelines

### Tailwind CSS Configuration
The project uses a custom Tailwind configuration with:
- Custom color palette for brand consistency
- Responsive breakpoints
- Custom animations and transitions
- Typography scale

### Design Principles
- **Mobile-First**: All components designed for mobile, then enhanced for desktop
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimized images and lazy loading
- **Consistency**: Shared design tokens and components

## 🔌 Backend Integration

### GraphQL Schema Requirements

#### Car Rentals
```graphql
type Car {
  id: ID!
  brand: String!
  model: String!
  year: Int!
  category: CarCategory!
  pricePerDay: Float!
  features: [String!]!
  transmission: Transmission!
  fuelType: FuelType!
  seats: Int!
  images: [String!]!
  location: String!
  available: Boolean!
}

type Query {
  cars(filters: CarFilters): [Car!]!
  car(id: ID!): Car
}

type Mutation {
  bookCar(input: CarBookingInput!): Booking!
}
```

#### Real Estate
```graphql
type Property {
  id: ID!
  title: String!
  type: PropertyType!
  listingType: ListingType!
  price: Float!
  bedrooms: Int!
  bathrooms: Int!
  area: Float!
  location: String!
  features: [String!]!
  images: [String!]!
  description: String!
  available: Boolean!
}
```

#### Hotels
```graphql
type Hotel {
  id: ID!
  name: String!
  rating: Float!
  location: String!
  pricePerNight: Float!
  amenities: [String!]!
  roomTypes: [RoomType!]!
  images: [String!]!
  description: String!
  checkInTime: String!
  checkOutTime: String!
}
```

#### Transfers
```graphql
type Transfer {
  id: ID!
  vehicleType: VehicleType!
  capacity: Int!
  pricePerKm: Float!
  basePrice: Float!
  features: [String!]!
  duration: String!
  pickup: String!
  destination: String!
  available: Boolean!
}
```

#### Tours
```graphql
type Tour {
  id: ID!
  title: String!
  category: TourCategory!
  duration: String!
  price: Float!
  groupSize: Int!
  difficulty: Difficulty!
  highlights: [String!]!
  included: [String!]!
  images: [String!]!
  description: String!
  schedule: [String!]!
}
```

### MongoDB Collections

#### Cars Collection
```javascript
{
  _id: ObjectId,
  brand: String,
  model: String,
  year: Number,
  category: String,
  pricePerDay: Number,
  features: [String],
  transmission: String,
  fuelType: String,
  seats: Number,
  images: [String],
  location: String,
  available: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Properties Collection
```javascript
{
  _id: ObjectId,
  title: String,
  type: String,
  listingType: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  location: String,
  features: [String],
  images: [String],
  description: String,
  available: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Hosting Options

#### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

#### 2. Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

#### 3. AWS S3 + CloudFront
```bash
# Build the project
npm run build

# Upload to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

#### 4. Docker Deployment
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔧 Backend Setup

### GraphQL Server Setup
```bash
# Backend dependencies
npm install apollo-server-express graphql mongoose
npm install @types/mongoose @types/node
npm install dotenv cors helmet
npm install express-rate-limit
```

### MongoDB Setup
```bash
# Local MongoDB
brew install mongodb/brew/mongodb-community
brew services start mongodb/brew/mongodb-community

# Or use MongoDB Atlas (cloud)
# Connection string: mongodb+srv://username:password@cluster.mongodb.net/travel-platform
```

### Environment Variables (.env)
```env
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb://localhost:27017/travel-platform
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=sk_test_...
GOOGLE_MAPS_API_KEY=your-google-maps-key
EMAIL_SERVICE_API_KEY=your-email-service-key
```

## 📱 Mobile Responsiveness

### Breakpoints
- **sm**: 640px+ (mobile landscape)
- **md**: 768px+ (tablet)
- **lg**: 1024px+ (desktop)
- **xl**: 1280px+ (large desktop)
- **2xl**: 1536px+ (extra large)

### Mobile-First Components
All components are built mobile-first with responsive design:
- Touch-friendly buttons (min 44px)
- Swipeable carousels
- Collapsible navigation
- Optimized images with lazy loading

## 🔐 Security Implementation

### Frontend Security
- Input validation with Yup schemas
- XSS protection
- CSRF tokens for forms
- Secure authentication flow
- Environment variable protection

### Backend Security
```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Security headers
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

## 📈 Performance Optimization

### Frontend Optimization
- **Code Splitting**: Lazy loading of route components
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: webpack-bundle-analyzer
- **Caching**: Service worker implementation
- **Compression**: Gzip/Brotli compression

### Backend Optimization
- **Database Indexing**: Optimized MongoDB indexes
- **Query Optimization**: DataLoader for N+1 query prevention
- **Caching**: Redis for frequently accessed data
- **CDN**: Static asset delivery

## 🧪 Testing

### Frontend Testing
```bash
# Install testing dependencies
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event
npm install -D vitest jsdom

# Run tests
npm run test
npm run test:coverage
```

### Backend Testing
```bash
# Install testing dependencies
npm install -D jest supertest @types/jest
npm install -D mongodb-memory-server

# Run tests
npm run test:backend
```

## 📊 Monitoring & Analytics

### Frontend Monitoring
- Google Analytics 4 integration
- Error tracking with Sentry
- Performance monitoring
- User behavior analytics

### Backend Monitoring
- Application logging with Winston
- Database performance monitoring
- API response time tracking
- Error rate monitoring

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🗄 Database Schema & Sample Data

### Sample Data Requirements
Each service requires at least 5 sample entries:

#### Cars (5+ entries)
1. **Toyota Camry 2023** - Economy, $45/day, Automatic, Petrol
2. **BMW X5 2024** - Luxury SUV, $120/day, Automatic, Hybrid
3. **Ford Focus 2022** - Compact, $35/day, Manual, Petrol
4. **Tesla Model 3 2024** - Luxury, $95/day, Automatic, Electric
5. **Honda CR-V 2023** - SUV, $65/day, Automatic, Hybrid

#### Properties (5+ entries)
1. **Downtown Apartment** - 2BR/2BA, $450,000 (Sale)
2. **Suburban House** - 4BR/3BA, $2,500/month (Rent)
3. **Luxury Villa** - 5BR/4BA, $1,200,000 (Sale)
4. **City Studio** - 1BR/1BA, $1,200/month (Rent)
5. **Townhouse** - 3BR/2BA, $650,000 (Sale)

#### Hotels (5+ entries)
1. **Grand Plaza Hotel** - 5-star, $250/night, City Center
2. **Budget Inn** - 3-star, $75/night, Airport Area
3. **Boutique Resort** - 4-star, $180/night, Beach Front
4. **Business Hotel** - 4-star, $140/night, Business District
5. **Family Lodge** - 3-star, $95/night, Suburban

#### Transfers (5+ entries)
1. **Airport Sedan** - 4 passengers, $2.5/km + $15 base
2. **Luxury SUV** - 6 passengers, $4/km + $25 base
3. **Minivan** - 8 passengers, $3/km + $20 base
4. **Economy Car** - 4 passengers, $2/km + $10 base
5. **Bus Transfer** - 20 passengers, $1.5/km + $50 base

#### Tours (5+ entries)
1. **City Walking Tour** - Cultural, 3 hours, $35/person
2. **Mountain Adventure** - Adventure, Full day, $120/person
3. **Food Tasting Tour** - Food, 4 hours, $85/person
4. **Historical Sites** - Cultural, Half day, $65/person
5. **Nature Safari** - Nature, 2 days, $300/person

## 📝 API Documentation

### GraphQL Endpoints

#### Queries
```graphql
# Get all cars with filters
query GetCars($filters: CarFilters) {
  cars(filters: $filters) {
    id
    brand
    model
    pricePerDay
    images
    available
  }
}

# Get all properties
query GetProperties($filters: PropertyFilters) {
  properties(filters: $filters) {
    id
    title
    price
    location
    bedrooms
    images
  }
}
```

#### Mutations
```graphql
# Book a car
mutation BookCar($input: CarBookingInput!) {
  bookCar(input: $input) {
    id
    status
    totalPrice
    bookingDate
  }
}

# Create property inquiry
mutation CreateInquiry($input: InquiryInput!) {
  createInquiry(input: $input) {
    id
    message
    status
  }
}
```

## 🚀 Scaling Considerations

### Horizontal Scaling
- Microservices architecture for each service
- Load balancing with NGINX
- Database sharding strategies
- CDN for static assets

### Vertical Scaling
- Server optimization
- Database query optimization
- Caching strategies
- Memory management

### Performance Monitoring
- Application performance monitoring (APM)
- Database performance tracking
- User experience metrics
- Error rate monitoring

## 🔒 Security Best Practices

### Frontend Security
- Content Security Policy (CSP)
- Subresource Integrity (SRI)
- Secure authentication
- Input sanitization

### Backend Security
- JWT token validation
- Rate limiting
- SQL injection prevention
- Data encryption at rest

## 📚 Additional Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Apollo Client Docs](https://www.apollographql.com/docs/react/)
- [Vite Guide](https://vitejs.dev/guide/)

### Design Resources
- Figma design system
- Component library documentation
- Brand guidelines
- Icon library (Lucide React)

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

### Code Standards
- Follow TypeScript strict mode
- Use ESLint and Prettier configurations
- Write comprehensive tests
- Document complex functions
- Follow conventional commit messages

## 📞 Support & Maintenance

### Maintenance Schedule
- **Daily**: Monitor application health and errors
- **Weekly**: Review performance metrics and user feedback
- **Monthly**: Security updates and dependency upgrades
- **Quarterly**: Feature reviews and roadmap planning

### Backup Strategy
- Daily automated database backups
- Weekly full system backups
- Version control for all code changes
- Documentation backups

### Monitoring Setup
```bash
# Install monitoring tools
npm install @sentry/react @sentry/tracing
npm install web-vitals

# Analytics
npm install react-ga4
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Senior Developer**: Project lead and architecture
- **UI/UX Designer**: Design system and user experience
- **Backend Developer**: GraphQL API and database design
- **DevOps Engineer**: Deployment and infrastructure

## 🆘 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### GraphQL Connection Issues
- Verify backend server is running
- Check CORS configuration
- Validate GraphQL endpoint URL

#### Styling Issues
- Ensure Tailwind CSS is properly configured
- Check for conflicting CSS classes
- Verify responsive breakpoints

### Getting Help
- Check existing GitHub issues
- Join our Discord community
- Review documentation
- Contact support team

---

**Happy Coding! 🎉**

For questions or support, please open an issue or contact the development team.
