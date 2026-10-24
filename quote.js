(() => {
  const form = document.querySelector('[data-quote-form]');
  if (!form) return;

  const result = document.querySelector('[data-quote-result]');
  const summary = document.querySelector('[data-quote-summary]');
  const emailLink = document.querySelector('[data-quote-email]');
  const resultTitle = document.querySelector('[data-quote-result-title]');
  const status = document.querySelector('[data-quote-status]');
  const copyButton = document.querySelector('[data-copy-quote]');
  const submitButton = form.querySelector('[type="submit"]');
  const quantityField = form.elements.namedItem('quantity');
  const designField = form.elements.namedItem('design');
  if (!result || !summary || !emailLink || !resultTitle || !status || !copyButton || !submitButton || !quantityField || !designField) return;

  const recipient = 'support@dot2.co.uk';
  const singleLine = value => String(value || '').replace(/[\r\n\u2028\u2029]+/g, ' ').trim();

  function clearDraft() {
    result.hidden = true;
    summary.value = '';
    emailLink.href = `mailto:${recipient}`;
    status.textContent = '';
  }

  form.addEventListener('input', event => {
    if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
    clearDraft();
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    for (const name of ['contactName', 'company', 'email', 'design']) {
      const field = form.elements.namedItem(name);
      if (!singleLine(values.get(name))) {
        field.setCustomValidity('Please complete this field.');
        field.reportValidity();
        return;
      }
    }
    const quantity = Number(values.get('quantity'));
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100000) {
      quantityField.setCustomValidity('Please enter a whole number from 1 to 100,000.');
      quantityField.reportValidity();
      return;
    }

    const company = singleLine(values.get('company'));
    const subject = `Dot2. for Business quote — ${company}`;
    const body = [
      'Hello Dot2.,',
      '',
      'I would like a mousepad quote for our business.',
      '',
      `Contact name: ${singleLine(values.get('contactName'))}`,
      `Business: ${company}`,
      `Work email: ${singleLine(values.get('email'))}`,
      `Quantity: ${quantity}`,
      `Design / customisation: ${singleLine(values.get('design'))}`,
      `Preferred date: ${singleLine(values.get('date')) || 'To be discussed'}`,
      `Delivery postcode: ${singleLine(values.get('postcode')) || 'To be discussed'}`,
      '',
      'Project details:',
      String(values.get('details') || '').trim() || 'To be discussed',
      '',
      'Please confirm the available options, pricing and lead time.'
    ].join('\n');
    const draft = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    summary.value = body;
    emailLink.href = draft.length <= 8000 ? draft : `mailto:${recipient}?subject=${encodeURIComponent(subject)}`;
    result.hidden = false;
    status.textContent = draft.length <= 8000
      ? 'Your quote email is ready. Open the draft and send it to complete your request.'
      : 'Your enquiry is ready. This is a long message: copy the details, open an email draft, then paste and send them.';
    resultTitle.focus();
  });

  copyButton.addEventListener('click', async () => {
    const text = summary.value;
    if (!text || result.hidden) return;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      if (summary.value === text && !result.hidden) status.textContent = 'Enquiry copied. Paste it into an email to support@dot2.co.uk and send it to complete your request.';
    } catch {
      if (summary.value !== text || result.hidden) return;
      summary.focus();
      summary.select();
      status.textContent = 'Enquiry details selected. Use your device’s Copy command, then paste them into an email to support@dot2.co.uk.';
    }
  });

  document.querySelectorAll('[data-quote-preset]').forEach(preset => {
    preset.addEventListener('click', event => {
      const quantity = Number(preset.dataset.quantity);
      const hasQuantity = Number.isInteger(quantity) && quantity > 0 && quantity <= 100000;
      const hasDesign = [...designField.options].some(option => option.value && option.value === preset.dataset.design);
      if (hasQuantity) quantityField.value = String(quantity);
      if (hasDesign) designField.value = preset.dataset.design;
      quantityField.setCustomValidity('');
      designField.setCustomValidity('');
      clearDraft();
      event.preventDefault();
      form.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      (hasQuantity ? quantityField : hasDesign ? designField : form.elements.namedItem('contactName')).focus({ preventScroll: true });
    });
  });

  submitButton.disabled = false;
})();
