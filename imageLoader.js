export default function imageLoader({ src, width, quality }) {
    // Normalize the source URL
    const normalizedSrc = src.replace(/(\s|\+|%20)\.(JPG|JPEG|PNG|GIF|WEBP)$/i, (match, space, ext) => {
      // Replace encoded spaces with actual spaces
      const decodedSpace = space === '%20' ? ' ' : space;
      return `${decodedSpace}${ext.toLowerCase()}`;
    });
  
    // Encode the URL properly
    const encodedSrc = encodeURI(normalizedSrc);
  
    return `${encodedSrc}?w=${width}&q=${quality || 75}`;
  }