# Resume Builder

A fully local, privacy-first resume builder built with **Next.js 16**, **React 19**, and **TypeScript**. Create, edit, preview, and share professional resumes -- all without a server or database.

> **Your data never leaves your browser.** No server, no database, no tracking.

---

## Features

### Resume Management
- **Create** multiple resumes with default sample data
- **Edit** via a split-panel JSON builder (form left, live JSON preview right)
- **Duplicate** any resume with one click
- **Delete** with confirmation
- **Import** resume from a `.json` file
- **Export** resume as a `.json` file download

### Preview & Print
- **A4 paper preview** that matches print output exactly
- **Print / Save PDF** with optimized print styles
- Clean, professional layout with ATS-friendly formatting

### Public Sharing
- Share resumes via URL -- data is compressed and encoded directly in the link
- No server involved; the recipient's browser decodes the resume from the URL
- Copy Phone / Copy Email buttons on the shared view
- Uses [lz-string](https://github.com/pieroxy/lz-string) for URL-safe compression

### Template System
- Extensible template registry (strategy pattern)
- Currently ships with **Classic** template
- Adding a new template = creating one component + registering it
- Template selector on the preview page

### Privacy & Trust
- Dismissible privacy banner at the top
- Trust indicator in navigation bar
- Footer message on every page
- No analytics, no cookies, no external requests

---

## Project Structure

```
app/
  page.tsx                              -- Dashboard (resume list)
  layout.tsx                            -- Root layout + nav + footer
  globals.css                           -- Global styles + print styles
  types/
    resume.ts                           -- Shared TypeScript interfaces
  context/
    ResumeContext.tsx                    -- React Context for global state
  utils/
    storage.ts                          -- localStorage CRUD helpers
    sharing.ts                          -- URL encode/decode for sharing
  editor/
    page.tsx                            -- Editor route (Suspense wrapper)
    EditorContent.tsx                   -- Split-panel form + JSON preview
  preview/
    page.tsx                            -- Preview route (Suspense wrapper)
    PreviewContent.tsx                  -- A4 paper preview
  share/
    page.tsx                            -- Public share route
    ShareContent.tsx                    -- URL-decoded resume view
  templates/
    index.ts                            -- Template registry
    classic/
      ClassicTemplate.tsx               -- Classic resume template
  components/
    Header.tsx, Section.tsx, SkillsFilter.tsx, WorkExperience.tsx,
    WorkItem.tsx, BulletList.tsx, Education.tsx, Certifications.tsx,
    Projects.tsx, AdditionalInfo.tsx, Navigation.tsx, PrivacyBanner.tsx,
    PrintButton.tsx, CopyToClipboard.tsx, DocumentTitle.tsx,
    ScrollToTop.tsx, ViewCounter.tsx, KeyboardShortcuts.tsx
data/
  data.json                             -- Sample resume data
```

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000

### Production Build

```bash
npm run build
npm start
```

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | List all saved resumes with action buttons |
| `/editor?id=...` | Editor | Split-panel JSON builder with auto-save |
| `/preview?id=...` | Preview | A4 paper preview matching print output |
| `/share?d=...&t=...` | Public Share | URL-decoded resume for sharing |

---

## Tech Stack

- **Next.js 16** -- App Router, file-based routing, Server/Client Components
- **React 19** -- Hooks, Context API, Suspense
- **TypeScript** -- Shared interfaces for type safety
- **lz-string** -- URL-safe compression for public sharing
- **localStorage** -- All data stored locally in the browser

---

## How Public Sharing Works

Since there is no backend, resume data is encoded directly into the URL:

1. **Sender** clicks "Public Share Link" in the editor
2. `JSON.stringify(data)` converts the resume to a string
3. `lz-string` compresses it into a URL-safe format
4. URL is generated: `/share?d=<compressed>&t=classic`
5. **Recipient** opens the URL
6. The share page reads `?d=` from the URL
7. `lz-string` decompresses it back to JSON
8. The template renders the resume

No server stores or processes the data at any point.

---

## Adding a New Template

1. Create a folder: `app/templates/modern/`
2. Create `ModernTemplate.tsx` that accepts `{ data: ResumeData }` as props
3. Register it in `app/templates/index.ts` by adding to `TEMPLATES` and `TEMPLATE_OPTIONS`

No other code changes needed.

---

## Customization

### Update Sample Data
Edit `data/data.json` with your information.

### Modify Styles
Edit `app/globals.css` -- CSS custom properties control the theme:

```css
:root {
  --bg: #ffffff;
  --text: #222B38;
  --muted-text: #596375;
  --accent: #7B8AA5;
}
```

---

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel --prod
```

### Static Export

Add to `next.config.ts`:
```ts
const nextConfig = { output: 'export' };
```

Then `npm run build` and deploy the `out` folder.

---

## License

MIT