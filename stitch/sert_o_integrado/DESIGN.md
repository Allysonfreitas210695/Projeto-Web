# The Design System: Academic Excellence Reimagined

## 1. Overview & Creative North Star: "The Digital Curator"

This design system moves away from the rigid, "form-based" appearance of traditional academic portals. Our Creative North Star is **"The Digital Curator"**—a philosophy that treats institutional data as a high-end editorial publication.

Instead of overwhelming users with dense grids, we use intentional white space, sophisticated tonal shifts, and a "Modern Institutional" aesthetic. We break the "template" look through:

- **Asymmetric Breathing Room:** Large headers offset against compact data visualizations.
- **Tonal Depth:** Replacing harsh borders with soft, layered surfaces.
- **Authoritative Scale:** High-contrast typography that mirrors prestige academic journals.

---

## 2. Colors: Tonal Authority

The palette is rooted in the "UFERSA Green" (`primary`) and "Deep Academic Blue" (`secondary`), balanced by a "Golden Scholarly Accent" (`tertiary`).

### The "No-Line" Rule

**Explicit Instruction:** Traditional 1px borders are prohibited for sectioning. Structural boundaries must be defined solely through background color shifts or tonal transitions.

- **Surface:** Use `surface` (#f7f9ff) for the base canvas.
- **Nesting:** Place `surface-container-low` (#f1f4fa) for secondary content blocks.
- **Elevation:** Use `surface-container-highest` (#dfe3e8) for the most prominent interactive cards.

### The "Glass & Gradient" Rule

To elevate the UI beyond standard Material Design:

- **Floating Navigation:** Use `surface` with a 80% opacity and a `20px` backdrop-blur for top navigation bars.
- **Soulful Gradients:** For primary CTAs and Hero backgrounds, apply a subtle linear gradient from `primary` (#00502e) to `primary_container` (#006b3f) at a 135-degree angle.

---

## 3. Typography: The Editorial Voice

We utilize a pairing of **Manrope** for impact and **Inter** for utility.

- **Display & Headlines (Manrope):** These are our "Voice of Authority." `display-lg` (3.5rem) should be used sparingly for landing pages, while `headline-sm` (1.5rem) provides clear section headers.
- **Title & Body (Inter):** The "Workhorse." `title-md` (1.125rem) is the standard for card headers. `body-md` (0.875rem) is optimized for readability in dense functional systems.
- **Label (Inter):** Used for micro-copy and metadata. Always in `label-md` or `label-sm` to maintain a clean, organized aesthetic.

---

## 4. Elevation & Depth: Layering Principle

We reject traditional shadows in favor of **Tonal Layering**.

- **The Stack:**
  1.  Base: `surface`
  2.  Section: `surface-container-low`
  3.  Card/Element: `surface-container-lowest` (#ffffff)
- **Ambient Shadows:** If an element must "float" (e.g., a modal), use a shadow with a 40px blur, 0% spread, and 6% opacity using the `on_surface` color.
- **The "Ghost Border" Fallback:** For high-density data tables where separation is critical, use the `outline_variant` (#bec9bf) at **15% opacity**. Never use 100% opaque lines.

---

## 5. Components: Functional Elegance

### Buttons

- **Primary:** Gradient of `primary` to `primary_container`. `xl` (0.75rem) roundedness. No border.
- **Secondary:** `secondary` text on a `secondary_container` background.
- **Tertiary:** No background. `primary` text with a subtle `surface-container-high` hover state.

### Input Fields

- **Style:** Filled style using `surface-container-high`.
- **Indicator:** Instead of a full border, use a 2px bottom-accent of `primary` that expands from the center on focus.
- **Errors:** Use `error` (#ba1a1a) text with the container shifting to `error_container`.

### Unified Functional System Cards

- **Rule:** Forbid divider lines.
- **Structure:** Use vertical white space (32px) to separate content sections within cards. Use `surface-container-lowest` as the card base to "pop" against the `surface-container-low` page background.

### Custom Component: The "Academic Status" Chip

- For student or system statuses, use `tertiary_fixed` (#ffdea2) backgrounds with `on_tertiary_fixed` (#261900) text to provide high-contrast, prestigious-looking alerts that don't rely on "stoplight" red/green.

---

## 6. Do's and Don'ts

### Do:

- **Do** use `primary_fixed` for subtle background highlights behind important icons.
- **Do** maintain a minimum of 24px padding on all container elements to ensure "institutional breathing room."
- **Do** use `inverse_surface` for dark-mode-like "Quick Action" bars to create high-contrast focal points.

### Don't:

- **Don't** use pure black (#000000) for text. Always use `on_surface` (#181c20).
- **Don't** use standard "drop shadows" on buttons; let the color and gradient define the clickability.
- **Don't** use more than two font weights in a single component. Use size and color (`on_surface_variant`) to create hierarchy instead.

---

## 7. Accessibility Focus

This system is designed for a diverse demographic.

- **Contrast:** All `primary` and `secondary` pairings against `surface` meet WCAG AA standards.
- **Touch Targets:** All interactive elements (chips, buttons, inputs) maintain a minimum 44px height.
- **Visual Cues:** Error states always include an icon in addition to the `error` color to support color-blind users.
