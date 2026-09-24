/**
 * The WhatsApp glyph, drawn rather than pulled from an icon set — lucide
 * dropped its brand marks, and this is the one place the site needs one.
 *
 * Solid so it reads at 20px, and it takes `currentColor` like every other icon
 * here rather than carrying WhatsApp green onto a white page.
 */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.17-1.35a9.93 9.93 0 0 0 4.87 1.24h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.88 9.88 0 0 0 12.04 2Zm0 1.82c2.18 0 4.23.85 5.77 2.39a8.1 8.1 0 0 1 2.39 5.76c0 4.5-3.66 8.15-8.16 8.15a8.2 8.2 0 0 1-4.15-1.14l-.3-.18-3.07.8.82-2.99-.2-.31a8.1 8.1 0 0 1-1.25-4.33c0-4.5 3.66-8.15 8.15-8.15Z" />
      <path d="M8.9 7.2c-.18-.41-.37-.42-.55-.43h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.7 2.72 4.2 3.7 2.08.83 2.5.66 2.95.62.45-.04 1.45-.59 1.66-1.17.2-.57.2-1.06.14-1.16-.06-.1-.22-.17-.47-.29-.24-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.17.25-.63.8-.77.96-.14.17-.28.19-.53.07-.24-.13-1.03-.39-1.97-1.22-.73-.65-1.22-1.46-1.36-1.7-.14-.25-.02-.38.1-.5.12-.11.25-.29.37-.43.13-.15.17-.25.25-.41.09-.17.05-.31-.02-.43-.06-.13-.54-1.35-.76-1.84Z" />
    </svg>
  );
}
