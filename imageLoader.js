export default function imageLoader({ src, width, quality }) {
    const normalizedSrc = src.replace(/\.(JPG|JPEG|PNG|GIF|WEBP)$/i, (match) => match.toLowerCase());
    return `${normalizedSrc}?w=${width}&q=${quality || 75}`;
  }