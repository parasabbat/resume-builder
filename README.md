# Resume Generator

A simple, ATS-friendly resume template that renders data from a JSON file.

**Built with Vibe Coding** - This project was created using AI-assisted development with Claude Opus and Gemini 2.5 Pro.

## Features

- ATS-Compliant - Optimized for Applicant Tracking Systems
- Print-Ready - A4 page size with proper margins for PDF export
- Responsive - Works on all screen sizes
- Clean Design - Professional styling with Open Sans font
- Easy to Edit - Just update the JSON file
- Dark Mode - Automatic dark mode support

## Usage

1. Clone this repository
2. Edit `data.json` with your personal information
3. Open `index.html` in a browser (or use a local server)
4. Click "Print / Save PDF" to export your resume

### Running Locally

```bash
# Using Python
python -m http.server 8080

# Then open http://localhost:8080
```

## File Structure

```
resume/
├── index.html    # Main HTML template with JavaScript
├── style.css     # Stylesheet with print optimizations
├── data.json     # Your resume data (edit this!)
├── .gitignore    # Git ignore rules
└── README.md     # This file
```

## Customization

### Update Your Data

Edit `data.json` to include:
- **personalInfo** - Name, title, contact details
- **profileSummary** - Brief professional summary
- **skills** - Array of technical skills
- **workExperience** - Jobs with responsibilities & achievements
- **education** - Degrees and institutions
- **additionalInfo** - Languages and other info

### Styling

Modify CSS variables in `style.css` `:root` to customize:
- Colors
- Font sizes
- Spacing
- Page width

## ATS Tips

This template is designed to be ATS-friendly:
- Plain text structure
- Standard section headings (SKILLS, WORK EXPERIENCE, EDUCATION)
- No complex layouts or graphics in print mode
- Comma-separated skills for keyword parsing

## Credits

Built using Vibe Coding methodology:
- Claude Opus (Anthropic) - AI pair programming
- Gemini 2.5 Pro (Google) - AI assistance

## License

MIT License - Feel free to use and modify for your own resume!
