# The Profile Project - Gidy.ai Challenge

Welcome to the full-stack replica of the Gidy.ai Profile Page! This application is designed to be highly responsive, modern, and beautifully crafted down to the final pixel.

## Links

- **Live Demo**: [https://profile-project-gidy.vercel.app](#) *(Placeholder - ready for Vercel deployment)*
- **Source Code**: [https://github.com/johndoe/profile-project-gidy](#) *(Placeholder)*

## Tech Stack Overview

This application is built entirely on modern web technologies ensuring "Code Quality", modularity, and smooth user experience:

- **Frontend & Framework**: **Next.js 14** (App Router) with **React 18** and **TypeScript** for strong type-safety.
- **Styling**: **Vanilla CSS Modules** and globally scaled CSS Variables. I eschewed TailwindCSS in favor of Vanilla CSS to maintain maximal control and demonstrate core CSS capability (including custom responsive grid layouts, hover states, and dynamic CSS variable theming).
- **Backend**: **Next.js Route Handlers** (`app/api/...`) providing a RESTful API.
- **Database ORM**: **Prisma** configured with **SQLite** for rapid iteration and zero-config local setup.
- **Animations**: **Framer Motion** for polished, 60fps micro-animations that make the page feel alive.
- **Icons**: **Lucide-react** for sharp, scalable vector icons.

## Setup Instructions

Want to run this locally? It's incredibly simple since SQLite doesn't require Docker or external credentials:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/johndoe/profile-project-gidy.git
   cd profile-project-gidy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Initialize the Database & Seed data**:
   This project uses a file-based SQLite database (`dev.db`). 
   Run the following commands to push the schema and create the default profile:
   ```bash
   npx prisma db push
   npx prisma generate
   node seed.js
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **View the Application**:
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can directly edit the profile via the **"Edit Profile"** button!

---

## The "Innovation" Phase

While cloning the baseline requirements, I aimed to deliver product upgrades that provide tangible value to users sharing their online portfolios or professional footprints. I implemented **two primary innovations**:

### 1. Interactive Work Timeline
A static list of job histories is extremely dry. I transformed the standard "Work Experience" block into an **Interactive Work Timeline**. Using **Framer Motion**, each experience item dynamically animates into view as the user scrolls, visually connecting their career journey along a rendered timeline axis (`::before` psuedo-elements and absolute positioning). This helps recruiters process a candidate's journey spatially and interactively, vastly improving user engagement metrics.

### 2. Gamified "Skill Endorsements" System
Inspired by LinkedIn, I introduced a mini-social mechanic to the profile interface. Instead of just listing static skills, visitors can actively **Endorse** a skill simply by clicking on the skill pill badge. This executes a fast optimistic UI update combined with a server-side increment call, allowing the profile to dynamically reflect community validation.

*(Bonus: A fully persistent Dark Mode toggle is available in the top right, hooking directly into the OS's system preferences via `next-themes`!)*
