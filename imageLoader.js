export default function imageLoader({ src, width, quality }) {
    // Normalize the source URL by only converting the file extension to lowercase
    const normalizedSrc = src.replace(/\.(JPG|JPEG|PNG|GIF|WEBP)$/i, (match) => match.toLowerCase());
  
    // Return the URL without encoding spaces
    return `${normalizedSrc}?w=${width}&q=${quality || 75}`;
  }
  