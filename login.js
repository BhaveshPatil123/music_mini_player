document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  // You can add actual login verification here
  alert("Login successful!");
  window.location.href = "index.html"; // Redirect to your music player
});