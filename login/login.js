document.addEventListener('DOMContentLoaded', () => {

  const welcomeView = document.getElementById('welcome-view');
  const registerView = document.getElementById('register-view');
  const loginView = document.getElementById('login-view');
  const backBtn = document.getElementById('back-btn');
  const authAlert = document.getElementById('auth-alert');


  const btnShowRegister = document.getElementById('btn-show-register');
  const btnShowLogin = document.getElementById('btn-show-login');
  const btnGoogleDemo = document.getElementById('btn-google-demo');


  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');


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

  btnShowRegister.addEventListener('click', () => showView('register'));
  btnShowLogin.addEventListener('click', () => showView('login'));
  backBtn.addEventListener('click', () => showView('welcome'));


  btnGoogleDemo.addEventListener('click', () => {
    const demoUser = {
      name: 'Minecraft Fan',
      surname: 'User',
      email: 'demo@google.com',
      phone: '+77070000000',
      isLoggedIn: true
    };
    localStorage.setItem('md_user', JSON.stringify(demoUser));
    showAlert('Logged in with Google Demo! Redirecting...', 'success');
    setTimeout(() => {
      window.location.href = '../home/main.html';
    }, 1200);
  });

  function showAlert(message, type = 'success') {
    authAlert.className = `alert alert-${type} my-3`;
    authAlert.textContent = message;
    authAlert.classList.remove('d-none');
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10;
  }

  function setFieldStatus(inputElement, isValid) {
    if (isValid) {
      inputElement.classList.remove('is-invalid');
      inputElement.classList.add('is-valid');
    } else {
      inputElement.classList.remove('is-valid');
      inputElement.classList.add('is-invalid');
    }
  }

 
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('reg-name');
    const surnameInput = document.getElementById('reg-surname');
    const emailInput = document.getElementById('reg-email');
    const phoneInput = document.getElementById('reg-phone');

    const isNameValid = nameInput.value.trim().length >= 2;
    const isSurnameValid = surnameInput.value.trim().length >= 2;
    const isEmailValid = validateEmail(emailInput.value.trim());
    const isPhoneValid = validatePhone(phoneInput.value.trim());

    setFieldStatus(nameInput, isNameValid);
    setFieldStatus(surnameInput, isSurnameValid);
    setFieldStatus(emailInput, isEmailValid);
    setFieldStatus(phoneInput, isPhoneValid);

    if (isNameValid && isSurnameValid && isEmailValid && isPhoneValid) {
      const userData = {
        name: nameInput.value.trim(),
        surname: surnameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        isLoggedIn: true
      };

      localStorage.setItem('md_user', JSON.stringify(userData));
      showAlert('Registration successful! Redirecting...', 'success');

      setTimeout(() => {
        window.location.href = '../home/main.html';
      }, 1200);
    } else {
      showAlert('Please check and fix the invalid fields.', 'danger');
    }
  });

  
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('login-email');
    const isEmailValid = validateEmail(emailInput.value.trim());

    setFieldStatus(emailInput, isEmailValid);

    if (isEmailValid) {
      const existingUserRaw = localStorage.getItem('md_user');
      let userData;

      if (existingUserRaw) {
        userData = JSON.parse(existingUserRaw);
        userData.email = emailInput.value.trim();
        userData.isLoggedIn = true;
      } else {
        const nameFromEmail = emailInput.value.split('@')[0];
        userData = {
          name: nameFromEmail,
          surname: 'User',
          email: emailInput.value.trim(),
          phone: '+70000000000',
          isLoggedIn: true
        };
      }

      localStorage.setItem('md_user', JSON.stringify(userData));
      showAlert('Log in successful! Redirecting...', 'success');

      setTimeout(() => {
        window.location.href = '../home/main.html';
      }, 1200);
    } else {
      showAlert('Please enter a valid email address.', 'danger');
    }
  });
});