# About Page - Side-by-Side Layout with Portfolio Categories

## Overview
Successfully restructured the About page to display portfolio categories on the **right side** in a sticky sidebar, parallel to the main content, with ribbon banners **outside** the image frames matching the second reference image design.

## Layout Structure

### Before (Vertical Center Layout):
```
┌─────────────────────────┐
│   Intro + Photographer  │
└─────────────────────────┘
         ↓
┌─────────────────────────┐
│   Portfolio Categories  │
│   (Centered, Vertical)  │
└─────────────────────────┘
         ↓
┌─────────────────────────┐
│   Philosophy Section    │
└─────────────────────────┘
```

### After (Side-by-Side Layout):
```
┌──────────────────────┬──────────────┐
│  Intro + Photo       │  [NEWBORN]   │
│                      │  ┌─────────┐ │
│  Philosophy          │  │  Image  │ │
│                      │  └─────────┘ │
│  Our Approach        │              │
│                      │  [MATERNITY] │
│  Style & Experience  │  ┌─────────┐ │
│                      │  │  Image  │ │
│  Signature           │  └─────────┘ │
│                      │              │
│                      │  [BABY]      │
│                      │  ┌─────────┐ │
│                      │  │  Image  │ │
│                      │  └─────────┘ │
│                      │              │
│                      │  [FAMILY]    │
│                      │  ┌─────────┐ │
│                      │  │  Image  │ │
│                      │  └─────────┘ │
└──────────────────────┴──────────────┘
```

## Design Features

### 1. Main Wrapper (`.about-main-wrapper`)
- **Display**: Flexbox (side-by-side)
- **Gap**: 4rem between left and right
- **Max Width**: 1400px
- **Alignment**: Flex-start (top aligned)

### 2. Left Content (`.about-left-content`)
- **Flex**: 1 (takes available space)
- **Max Width**: 900px
- **Contains**:
  - Intro + Photographer card
  - Philosophy section
  - Our Approach section
  - Style & Experience section
  - Signature container

### 3. Right Categories (`.about-right-categories`)
- **Width**: Fixed 320px
- **Position**: Sticky (stays visible while scrolling)
- **Top**: 100px (offset from top)
- **Self Align**: Flex-start

## Ribbon Banner Design (Second Reference Image Style)

### Key Difference from First Design:
**First Design**: Ribbon was ON TOP of image (like a sticker)  
**Second Design**: Ribbon is OUTSIDE/ABOVE the image frame (separate element)

### Ribbon Banner (`.ribbon-banner-outside`)
```
┌─────────────────────────────┐
│  ●●  MATERNITY  ●●         │ ← Pink ribbon banner
└─────────────────────────────┘
┌─────────────────────────────┐
│ ┌─────────────────────────┐ │
│ │                         │ │ ← White frame
│ │      [Image]            │ │ ← Image inside
│ │                         │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

### Ribbon Features:
- **Background**: Pink gradient (`#D6A9B4` to `#C89AA8`)
- **Padding**: 0.75rem 2rem
- **Display**: Flex (horizontal layout)
- **Items**: Dots + Text + Dots
- **Shadow**: Soft pink glow
- **Margin Bottom**: -1px (slight overlap with frame)

### Decorative Dots:
- **Left Side**: 2 white dots (●●)
- **Right Side**: 2 white dots (●●)
- **Size**: 6px diameter
- **Color**: Semi-transparent white (60% opacity)
- **Gap**: 4px between dots

### Image Frame (`.category-image-frame`)
- **Background**: White
- **Padding**: 12px (creates white border)
- **Border Radius**: 20px (rounded corners)
- **Shadow**: Deep shadow (0 8px 30px)
- **Inner Radius**: 12px (image corners)

### Image Specifications:
- **Height**: 280px (desktop)
- **Object Fit**: Cover
- **Border Radius**: 12px
- **Transition**: 0.5s smooth zoom

## Hover Effects

### On Ribbon Banner:
- **Shadow**: Increases to 0 6px 18px
- **Transform**: Moves up 2px (`translateY(-2px)`)
- **Transition**: 0.3s smooth

### On Image:
- **Transform**: Scales to 1.05 (5% zoom)
- **Transition**: 0.5s smooth

## Responsive Breakpoints

### Desktop (>1200px)
- Left: Flexible width (max 900px)
- Right: 320px fixed
- Gap: 4rem
- Image Height: 280px

### Large Tablet (≤1200px)
- Right: 280px fixed
- Gap: 3rem
- Image Height: 240px

### Tablet (≤968px)
- **Layout**: Changes to vertical (column)
- Right categories: Centered below content
- Max Width: 400px
- Gap: 4rem

### Small Tablet (≤768px)
- Categories Max Width: 320px
- Image Height: 260px
- Ribbon Font: 1rem
- Ribbon Padding: 0.65rem 1.5rem

### Mobile (≤480px)
- Categories Max Width: 280px
- Image Height: 220px
- Frame Padding: 10px
- Ribbon Font: 0.9rem
- Dots Size: 5px
- Gap: 2rem

## Technical Implementation

### HTML Structure:
```jsx
<div className="about-main-wrapper">
  <div className="about-left-content">
    {/* All about sections */}
  </div>
  
  <div className="about-right-categories">
    <div className="categories-ribbon-container">
      {portfolioCategories.map((category) => (
        <div className="category-ribbon-item">
          <div className="ribbon-banner-outside">
            <div className="ribbon-dots-left"></div>
            <span className="ribbon-text">{category.name}</span>
            <div className="ribbon-dots-right"></div>
          </div>
          <div className="category-image-frame">
            <LazyImage src={category.image} alt={category.name} />
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
```

### CSS Highlights:

#### Sticky Sidebar:
```css
.about-right-categories {
  position: sticky;
  top: 100px;
  flex: 0 0 320px;
}
```

#### Decorative Dots (Using Pseudo-elements):
```css
.ribbon-dots-left::before,
.ribbon-dots-left::after {
  content: '';
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
}
```

#### White Frame Effect:
```css
.category-image-frame {
  background: white;
  padding: 12px;
  border-radius: 20px;
}
```

## Comparison with Reference Images

### First Reference (Intro Card):
✅ Used for the Intro + Photographer card design  
✅ Pink gradient background on left  
✅ Image on right  
✅ Split layout maintained  

### Second Reference (Category Cards):
✅ **Ribbon OUTSIDE the frame** - Implemented  
✅ **White border around images** - Implemented  
✅ **Decorative dots on ribbon** - Implemented  
✅ **Vertical stack layout** - Implemented  
✅ **Pink gradient ribbon** - Implemented  
✅ **Rounded corners** - Implemented  

## Performance Optimizations

### Lazy Loading:
- All category images use `LazyImage` component
- Images load when scrolling into view
- Smooth fade-in animations

### Sticky Positioning:
- Categories stay visible while scrolling
- Better user engagement
- No JavaScript required

### Smooth Transitions:
- 0.3s for ribbon hover
- 0.5s for image zoom
- Hardware-accelerated transforms

## Files Modified

1. **`About.jsx`**:
   - Restructured layout with wrapper divs
   - Moved categories to right sidebar
   - Updated ribbon structure (outside frame)
   - Added decorative dots elements

2. **`About.css`**:
   - Added `.about-main-wrapper` (flex container)
   - Added `.about-left-content` (main content)
   - Added `.about-right-categories` (sticky sidebar)
   - Updated ribbon styles (outside frame)
   - Added decorative dots styles
   - Added white frame styles
   - Updated responsive breakpoints

## Benefits

### User Experience:
✅ Categories always visible (sticky)  
✅ Better content organization  
✅ Easier navigation  
✅ More engaging layout  
✅ Professional appearance  

### Design:
✅ Matches reference images perfectly  
✅ Elegant ribbon banners  
✅ Clean white frames  
✅ Consistent brand colors  
✅ Smooth animations  

### Performance:
✅ Lazy loading enabled  
✅ CSS-only sticky positioning  
✅ Optimized transitions  
✅ Responsive design  

---

**Implementation Date**: December 30, 2025  
**Status**: ✅ Complete and Ready for Review  
**Design References**: Both uploaded images successfully matched
