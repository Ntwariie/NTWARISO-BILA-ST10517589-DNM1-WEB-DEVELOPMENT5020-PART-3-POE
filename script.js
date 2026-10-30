/* Paws & Hope Animal Rescue — Part 3 JavaScript
   Client-side interactions and validation for this educational website.
   Form data is never silently stored: validated submissions open an email draft. */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Update the copyright year on every page.
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Accessible image gallery lightbox. Supports mouse, keyboard and Escape.
  const galleryImages = [...document.querySelectorAll('img.gallery-image')];
  if (galleryImages.length) {
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
    const closeLightbox = () => {ss
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      if (previousFocus) previousFocus.focus();
    };
    galleryImages.forEach((img) => {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', `Open larger image: ${img.alt || 'animal rescue image'}`);
      const openLightbox = () => {
        previousFocus = img;
        preview.src = img.currentSrc || img.src;
        preview.alt = img.alt || 'Animal rescue image';
        caption.textContent = img.alt || 'Animal rescue image';
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        closeButton.focus();
      };
      img.addEventListener('click', openLightbox);
      img.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openLightbox(); }
      });
    });
    closeButton.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', (event) => { if (event.target === overlay) closeLightbox(); });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay.classList.contains('is-open')) closeLightbox();
    });
  }

  // Search and sort the service cards using DOM manipulation.
  const serviceSearch = document.getElementById('serviceSearch');
  const serviceGrid = document.getElementById('serviceGrid');
  const serviceSort = document.getElementById('serviceSort');
  if (serviceGrid) {
    const cards = [...serviceGrid.querySelectorAll('.card')];
    const count = document.getElementById('searchCount');
    const noResults = document.getElementById('noServices');
    const originalOrder = new Map(cards.map((card, index) => [card, index]));
    const updateServices = () => {
      const query = serviceSearch ? serviceSearch.value.trim().toLocaleLowerCase() : '';
      const sort = serviceSort ? serviceSort.value : 'default';
      const sorted = [...cards].sort((a, b) => {
        if (sort === 'az') return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
        if (sort === 'za') return b.querySelector('h3').textContent.localeCompare(a.querySelector('h3').textContent);
        return originalOrder.get(a) - originalOrder.get(b);
      });
      sorted.forEach((card) => {
        serviceGrid.appendChild(card);
        card.hidden = !card.textContent.toLocaleLowerCase().includes(query);
      });
      const visible = sorted.filter((card) => !card.hidden).length;
      if (count) count.textContent = `${visible} of ${cards.length} services shown.`;
      if (noResults) noResults.hidden = visible !== 0;
    };
    if (serviceSearch) serviceSearch.addEventListener('input', updateServices);
    if (serviceSort) serviceSort.addEventListener('change', updateServices);
    updateServices();
  }

  // Make an email draft from validated data. The visitor must send it themselves.
  const openEmailDraft = (subject, lines) => {
    const email = 'info@pawsandhope.co.za';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    window.location.href = url;
  };
  const setStatus = (element, message, isError = false) => {
    if (!element) return;
    element.hidden = false;
    element.classList.toggle('error', isError);
    element.textContent = message;
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  const validPhone = (value) => !value || /^[+()\d\s.-]{7,25}$/.test(value);

  // Enquiry form: validate, provide service-specific guidance and prepare email.
  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    const status = document.getElementById('formMessage');
    const phone = enquiryForm.elements.phone;
    if (phone) phone.addEventListener('input', () => phone.setCustomValidity(validPhone(phone.value.trim()) ? '' : 'Enter a valid phone number using digits, spaces, +, brackets or hyphens.'));
    enquiryForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!enquiryForm.checkValidity()) {
        enquiryForm.reportValidity();
        setStatus(status, 'Please correct the highlighted fields. Check your email address, phone number and message length.', true);
        return;
      }
      const data = new FormData(enquiryForm);
      const name = String(data.get('fullName')).trim();
      const type = String(data.get('enquiryType'));
      const message = String(data.get('message')).trim();
      const guidance = {
        Adoption: 'Next step: discuss the animal’s needs, your home environment and responsible-care requirements. Current animal availability must be confirmed by the organisation.',
        Fostering: 'Next step: discuss the expected time commitment, the animal’s needs and the support available to foster carers.',
        Volunteering: 'Next step: discuss your availability and the animal-care or community tasks you may be able to support.',
        Sponsorship: 'Next step: ask what supplies or care are needed and how support may be used. This website does not process payments.'
      };
      setStatus(status, `Thank you, ${name}. Your ${type.toLowerCase()} enquiry passed validation. ${guidance[type]} An email draft will open so you can review and send your enquiry. This page does not confirm availability or approval.`, false);
      openEmailDraft(`Paws & Hope ${type} enquiry`, [
        'Paws & Hope Animal Rescue — Enquiry', '', `Name: ${name}`,
        `Email: ${String(data.get('email')).trim()}`,
        `Phone: ${String(data.get('phone') || '').trim() || 'Not provided'}`,
        `Enquiry type: ${type}`, '', 'Message:', message
      ]);
    });
  }

  // Contact form: validate and compile the general message into an email draft.
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const status = document.getElementById('contactFormMessage');
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        setStatus(status, 'Please correct the highlighted fields and complete all required information.', true);
        return;
      }
      const data = new FormData(contactForm);
      const name = String(data.get('contactName')).trim();
      const type = String(data.get('messageType'));
      const message = String(data.get('contactMessage')).trim();
      setStatus(status, `Thank you, ${name}. Your ${type.toLowerCase()} message passed validation. Your email application should open with the message prepared. Review it and press Send.`, false);
      openEmailDraft(`Paws & Hope — ${type}`, [
        'Paws & Hope Animal Rescue — General Contact Message', '', `Name: ${name}`,
        `Email: ${String(data.get('contactEmail')).trim()}`,
        `Message type: ${type}`, '', 'Message:', message
      ]);
    });
  }

  // Interactive OpenStreetMap view using Leaflet on the Contact page.
  const mapElement = document.getElementById('rescueMap');
  if (mapElement) {
    const loadMap = () => {
      if (!window.L) {
        mapElement.innerHTML = '<p>The interactive map could not load. Please check your internet connection, or use the OpenStreetMap link below.</p>';
        return;
      }
      const map = window.L.map(mapElement, { scrollWheelZoom: false }).setView([-23.9045, 29.4689], 13);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',
        maxZoom: 19
      }).addTo(map);
      window.L.marker([-23.9045, 29.4689]).addTo(map)
        .bindPopup('<strong>Paws &amp; Hope Animal Rescue</strong><br>Approximate Polokwane city-centre location for this assessment project.')
        .openPopup();
    };
    if (window.L) loadMap();
    else {
      const leafletCss = document.createElement('link');
      leafletCss.rel = 'stylesheet';
      leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(leafletCss);
      const leafletScript = document.createElement('script');
      leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      leafletScript.onload = loadMap;
      leafletScript.onerror = () => { mapElement.innerHTML = '<p>The interactive map could not load. Please check your internet connection, or use the OpenStreetMap link below.</p>'; };
      document.head.appendChild(leafletScript);
    }
  }
});
