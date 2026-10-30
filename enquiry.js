/* Enquiry form validation and service-specific guidance */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enquiryForm');
  if (!form) return;
  const status = document.getElementById('formMessage');
  const phone = form.elements.namedItem('phone');
  const emailAddress = 'info@pawsandhope.co.za';

  function showStatus(message, isError) {
    if (!status) return;
    status.hidden = false;
    status.classList.toggle('error', Boolean(isError));
    status.textContent = message;
  }
  function validPhone(value) {
    return value === '' || /^[+()\d\s.-]{7,25}$/.test(value);
  }
  if (phone) {
    phone.addEventListener('input', () => {
      phone.setCustomValidity(validPhone(phone.value.trim()) ? '' : 'Enter a valid phone number using digits, spaces, +, brackets or hyphens.');
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      showStatus('Please correct the highlighted fields. Check your email address, phone number and message.', true);
      return;
    }

    const data = new FormData(form);
    const name = String(data.get('fullName') || '').trim();
    const type = String(data.get('enquiryType') || 'General').trim();
    const message = String(data.get('message') || '').trim();
    const guidance = {
      Adoption: 'Next step: discuss the animal’s needs, your home environment and responsible-care requirements. Availability must be confirmed by the organisation.',
      Fostering: 'Next step: discuss the expected time commitment, the animal’s needs and the support available to foster carers.',
      Volunteering: 'Next step: discuss your availability and the animal-care or community tasks you may be able to support.',
      Sponsorship: 'Next step: ask what supplies or care are needed and how support may be used. This website does not process payments.'
    };
    showStatus(`Thank you, ${name}. Your ${type.toLowerCase()} enquiry passed validation. ${guidance[type] || 'The organisation will need to review your enquiry.'} An email draft will open for you to review and send. This is not confirmation of availability or approval.`, false);

    const body = [
      'Paws & Hope Animal Rescue — Enquiry', '', `Name: ${name}`,
      `Email: ${String(data.get('email') || '').trim()}`,
      `Phone: ${String(data.get('phone') || '').trim() || 'Not provided'}`,
      `Enquiry type: ${type}`, '', 'Message:', message
    ].join('\n');
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(`Paws & Hope ${type} enquiry`)}&body=${encodeURIComponent(body)}`;
  });
});
