(function () {
  'use strict';

  var CATEGORIES = window.CCAF_CATEGORIES || [];
  var PROFILE_KEY = 'ccaf_trainer_v1_profile';
  var PROGRESS_KEY = 'ccaf_trainer_v1_progress';

  var STREAK_MILESTONES = [5, 10, 25];
  var TIMED_SECONDS_PER_Q = 45;

  var CORRECT_PHRASES = [
    'Correct!', 'Nice one!', 'Nailed it!', "That's the one.", 'Exactly right.',
    'Spot on!', 'Great instinct.', 'You got it!', 'Sharp thinking.'
  ];
  var INCORRECT_PHRASES = [
    'Not quite.', 'Close, but no.', 'Missed this one.', 'Not this time.',
    "Let's break it down.", 'Off track — here is why.'
  ];
  var SECOND_TRY_PHRASES = [
    'Got there!', 'Redeemed.', 'Second-try success.', 'There it is.', 'Nice recovery.'
  ];
  var RETRY_PROMPT_PHRASES = [
    'Take another look.', 'One more shot.', 'Give it another try.', "You've got this."
  ];
  var SPEED_CATCH_PHRASES = [
    "Caught you! You answered in {s}s — that's not enough time to read all of that.",
    "Whoa, {s}s? I don't think you actually read that one.",
    "That was fast — suspiciously fast. {s}s isn't enough to read the question and the choices.",
    "Gotcha. {s}s flat. Were you even looking at the words?"
  ];
  var SPEED_MOTIVATE_PHRASES = [
    'Slow down and really read it — you will retain far more than by guessing fast.',
    "This isn't a race against the clock. Understanding beats speed every time.",
    'Give each question a real chance. Read it, think, then answer.',
    "You've got the time — use it. Careful reading is how this actually sinks in.",
    'Take a breath, read the whole scenario, and then decide.'
  ];

  var BADGE_DEFS = {
    first_steps: { name: 'First Steps', desc: 'Complete your first quiz attempt.', icon: 'rocket' },
    perfectionist: { name: 'Perfectionist', desc: 'Pass a category with 100% on your very first attempt.', icon: 'gem' },
    comeback_kid: { name: 'Comeback Kid', desc: 'Pass a category after a previous failed attempt.', icon: 'refresh' },
    speed_runner: { name: 'Speed Runner', desc: 'Pass a category in Timed Challenge mode.', icon: 'bolt' },
    streak_5: { name: 'Warming Up', desc: '5 correct answers in a row.', icon: 'sparkle' },
    streak_10: { name: 'On Fire', desc: '10 correct answers in a row.', icon: 'flame' },
    streak_25: { name: 'Unstoppable', desc: '25 correct answers in a row.', icon: 'trophy' },
    course_champion: { name: 'Course Champion', desc: 'Pass every category in the course.', icon: 'gradcap' }
  };

  // ============================================================
  // SVG icon system (no emoji anywhere in the UI)
  // ============================================================
  var ICON_PATHS = {
    wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2z"/>',
    braces: '<path d="M8 4c-2 0-3 1-3 3v3c0 1.2-.6 2-2 2 1.4 0 2 .8 2 2v3c0 2 1 3 3 3"/><path d="M16 4c2 0 3 1 3 3v3c0 1.2.6 2 2 2-1.4 0-2 .8-2 2v3c0 2-1 3-3 3"/>',
    chat: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7A2.5 2.5 0 0 1 17.5 15H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 12.5z"/>',
    network: '<circle cx="12" cy="4.5" r="2.2"/><circle cx="5.5" cy="18" r="2.2"/><circle cx="18.5" cy="18" r="2.2"/><path d="M12 6.7v4M12 10.7 6.6 16M12 10.7l5.4 5.3"/>',
    terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    check: '<path d="M5 13l4.5 4.5L19.5 7"/>',
    cross: '<path d="M6 6l12 12M18 6L6 18"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.5"/>',
    'x-circle': '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    flame: '<path d="M12 2.5c1 3 4 4 4 8a4 4 0 0 1-8 0c0-1.2.5-2 1.2-2.8.3 1 .8 1.3 1.3 1.3.7 0 1-2 .3-3.3-.5-1-.8-2.1-.8-3.2z"/><path d="M9 14a3 3 0 0 0 6 0c0-1.6-1-2.4-1.6-3.4"/>',
    trophy: '<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5H4a3 3 0 0 0 3 4M17 5h3a3 3 0 0 1-3 4"/><path d="M12 14v3M9 20h6M9 20l.5-3h5l.5 3"/>',
    gem: '<path d="M6 3h12l3 5-9 13L3 8z"/><path d="M3 8h18M9 3l-2 5 5 13 5-13-2-5"/>',
    rocket: '<path d="M12 2c3 1 5 5 5 9 0 3-1.5 5-2.5 6L12 20l-2.5-3C8.5 16 7 14 7 11c0-4 2-8 5-9z"/><circle cx="12" cy="10" r="1.6"/><path d="M9 16l-3 3M15 16l3 3M9.5 18.5 8 22M14.5 18.5 16 22"/>',
    bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
    gradcap: '<path d="M12 4 2 9l10 5 10-5z"/><path d="M6 11.5V17c0 1.3 2.7 3 6 3s6-1.7 6-3v-5.5M22 9v6"/>',
    book: '<path d="M4 5.5c0-1 1-1.5 2-1.5h5v14H6c-1 0-2 .5-2 1.5z"/><path d="M20 5.5c0-1-1-1.5-2-1.5h-5v14h5c1 0 2 .5 2 1.5z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.6-4.5M4 13a8 8 0 0 0 14.6 4.5"/><path d="M20 4v4h-4M4 20v-4h4"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>',
    sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.5M12 19v2.5M4.4 4.4l1.8 1.8M17.8 17.8l1.8 1.8M2.5 12H5M19 12h2.5M4.4 19.6l1.8-1.8M17.8 6.2l1.8-1.8"/>',
    chevronLeft: '<path d="M15 5 8 12l7 7"/>',
    wave: '<path d="M4 15v-3.5a2 2 0 0 1 4 0V13M8 13V8a2 2 0 0 1 4 0v5M12 13V6.5a2 2 0 0 1 4 0V13"/><path d="M16 9.5a2 2 0 0 1 4 0V15a6 6 0 0 1-6 6h-2c-2.5 0-4-1-5.5-3L4 14.5"/>',
    robot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4M9 4h6"/><circle cx="9" cy="14" r="1.4"/><circle cx="15" cy="14" r="1.4"/><path d="M9 17.5h6M2 12v3M22 12v3"/>',
    eye: '<path d="M2 12s4-6.5 10-6.5S22 12 22 12s-4 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/>'
  };

  function icon(name, opts) {
    opts = opts || {};
    var size = opts.size || 18;
    var cls = 'icon' + (opts.cls ? ' ' + opts.cls : '');
    var body = ICON_PATHS[name] || '';
    return '<svg class="' + cls + '" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" ' +
      'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      body + '</svg>';
  }

  // ============================================================
  // Storage
  // ============================================================
  function defaultProfile() {
    return { name: '', ackPrivacy: false, ackContent: false, onboarded: false, theme: null };
  }

  function loadProfile() {
    try {
      var raw = localStorage.getItem(PROFILE_KEY);
      if (!raw) return defaultProfile();
      var p = JSON.parse(raw);
      return Object.assign(defaultProfile(), p);
    } catch (e) {
      return defaultProfile();
    }
  }

  function saveProfile() {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }

  function defaultCategoryProgress() {
    return {
      unlocked: true,
      passed: false,
      hadFailedAttempt: false,
      bestScorePct: 0,
      attemptsCount: 0,
      lastAttemptAt: null,
      questionStats: {}
    };
  }

  function defaultProgress() {
    var categories = {};
    CATEGORIES.forEach(function (cat) {
      categories[cat.id] = defaultCategoryProgress();
    });
    return {
      categories: categories,
      streak: { current: 0, best: 0 },
      totalAttempted: 0,
      totalCorrect: 0,
      badges: [],
      history: []
    };
  }

  function ensureProgressShape(p) {
    if (!p.categories) p.categories = {};
    CATEGORIES.forEach(function (cat) {
      if (!p.categories[cat.id]) {
        p.categories[cat.id] = defaultCategoryProgress();
      } else {
        // All categories are unlocked for everyone; existing users keep
        // their passed/score/streak history, only the lock state changes.
        p.categories[cat.id].unlocked = true;
      }
    });
    if (!p.streak) p.streak = { current: 0, best: 0 };
    if (typeof p.totalAttempted !== 'number') p.totalAttempted = 0;
    if (typeof p.totalCorrect !== 'number') p.totalCorrect = 0;
    if (!p.badges) p.badges = [];
    if (!p.history) p.history = [];
    return p;
  }

  function loadProgress() {
    try {
      var raw = localStorage.getItem(PROGRESS_KEY);
      if (!raw) return defaultProgress();
      var p = JSON.parse(raw);
      return ensureProgressShape(p);
    } catch (e) {
      return defaultProgress();
    }
  }

  function saveProgress() {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }

  var profile = loadProfile();
  var progress = loadProgress();

  // ============================================================
  // Utilities
  // ============================================================
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function pctOf(n, d) {
    if (!d) return 0;
    return Math.round((n / d) * 100);
  }

  // Wraps each word in its own span with a staggered entrance delay, so the
  // question visibly reveals itself word-by-word as if being read aloud.
  var WORD_STAGGER_MS = 28;
  var WORD_STAGGER_CAP_MS = 900;
  function renderReadingWords(text) {
    var words = String(text).split(/(\s+)/); // keep whitespace tokens so spacing is preserved
    var wordIndex = 0;
    return words.map(function (token) {
      if (!token.trim()) return token;
      var delay = Math.min(wordIndex * WORD_STAGGER_MS, WORD_STAGGER_CAP_MS);
      wordIndex++;
      return '<span class="reveal-word" style="animation-delay:' + delay + 'ms">' + escapeHtml(token) + '</span>';
    }).join('');
  }

  function wordCount(text) {
    var m = String(text).match(/\S+/g);
    return m ? m.length : 0;
  }

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function todayStr() {
    var d = new Date();
    return d.toISOString().slice(0, 10);
  }

  function initials(name) {
    if (!name) return '?';
    var parts = name.trim().split(/\s+/);
    var s = parts[0][0] || '';
    if (parts.length > 1) s += parts[parts.length - 1][0] || '';
    return s.toUpperCase();
  }

  function findCategory(catId) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === catId) return CATEGORIES[i];
    }
    return null;
  }

  function overallCompletionPct() {
    if (!CATEGORIES.length) return 0;
    var passed = CATEGORIES.filter(function (c) { return progress.categories[c.id] && progress.categories[c.id].passed; }).length;
    return pctOf(passed, CATEGORIES.length);
  }

  // ============================================================
  // Toasts + confetti
  // ============================================================
  function showToast(msg, milestone, iconName) {
    var root = document.getElementById('toastRoot');
    var el = document.createElement('div');
    el.className = 'toast' + (milestone ? ' milestone' : '');
    el.innerHTML = (iconName ? icon(iconName, { size: 15 }) + ' ' : '') + escapeHtml(msg);
    root.appendChild(el);
    setTimeout(function () { el.remove(); }, 2600);
  }

  function burstConfetti() {
    var root = document.getElementById('confettiRoot');
    var colors = ['#FF6A2B', '#FFC94A', '#2ECC71', '#5AC8FA', '#F2F3F5'];
    for (var i = 0; i < 60; i++) {
      var piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.background = pick(colors);
      piece.style.animationDuration = (1.6 + Math.random() * 1.4) + 's';
      piece.style.animationDelay = (Math.random() * 0.4) + 's';
      piece.style.transform = 'rotate(' + Math.floor(Math.random() * 360) + 'deg)';
      root.appendChild(piece);
      (function (p) { setTimeout(function () { p.remove(); }, 3200); })(piece);
    }
  }

  // ============================================================
  // Theme
  // ============================================================
  function applyTheme() {
    var theme = profile.theme;
    var root = document.documentElement;
    if (theme === 'dark' || theme === 'light') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
    var iconEl = document.getElementById('themeIcon');
    if (iconEl) {
      var effectiveDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches) || !theme;
      iconEl.innerHTML = icon(effectiveDark ? 'sun' : 'moon', { size: 16 });
    }
  }

  function toggleTheme() {
    var current = profile.theme || 'dark';
    profile.theme = current === 'dark' ? 'light' : 'dark';
    saveProfile();
    applyTheme();
  }

  // ============================================================
  // Badges
  // ============================================================
  function awardBadge(id) {
    if (progress.badges.indexOf(id) === -1) {
      progress.badges.push(id);
      var def = BADGE_DEFS[id];
      showToast((def ? 'Badge unlocked: ' + def.name : 'Badge unlocked!'), true, def ? def.icon : 'trophy');
      return true;
    }
    return false;
  }

  // ============================================================
  // Router
  // ============================================================
  var currentView = 'onboarding';
  var pendingCategoryId = null;
  var appEl = document.getElementById('app');

  function navigate(view) {
    if (view !== 'study') pendingCategoryId = null;
    if (currentView === 'quiz' && view !== 'quiz') clearQuizTimer();
    currentView = view;
    renderNav();
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderNav() {
    var tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(function (t) {
      var v = t.getAttribute('data-view');
      t.classList.toggle('active', v === currentView || (v === 'study' && currentView === 'quiz'));
    });
    document.getElementById('userNameChip').textContent = profile.name || 'Guest';
    document.getElementById('userAvatar').textContent = initials(profile.name);
    var track = document.getElementById('courseProgressFill');
    track.style.width = overallCompletionPct() + '%';
  }

  function render() {
    if (!profile.onboarded) {
      appEl.innerHTML = renderOnboarding();
      bindOnboarding();
      return;
    }
    switch (currentView) {
      case 'categories':
        appEl.innerHTML = renderCategories();
        bindCategories();
        break;
      case 'study':
        var targetCatId = pendingCategoryId || (CATEGORIES.find(function (c) { return !progress.categories[c.id].passed; }) || CATEGORIES[0]).id;
        appEl.innerHTML = renderModeSelect(targetCatId);
        bindModeSelect(targetCatId);
        break;
      case 'quiz':
        appEl.innerHTML = renderQuizScreen();
        bindQuizScreen();
        break;
      case 'progress':
        appEl.innerHTML = renderProgressView();
        bindProgressView();
        break;
      case 'about':
        appEl.innerHTML = renderAbout();
        bindAbout();
        break;
      default:
        appEl.innerHTML = renderCategories();
        bindCategories();
    }
  }

  // ============================================================
  // Onboarding
  // ============================================================
  var onboardStep = 1;
  var onboardCodeError = false;
  var ACCESS_CODE = 'CCAF';

  function renderOnboarding() {
    if (onboardStep === 1) {
      return (
        '<div class="onboard-wrap">' +
          '<div class="onboard-card">' +
            '<p class="micro-label">Welcome</p>' +
            '<h1>What should I call you?</h1>' +
            '<p class="lede">We will use this to personalize your CCAF study sessions.</p>' +
            '<input type="text" class="text-input" id="nameInput" placeholder="Your name" autofocus maxlength="40" value="' + escapeHtml(profile.name) + '">' +
            '<button class="btn btn-primary btn-block" id="continueNameBtn">Continue</button>' +
          '</div>' +
        '</div>'
      );
    }
    if (onboardStep === 2) {
      return (
        '<div class="onboard-wrap">' +
          '<div class="onboard-card">' +
            '<p class="micro-label">Access code</p>' +
            '<h1>One more thing, ' + escapeHtml(profile.name) + '</h1>' +
            '<p class="lede">This trainer is for internal learning use only. Enter the access code you were given to continue.</p>' +
            '<input type="text" class="text-input" id="codeInput" placeholder="Access code" autofocus maxlength="20" autocomplete="off" autocapitalize="characters">' +
            (onboardCodeError ? '<p class="code-error">' + icon('x-circle', { size: 14 }) + ' That code isn\'t right. Please try again.</p>' : '') +
            '<button class="btn btn-primary btn-block" id="continueCodeBtn">Continue</button>' +
          '</div>' +
        '</div>'
      );
    }
    return (
      '<div class="onboard-wrap">' +
        '<div class="onboard-card">' +
          '<p class="micro-label">Before you begin</p>' +
          '<h1>A couple of quick notes</h1>' +
          '<div class="notice-block">' +
            '<strong>Local-only progress.</strong> All your progress is saved locally in this browser only. Switching browsers or devices, or clearing your browser data, will permanently erase your progress. There is no account and no server backend.' +
          '</div>' +
          '<div class="notice-block">' +
            '<strong>Content disclaimer.</strong> Practice questions in this app were compiled from publicly available online sources, primarily CertiQ, and have not been officially verified or endorsed by Anthropic. Use this for practice only.' +
          '</div>' +
          '<label class="check-row"><input type="checkbox" id="ackPrivacy"> I understand my progress is stored locally only and may be lost if I clear browser data or switch devices.</label>' +
          '<label class="check-row"><input type="checkbox" id="ackContent"> I understand these practice questions are unofficial and not endorsed by Anthropic.</label>' +
          '<button class="btn btn-primary btn-block" id="finishOnboardBtn" disabled>Start studying</button>' +
        '</div>' +
      '</div>'
    );
  }

  function bindOnboarding() {
    if (onboardStep === 1) {
      var input = document.getElementById('nameInput');
      var btn = document.getElementById('continueNameBtn');
      input.addEventListener('input', function () {
        btn.disabled = !input.value.trim();
      });
      btn.disabled = !input.value.trim();
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && input.value.trim()) { advanceOnboardName(input.value.trim()); }
      });
      btn.addEventListener('click', function () { advanceOnboardName(input.value.trim()); });
    } else if (onboardStep === 2) {
      var codeInput = document.getElementById('codeInput');
      var codeBtn = document.getElementById('continueCodeBtn');
      codeInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') advanceOnboardCode(codeInput.value);
      });
      codeBtn.addEventListener('click', function () { advanceOnboardCode(codeInput.value); });
    } else {
      var ackPrivacy = document.getElementById('ackPrivacy');
      var ackContent = document.getElementById('ackContent');
      var finishBtn = document.getElementById('finishOnboardBtn');
      function refresh() { finishBtn.disabled = !(ackPrivacy.checked && ackContent.checked); }
      ackPrivacy.addEventListener('change', refresh);
      ackContent.addEventListener('change', refresh);
      finishBtn.addEventListener('click', function () {
        profile.ackPrivacy = true;
        profile.ackContent = true;
        profile.onboarded = true;
        saveProfile();
        onboardStep = 1;
        navigate('categories');
      });
    }
  }

  function advanceOnboardName(name) {
    profile.name = name;
    saveProfile();
    onboardStep = 2;
    renderNav();
    render();
  }

  function advanceOnboardCode(code) {
    if ((code || '').trim().toUpperCase() === ACCESS_CODE) {
      onboardCodeError = false;
      onboardStep = 3;
      render();
    } else {
      onboardCodeError = true;
      render();
    }
  }

  // ============================================================
  // Categories view
  // ============================================================
  function categoryStats(cat) {
    var cp = progress.categories[cat.id];
    var total = cat.questions.length;
    var seen = Object.keys(cp.questionStats).length;
    var correctLast = Object.keys(cp.questionStats).filter(function (qid) {
      return cp.questionStats[qid].lastResult === 'correct';
    }).length;
    return {
      passed: cp.passed,
      bestScorePct: cp.bestScorePct,
      attemptsCount: cp.attemptsCount,
      total: total,
      seen: seen,
      correctLast: correctLast,
      progressPct: pctOf(correctLast, total)
    };
  }

  function renderCategories() {
    var cards = CATEGORIES.map(function (cat, i) {
      var st = categoryStats(cat);
      var actionBtn;
      if (st.passed) {
        actionBtn = '<button class="btn btn-secondary btn-block" data-start="' + cat.id + '">Review again</button>';
      } else if (st.attemptsCount > 0) {
        actionBtn = '<button class="btn btn-primary btn-block" data-start="' + cat.id + '">Continue</button>';
      } else {
        actionBtn = '<button class="btn btn-primary btn-block" data-start="' + cat.id + '">Start</button>';
      }
      var badgeStyle = 'style="background:' + cat.color + '22;color:' + cat.color + '"';

      return (
        '<div class="cat-card" style="--cat-color:' + cat.color + '">' +
          '<div class="cat-top">' +
            '<div class="cat-icon-badge" ' + badgeStyle + '>' + icon(cat.icon, { size: 20 }) + '</div>' +
            (st.passed ? '<span class="pass-badge">' + icon('check', { size: 12 }) + ' Passed</span>' : '')  +
          '</div>' +
          '<div>' +
            '<p class="micro-label">Category ' + (i + 1) + ' of ' + CATEGORIES.length + '</p>' +
            '<h3>' + escapeHtml(cat.name) + '</h3>' +
          '</div>' +
          '<p class="cat-desc">' + escapeHtml(cat.description) + '</p>' +
          '<div class="progress-ring-row">' +
            '<div class="mini-bar-track"><div class="mini-bar-fill" style="width:' + st.progressPct + '%;background:' + cat.color + '"></div></div>' +
            '<span class="mini-bar-label">' + st.correctLast + '/' + st.total + '</span>' +
          '</div>' +
          actionBtn +
        '</div>'
      );
    }).join('');

    return (
      '<div class="view active">' +
        '<div class="section-head">' +
          '<div><h2>' + icon('wave', { size: 22, cls: 'inline-icon accent-icon' }) + ' Welcome back, ' + escapeHtml(profile.name || 'friend') + '</h2>' +
          '<p class="hint">' + overallCompletionPct() + '% of the course passed</p></div>' +
        '</div>' +
        '<div class="cat-grid">' + cards + '</div>' +
      '</div>'
    );
  }

  function bindCategories() {
    document.querySelectorAll('[data-start]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        pendingCategoryId = btn.getAttribute('data-start');
        navigate('study');
      });
    });
  }

  // ============================================================
  // Mode select
  // ============================================================
  function renderModeSelect(catId) {
    var cat = findCategory(catId);
    if (!cat) return '<div class="empty-state">Category not found.</div>';
    var missed = missedQuestionIds(catId);
    return (
      '<div class="view active">' +
        '<p class="micro-label">' + escapeHtml(cat.name) + '</p>' +
        '<h2 class="mt-8">Choose a mode</h2>' +
        '<div class="mode-select-grid mt-16">' +
          '<div class="mode-card" data-mode="study" style="--cat-color:' + cat.color + '"><h3>' + icon('book', { size: 18 }) + ' Study mode</h3><p>Relaxed pace, no timer. Answer at your own speed with full explanations.</p></div>' +
          '<div class="mode-card" data-mode="timed" style="--cat-color:' + cat.color + '"><h3>' + icon('clock', { size: 18 }) + ' Timed challenge</h3><p>' + TIMED_SECONDS_PER_Q + ' seconds per question. A faster-paced alternative for exam-day pressure practice.</p></div>' +
          (missed.length ? '<div class="mode-card" data-mode="retry" style="--cat-color:' + cat.color + '"><h3>' + icon('target', { size: 18 }) + ' Drill missed only</h3><p>Re-drill just the ' + missed.length + ' question' + (missed.length === 1 ? '' : 's') + ' you got wrong last time.</p></div>' : '') +
        '</div>' +
        '<div class="mt-24"><button class="btn btn-secondary" id="backToCategories">' + icon('chevronLeft', { size: 14 }) + ' Back to categories</button></div>' +
      '</div>'
    );
  }

  function bindModeSelect(catId) {
    document.querySelectorAll('.mode-card[data-mode]').forEach(function (card) {
      card.addEventListener('click', function () {
        var mode = card.getAttribute('data-mode');
        beginSession(catId, mode);
      });
    });
    var back = document.getElementById('backToCategories');
    if (back) back.addEventListener('click', function () { navigate('categories'); });
  }

  function missedQuestionIds(catId) {
    var cat = findCategory(catId);
    var cp = progress.categories[catId];
    if (!cat) return [];
    return cat.questions.filter(function (q) {
      var st = cp.questionStats[q.id];
      return st && st.lastResult === 'incorrect';
    }).map(function (q) { return q.id; });
  }

  // ============================================================
  // Quiz engine
  // ============================================================
  var quizSession = null;

  function beginSession(catId, mode, explicitIds) {
    var cat = findCategory(catId);
    if (!cat) return;
    var pool;
    if (mode === 'retry') {
      var ids = explicitIds || missedQuestionIds(catId);
      pool = cat.questions.filter(function (q) { return ids.indexOf(q.id) !== -1; });
      if (!pool.length) pool = cat.questions; // safety net: never start an empty session
    } else {
      pool = cat.questions;
    }
    var order = shuffle(pool).map(function (q) { return q.id; });
    quizSession = {
      catId: catId,
      mode: mode,
      order: order,
      requeued: {},
      pointer: 0,
      firstTry: {},
      totalUnique: order.length,
      correctFirstTryCount: 0,
      startedAt: Date.now(),
      qStartedAt: Date.now(),
      answeredIdx: null,
      wrongTries: [],
      awaitingRetry: false,
      resolved: false,
      resolvedCorrect: null,
      timer: null,
      timeLeft: TIMED_SECONDS_PER_Q,
      elapsed: 0,
      lastSpeedNudgeAt: -99,
      done: false
    };
    currentView = 'quiz';
    render();
  }

  function currentQuestion() {
    if (!quizSession) return null;
    var cat = findCategory(quizSession.catId);
    var qid = quizSession.order[quizSession.pointer];
    return cat.questions.find(function (q) { return q.id === qid; });
  }

  function renderQuizScreen() {
    if (!quizSession) {
      return '<div class="empty-state">No active session. <button class="btn btn-primary mt-16" onclick="location.reload()">Go home</button></div>';
    }
    if (quizSession.done) return renderSessionComplete();

    var cat = findCategory(quizSession.catId);
    var q = currentQuestion();
    var qNum = quizSession.pointer + 1;
    var qTotal = quizSession.order.length;
    var accSoFar = quizSession.pointer === 0 ? 100 : pctOf(quizSession.correctFirstTryCount, Object.keys(quizSession.firstTry).length || 1);

    var modeLabel = quizSession.mode === 'timed' ? 'Timed Challenge' : (quizSession.mode === 'retry' ? 'Retry Missed' : 'Study Mode');
    var locked = quizSession.resolved; // fully answerable only when not yet resolved
    var isFreshQuestion = !quizSession.resolved && quizSession.wrongTries.length === 0;
    var questionHtml = isFreshQuestion ? renderReadingWords(q.question) : escapeHtml(q.question);

    var choicesHtml = q.choices.map(function (choice, idx) {
      var classes = 'choice-btn';
      var wasWrongTry = quizSession.wrongTries.indexOf(idx) !== -1;
      var disabled = (locked || wasWrongTry) ? 'disabled' : '';
      if (locked && idx === q.correctIndex) classes += ' correct';
      if (wasWrongTry) classes += ' incorrect';
      var key = String.fromCharCode(65 + idx);
      return (
        '<button class="' + classes + '" data-idx="' + idx + '" ' + disabled + '>' +
          '<span class="choice-key">' + key + '</span><span>' + escapeHtml(choice) + '</span>' +
        '</button>'
      );
    }).join('');

    var feedback = '';
    if (quizSession.awaitingRetry && !quizSession.resolved) {
      var wrongIdx = quizSession.wrongTries[quizSession.wrongTries.length - 1];
      feedback = (
        '<div class="feedback-panel incorrect">' +
          '<div class="feedback-head">' + icon('x-circle', { size: 18 }) + ' ' + escapeHtml(quizSession.microCopy) + '</div>' +
          '<div class="feedback-body">' + escapeHtml(q.choiceExplanations[wrongIdx]) + '</div>' +
          '<div class="feedback-retry-prompt">' + icon('refresh', { size: 14 }) + ' ' + escapeHtml(quizSession.retryPrompt) + ' Pick another answer above.</div>' +
        '</div>'
      );
    } else if (quizSession.resolved) {
      var wasCorrect = quizSession.resolvedCorrect;
      feedback = (
        '<div class="feedback-panel ' + (wasCorrect ? 'correct' : 'incorrect') + '">' +
          '<div class="feedback-head">' + icon(wasCorrect ? 'check-circle' : 'x-circle', { size: 18 }) + ' ' + escapeHtml(quizSession.microCopy) + '</div>' +
          '<div class="feedback-body">' + escapeHtml(q.explanation) + '</div>' +
          '<div class="feedback-actions"><button class="btn btn-primary" id="nextQBtn">' + (qNum >= qTotal ? 'Finish' : 'Continue') + ' <span class="kbd">Enter</span></button></div>' +
        '</div>'
      );
    }

    var timerChip = '';
    if (quizSession.mode === 'timed' && !locked) {
      timerChip = '<span class="streak-pill">' + icon('clock', { size: 14 }) + ' ' + quizSession.timeLeft + 's</span>';
    } else if (quizSession.mode !== 'timed') {
      timerChip = '<span class="session-chip">' + icon('clock', { size: 14 }) + ' <span id="elapsedTime">' + quizSession.elapsed + '</span>s on this question</span>';
    }

    return (
      '<div class="view active" style="--cat-color:' + cat.color + '">' +
        '<div class="quiz-session-bar">' +
          '<span class="session-chip cat-chip"><span class="cat-dot"></span>' + escapeHtml(cat.name) + ' · ' + modeLabel + ' · <b>Q' + qNum + ' of ' + qTotal + '</b> · <b>' + accSoFar + '%</b> accuracy</span>' +
          '<div style="display:flex;gap:8px;align-items:center;">' + timerChip +
            '<span class="streak-pill' + (progress.streak.current >= 5 ? ' hot' : '') + '">' + icon('flame', { size: 14 }) + ' ' + progress.streak.current + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="q-progress-track"><div class="q-progress-fill" style="width:' + pctOf(qNum - 1, qTotal) + '%"></div></div>' +
        '<div class="question-card' + (isFreshQuestion ? ' card-enter' : '') + '">' +
          '<div class="card-glow"></div>' +
          '<div class="q-meta"><span class="diff-badge diff-' + q.difficulty + '">' + q.difficulty + '</span></div>' +
          '<div class="question-text">' + questionHtml + '</div>' +
          '<div class="choices-list">' + choicesHtml + '</div>' +
          feedback +
        '</div>' +
        '<p class="kbd-hint">Press <span class="kbd">A</span>–<span class="kbd">D</span> or <span class="kbd">1</span>–<span class="kbd">4</span> to answer · <span class="kbd">Enter</span> to continue</p>' +
      '</div>'
    );
  }

  function bindQuizScreen() {
    if (!quizSession || quizSession.done) {
      bindSessionComplete();
      return;
    }
    clearQuizTimer();
    if (quizSession.mode === 'timed' && !quizSession.resolved) {
      quizSession.timer = setInterval(function () {
        quizSession.timeLeft--;
        if (quizSession.timeLeft <= 0) {
          clearQuizTimer();
          handleAnswer(-1); // timeout = no answer
        } else {
          updateTimerDisplay();
        }
      }, 1000);
    } else if (quizSession.mode !== 'timed' && !quizSession.resolved) {
      quizSession.timer = setInterval(function () {
        quizSession.elapsed++;
        var el = document.getElementById('elapsedTime');
        if (el) el.textContent = quizSession.elapsed;
      }, 1000);
    }

    document.querySelectorAll('.choice-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (quizSession.resolved || btn.disabled) return;
        handleAnswer(parseInt(btn.getAttribute('data-idx'), 10));
      });
    });
    var nextBtn = document.getElementById('nextQBtn');
    if (nextBtn) nextBtn.addEventListener('click', advanceQuestion);
  }

  function updateTimerDisplay() {
    var pill = appEl.querySelector('.quiz-session-bar .streak-pill');
    if (pill && quizSession.mode === 'timed') pill.innerHTML = icon('clock', { size: 14 }) + ' ' + Math.max(0, quizSession.timeLeft) + 's';
  }

  function clearQuizTimer() {
    if (quizSession && quizSession.timer) {
      clearInterval(quizSession.timer);
      quizSession.timer = null;
    }
  }

  // Flags answers that arrive faster than anyone could plausibly have read the
  // question and its choices. Assumes a generous ~300wpm reading pace and only
  // ever requires half of that fastest-plausible time, clamped to a sane range,
  // so genuinely fast readers are not nagged — only "I didn't read it" speeds.
  function checkSpeedReading(q) {
    if (!quizSession || quizSession.mode === 'timed') return;
    var elapsedMs = Date.now() - quizSession.qStartedAt;
    var totalWords = wordCount(q.question) + q.choices.reduce(function (sum, c) { return sum + wordCount(c); }, 0);
    var minPlausibleSec = totalWords / (300 / 60);
    var threshold = Math.min(8, Math.max(2.5, minPlausibleSec * 0.5));
    if (elapsedMs / 1000 >= threshold) return;
    // Throttle: don't nag on every single fast answer, only every few questions
    if (quizSession.pointer - quizSession.lastSpeedNudgeAt < 3) return;
    quizSession.lastSpeedNudgeAt = quizSession.pointer;
    showSpeedNudge(elapsedMs / 1000);
  }

  function showSpeedNudge(seconds) {
    var root = document.getElementById('speedNudgeRoot');
    if (!root) return;
    var secLabel = seconds < 1 ? seconds.toFixed(1) : Math.round(seconds).toString();
    var catchLine = pick(SPEED_CATCH_PHRASES).replace('{s}', secLabel);
    var motivateLine = pick(SPEED_MOTIVATE_PHRASES);
    var el = document.createElement('div');
    el.className = 'speed-nudge';
    el.innerHTML =
      '<div class="speed-nudge-bot">' + icon('robot', { size: 26 }) + '</div>' +
      '<div class="speed-nudge-body">' +
        '<p class="speed-nudge-catch">' + escapeHtml(catchLine) + '</p>' +
        '<p class="speed-nudge-motivate">' + escapeHtml(motivateLine) + '</p>' +
      '</div>' +
      '<button class="speed-nudge-close" aria-label="Dismiss">' + icon('cross', { size: 12 }) + '</button>';
    root.innerHTML = '';
    root.appendChild(el);
    var dismissTimer = setTimeout(function () { el.remove(); }, 6500);
    el.querySelector('.speed-nudge-close').addEventListener('click', function () {
      clearTimeout(dismissTimer);
      el.remove();
    });
  }

  function handleAnswer(idx) {
    if (!quizSession || quizSession.resolved) return;
    var q = currentQuestion();
    var isTimeout = idx === -1;
    var correct = !isTimeout && idx === q.correctIndex;

    // First-try tracking is locked in on the very first click for this question,
    // and drives streak/pass-rate — the second chance is a learning aid, not a
    // way to reclaim a streak or a "100% pass" you didn't get on your first try.
    var isFirstClick = !(q.id in quizSession.firstTry);
    if (isFirstClick) {
      quizSession.firstTry[q.id] = correct;
      if (correct) quizSession.correctFirstTryCount++;
      if (correct) {
        progress.streak.current++;
        if (progress.streak.current > progress.streak.best) progress.streak.best = progress.streak.current;
        if (STREAK_MILESTONES.indexOf(progress.streak.current) !== -1) {
          burstConfetti();
          showToast(progress.streak.current + ' in a row!', true, 'flame');
          awardBadge('streak_' + progress.streak.current);
        }
      } else {
        progress.streak.current = 0;
      }
      if (!isTimeout) checkSpeedReading(q);
    }

    if (correct) {
      clearQuizTimer();
      quizSession.answeredIdx = idx;
      quizSession.resolved = true;
      quizSession.resolvedCorrect = true;
      quizSession.microCopy = quizSession.wrongTries.length > 0 ? pick(SECOND_TRY_PHRASES) : pick(CORRECT_PHRASES);
      finalizeQuestionOutcome(q, true);
    } else if (!isTimeout && quizSession.wrongTries.length === 0) {
      // First wrong pick: show why THIS choice is wrong, then give a second chance
      clearQuizTimer();
      quizSession.wrongTries.push(idx);
      quizSession.answeredIdx = idx;
      quizSession.awaitingRetry = true;
      quizSession.microCopy = pick(INCORRECT_PHRASES);
      quizSession.retryPrompt = pick(RETRY_PROMPT_PHRASES);
      saveProgress();
    } else {
      // Second wrong pick (or a timeout) — fully resolved as incorrect
      clearQuizTimer();
      if (!isTimeout) quizSession.wrongTries.push(idx);
      quizSession.answeredIdx = idx;
      quizSession.resolved = true;
      quizSession.resolvedCorrect = false;
      quizSession.awaitingRetry = false;
      quizSession.microCopy = pick(INCORRECT_PHRASES);
      finalizeQuestionOutcome(q, false);
    }

    render();
  }

  function finalizeQuestionOutcome(q, finalCorrect) {
    var cp = progress.categories[quizSession.catId];
    if (!cp.questionStats[q.id]) cp.questionStats[q.id] = { lastResult: null, timesSeen: 0, timesCorrect: 0 };
    var qs = cp.questionStats[q.id];
    qs.timesSeen++;
    qs.lastResult = finalCorrect ? 'correct' : 'incorrect';
    if (finalCorrect) qs.timesCorrect++;

    progress.totalAttempted++;
    if (finalCorrect) progress.totalCorrect++;

    // Requeue for re-drill later this session if the FIRST attempt was wrong,
    // regardless of whether the second chance salvaged it.
    if (!quizSession.firstTry[q.id] && !quizSession.requeued[q.id]) {
      quizSession.requeued[q.id] = true;
      quizSession.order.push(q.id);
    }

    saveProgress();
  }

  function advanceQuestion() {
    if (!quizSession) return;
    quizSession.pointer++;
    quizSession.qStartedAt = Date.now();
    quizSession.answeredIdx = null;
    quizSession.wrongTries = [];
    quizSession.awaitingRetry = false;
    quizSession.resolved = false;
    quizSession.resolvedCorrect = null;
    quizSession.timeLeft = TIMED_SECONDS_PER_Q;
    quizSession.elapsed = 0;
    if (quizSession.pointer >= quizSession.order.length) {
      finishSession();
    } else {
      render();
    }
  }

  function finishSession() {
    var cat = findCategory(quizSession.catId);
    var cp = progress.categories[quizSession.catId];
    var isFullRun = quizSession.mode !== 'retry' && quizSession.totalUnique === cat.questions.length;
    var scorePct = pctOf(quizSession.correctFirstTryCount, quizSession.totalUnique);
    var wasAlreadyPassed = cp.passed;

    var justPassed = false;
    if (isFullRun) {
      cp.attemptsCount++;
      cp.lastAttemptAt = Date.now();
      if (scorePct > cp.bestScorePct) cp.bestScorePct = scorePct;
      if (scorePct === 100) {
        if (!wasAlreadyPassed) {
          justPassed = true;
          cp.passed = true;
          if (cp.hadFailedAttempt) {
            awardBadge('comeback_kid');
          } else if (cp.attemptsCount === 1) {
            awardBadge('perfectionist');
          }
          if (quizSession.mode === 'timed') awardBadge('speed_runner');
          if (CATEGORIES.every(function (c) { return progress.categories[c.id].passed; })) {
            awardBadge('course_champion');
          }
        }
      } else {
        cp.hadFailedAttempt = true;
      }
    }

    if (progress.totalAttempted > 0) awardBadge('first_steps');

    progress.history.push({ date: todayStr(), accuracy: scorePct });
    if (progress.history.length > 60) progress.history = progress.history.slice(-60);

    saveProgress();
    quizSession.done = true;
    quizSession.finalScorePct = scorePct;
    quizSession.justPassed = justPassed;
    quizSession.isFullRun = isFullRun;
    quizSession.missedIds = Object.keys(quizSession.firstTry).filter(function (qid) {
      return !quizSession.firstTry[qid];
    });

    if (justPassed) {
      setTimeout(burstConfetti, 200);
    }
    render();
  }

  function renderSessionComplete() {
    var cat = findCategory(quizSession.catId);
    var scorePct = quizSession.finalScorePct;
    var missed = quizSession.totalUnique - quizSession.correctFirstTryCount;
    var passLine = quizSession.isFullRun
      ? (scorePct === 100
          ? (quizSession.justPassed ? 'Category passed!' : 'Perfect run — category already passed.')
          : 'Score 100% in one full attempt to mark this category passed.')
      : 'This was a partial drill — it does not count toward passing the category.';

    var actions = '<button class="btn btn-secondary" id="backToCatsBtn">Back to categories</button>';
    if (missed > 0 && quizSession.mode !== 'retry') {
      actions += '<button class="btn btn-primary" id="retryMissedBtn">' + icon('target', { size: 14 }) + ' Drill just the ' + missed + ' you missed</button>';
    } else {
      actions += '<button class="btn btn-primary" id="retryAgainBtn">Try again</button>';
    }

    return (
      '<div class="view active">' +
        '<div class="card session-complete">' +
          '<p class="micro-label">' + escapeHtml(cat.name) + ' complete</p>' +
          '<div class="big-score">' + scorePct + '%</div>' +
          '<p class="text-muted">' + quizSession.correctFirstTryCount + ' of ' + quizSession.totalUnique + ' correct on first try</p>' +
          '<p class="mt-16">' + passLine + '</p>' +
          '<div class="complete-actions">' + actions + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function bindSessionComplete() {
    var back = document.getElementById('backToCatsBtn');
    if (back) back.addEventListener('click', function () { quizSession = null; navigate('categories'); });
    var retryMissed = document.getElementById('retryMissedBtn');
    if (retryMissed) retryMissed.addEventListener('click', function () {
      var catId = quizSession.catId;
      var ids = quizSession.missedIds;
      beginSession(catId, 'retry', ids);
    });
    var retryAgain = document.getElementById('retryAgainBtn');
    if (retryAgain) retryAgain.addEventListener('click', function () {
      var catId = quizSession.catId;
      var mode = quizSession.mode;
      beginSession(catId, mode === 'retry' ? 'study' : mode);
    });
  }

  // ============================================================
  // Progress dashboard
  // ============================================================
  function renderProgressView() {
    var rows = CATEGORIES.map(function (cat, i) {
      var cp = progress.categories[cat.id];
      var status = cp.passed ? '<span class="status-pill status-pass">Passed</span>' :
        '<span class="status-pill status-progress">In progress</span>';
      return (
        '<tr>' +
          '<td>' + (i + 1) + '. ' + escapeHtml(cat.name) + '</td>' +
          '<td>' + cp.attemptsCount + '</td>' +
          '<td>' + cp.bestScorePct + '%</td>' +
          '<td>' + status + '</td>' +
        '</tr>'
      );
    }).join('');

    var history = progress.history.slice(-14);
    var chart = history.length ? (
      '<div class="chart-wrap">' +
        history.map(function (h) {
          return '<div class="chart-bar filled" style="height:' + Math.max(4, h.accuracy) + '%" title="' + h.date + ': ' + h.accuracy + '%"></div>';
        }).join('') +
      '</div>'
    ) : '<div class="chart-empty">Complete a quiz session to start tracking accuracy over time.</div>';

    var badgeGrid = Object.keys(BADGE_DEFS).map(function (id) {
      var def = BADGE_DEFS[id];
      var earned = progress.badges.indexOf(id) !== -1;
      return (
        '<div class="badge-tile ' + (earned ? 'earned' : '') + '">' +
          '<div class="badge-icon">' + icon(def.icon, { size: 26 }) + '</div>' +
          '<div class="badge-name">' + escapeHtml(def.name) + '</div>' +
          '<div class="badge-desc">' + escapeHtml(def.desc) + '</div>' +
        '</div>'
      );
    }).join('');

    return (
      '<div class="view active">' +
        '<div class="section-head"><h2>Progress</h2></div>' +
        '<div class="stat-row">' +
          '<div class="stat-tile accent"><div class="stat-value">' + overallCompletionPct() + '%</div><div class="stat-label">Course complete</div></div>' +
          '<div class="stat-tile"><div class="stat-value">' + progress.streak.current + '</div><div class="stat-label">Current streak</div></div>' +
          '<div class="stat-tile"><div class="stat-value">' + progress.streak.best + '</div><div class="stat-label">Best streak</div></div>' +
          '<div class="stat-tile"><div class="stat-value">' + progress.totalAttempted + '</div><div class="stat-label">Questions attempted</div></div>' +
          '<div class="stat-tile"><div class="stat-value">' + pctOf(progress.totalCorrect, progress.totalAttempted) + '%</div><div class="stat-label">Lifetime accuracy</div></div>' +
        '</div>' +
        '<div class="card">' +
          '<div class="section-head"><h2>Category leaderboard</h2></div>' +
          '<div class="data-table-wrap"><table class="data-table">' +
            '<thead><tr><th>Category</th><th>Attempts</th><th>Best score</th><th>Status</th></tr></thead>' +
            '<tbody>' + rows + '</tbody>' +
          '</table></div>' +
        '</div>' +
        '<div class="card mt-24">' +
          '<div class="section-head"><h2>Accuracy over time</h2><span class="hint">Last ' + history.length + ' sessions</span></div>' +
          chart +
        '</div>' +
        '<div class="card mt-24">' +
          '<div class="section-head"><h2>Badges</h2></div>' +
          '<div class="badge-grid">' + badgeGrid + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function bindProgressView() {}

  // ============================================================
  // About / settings
  // ============================================================
  function renderAbout() {
    return (
      '<div class="view active">' +
        '<div class="section-head"><h2>About &amp; Settings</h2></div>' +
        '<div class="card">' +
          '<div class="notice-block">' +
            '<strong>Local-only progress.</strong> All your progress is saved locally in this browser only. Switching browsers or devices, or clearing your browser data, will permanently erase your progress. There is no account and no server backend.' +
          '</div>' +
          '<div class="notice-block">' +
            '<strong>Content disclaimer.</strong> Practice questions in this app were compiled from publicly available online sources, primarily CertiQ, and have not been officially verified or endorsed by Anthropic. Use this for practice only.' +
          '</div>' +
          '<div class="settings-row">' +
            '<div><div class="settings-label">Your name</div><div class="settings-hint">Shown on the Categories screen greeting.</div></div>' +
            '<input type="text" class="text-input" id="renameInput" style="max-width:200px;margin:0;" value="' + escapeHtml(profile.name) + '">' +
          '</div>' +
          '<div class="settings-row">' +
            '<div><div class="settings-label">Feedback</div><div class="settings-hint">Found a wrong answer or a bug? Let us know.</div></div>' +
            '<a href="mailto:visns@deloitte.com?subject=CCAF%20Trainer%20feedback" class="btn btn-secondary btn-sm">Send feedback</a>' +
          '</div>' +
          '<div class="settings-row">' +
            '<div><div class="settings-label">Reset all progress</div><div class="settings-hint">Clears every category, badge, and streak. Cannot be undone.</div></div>' +
            '<button class="btn btn-danger btn-sm" id="resetProgressBtn">Reset progress</button>' +
          '</div>' +
        '</div>' +
        '<div class="card mt-24 dev-credit-card">' +
          '<p class="micro-label">Built by</p>' +
          '<p class="dev-credit-name">Vishnu NS</p>' +
          '<p class="dev-credit-detail"><a href="mailto:visns@deloitte.com">visns@deloitte.com</a></p>' +
          '<p class="dev-credit-detail text-muted">For internal learning purposes only.</p>' +
        '</div>' +
      '</div>'
    );
  }

  function bindAbout() {
    var renameInput = document.getElementById('renameInput');
    renameInput.addEventListener('change', function () {
      if (renameInput.value.trim()) {
        profile.name = renameInput.value.trim();
        saveProfile();
        renderNav();
      }
    });
    document.getElementById('resetProgressBtn').addEventListener('click', function () {
      showModal(
        'Reset all progress?',
        'This will permanently erase all category progress, badges, and streaks stored in this browser. This cannot be undone.',
        function () {
          progress = defaultProgress();
          saveProgress();
          showToast('Progress reset.');
          navigate('categories');
        }
      );
    });
  }

  function showModal(title, body, onConfirm) {
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML =
      '<div class="modal-box">' +
        '<h3>' + escapeHtml(title) + '</h3>' +
        '<p>' + escapeHtml(body) + '</p>' +
        '<div class="modal-actions">' +
          '<button class="btn btn-secondary" id="modalCancel">Cancel</button>' +
          '<button class="btn btn-danger" id="modalConfirm">Confirm</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
    document.getElementById('modalCancel').addEventListener('click', function () { overlay.remove(); });
    document.getElementById('modalConfirm').addEventListener('click', function () {
      overlay.remove();
      onConfirm();
    });
  }

  // ============================================================
  // Keyboard shortcuts
  // ============================================================
  document.addEventListener('keydown', function (e) {
    if (currentView !== 'quiz' || !quizSession || quizSession.done) return;
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    if (!quizSession.resolved) {
      var key = e.key.toUpperCase();
      var idx = -1;
      if (['1', '2', '3', '4', '5', '6'].indexOf(key) !== -1) idx = parseInt(key, 10) - 1;
      else if (['A', 'B', 'C', 'D', 'E', 'F'].indexOf(key) !== -1) idx = key.charCodeAt(0) - 65;
      var q = currentQuestion();
      if (idx !== -1 && q && idx < q.choices.length && quizSession.wrongTries.indexOf(idx) === -1) {
        handleAnswer(idx);
      }
    } else if (e.key === 'Enter') {
      advanceQuestion();
    }
  });

  // ============================================================
  // Nav wiring
  // ============================================================
  document.querySelectorAll('.nav-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var view = tab.getAttribute('data-view');
      if (view === 'study') pendingCategoryId = null;
      navigate(view);
    });
  });
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  // ============================================================
  // Init
  // ============================================================
  function init() {
    applyTheme();
    if (!profile.onboarded) {
      onboardStep = 1;
      currentView = 'onboarding';
    } else {
      currentView = 'categories';
    }
    renderNav();
    render();
  }

  init();
})();
