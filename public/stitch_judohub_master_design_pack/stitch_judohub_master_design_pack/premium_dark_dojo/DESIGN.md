---
name: Premium Dark Dojo
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#d0cdd0'
  on-tertiary: '#303032'
  tertiary-container: '#b4b2b4'
  on-tertiary-container: '#454547'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2e4'
  tertiary-fixed-dim: '#c8c6c8'
  on-tertiary-fixed: '#1b1b1d'
  on-tertiary-fixed-variant: '#474649'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  gutter: 16px
  card-gap: 12px
  touch-target-min: 48px
  max-width-desktop: 1200px
---

## Brand & Style

The brand personality is disciplined, prestigious, and cinematic. It is designed specifically for martial artists who value focus and technical mastery. The emotional response should be one of "calm intensity"—a digital dojo that removes the noise of traditional social apps to focus purely on the path of improvement.

The design style is a hybrid of **Minimalism** and **Glassmorphism**, rooted in Japanese aesthetic principles like *Ma* (negative space) and *Shibui* (simple, subtle beauty). High-quality cinematic photography is used as the primary storytelling tool, layered with functional, translucent surfaces that provide depth without clutter. The UI is specifically optimized for ADHD-friendly consumption, utilizing **Progressive Disclosure** to present information in bite-sized, digestible cards rather than overwhelming text walls.

## Colors

The palette is anchored in a "Deep Dojo" darkness. The primary background is a rich, soft black, while surface layers use muted graphite and charcoal to create subtle separation.

- **Primary Accent:** Gold/Amber (#D4AF37) is used exclusively for primary actions, achievement states, and brand-critical elements. It represents the "Gold Standard" of technique.
- **System Accents:** Success and progress states utilize the traditional Judo belt progression. 
- **Confidence Meter:** A specific gradient scale from Red to Green is reserved for self-assessment and mastery tracking.
- **Glass Effects:** Overlays use a 20% opacity white or primary tint with a 20px backdrop blur to maintain legibility over cinematic backgrounds.

## Typography

The typography strategy prioritizes "Scan-ability." Plus Jakarta Sans provides a strong, wide, and modern aesthetic for headlines that mimics the authoritative look of sports editorial. 

- **Headlines:** Use wide tracking and heavy weights. 
- **Body:** Inter provides a neutral, highly readable foundation for technical descriptions.
- **Labels:** Small caps and increased letter spacing are used for metadata (e.g., technique categories) to differentiate them from instructional body text.
- **ADHD Optimization:** Paragraphs should never exceed 3-4 lines. Use heavy weights for key terms within body text to aid rapid scanning.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a heavy emphasis on vertical rhythm. 

- **Mobile:** A single-column "Feed of Cards" layout. Horizontal scrolling is used for technique variations to keep the primary scroll path linear and focused.
- **Desktop/Tablet:** A 12-column grid. Technical details (Step Breakdowns) appear in a side-panel or secondary column to allow the video content to remain the primary focus.
- **Rhythm:** An 8px base unit drives all spacing. Large margins (24px) are used to provide breathing room and reduce cognitive load.
- **Tap Targets:** Every interactive element has a minimum height of 48px to ensure ease of use during active training sessions.

## Elevation & Depth

This design system uses **Tonal Layers** and **Ambient Shadows** to create a sense of focused hierarchy:

1.  **Level 0 (Base):** Deep Charcoal (#0F0F0F). The dojo floor.
2.  **Level 1 (Card):** Muted Graphite (#1A1A1A). Used for standard technique cards and navigation bars.
3.  **Level 2 (Active/Elevated):** Soft Black (#2C2C2E) with a subtle 1px border (#FFFFFF10). Used for focused items or modals.
4.  **Shadows:** Shadows are rarely used for "lifting" and instead used for "glow." High-mastery elements may have a faint Gold (#D4AF37) outer glow (20px blur, 10% opacity).

Depth is further reinforced through backdrop blurs (Glassmorphism) when navigating technique sub-menus, keeping the user contextually aware of their place in the "Syllabus."

## Shapes

The shape language is "Sophisticated Softness." While the brand is martial and strong, the corners are rounded to feel modern and accessible.

- **Cards:** Use a consistent 16px radius.
- **Buttons:** Use a 12px radius, creating a distinct look from the cards they sit within.
- **Progress Rings:** Use a circular stroke with rounded caps to represent the fluidity of movement.
- **Confidence Meter:** A pill-shaped track with a sliding circular indicator.

## Components

- **Technique Cards:** The core unit. Features a high-resolution image/GIF, a bold title, and a "Belt Tag" indicating the required grade.
- **Progress Rings:** Large, semi-transparent rings that fill with the Gold primary color as techniques within a module are mastered.
- **Confidence Meter:** A custom slider component. The track changes color (Red → Yellow → Green) as the user slides to indicate their self-perceived mastery.
- **Action Buttons:**
    - *Primary:* Solid Gold background with Black text.
    - *Secondary:* Ghost style with a 1px Gold border.
    - *Utility:* Translucent grey with white icons for secondary actions like "Save" or "Share."
- **Progressive Disclosure Triggers:** "Show Details" or "Step Breakdown" buttons use a downward chevron and a subtle background tint change on tap.
- **Belt Tags:** Small, pill-shaped indicators using the belt color palette to show technique difficulty.