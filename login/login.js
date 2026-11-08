document.addEventListener('DOMContentLoaded', () => {

  // FINAL: CREATE THEME BUTTON
  if (!document.getElementById('theme-toggle-btn')) {
    const host =
      document.querySelector('.top-nav-bar') ||
      document.querySelector('.bg-auth-left') ||
      document.body;

    const toggle = document.createElement('button');

    toggle.id = 'theme-toggle-btn';
    toggle.type = 'button';
    toggle.className = 'btn btn-mc-back';
    toggle.textContent = '🌙 Theme';

    host.appendChild(toggle);
  }

  // FINAL: DARK MODE STYLES
  if (!document.getElementById('md-final-login-style')) {
    const style = document.createElement('style');
    style.id = 'md-final-login-style';

    style.textContent = `
      #theme-toggle-btn {
        z-index: 20;
        position: relative;
        white-space: nowrap;
      }

      body.dark-mode {
        background: #101810 !important;
        color: #eff7e9 !important;
      }

      body.dark-mode .bg-auth-left,
      body.dark-mode .photo-section {
        background-color: #172517 !important;
      }

      body.dark-mode .mc-card,
      body.dark-mode .mc-logo-card {
        background: #233323 !important;
        color: #fff !important;
      }

      body.dark-mode .main-title,
      body.dark-mode h1,
      body.dark-mode h2,
      body.dark-mode h3,
      body.dark-mode .text-dark {
        color: #f0f7e9 !important;
      }

      body.dark-mode .subtitle,
      body.dark-mode .text-muted,
      body.dark-mode .form-label {
        color: #c2d3be !important;
      }

      body.dark-mode .mc-input,
      body.dark-mode .form-control {
        background: #142214 !important;
        color: #fff !important;
        border-color: #668066 !important;
      }

      body.dark-mode .mc-input::placeholder {
        color: #b4c6ae !important;
      }

      body.dark-mode .btn--outline,
      body.dark-mode .btn-google,
      body.dark-mode .btn-mc-back {
        background: #273b27 !important;
        color: #f3faee !important;
        border-color: #70936c !important;
      }
    `;

    document.head.appendChild(style);
  }

  // RESTORE SAVED THEME
  const savedTheme = localStorage.getItem('mineDropTheme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  const themeBtn = document.getElementById('theme-toggle-btn');

  if (themeBtn) {
    if (document.body.classList.contains('dark-mode')) {
      themeBtn.textContent = '☀️ Light';
    }

    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');

      const isDark = document.body.classList.contains('dark-mode');

      localStorage.setItem(
        'mineDropTheme',
        isDark ? 'dark' : 'light'
      );

      themeBtn.textContent = isDark ? '☀️ Light' : '🌙 Theme';
    });
  }

  // PAGE ELEMENTS
  const welcomeView = document.getElementById('welcome-view');
  const registerView = document.getElementById('register-view');
  const loginView = document.getElementById('login-view');

  const backBtn = document.getElementById('back-btn');
  const authAlert = document.getElementById('auth-alert');

  const btnShowRegister =
    document.getElementById('btn-show-register');

  const btnShowLogin =
    document.getElementById('btn-show-login');

  const btnGoogleDemo =
    document.getElementById('btn-google-demo');

  const registerForm =
    document.getElementById('register-form');

  const loginForm =
    document.getElementById('login-form');

  // SWITCH BETWEEN VIEWS
  function showView(view) {
    welcomeView.classList.add('d-none');
    registerView.classList.add('d-none');
    loginView.classList.add('d-none');
    authAlert.classList.add('d-none');

    if (view === 'register') {
      registerView.classList.remove('d-none');
      backBtn.classList.remove('d-none');

    } else if (view === 'login') {
      loginView.classList.remove('d-none');
      backBtn.classList.remove('d-none');

    } else {
      welcomeView.classList.remove('d-none');
      backBtn.classList.add('d-none');
    }
  }

  btnShowRegister.addEventListener('click', () => {
    showView('register');
  });

  btnShowLogin.addEventListener('click', () => {
    showView('login');
  });

  backBtn.addEventListener('click', () => {
    showView('welcome');
  });

  // GOOGLE DEMO LOGIN
  btnGoogleDemo.addEventListener('click', () => {
    const demoUser = {
      name: 'Minecraft Fan',
      surname: 'User',
      email: 'demo@google.com',
      phone: '+77070000000',
      isLoggedIn: true
    };

    if (!window.MineDropAccounts.signIn(demoUser, true)) {
      showAlert('Could not save demo account. Please try again.', 'danger');
      return;
    }

    showAlert(
      'Logged in with Google Demo! Redirecting...',
      'success'
    );

    setTimeout(() => {
      window.location.href = '../home/main.html';
    }, 1200);
  });

  // DISPLAY ALERT
  function showAlert(message, type = 'success') {
    authAlert.className = `alert alert-${type} my-3`;
    authAlert.textContent = message;
    authAlert.classList.remove('d-none');
  }

  // EMAIL VALIDATION
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // PHONE VALIDATION
  function validatePhone(phone) {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10;
  }

  // FIELD VALIDATION STYLES
  function setFieldStatus(inputElement, isValid) {
    if (isValid) {
      inputElement.classList.remove('is-invalid');
      inputElement.classList.add('is-valid');
    } else {
      inputElement.classList.remove('is-valid');
      inputElement.classList.add('is-invalid');
    }
  }

  // REGISTER
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput =
      document.getElementById('reg-name');

    const surnameInput =
      document.getElementById('reg-surname');

    const emailInput =
      document.getElementById('reg-email');

    const phoneInput =
      document.getElementById('reg-phone');

    const isNameValid =
      nameInput.value.trim().length >= 2;

    const isSurnameValid =
      surnameInput.value.trim().length >= 2;

    const isEmailValid =
      validateEmail(emailInput.value.trim());

    const isPhoneValid =
      validatePhone(phoneInput.value.trim());

    setFieldStatus(nameInput, isNameValid);
    setFieldStatus(surnameInput, isSurnameValid);
    setFieldStatus(emailInput, isEmailValid);
    setFieldStatus(phoneInput, isPhoneValid);

    if (
      isNameValid &&
      isSurnameValid &&
      isEmailValid &&
      isPhoneValid
    ) {
      const userData = {
        name: nameInput.value.trim(),
        surname: surnameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        isLoggedIn: true
      };

      if (!window.MineDropAccounts.signIn(userData, true)) {
        showAlert('Could not save registration. Please try again.', 'danger');
        return;
      }

      showAlert(
        'Registration successful! Redirecting...',
        'success'
      );

      setTimeout(() => {
        window.location.href = '../home/main.html';
      }, 1200);

    } else {
      showAlert(
        'Please check and fix the invalid fields.',
        'danger'
      );
    }
  });

  // LOGIN
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput =
      document.getElementById('login-email');

    const isEmailValid =
      validateEmail(emailInput.value.trim());

    setFieldStatus(emailInput, isEmailValid);

    if (isEmailValid) {
      // Sign in using the entered email. Never reuse a different user's name.
      const userData = window.MineDropAccounts.signIn({
        email: emailInput.value.trim()
      });
      if (!userData) {
        showAlert('Could not open this demo account.', 'danger');
        return;
      }

      showAlert(
        'Log in successful! Redirecting...',
        'success'
      );

      setTimeout(() => {
        window.location.href = '../home/main.html';
      }, 1200);

    } else {
      showAlert(
        'Please enter a valid email address.',
        'danger'
      );
    }
  });
});
