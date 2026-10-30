/* General contact form validation and email-draft preparation */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('contactFormMessage');
  const emailAddress = 'info@pawsandhope.co.za';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      if (status) {
        status.hidden = false;
        status.classList.add('error');
        status.textContent = 'Please correct the highlighted fields and complete all required information.';
      }
      return;
    }

    const data = new FormData(form);
    const name = String(data.get('contactName') || '').trim();
    const type = String(data.get('messageType') || 'General question').trim();
    const message = String(data.get('contactMessage') || '').trim();
    if (status) {
      status.hidden = false;
      status.classList.remove('error');
      status.textContent = `Thank you, ${name}. Your ${type.toLowerCase()} message passed validation. Your email application should open with the message prepared. Review it and press Send.`;
    }

    const body = [
      'Paws & Hope Animal Rescue — General Contact Message', '', `Name: ${name}`,
      `Email: ${String(data.get('contactEmail') || '').trim()}`,
      `Message type: ${type}`, '', 'Message:', message
    ].join('\n');
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(`Paws & Hope — ${type}`)}&body=${encodeURIComponent(body)}`;
  });
});
