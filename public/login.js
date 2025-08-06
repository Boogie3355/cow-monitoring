// Admin credentials (in a real application, this would be handled server-side)
const ADMIN_CREDENTIALS = {
    username: 'Mani',
    password: 'Mani69'
};

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Set authentication flag in sessionStorage
        sessionStorage.setItem('isAuthenticated', 'true');
        // Redirect to main page
        window.location.href = 'index.html';
    } else {
        errorDiv.textContent = 'Invalid username or password';
        errorDiv.style.display = 'block';
    }
    
    return false;
} 