<h3 align="center">Design Guidelines</h3>

## Theme

General theme: Cyberpunk

Some characteristics we have found other cyberpunk themed sites to have: 

- Futuristic
- Cut edges on cards
- Corner borders on cards
- Subtle grids
- Neon pink/blue accent colors
- Dark background
- Glitch effects
- Blocky fonts
- Uppercase headings with tight letter spacing
- Cards and headings detailed using brackets, numbering etc.


## Inspiration sites

- [James Warner](https://jmswrnr.com/)
- [Frontribe](https://www.behance.net/gallery/157115257/Frontribe?tracking_source=search_projects%7Ccyberpunk+website+designhttps://www.behance.net/gallery/157115257/Frontribe?tracking_source=search_projects%7Ccyberpunk+website+design)
- [Komplett.no](https://komplett.no/)
- [Maxgaming](https://maxgaming.no/)
- [Glitch Effect](https://codepen.io/mattgrosswork/pen/VwprebG)


## Color palette

All of these colors are defined in the [TailwindCSS config file](../apps/storefront/tailwind.config.cjs). 
We have named these colors with color-agnostic names so that they can potentially be swapped out for other colors in the future. 

Each of the colors have shades the shades: `50, 100, 200, 300, 400, 500, 600, 700, 800, 900`

As the theme is cyberpunk, we typically use the darker shades of the base color.

<p align="center"><strong>Base (background, foreground, borders etc)</strong></p>

<div align="center">

![#fafafa](https://placehold.co/64x64/fafafa/fafafa.png)
![#f4f4f5](https://placehold.co/64x64/f4f4f5/f4f4f5.png)
![#e4e4e7](https://placehold.co/64x64/e4e4e7/e4e4e7.png)
![#d4d4d8](https://placehold.co/64x64/d4d4d8/d4d4d8.png)
![#a1a1aa](https://placehold.co/64x64/a1a1aa/a1a1aa.png)
![#71717a](https://placehold.co/64x64/71717a/71717a.png)
![#52525b](https://placehold.co/64x64/52525b/52525b.png)
![#3f3f46](https://placehold.co/64x64/3f3f46/3f3f46.png)
![#27272a](https://placehold.co/64x64/27272a/27272a.png)
![#18181b](https://placehold.co/64x64/18181b/18181b.png)

</div>

<p align="center"><strong>Primary accent color</strong></p>

<div align="center">

![#D7FFFF](https://placehold.co/64x64/D7FFFF/D7FFFF.png)
![#C2FFFF](https://placehold.co/64x64/C2FFFF/C2FFFF.png)
![#99FFFF](https://placehold.co/64x64/99FFFF/99FFFF.png)
![#71FFFF](https://placehold.co/64x64/71FFFF/71FFFF.png)
![#48FFFF](https://placehold.co/64x64/48FFFF/48FFFF.png)
![#1FFFFF](https://placehold.co/64x64/1FFFFF/1FFFFF.png)
![#00E6E6](https://placehold.co/64x64/00E6E6/00E6E6.png)
![#00AEAE](https://placehold.co/64x64/00AEAE/00AEAE.png)
![#007676](https://placehold.co/64x64/007676/007676.png)
![#003E3E](https://placehold.co/64x64/003E3E/003E3E.png)

</div>

<p align="center"><strong>Secondary accent color</strong></p>

<div align="center">

![#FED7F7](https://placehold.co/64x64/FED7F7/FED7F7.png)
![#FDC3F3](https://placehold.co/64x64/FDC3F3/FDC3F3.png)
![#FB9CEB](https://placehold.co/64x64/FB9CEB/FB9CEB.png)
![#FA75E4](https://placehold.co/64x64/FA75E4/FA75E4.png)
![#F84DDC](https://placehold.co/64x64/F84DDC/F84DDC.png)
![#F726D4](https://placehold.co/64x64/F726D4/F726D4.png)
![#DD08B9](https://placehold.co/64x64/DD08B9/DD08B9.png)
![#A7068C](https://placehold.co/64x64/A7068C/A7068C.png)
![#71045E](https://placehold.co/64x64/71045E/71045E.png)
![#3A0231](https://placehold.co/64x64/3A0231/3A0231.png)

</div>


## Typography

Title/heading font: [Rajdhani](https://fonts.google.com/specimen/Rajdhani)

The title font can be used through the utility class `font-title`.


Body font: [Roboto Condensed](https://fonts.google.com/specimen/Roboto+Condensed)

The body font is the default font configured in the project.


## Spacing

The spacing is derived from the TailwindCSS defaults, which holds a set of global spacing utilities that we strive to use. 

Their default spacing can be found in their [documentation](https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale).
