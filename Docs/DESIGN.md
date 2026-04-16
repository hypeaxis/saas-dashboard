# Design System Specification: The Architectural Minimalist

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Architect."** 

While inspired by the functional clarity of Notion and the precision of Linear, this system transcends the "SaaS-in-a-box" aesthetic. It treats the interface as a physical workspace crafted from premium materials. We move away from the rigid, boxed-in layouts of early web dashboards toward an editorial, high-end experience. 

The goal is **Sophisticated Reduction**. We achieve authority not through heavy lines or loud colors, but through intentional asymmetry, breathtaking white space, and a mastery of tonal depth. This design system feels "quiet" yet "expensive"—like a well-organized studio where the tools disappear to let the work shine.

---

## 2. Colors & Tonal Depth
This system moves beyond flat HEX codes. We use a palette built on Material Design principles to facilitate a "Light-on-Light" and "Dark-on-Dark" hierarchy.

### The Palette
- **Primary Focus:** `primary` (#0058be) and `primary_container` (#2170e4) drive action.
- **Surface Foundations:** `surface` (#faf8ff) and `surface_container` series (Lowest to Highest) form our structural layers.
- **Accents:** `tertiary` (#924700) provides a warm, editorial contrast to the cool primary blues.

### The "No-Line" Rule (Pragmatic)
Standard 1px borders should not be the default tool for hierarchy. **Prioritize tonal separation first; use borders selectively for dense data surfaces.**
*   **The Execution:** Prefer background shifts (`surface` tiers) for large layout regions. For high-information components (tables, chart cards, modal section splits), a low-contrast border is allowed to improve scanability.
*   **Border spec when used:** `border` token at reduced opacity (typically 20% to 40%), never full-strength outline for primary sectioning.

### The "Glass & Gradient" Rule
To inject "soul" into the UI, main CTAs and hero elements should utilize subtle linear gradients: `primary` → `primary_container`. For floating menus (Command Palettes, Popovers), use Glassmorphism:
*   **Formula:** `surface_container_lowest` + 80% opacity + 12px Backdrop Blur.

---

## 3. Typography: The Editorial Voice
We use **Inter** as our typographic engine, but we treat it with editorial intent. The hierarchy is wide, allowing for high-contrast headers that anchor the page.

| Level | Size | Weight | Role |
| :--- | :--- | :--- | :--- |
| **Display LG** | 3.5rem | 700 (Bold) | Hero statements / Data milestones |
| **Headline MD** | 1.75rem | 600 (Semi) | Page titles / Section anchors |
| **Title SM** | 1rem | 500 (Medium) | Card headers / List titles |
| **Body MD** | 0.875rem | 400 (Regular) | Primary interface text |
| **Label SM** | 0.6875rem | 600 (Bold) | Metadata / Overlines (All-caps) |

**Director's Note:** Use `label-sm` with 0.05em letter spacing for category tags to create a "premium utility" feel.

---

## 4. Elevation & Depth: Tonal Layering
We reject traditional drop shadows in favor of **Ambient Occlusion** and **Tonal Stacking**.

### The Layering Principle
Hierarchy is achieved by "stacking" surface tiers.
*   **Base:** `surface` (The desk).
*   **Navigation:** `surface_container_low` (Inlaid).
*   **Cards:** `surface_container_lowest` (Placed on top).
*   **Active Elements:** `surface_container_high` (Elevated).

### Ambient Shadows
Shadows must feel like natural light.
*   **Token:** `ambient-lift`
*   **Values:** 0px 4px 24px -2px
*   **Color:** `on_surface` at 4%–6% opacity. 
*   **Note:** Never use pure black (#000) for shadows; always tint with the surface color.

### The "Ghost Border" Fallback
If accessibility requires a container boundary, use a **Ghost Border**: `outline_variant` at 15% opacity. It should be felt, not seen.

---

## 5. Component Guidelines

### Buttons: The Tactile Interaction
*   **Primary:** `primary` fill, `on_primary` text. No border. Subtle 2px inner shadow on top to simulate a physical press.
*   **Secondary:** `surface_container_high` fill. No border.
*   **Tertiary:** Ghost style. No fill/border until hover.

### Cards & Lists: The White Space Rule
*   **Default:** Avoid heavy separators; rely on vertical spacing (16px to 24px) and tonal hover states.
*   **As-built exception:** Subtle row dividers may be used for table readability (`divide-border/40`) when data density is high.

### Inputs: The Inlaid Aesthetic
*   **Default State:** `surface_container_low` background with `sm` radius.
*   **Focus State:** ring in `primary` with strong contrast and no blur glow.

### The "Command Surface" (Special Component)
Inspired by Linear. A floating `display-md` or `display-sm` command bar using the Glassmorphism rule. This is the heart of the "Modern SaaS" experience—minimalist, keyboard-driven, and lightning-fast.

---

## 6. Do's and Don'ts

### Do
*   **Do** embrace asymmetry. In a 12-column grid, use an 8+4 or 7+5 split to create editorial tension.
*   **Do** use `surface_bright` to highlight "active" states in navigation.
*   **Do** allow content to breathe. If a section feels crowded, double the padding.

### Don't
*   **Don't** use high-contrast borders as the primary layout structure.
*   **Don't** use default Inter tracking. Tighten `display` levels (-0.02em) and loosen `label` levels (+0.05em).
*   **Don't** over-stack bordered cards when tonal nesting can communicate depth better.

## 7. Roundedness Scale
To maintain the professional "Architectural" feel, we use a disciplined radius system:
*   **Small (sm):** 0.25rem (Inputs, tooltips)
*   **Default:** 0.5rem (Standard cards, buttons)
*   **Large (lg):** 1rem (Main layout containers, modals)
*   **Full:** 9999px (Pills, badges)

---

## 8. As-Built Notes (2026-04-16)
Current implementation aligns with this system at token/typography level and applies these practical choices:
*   `surface-card`, `surface-panel`, and `cta-gradient` are first-class utilities across app shell and task flows.
*   Light borders are present in table header/footer, modal section boundaries, and analytics cards.
*   Analytics charts are rendered inside bordered cards to improve contrast and readability for chart axes and labels.