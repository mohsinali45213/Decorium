---
name: Architectural Minimalist
colors:
  surface: '#fdf8f8'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e6'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#444748'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dddddd'
  on-secondary-container: '#606161'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1b'
  on-tertiary-container: '#838483'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e2e3e1'
  tertiary-fixed-dim: '#c6c7c5'
  on-tertiary-fixed: '#1a1c1b'
  on-tertiary-fixed-variant: '#454746'
  background: '#fdf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Raleway
    fontSize: 80px
    fontWeight: '400'
    lineHeight: 90px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Raleway
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 52px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Raleway
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
  headline-md:
    fontFamily: Raleway
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.15em
  nav-link:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 24px
  section-gap: 128px
---

## Brand & Style
The design system is rooted in the precision of modern architecture and the refined poise of high-end editorial publishing. It targets a discerning audience that values restraint, intentionality, and the luxury of negative space.

The visual language follows a **Minimalist** and **Editorial** direction with a subtle **Technical** edge. It prioritizes skeletal structure over decoration, utilizing heavy whitespace to allow product photography to serve as the primary visual driver. The interface should evoke a sense of quiet confidence, characterized by razor-sharp alignment, thin strokes, and a rhythmic use of scale that mirrors a curated gallery experience.

## Colors
This design system employs a strictly controlled monochromatic palette to maintain an atmosphere of architectural purity.

- **Primary (#111111):** Used for all high-contrast elements, including primary typography, iconography, and structural dividers.
- **Secondary (#E5E5E5):** Reserved for hair-line borders, inactive states, and subtle structural grids.
- **Tertiary (#F8F8F6):** A "warm bone" white used exclusively for large-surface hovers and secondary background containers to provide soft depth without breaking the minimalist aesthetic.
- **Background (#FFFFFF):** Pure white serves as the canvas, ensuring maximum light and clarity.

## Typography
The typographic hierarchy creates a tension between the sophisticated, geometric elegance of the headlines and the functional clarity of the sans-serif body text.

- **Headlines:** Use the geometric sans-serif font (Raleway) for all large-scale copy. This provides a high-end editorial feel that is slightly softer and more human-centric than a monospace, while maintaining structural rigor.
- **UI & Navigation:** Use the sans-serif font (Hanken Grotesk). For labels and navigation, utilize uppercase transformations and increased letter-spacing to improve legibility and convey a modern, technical architectural quality.
- **Body Text:** Maintain generous line heights (1.6x to 1.8x) to preserve the "breathable" feel of the layouts.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop, centered within the viewport to mimic the margins of a high-end coffee table book.

- **Grid:** Use a 12-column grid for desktop with 24px gutters. For mobile, transition to a 4-column grid.
- **Rhythm:** Spacing follows an 8px base unit. To achieve an "architectural" feel, prioritize large vertical gaps (section-gap) between distinct content blocks to enforce a slow, deliberate scrolling pace.
- **Alignment:** Use asymmetrical layouts where white space occupies at least one-third of the horizontal plane to emphasize the premium nature of the products.

## Elevation & Depth
In alignment with the architectural theme, this design system rejects traditional drop shadows. Depth is communicated through **Tonal Layers** and **Low-contrast Outlines**.

- **Stacking:** Use the pure white background as the base. Use the tertiary "bone" color (#F8F8F6) for slight elevation changes or hover states.
- **Borders:** Define boundaries with 1px solid lines using the secondary color (#E5E5E5). These lines should feel like technical drafting marks—precise and thin.
- **Glassmorphism:** Use only for mobile navigation overlays, employing a high-intensity blur (20px+) with 95% opacity white to maintain a "frosted marble" effect.

## Shapes
The shape language is **Rounded**, softening the geometric typography to ensure the interface remains sophisticated yet accessible. To balance the structured feel of the design, all UI elements—including buttons, input fields, and image containers—feature a 0.5rem (8px) corner radius. This choice introduces a sense of contemporary industrial design, where precision meets tactile comfort.

## Components
- **Buttons:** Primary buttons are solid #111111 with white uppercase text. Secondary buttons are 1px outlines. All buttons feature 8px rounded corners. Hover states should trigger a subtle color swap or a slight shift in opacity (0.8).
- **Input Fields:** Minimalist design using a 1px #E5E5E5 border and 8px rounded corners. On focus, the border transitions to #111111. Labels are positioned above the line in `label-caps` style.
- **Cards:** Product cards utilize 8px rounded corners for image containers. The image should be the focus, followed by a headline font title and a small sans-serif price. Use a 1:1 or 4:5 aspect ratio for images to maintain consistent vertical rhythm.
- **Chips/Tags:** Small, rectangular boxes with 8px rounded corners and 1px #E5E5E5 borders. Text is always `label-caps`.
- **Navigation:** A minimal top bar with high horizontal padding. Navigation links should use `nav-link` styling with a subtle underline appearing on hover.
- **Dividers:** Use horizontal and vertical 1px lines (#E5E5E5) to separate logical sections, mimicking a grid-based architectural layout.