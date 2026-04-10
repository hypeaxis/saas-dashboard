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

### The "No-Line" Rule
Standard 1px borders are a crutch for poor hierarchy. **This design system prohibits 1px solid borders for sectioning.** 
*   **The Execution:** Boundaries must be defined by background shifts. For example, a `surface_container_low` sidebar should sit against a `surface` main content area. If a container needs to stand out, use a shift in tonal value rather than a stroke.

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
*   **Prohibition:** No divider lines between list items or card sections. 
*   **Separation:** Use 16px–24px of vertical white space or a subtle `surface_container` shift on hover to define rows.

### Inputs: The Inlaid Aesthetic
*   **Default State:** `surface_container_low` background with a `sm` (0.25rem) corner radius.
*   **Focus State:** 2px solid `primary`. No "glow." The transition should be instant and sharp.

### The "Command Surface" (Special Component)
Inspired by Linear. A floating `display-md` or `display-sm` command bar using the Glassmorphism rule. This is the heart of the "Modern SaaS" experience—minimalist, keyboard-driven, and lightning-fast.

---

## 6. Do's and Don'ts

### Do
*   **Do** embrace asymmetry. In a 12-column grid, use an 8+4 or 7+5 split to create editorial tension.
*   **Do** use `surface_bright` to highlight "active" states in navigation.
*   **Do** allow content to breathe. If a section feels crowded, double the padding.

### Don't
*   **Don't** use 100% opaque `outline` colors for borders.
*   **Don't** use default Inter tracking. Tighten `display` levels (-0.02em) and loosen `label` levels (+0.05em).
*   **Don't** use "Card-in-Card" layouts with borders. Use nested tonal shifts (e.g., a `surface_container_highest` card inside a `surface_container_low` section).

---

## 7. Roundedness Scale
To maintain the professional "Architectural" feel, we use a disciplined radius system:
*   **Small (sm):** 0.25rem (Inputs, tooltips)
*   **Default:** 0.5rem (Standard cards, buttons)
*   **Large (lg):** 1rem (Main layout containers, modals)
*   **Full:** 9999px (Pills, badges)