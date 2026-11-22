// Tenach Tours: interview overlay and quote form.
(function () {
  var VIDEO_ID = 'wOZ0_6i6oQo';
  var EMAIL = 'shoshanatug@gmail.com';

  // ---- Video overlay ----
  var modal = document.getElementById('video-modal');
  var frame = document.getElementById('video-frame');
  var lastFocus = null;

  function openVideo() {
    lastFocus = document.activeElement;
    frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + VIDEO_ID +
      '?autoplay=1&rel=0" title="Interview: Tell it to Esti" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    modal.hidden = false;
    document.body.classList.add('modal-open');
    var closeBtn = modal.querySelector('[role="dialog"] [data-close-video]');
    if (closeBtn) closeBtn.focus();
  }
  function closeVideo() {
    if (modal.hidden) return;
    modal.hidden = true;
    frame.innerHTML = ''; // stops playback
    document.body.classList.remove('modal-open');
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll('[data-open-video]').forEach(function (b) { b.addEventListener('click', openVideo); });
  document.querySelectorAll('[data-close-video]').forEach(function (b) { b.addEventListener('click', closeVideo); });
  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') { closeVideo(); return; }
    if (e.key === 'Tab') { // keep focus inside the dialog
      var f = modal.querySelectorAll('[role="dialog"] button, [role="dialog"] a[href], [role="dialog"] iframe');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // ---- Quote form ----
  // No server needed: opens the visitor's email app with the details filled in.
  // To collect enquiries without email, point the form at a service such as Formspree or Netlify Forms instead.
  var form = document.getElementById('quote-form');
  var status = document.getElementById('form-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = function (n) { var el = form.elements[n]; return el ? el.value.trim() : ''; };
    if (!v('name') || !/^\S+@\S+\.\S+$/.test(v('email'))) {
      status.textContent = 'Please add your name and a valid email address.';
      (v('name') ? form.elements.email : form.elements.name).focus();
      return;
    }
    var lines = [
      'Name: ' + v('name'),
      'Email: ' + v('email'),
      'Group type: ' + v('group_type'),
      'Group size: ' + (v('group_size') || 'not given'),
      'Tour: ' + v('tour'),
      'Preferred date: ' + (v('date') || 'flexible'),
      '',
      v('message')
    ];
    var subject = 'Tour quote request: ' + v('group_type') + (v('group_size') ? ' (' + v('group_size') + ' people)' : '');
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
    status.textContent = 'Your email app should open with your request ready to send. If it doesn’t, email ' + EMAIL + ' directly.';
  });

  // Per-tour "Ask about this tour" links preselect the tour in the form
  document.querySelectorAll('article a[href="#contact"]').forEach(function (a) {
    a.addEventListener('click', function () {
      var title = a.closest('article').querySelector('h3').textContent.trim();
      var sel = form.elements.tour;
      for (var i = 0; i < sel.options.length; i++) {
        if (sel.options[i].text.indexOf(title.split(' and ')[0].replace(/^The /, '')) !== -1) { sel.selectedIndex = i; break; }
      }
    });
  });
})();
