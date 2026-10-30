/* Accessible image lightbox for images marked .gallery-image */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const images = Array.from(document.querySelectorAll('img.gallery-image'));
  if (!images.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.id = 'imageLightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Image preview');
  overlay.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close image preview">×</button><figure><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(overlay);

  const preview = overlay.querySelector('img');
  const caption = overlay.querySelector('figcaption');
  const closeButton = overlay.querySelector('.lightbox-close');
  let previousFocus = null;
  function closeLightbox() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    if (previousFocus) previousFocus.focus();
  }
  function openLightbox(image) {
    previousFocus = image;s
    preview.src = image.currentSrc || image.src;
    preview.alt = image.alt || 'Animal rescue image';
    caption.textContent = image.alt || 'Animal rescue image';
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  }

  images.forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Open larger image: ${image.alt || 'animal rescue image'}`);
    image.addEventListener('click', () => openLightbox(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('is-open')) closeLightbox();
  });
});
