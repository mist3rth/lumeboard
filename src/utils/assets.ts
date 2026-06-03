/**
 * Helper to get the correct asset path in both development and production (GitHub Pages support).
 */
export function getAssetPath(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Ensure we don't have multiple slashes
  const separator = base.endsWith('/') ? '' : '/';
  return `${base}${separator}${cleanPath}`;
}
