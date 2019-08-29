# Trim lines component

## Example:

### JS code

```javascript
import lineClamp from 'line-clamp';

lineClamp(
  {
    testTrim: {
      selector: '.CSS-SELECTOR',
      trim: 1,
      forceJs: false, // In some cases display: webkit-box break layout.
    }
  }
);
```

### CSS code

```css
@import "line-clamp/line-clamp";
```
