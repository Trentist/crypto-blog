# Personal Blog with Next.js & Sanity CMS

A modern, full-featured personal blog built with Next.js 14 and Sanity CMS. Share your research results, opinions, public news, and more with a beautiful, responsive interface and a powerful content management system.

## 🌟 Features

- **Modern Design**: Beautiful, responsive UI built with Tailwind CSS
- **Content Management**: Sanity Studio for easy content creation and management
- **Blog Posts**: Rich text editor with support for images, headings, lists, and more
- **Advanced Filtering**: Filter posts by year and category with real-time updates
- **Categories**: Organize posts by topics/categories
- **Author System**: Support for author profiles with bio and image
- **SEO-Friendly**: Built-in metadata and optimizations
- **Fast Performance**: Static site generation with incremental regeneration
- **Type-Safe**: Full TypeScript support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Sanity account (free at [sanity.io](https://www.sanity.io))

### Installation

1. **Install Dependencies**

```bash
npm install
```

2. **Set Up Sanity Project**

   - Go to [sanity.io](https://www.sanity.io) and create a free account
   - Create a new project
   - Note your Project ID

3. **Configure Environment Variables**

   Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
```

4. **Deploy Sanity Schema**

```bash
npx sanity init --env
npx sanity schema deploy
```

5. **Run Development Server**

```bash
npm run dev
```

6. **Access the Application**

   - Blog: [http://localhost:3000](http://localhost:3000)
   - Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

## 📝 Creating Content

### First-Time Setup

1. Go to `http://localhost:3000/studio`
2. Sign in with your Sanity account
3. Create your first author profile:
   - Navigate to "Author" in the sidebar
   - Click "Create new" and fill in your details
4. Create categories:
   - Navigate to "Category"
   - Add categories like "Research", "Opinion", "News", etc.
5. Create your first post:
   - Navigate to "Post"
   - Fill in the title, content, and other details
   - Assign categories and author
   - Publish!

## 🔍 Advanced Filtering

The blog page features powerful filtering capabilities:

### Year Filter
- Automatically extracts years from published posts
- Sortable from newest to oldest
- Preserves category filters when switching years

### Category Filter
- Browse by topic with visual indicators
- "Show More" functionality for large category lists
- Active filter indicators
- Preserves year filters when switching categories

### Filter Controls
- Clear visual indicators for active filters
- "Clear All" button to reset all filters
- Real-time filtering with URL state management

### Recommended Categories for Blockchain/Web3 Blogs

Create these categories in your Sanity Studio for a comprehensive blockchain blog:

1. **Smart Contract Development** - Building secure and efficient smart contracts
2. **Cryptography & Security** - Cryptographic primitives and security audits
3. **DeFi Protocols** - Decentralized finance and yield farming
4. **Zero-Knowledge Proofs** - ZK-SNARKs, ZK-STARKs, and privacy technologies
5. **Layer 2 Solutions** - Scaling solutions and rollups
6. **Cross-Chain Technology** - Bridges and interoperability protocols
7. **NFTs & Digital Assets** - Non-fungible tokens and tokenization
8. **DAO Governance** - Decentralized autonomous organizations
9. **Web3 Infrastructure** - Node infrastructure and developer tooling
10. **Blockchain Economics** - Tokenomics and economic models
11. **Consensus Mechanisms** - Proof of Work, Proof of Stake, and novel algorithms
12. **Privacy Coins** - Privacy-focused cryptocurrencies
13. **MEV & Frontrunning** - Maximal Extractable Value and protection
14. **Regulatory & Compliance** - Legal frameworks and compliance
15. **Blockchain Analytics** - On-chain data analysis and market intelligence

### Content Types

#### Posts
- **Title**: The post headline
- **Slug**: URL-friendly version (auto-generated from title)
- **Author**: Select from created authors
- **Main Image**: Featured image for the post
- **Categories**: Tag posts with relevant topics
- **Published At**: Publication date/time
- **Excerpt**: Short summary (max 200 characters)
- **Body**: Full post content with rich text support

#### Categories
- **Title**: Category name
- **Slug**: URL-friendly version
- **Description**: Brief explanation of the category

#### Authors
- **Name**: Author's name
- **Slug**: URL-friendly version
- **Image**: Author profile picture
- **Bio**: Author biography

## 🎨 Customization

### Styling

The site uses Tailwind CSS. Customize colors, fonts, and styles in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global styles and prose styling

### Components

Key components to customize:
- `app/components/Header.tsx` - Site navigation
- `app/components/Footer.tsx` - Site footer
- `app/components/PostCard.tsx` - Blog post preview cards
- `app/components/CategoryFilter.tsx` - Category filtering

### Pages

- `app/page.tsx` - Homepage with post listings
- `app/posts/[slug]/page.tsx` - Individual post page
- `app/category/[slug]/page.tsx` - Category archive page
- `app/about/page.tsx` - About page

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy Sanity Studio

```bash
npx sanity deploy
```

This will deploy your Sanity Studio to `your-project.sanity.studio`

## 📚 Project Structure

```
├── app/
│   ├── components/         # React components
│   ├── posts/[slug]/      # Individual post pages
│   ├── category/[slug]/   # Category pages
│   ├── about/             # About page
│   ├── studio/            # Sanity Studio
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── sanity/
│   ├── schemas/           # Sanity schema definitions
│   └── lib/              # Sanity client and utilities
├── sanity.config.ts       # Sanity configuration
├── next.config.mjs        # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── package.json           # Dependencies
```

## 🛠️ Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Sanity CMS**: Headless CMS for content management
- **Tailwind CSS**: Utility-first CSS framework
- **Portable Text**: Rich text format from Sanity
- **date-fns**: Date formatting utilities

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Feel free to fork this project and customize it for your own use!

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Blogging! 🎉**

