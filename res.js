document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirmPassword').value;

  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  // Simulate success (you can send to server here)
  alert("Registered Successfully!");
  window.location.href = "index.html"; // Redirect to login page if needed
});