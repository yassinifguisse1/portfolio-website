export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
  image?: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-modern-web-applications-with-nextjs',
    title: 'Building Modern Web Applications with Next.js',
    description: 'Explore the power of Next.js 15 and React 19 for creating high-performance web applications with server-side rendering and modern React features.',
    content: `
# Building Modern Web Applications with Next.js

**For founders and development teams who want to ship production-ready web applications in 30 days**, Next.js 15 and React 19 provide the fastest path from idea to deployment. Having built and shipped applications like [DadOfSEO](https://dadofseo.com) and [Amseel Cars](https://amseelcars.com), I've seen firsthand how Next.js accelerates development while maintaining code quality.

Next.js has revolutionized how we build web applications. With the release of Next.js 15 and React 19, developers now have access to powerful features that make building scalable, performant applications easier than ever.

## SSR vs SSG: When to Use Each

Understanding when to use Server-Side Rendering (SSR) versus Static Site Generation (SSG) is crucial for optimal performance:

**Use SSR when:**
- Content changes frequently (dashboards, user-specific data)
- You need real-time data on every request
- SEO is important but content is dynamic

**Use SSG when:**
- Content is relatively static (blogs, documentation, landing pages)
- You want maximum performance and CDN caching
- Build-time data fetching is sufficient

\`\`\`tsx
// SSG Example
export async function generateStaticParams() {
  const posts = await fetchPosts()
  return posts.map((post) => ({ slug: post.slug }))
}
\`\`\`

## App Router & React Server Components in Next.js 15

The App Router introduced in Next.js 13+ is now the recommended approach. React Server Components (RSC) allow you to:

- Reduce JavaScript bundle size by keeping server logic on the server
- Improve initial page load performance
- Simplify data fetching patterns

\`\`\`tsx
// Server Component (default)
async function BlogPosts() {
  const posts = await fetchPosts() // Runs on server
  return posts.map(post => <PostCard key={post.id} post={post} />)
}

// Client Component (when needed)
'use client'
function InteractiveButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
\`\`\`

## Deploy to Vercel: CI/CD Setup

Deploying Next.js applications to Vercel is seamless with built-in CI/CD:

1. **Connect your repository** to Vercel
2. **Automatic deployments** on every push to main
3. **Preview deployments** for pull requests
4. **Environment variables** managed in the dashboard

For custom CI/CD, you can use GitHub Actions or similar tools to build and deploy.

## Performance & Caching Strategies

Next.js provides multiple caching layers:

- **Request Memoization**: Automatic deduplication of fetch requests
- **Data Cache**: Persistent cache for fetch requests
- **Full Route Cache**: Static rendering cache
- **Router Cache**: Client-side navigation cache

\`\`\`tsx
// Revalidate every hour
export const revalidate = 3600

// Or use on-demand revalidation
export async function GET() {
  revalidatePath('/blog')
  return Response.json({ revalidated: true })
}
\`\`\`

## Best Practices

1. **Use the App Router**: Next.js 13+ introduced the App Router, which provides better performance and developer experience
2. **Optimize Images**: Always use the Next.js Image component for better performance
3. **Leverage Server Components**: Use Server Components by default for better performance
4. **Implement Proper Caching**: Use Next.js caching strategies for optimal performance

## Frequently Asked Questions

### What's the difference between Pages Router and App Router?

The Pages Router is the original Next.js routing system, while the App Router (introduced in Next.js 13) uses React Server Components and provides better performance, improved data fetching, and a more intuitive file structure.

### Should I migrate from Pages Router to App Router?

If you're starting a new project, use the App Router. For existing projects, migration depends on your needs. The App Router offers better performance and developer experience, but migration requires refactoring.

### How do I handle authentication in Next.js?

Next.js works well with authentication libraries like NextAuth.js, Clerk, or Auth0. For server-side authentication, use middleware to protect routes.

### Can I use Next.js for e-commerce?

Absolutely. Next.js is excellent for e-commerce with features like static generation for product pages, server-side rendering for dynamic content, and API routes for checkout processes.

## Conclusion

Next.js continues to evolve, providing developers with the tools they need to build modern, performant web applications. Whether you're building a simple blog or a complex SaaS application like the ones I've shipped, Next.js has you covered.

**Ready to build your Next.js application?** [Book a 15-minute consultation call](/#contact) to discuss your project, or [view my services](/#services) to see how I can help you ship faster.
    `,
    author: 'Yassine Ifguisse',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'TypeScript', 'Web Development'],
  },
  {
    slug: 'optimizing-react-performance-tips',
    title: 'Optimizing React Performance: Essential Tips',
    description: 'Learn practical techniques to improve React application performance, from memoization to code splitting and beyond.',
    content: `
# Optimizing React Performance: Essential Tips

**For development teams who want to reduce bundle size by 40% and improve Time to Interactive (TTI) in 2 weeks**, these React performance optimization techniques have proven effective across multiple production applications, including the SaaS platforms I've built.

Performance is crucial for any React application. In this article, we'll explore practical techniques to optimize your React applications based on real-world experience shipping high-performance applications.

## Understanding React Performance

React is fast by default, but there are several strategies you can employ to make your applications even faster:

## React.memo(): When and How to Use It

React.memo() prevents unnecessary re-renders by memoizing components. Use it when:

- Component receives props that don't change often
- Rendering is expensive
- Component is used frequently in lists

\`\`\`tsx
const MyComponent = React.memo(({ name }) => {
  return <div>{name}</div>
}, (prevProps, nextProps) => {
  // Custom comparison function
  return prevProps.name === nextProps.name
})
\`\`\`

## useMemo and useCallback: Performance Hooks Explained

These hooks help prevent expensive calculations and function recreations:

\`\`\`tsx
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b)
}, [a, b])

// Memoize callback functions
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])
\`\`\`

**When to use:**
- useMemo: For expensive computations that depend on specific values
- useCallback: For functions passed as props to memoized components

## Code Splitting: Reduce Initial Bundle Size

Use dynamic imports to split your code and load components on demand:

\`\`\`tsx
// Lazy load heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false // If component doesn't need SSR
})

// Route-based code splitting
const Dashboard = lazy(() => import('./Dashboard'))
\`\`\`

## Virtual Scrolling: Handle Large Lists

For long lists, implement virtual scrolling to render only visible items:

\`\`\`tsx
import { useVirtualizer } from '@tanstack/react-virtual'

function VirtualList({ items }) {
  const parentRef = useRef()
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  })

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      {virtualizer.getVirtualItems().map(virtualItem => (
        <div key={virtualItem.key} style={{ height: virtualItem.size }}>
          {items[virtualItem.index]}
        </div>
      ))}
    </div>
  )
}
\`\`\`

## Performance Monitoring: Measure What Matters

Use React DevTools Profiler and Web Vitals to identify bottlenecks:

- **First Contentful Paint (FCP)**: Time to first content
- **Largest Contentful Paint (LCP)**: Time to largest content
- **Time to Interactive (TTI)**: When page becomes interactive
- **Total Blocking Time (TBT)**: Time blocked by long tasks

## Frequently Asked Questions

### Should I memoize everything?

No. Only memoize when you've identified a performance problem. Over-memoization can actually hurt performance due to comparison overhead.

### When should I use useMemo vs useCallback?

Use useMemo for values and useCallback for functions. Both prevent unnecessary recalculations, but useMemo returns a value while useCallback returns a function.

### How do I identify performance bottlenecks?

Use React DevTools Profiler to record renders and identify components that re-render unnecessarily. Also monitor Core Web Vitals in production.

### Is code splitting always beneficial?

Code splitting helps with initial load time but can increase navigation time. Balance based on your application's usage patterns.

## Conclusion

By implementing these techniques, you can significantly improve your React application's performance and provide a better user experience. These optimizations have helped me ship faster, more efficient applications.

**Need help optimizing your React application?** [Book a consultation call](/#contact) to discuss performance improvements, or [view my services](/#services) for custom React development.
    `,
    author: 'Yassine Ifguisse',
    date: '2025-01-10',
    readTime: '10 min read',
    category: 'React',
    tags: ['React', 'Performance', 'Optimization', 'JavaScript'],
  },
  {
    slug: 'typescript-best-practices-for-developers',
    title: 'TypeScript Best Practices for Modern Developers',
    description: 'Discover essential TypeScript patterns and practices that will help you write more maintainable and type-safe code.',
    content: `
# TypeScript Best Practices for Modern Developers

**For development teams who want to reduce runtime errors by 60% and improve code maintainability**, TypeScript provides the type safety needed for large-scale applications. Having used TypeScript across multiple production applications, including [DadOfSEO](https://dadofseo.com) and [iTA Groupe](https://www.itagroupe.com), I've learned which practices deliver the most value.

TypeScript has become the standard for building large-scale JavaScript applications. Here are some best practices to follow based on real-world experience:

## Type Safety First: Define Types Early

Always define types for your functions and components. This catches errors at compile time rather than runtime:

\`\`\`tsx
interface UserProps {
  name: string
  age: number
  email: string
}

const User: React.FC<UserProps> = ({ name, age, email }) => {
  return <div>{name} - {age}</div>
}
\`\`\`

## Use Strict Mode: Enable All Strict Checks

Enable strict mode in your tsconfig.json to catch more potential errors:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
\`\`\`

## Interfaces vs Types: When to Use Each

Use interfaces for object shapes and types for unions/primitives:

\`\`\`tsx
// Interface for object shapes (can be extended)
interface ApiResponse {
  data: User[]
  status: number
}

// Type for unions and primitives
type Status = 'loading' | 'success' | 'error'
type ID = string | number
\`\`\`

**Rule of thumb:** Use interfaces for objects you might extend, types for unions and computed types.

## Avoid Any Type: Use Unknown Instead

Never use \`any\` - use \`unknown\` instead when the type is truly unknown. This forces type checking:

\`\`\`tsx
function processData(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase()
  }
  if (typeof data === 'number') {
    return data.toString()
  }
  throw new Error('Unsupported data type')
}
\`\`\`

## Generic Types: Write Reusable Code

Use generics to create reusable, type-safe functions and components:

\`\`\`tsx
function identity<T>(arg: T): T {
  return arg
}

interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: 'John' },
  status: 200,
  message: 'Success'
}
\`\`\`

## Utility Types: Leverage Built-in Helpers

TypeScript provides utility types that save time:

\`\`\`tsx
// Make all properties optional
type PartialUser = Partial<User>

// Pick specific properties
type UserPreview = Pick<User, 'name' | 'email'>

// Omit specific properties
type UserWithoutId = Omit<User, 'id'>

// Make all properties readonly
type ImmutableUser = Readonly<User>
\`\`\`

## Frequently Asked Questions

### Should I use TypeScript for all projects?

For new projects, yes. For existing JavaScript projects, gradual migration is possible. Start with new files and gradually add types to existing code.

### What's the difference between interface and type?

Interfaces can be extended and merged, while types can represent unions, intersections, and computed types. For object shapes, interfaces are generally preferred.

### How do I handle third-party libraries without types?

Install @types packages (e.g., \`@types/react\`) or create your own type declarations in a \`types\` folder.

### Should I avoid 'any' completely?

Yes, use \`unknown\` instead. If you must use \`any\`, document why and consider it a temporary solution.

## Conclusion

Following these TypeScript best practices will help you write more maintainable, type-safe code that's easier to debug and refactor. These practices have helped me ship more reliable applications with fewer runtime errors.

**Need help implementing TypeScript in your project?** [Book a consultation call](/#contact) to discuss your TypeScript strategy, or [view my services](/#services) for TypeScript development support.
    `,
    author: 'Yassine Ifguisse',
    date: '2025-01-05',
    readTime: '9 min read',
    category: 'TypeScript',
    tags: ['TypeScript', 'Best Practices', 'Type Safety', 'Programming'],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getRelatedPosts(currentSlug: string, limit: number = 2): BlogPost[] {
  const currentPost = getBlogPost(currentSlug)
  if (!currentPost) return []

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => {
      // Find posts with matching tags or category
      const hasMatchingTag = post.tags.some((tag) => currentPost.tags.includes(tag))
      return hasMatchingTag || post.category === currentPost.category
    })
    .slice(0, limit)
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag))
}

