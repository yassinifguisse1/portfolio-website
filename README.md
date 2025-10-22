# Yassine Ifguisse - Portfolio Website

A modern, shader-powered portfolio website showcasing my work as a Software Developer & Computer Engineering Graduate.

## 🚀 Live Demo

[View Portfolio](https://your-portfolio-url.com) <!-- Replace with your actual domain -->

## ✨ Features

- **WebGL Shaders**: Dynamic background effects using shaders library
- **Smooth Animations**: GSAP-powered animations and transitions
- **Responsive Design**: Optimized for all devices and screen sizes
- **Interactive Elements**: Custom cursor, magnetic buttons, and hover effects
- **Contact Form**: Functional contact form with Resend email integration
- **Modern Tech Stack**: Built with Next.js 15, React 19, and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components
- **GSAP** - Animation library
- **shaders** - WebGL shader effects

### Backend & Services
- **Resend** - Email service for contact form
- **Vercel** - Deployment platform
- **Supabase** - Database (for projects)
- **Stripe** - Payment processing (for projects)

## 📁 Project Structure

```
├── app/
│   ├── api/contact/          # Contact form API
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── sections/             # Page sections
│   │   ├── about-section.tsx
│   │   ├── contact-section.tsx
│   │   ├── services-section.tsx
│   │   └── work-section.tsx
│   ├── ui/                   # Reusable UI components
│   ├── custom-cursor.tsx     # Custom cursor component
│   ├── grain-overlay.tsx     # Texture overlay
│   └── magnetic-button.tsx   # Interactive button
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions
└── public/                   # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yassinifguisse1/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your environment variables:
   ```env
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 Contact Form Setup

The contact form uses Resend for email delivery. To set it up:

1. **Get Resend API Key**
   - Sign up at [resend.com](https://resend.com)
   - Create an API key
   - Add it to your `.env.local` file

2. **Update Email Address**
   - Edit `app/api/contact/route.ts`
   - Change the `to` field to your email address

## 🎨 Customization

### Personal Information
- Update `app/page.tsx` for hero section
- Modify `components/sections/about-section.tsx` for your story
- Edit `components/sections/work-section.tsx` for your projects
- Customize `components/sections/services-section.tsx` for your services

### Styling
- Colors: Edit CSS variables in `app/globals.css`
- Fonts: Update font imports in `app/layout.tsx`
- Animations: Modify GSAP animations in components

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Build command: `npm run build`
- **Railway**: Add `package.json` scripts
- **Self-hosted**: Use `npm run build` and serve the `out` folder

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

**Yassine Ifguisse**
- Email: yassinifguisse100@gmail.com
- LinkedIn: [yassineifguisse](https://www.linkedin.com/in/yassineifguisse/)
- GitHub: [yassinifguisse1](https://github.com/yassinifguisse1)
- Location: Warsaw, Poland

---

⭐ Star this repository if you found it helpful!
