/* Leaflet/OpenStreetMap interactive map on the Contact page */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const mapElement = document.getElementById('rescueMap');
  if (!mapElement) return;
  const latitude = -23.9045;
  const longitude = 29.4689;

  function showFallback() {
    mapElement.innerHTML = '<p>The interactive map could not load. Please check your internet connection, or use the OpenStreetMap link on this page.</p>';
  }
  function initialiseMap() {
    if (!window.L) { showFallback(); return; }
    const map = window.L.map(mapElement, { scrollWheelZoom: false }).setView([latitude, longitude], 13);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',
      maxZoom: 19
    }).addTo(map);
    window.L.marker([latitude, longitude]).addTo(map)
      .bindPopup('<strong>Paws &amp; Hope Animal Rescue</strong><br>Approximate Polokwane city-centre location for this assessment project.')
      .openPopup();
  }

  if (window.L) { initialiseMap(); return; }
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(css);
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  script.onload = initialiseMap;
  script.onerror = showFallback;
  document.head.appendChild(script);
});
