/* YOPPI — contact form. There is no backend: the form composes the enquiry and
   hands it to WhatsApp (primary) or the visitor's mail client (fallback). */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var mailLink = document.getElementById('contact-mail-link');
  var WHATSAPP_NUMBER = '918670990985';
  var EMAIL = 'founder@yoppi.in';

  function value(name) {
    var el = form.elements[name];
    return el ? el.value.trim() : '';
  }

  function setStatus(message, isError) {
    if (!status) return;
    status.textContent = message;
    status.style.color = isError ? 'var(--error)' : 'var(--accent)';
  }

  function missingField() {
    var required = [
      ['name', 'your name'],
      ['org', 'your organisation'],
      ['email', 'your work email']
    ];
    for (var i = 0; i < required.length; i++) {
      if (!value(required[i][0])) return required[i][1];
    }
    return null;
  }

  function compose() {
    var lines = [
      'Hi YOPPI — I would like to know more.',
      '',
      'Name: ' + value('name'),
      'Organisation: ' + value('org'),
      'Type: ' + value('audience'),
      'Role: ' + value('role'),
      'Email: ' + value('email')
    ];
    if (value('phone')) lines.push('Phone: ' + value('phone'));
    if (value('interest')) lines.push('Interested in: ' + value('interest'));
    if (value('message')) lines.push('', value('message'));
    return lines.join('\n');
  }

  function refreshMailLink() {
    if (!mailLink) return;
    mailLink.href =
      'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent('YOPPI enquiry — ' + (value('org') || 'new enquiry')) +
      '&body=' + encodeURIComponent(compose());
  }

  form.addEventListener('input', refreshMailLink);
  refreshMailLink();

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var missing = missingField();
    if (missing) {
      setStatus('Please add ' + missing + ' so we know who to reply to.', true);
      return;
    }

    window.open(
      'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(compose()),
      '_blank',
      'noopener'
    );
    setStatus('Opening WhatsApp with your message ready to send. Not working? Use the email link below.', false);
  });
})();
