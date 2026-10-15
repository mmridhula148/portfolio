# MRIDHULA M — Personal Portfolio Website

A personal portfolio website created for **MRIDHULA M**, an aspiring AI & Data Science professional. Built with modern, semantic HTML5, vanilla CSS3 design systems, and modular JavaScript with responsive aesthetics.

---

## 🚀 Live Preview & Quick Start

1. Open a terminal inside the project directory:
   ```bash
   cd c:\Users\user\Desktop\port
   ```
2. Start any local static server (for example, Python's built-in HTTP server):
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```
   *(Or simply double-click `index.html` to open it directly in any modern browser!)*

---

## 🎨 Design System & Aesthetic Highlights

- **Color Palette:**
  - Deep Navy / Cyber Space background: `#070b14` and `#0b1120`
  - Vibrant Violet / Purple: `#8b5cf6` and `#a855f7`
  - Electric Blue: `#3b82f6` and `#2563eb`
  - Cyber Cyan Accents: `#06b6d4` and `#38bdf8`
  - Metallic Platinum / Silver: `#f1f5f9`, `#cbd5e1`, and `#94a3b8` (NPTEL Silver Achievement)
- **Glassmorphism:** Frosted glass effect (`backdrop-filter: blur(16px)`), subtle translucent borders, and glowing edges on hover.
- **Micro-Animations:**
  - Interactive Canvas particle network that responds gently to cursor movement.
  - Glowing concentric cyber rings around the initials avatar (**MM**).
  - Metallic shimmer highlight on the NPTEL Elite + Silver card.
  - Smooth animated counter for the **8.6 CGPA** distinction badge.
  - Reveal-on-scroll animations using the `IntersectionObserver` API.

---

## 📁 File Structure

```
c:/Users/user/Desktop/port/
│
├── index.html               # Semantic HTML5 page with structured sections & accessibility
├── style.css                # Vanilla CSS with tokens, glassmorphism, responsive grid & animations
├── script.js                # Interaction engine (canvas, scroll spy, modal, toast, counter)
├── MRIDHULA M resume.pdf    # Official resume PDF document for viewing & downloading
└── README.md                # Documentation & customization guide
```

---

## 📋 Portfolio Sections Breakdown

### 1. Hero Section
- **Name:** MRIDHULA M
- **Role:** Aspiring AI & Data Science Professional
- **Bio:** Student specializing in Artificial Intelligence and Data Science at Rathinam Global University, passionate about Python programming, data analysis, and machine learning.
- **Buttons:**
  - `View My Resume` (opens interactive in-browser resume viewer modal)
  - `Explore My Skills` (smooth scrolls to `#skills`)
  - `Contact Me` (smooth scrolls to `#contact`)
- **Initials Avatar:** High-tech concentric orbital rings with glowing **MM** core and quick metrics pills (8.6 CGPA, NPTEL Elite Silver, Python & SQL).

### 2. About Me
- Educational and career focus in AI & Data Science.
- Authentic career objective and vision for learning and contributing to industry teams.
- Multilingual fluency tags: **English**, **Tamil**, **Hindi**, **Malayalam**.
- Quick stat cards: Specialization, Distinction, Foundation, and Collaboration.

### 3. Education
- **Degree:** Bachelor of Science in Computer Science (AI & DS)
- **Institution:** Rathinam Global Deemed to be University, Coimbatore
- **Prominent Score:** Animated **8.6 CGPA** circular badge with distinction label.
- **Key Coursework:** Artificial Intelligence, Data Science, Data Structures in C, DBMS (SQL), Python for Scientific Computing, Machine Learning Fundamentals.

### 4. Technical Skills
Organized into clean categories with custom icons and tags (no misleading percentages):
- **Programming Languages:** Python, SQL, C
- **Technical Skills:** Machine Learning, Microsoft Excel, Data Analysis
- **Soft Skills:** Problem-Solving, Team Collaboration, Communication

### 5. Honors & Achievements
- **NPTEL Elite + Silver Achievement:**
  - Dedicated metallic silver card with subtle platinum glow, medal icon, and verification badge.
  - Highlighting national-level benchmark and proctored examination success.

### 6. Certifications
- **Understanding Incubation and Entrepreneurship** — NPTEL
- **Python for Data Science** — Coursera
- **Data Structure in C**
- **Data Analysis with Python**

### 7. Featured Projects (Honest Empty State & Future Ready)
- **Empty State:** Honest **"Projects Coming Soon"** message detailing active development of practical AI and Data Science projects.
- **Modular Templates:** Pre-designed blueprint cards ready to be updated with project descriptions, tech stacks, screenshots, live demos, and GitHub links.

### 8. Contact Section & Direct Connection
- **Email:** `mmridhula148@gmail.com` (with one-click clipboard copy button)
- **Phone:** `+91 8056152069` (with one-click clipboard copy button)
- **LinkedIn:** `linkedin.com/in/m-mridhula-5809a5377` (direct clickable profile link)
- **Location:** Coimbatore, Tamil Nadu, India
- **Interactive Form:** Pre-populates formatted email dispatch.

### 9. Embedded Resume Modal
- Click **"View My Resume"** from anywhere on the page to open an in-browser PDF viewer for `MRIDHULA M resume.pdf` with a direct download button.

---

## 🛠️ How to Add Real Projects in the Future

When you are ready to add your completed projects, open `index.html`, locate `<section class="section projects-section" id="projects">`, and add a project card using this reusable template:

```html
<div class="project-card glass-card">
  <div class="project-header">
    <span class="status-chip completed">Completed</span>
    <span class="project-cat">Machine Learning</span>
  </div>
  <h4 class="project-title">Your Project Name</h4>
  <p class="project-desc">A brief 2-3 sentence overview of what problem your project solves and what dataset or model was used.</p>
  
  <div class="project-tech-tags">
    <span class="tag-mini">Python</span>
    <span class="tag-mini">Pandas</span>
    <span class="tag-mini">Scikit-Learn</span>
  </div>

  <div class="project-links">
    <a href="https://github.com/your-username/repo" target="_blank" class="btn btn-secondary btn-sm">GitHub</a>
    <a href="https://your-demo-url.com" target="_blank" class="btn btn-primary btn-sm">Live Demo</a>
  </div>
</div>
```

---

## 📱 Browser & Device Compatibility
- Tested and verified for desktop (1920x1080, 1440x900, 1366x768), laptops, tablets (iPad/Android), and smartphones (iPhone/Galaxy).
- Built with vanilla web standards — no bloated frameworks or heavy third-party runtime dependencies.
