document.addEventListener('DOMContentLoaded', () => {
    const farmerBtn = document.getElementById('farmer-btn');
    const customerBtn = document.getElementById('customer-btn');
    const formContainer = document.getElementById('form-container');
    const authForm = document.getElementById('auth-form');
    const signupLink = document.getElementById('signup-link');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');

    let userType = 'farmer';
    function toggleForm(type) {
        userType = type;
        document.querySelectorAll('.user-type button').forEach(btn => {
            btn.classList.toggle('active', btn.id === `${userType}-btn`);
        });
        formTitle.textContent = 'Login';
        signupLink.style.display = 'block';
        submitBtn.textContent = 'Login';
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        if (userType === 'farmer') {
            window.location.href = 'farmer-dashboard.html';
        } else {
            window.location.href = 'customer-dashboard.html';
        }
    }

    function handleSignup(e) {
        e.preventDefault();
        formTitle.textContent = 'Signup';
        signupLink.style.display = 'none';
        submitBtn.textContent = 'Signup';
    }

    farmerBtn.addEventListener('click', () => toggleForm('farmer'));
    customerBtn.addEventListener('click', () => toggleForm('customer'));
    authForm.addEventListener('submit', handleFormSubmit);
    document.getElementById('signup-btn').addEventListener('click', handleSignup);
});
