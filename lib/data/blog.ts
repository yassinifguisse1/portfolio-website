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

Next.js has revolutionized how we build web applications. With the release of Next.js 15 and React 19, developers now have access to powerful features that make building scalable, performant applications easier than ever.

## Why Next.js?

Next.js provides a comprehensive framework for building React applications with:

- **Server-Side Rendering (SSR)**: Improved SEO and initial load times
- **Static Site Generation (SSG)**: Pre-rendered pages for optimal performance
- **API Routes**: Built-in API endpoints for backend functionality
- **Image Optimization**: Automatic image optimization and lazy loading
- **TypeScript Support**: First-class TypeScript support out of the box

## Getting Started

To start a new Next.js project, simply run:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

This will set up a new Next.js project with all the necessary configurations.

## Best Practices

1. **Use the App Router**: Next.js 13+ introduced the App Router, which provides better performance and developer experience
2. **Optimize Images**: Always use the Next.js Image component for better performance
3. **Leverage Server Components**: Use Server Components by default for better performance
4. **Implement Proper Caching**: Use Next.js caching strategies for optimal performance

## Conclusion

Next.js continues to evolve, providing developers with the tools they need to build modern, performant web applications. Whether you're building a simple blog or a complex SaaS application, Next.js has you covered.
    `,
    author: 'Yassine Ifguisse',
    date: '2025-01-15',
    readTime: '5 min read',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'TypeScript', 'Web Development'],
  },
  {
    slug: 'optimizing-react-performance-tips',
    title: 'Optimizing React Performance: Essential Tips',
    description: 'Learn practical techniques to improve React application performance, from memoization to code splitting and beyond.',
    content: `
# Optimizing React Performance: Essential Tips

Performance is crucial for any React application. In this article, we'll explore practical techniques to optimize your React applications.

## Understanding React Performance

React is fast by default, but there are several strategies you can employ to make your applications even faster:

### 1. Use React.memo()

React.memo() prevents unnecessary re-renders by memoizing components:

\`\`\`tsx
const MyComponent = React.memo(({ name }) => {
  return <div>{name}</div>
})
\`\`\`

### 2. Implement useMemo and useCallback

These hooks help prevent expensive calculations and function recreations:

\`\`\`tsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b)
}, [a, b])

const handleClick = useCallback(() => {
  doSomething(id)
}, [id])
\`\`\`

### 3. Code Splitting

Use dynamic imports to split your code:

\`\`\`tsx
const HeavyComponent = dynamic(() => import('./HeavyComponent'))
\`\`\`

### 4. Virtual Scrolling

For long lists, implement virtual scrolling to render only visible items.

## Conclusion

By implementing these techniques, you can significantly improve your React application's performance and provide a better user experience.
    `,
    author: 'Yassine Ifguisse',
    date: '2025-01-10',
    readTime: '7 min read',
    category: 'React',
    tags: ['React', 'Performance', 'Optimization', 'JavaScript'],
  },
  {
    slug: 'typescript-best-practices-for-developers',
    title: 'TypeScript Best Practices for Modern Developers',
    description: 'Discover essential TypeScript patterns and practices that will help you write more maintainable and type-safe code.',
    content: `
# TypeScript Best Practices for Modern Developers

TypeScript has become the standard for building large-scale JavaScript applications. Here are some best practices to follow:

## Type Safety First

Always define types for your functions and components:

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

## Use Strict Mode

Enable strict mode in your tsconfig.json:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

## Prefer Interfaces for Objects

Use interfaces for object shapes and types for unions/primitives:

\`\`\`tsx
interface ApiResponse {
  data: User[]
  status: number
}

type Status = 'loading' | 'success' | 'error'
\`\`\`

## Avoid Any Type

Never use \`any\` - use \`unknown\` instead when the type is truly unknown:

\`\`\`tsx
function processData(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase()
  }
}
\`\`\`

## Conclusion

Following these TypeScript best practices will help you write more maintainable, type-safe code that's easier to debug and refactor.
    `,
    author: 'Yassine Ifguisse',
    date: '2025-01-05',
    readTime: '6 min read',
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

