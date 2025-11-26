# Three.js 3D Background Integration

## Overview

The Green Style website now features an interactive 3D background in the hero section, creating a modern and engaging visual experience that aligns with the environmental theme.

## What's Been Added

### 1. Dependencies Installed

```bash
npm install three @react-three/fiber @react-three/drei
```

- **three**: Core Three.js library for 3D graphics
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers and abstractions for React Three Fiber

### 2. Component Created

**File**: `frontend/src/components/ui/ThreeBackground.tsx`

This component features:

#### Animated Organic Blobs
- 3 distorted spheres with different colors (green shades and earth tone)
- Smooth floating animations
- Gentle rotation for subtle movement
- Semi-transparent with distortion effects

#### Floating Particles
- 100 green particles representing nature/environment
- Slow rotating particle cloud
- Creates depth and atmosphere

#### Professional Lighting
- Ambient light for overall illumination
- Directional light for dimension
- Green-tinted point light for thematic consistency

#### Performance Optimizations
- Dynamic import (client-side only, no SSR)
- Device pixel ratio optimization
- Auto-quality adjustment based on performance
- Lazy loading with Suspense

### 3. Hero Section Integration

**File**: `frontend/src/components/sections/Hero.tsx`

Changes:
- Imported ThreeBackground component dynamically
- Positioned 3D canvas as absolute background layer
- Increased backdrop blur on content cards for better readability
- Content properly layered above 3D background with z-index

## Design Features

### Color Scheme
- **Primary Green** (#22c55e): Main blob color
- **Light Green** (#86efac): Secondary blob color
- **Earth Tone** (#d97706): Accent blob color

### Animation Details
- Blobs float vertically with sine wave motion
- Different speeds for each blob (0.8, 1.0, 1.2) create organic feel
- Slow rotation prevents static appearance
- No auto-rotate camera to avoid motion sickness

### Responsiveness
- Canvas automatically adjusts to screen size
- Performance scales with device capability
- Works on mobile, tablet, and desktop

## Technical Notes

### Why Dynamic Import?
```typescript
const ThreeBackground = dynamic(() => import("@/components/ui/ThreeBackground"), {
  ssr: false,  // Three.js requires browser APIs
  loading: () => null,  // No loading UI needed
});
```

Three.js relies on browser APIs (WebGL, Canvas) that don't exist in Node.js during SSR. Dynamic import ensures it only loads client-side.

### Performance Considerations

1. **Device Pixel Ratio**: Limited to max 2x for performance
2. **Auto-Quality**: Minimum 50% quality maintained
3. **Particle Count**: Limited to 100 particles
4. **Geometry Complexity**: Balanced for smooth performance

### Browser Compatibility

Works in all modern browsers supporting:
- WebGL 1.0 or higher
- ES6 features
- Canvas API

Gracefully degrades on older browsers (background just won't show).

## Customization Guide

### Changing Colors

Edit blob colors in `ThreeBackground.tsx`:

```typescript
<AnimatedBlob position={[-2, 0, -2]} color="#YOUR_COLOR" speed={0.8} />
```

### Adjusting Animation Speed

Modify the `speed` prop:
- Lower values (0.5): Slower, calmer
- Higher values (2.0): Faster, more energetic

### Adding More Blobs

Add more `<AnimatedBlob>` components with different positions:

```typescript
<AnimatedBlob position={[x, y, z]} color="#color" speed={1} />
```

Recommended: Keep total under 5 blobs for performance.

### Particle Adjustments

Change particle count in `FloatingParticles`:

```typescript
const particleCount = 100; // Increase or decrease
```

## Future Enhancements

Potential improvements:

1. **Mouse Interaction**: Add mouse parallax effect
2. **Scroll Animation**: Change blob positions on scroll
3. **Theme Integration**: Different colors for day/night mode
4. **Mobile Optimization**: Reduce particle count on mobile
5. **Custom Shapes**: Replace spheres with leaf/plant models

## Troubleshooting

### Issue: 3D background not showing

**Solutions:**
1. Check browser console for WebGL errors
2. Ensure JavaScript is enabled
3. Try a different browser (Chrome, Firefox, Safari)
4. Check if GPU acceleration is enabled

### Issue: Performance lag

**Solutions:**
1. Reduce particle count
2. Decrease blob count
3. Lower device pixel ratio
4. Simplify geometry (reduce sphere segments)

### Issue: Build errors

**Solutions:**
1. Ensure all dependencies are installed: `npm install`
2. Clear `.next` folder: `rm -rf frontend/.next`
3. Restart dev server

## Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Drei Helpers](https://github.com/pmndrs/drei)

---

**Created**: 2025-11-17
**Last Updated**: 2025-11-17
