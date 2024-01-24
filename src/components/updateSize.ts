export function updateSize(event: Event) {
    const img = event.target as HTMLImageElement;
    const link = img.parentElement as HTMLAnchorElement;
    link.dataset.pswpWidth = String(img.naturalWidth);
    link.dataset.pswpHeight = String(img.naturalHeight);
}