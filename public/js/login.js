const alertContainer = document.getElementById('alert-container');

const loginFormHandler = async (event) => {
  event.preventDefault();
  alertContainer.classList.add('invisible');

  const email = document.getElementById('loginForm-email').value.trim();
  const password = document.getElementById('loginForm-password').value.trim();

  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    return alertContainer.classList.remove('invisible');
  }

  return document.location.replace('/');
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);
