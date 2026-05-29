# Kami Codebook Graduation Presentation

This project is an interactive web-based presentation tool built with Next.js for the "Kami Codebook" Python graduation ceremony. It serves as a slideshow to celebrate the achievements of students (aged 9-13) who have completed the beginner Python course.

## Project Overview

- **Purpose:** Graduation ceremony presentation for "Kami Codebook" Python students.
- **Main Technologies:**
    - **Framework:** Next.js 16.2.6 (App Router)
    - **Library:** React 19.2.6
    - **Styling:** Tailwind CSS 4.3.0, Shadcn UI
    - **Graphics:** Three.js (used for interactive background effects like the `Ballpit`)
    - **Icons:** Lucide React
    - **Language:** JavaScript (JSX)

## Architecture

- **`app/`**: Contains the core Next.js routing and page logic.
    - `page.jsx`: The main entry point, managing slide state, keyboard navigation (arrow keys), and URL hash synchronization.
    - `layout.jsx`: Defines the global structure, including the Geist font and global styles.
- **`src/`**: Centralized data and styles.
    - `presentationData.js`: **Crucial File.** Contains all the text, slide definitions, and metadata for the presentation. Edit this file to change the content of the slides.
    - `styles.css`: Global styles, including slide transitions and component-specific styling.
- **`components/`**: Reusable UI components.
    - `Ballpit.jsx`: A complex Three.js component providing an interactive background with physics-based spheres.
    - `ui/`: Standard UI components (likely from Shadcn).
- **`lib/`**: Utility functions (e.g., `utils.js` for class merging).

## Key Commands

- `npm run dev`: Starts the development server at `http://localhost:3000`.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.

## Development Conventions

- **Data-Driven Content:** The presentation content is strictly separated from the display logic. Always update `src/presentationData.js` to modify slide content rather than editing `app/page.jsx` directly.
- **Slide Types:** The `app/page.jsx` uses a dynamic rendering pattern (`renderers` object). New slide types must be defined in `presentationData.js` and have a corresponding renderer component in `app/page.jsx`.
- **Interactivity:** The slideshow supports:
    - Arrow keys (Left/Right) for navigation.
    - URL hash sync (e.g., `#1`, `#2`) for deep linking to specific slides.
    - Progress bar at the top of the screen.

## Known TODOs (from codebase)

- [ ] Improve `platform` slide layout and formatting.
- [ ] Add feature to display subpoints in lists.
- [ ] Refine `topics` slide icons and rendering.
- [ ] Enhance `parents` slide with more specific support points and testimonials.
- [ ] Add icons to the `learning` journey steps.
