/* Paws & Hope Animal Rescue — shared website functionality */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Keep the footer year current on every page.
  const yearElement = document.getElementById('year');
  if (yearElement) yearElement.textContent = String(new Date().getFullYear());
})
