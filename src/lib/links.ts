export function isInternalLink(href: string) {
  return href === "#" || href.startsWith("/");
}
