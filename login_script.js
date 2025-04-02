/*    --------     Logins and Password Reset Script        ---------
                                 ||
                                 ||
                                 ||
 * This script handles the login and password reset functionality
 * including keeping proper CSS transitions between screens made in CSS file
                                 ||
                                 ||
                                 ||
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeLayout(); 
    showLoginScreen();
});

const wrapper = document.querySelector('.wrapper');

// Form elements identification
const loginForm = document.querySelector('.form-box.login');
const forgotPasswordForm = document.querySelector('.form-box.forgot-password');
const otpVerifyForm = document.querySelector('.form-box.otp-verify');
const resetPasswordForm = document.querySelector('.form-box.reset-password');

// Info sections identification
const loginInfo = document.querySelector('.info-text.login-info');
const forgotInfo = document.querySelector('.info-text.forgot-info');

// Links identification for going back to previous screens
const showForgot = document.querySelector('.show-forgot');
const showLoginLinks = document.querySelectorAll('.show-login');
const showForgotLinks = document.querySelectorAll('.show-forgot');

// Capturing layout based on initial CSS styles for matching layouts view
function initializeLayout() {
    // For login info text
    setupInfoTextStyles(loginInfo, {
        display: 'flex',
        right: '0',
        left: 'auto',
        opacity: '1',
        pointerEvents: 'auto'
    });
    
    // For forgot password info text
    setupInfoTextStyles(forgotInfo, {
        display: 'flex',
        left: '-50%',
        right: 'auto',
        opacity: '0',
        pointerEvents: 'none'
    });
    
    // Set initial form box styles
    setupFormBoxStyles(loginForm, {
        left: '0',
        right: 'auto',
        opacity: '1',
        pointerEvents: 'auto'
    });
    
    // Set initial styles for other form boxes
    [forgotPasswordForm, otpVerifyForm, resetPasswordForm].forEach(form => {
        if (form) {
            setupFormBoxStyles(form, {
                right: '-50%',
                left: 'auto',
                opacity: '0',
                pointerEvents: 'none'
            });
        }
    });
}

// Function to set up styles for info text elements for its position and visibility
function setupInfoTextStyles(element, styles) {
    if (!element) return;
    
    element.style.position = 'absolute';
    element.style.width = '50%';
    element.style.height = '100%';
    element.style.padding = '40px';
    element.style.display = styles.display || 'flex';
    element.style.flexDirection = 'column';
    element.style.justifyContent = 'center';
    element.style.transition = 'all 0.6s ease-in-out';
    
    // Apply specific positioning
    if (styles.right) element.style.right = styles.right;
    if (styles.left) element.style.left = styles.left;
    element.style.opacity = styles.opacity;
    element.style.pointerEvents = styles.pointerEvents;
}

// Function to set up styles for form boxes for its position and visibility
function setupFormBoxStyles(element, styles) {
    if (!element) return;
    
    element.style.position = 'absolute';
    element.style.transition = 'all 0.6s ease-in-out';
    
    // Apply specific positioning
    if (styles.right) element.style.right = styles.right;
    if (styles.left) element.style.left = styles.left;
    element.style.opacity = styles.opacity;
    element.style.pointerEvents = styles.pointerEvents;
}

// Function to hide all forms content
function hideAllForms() {
    loginForm.classList.remove('active');
    forgotPasswordForm.classList.remove('active');
    otpVerifyForm.classList.remove('active');
    resetPasswordForm.classList.remove('active');
}

// Function to manage the login screen visibility and styles
function showLoginScreen() {
    hideAllForms();
    loginForm.classList.add('active');
    
    // Set login info styles
    setupInfoTextStyles(loginInfo, {
        display: 'flex',
        right: '0',
        left: 'auto',
        opacity: '1',
        pointerEvents: 'auto'
    });
    
    // Hide forgot info
    setupInfoTextStyles(forgotInfo, {
        display: 'flex',
        left: '-50%',
        right: 'auto',
        opacity: '0',
        pointerEvents: 'none'
    });
    
    // Position login form
    setupFormBoxStyles(loginForm, {
        left: '0',
        right: 'auto',
        opacity: '1',
        pointerEvents: 'auto'
    });
    
    // Position other forms off-screen
    [forgotPasswordForm, otpVerifyForm, resetPasswordForm].forEach(form => {
        if (form) {
            setupFormBoxStyles(form, {
                right: '-50%',
                left: 'auto',
                opacity: '0',
                pointerEvents: 'none'
            });
        }
    });
    
    // Reset all wrapper classes
    wrapper.classList.remove('active', 'verify', 'reset');
}

// Function to manage the forgot password screen visibility and styles
function showForgotPasswordScreen() {
    hideAllForms();
    forgotPasswordForm.classList.add('active');
    
    // Move login info out
    setupInfoTextStyles(loginInfo, {
        display: 'flex',
        right: '-50%',
        left: 'auto',
        opacity: '0',
        pointerEvents: 'none'
    });
    
    // Move forgot info in
    setupInfoTextStyles(forgotInfo, {
        display: 'flex',
        left: '0',
        right: 'auto',
        opacity: '1',
        pointerEvents: 'auto'
    });
    
    // Move login form out
    setupFormBoxStyles(loginForm, {
        left: '-50%',
        right: 'auto',
        opacity: '0',
        pointerEvents: 'none'
    });
    
    // Move forgot password form in
    setupFormBoxStyles(forgotPasswordForm, {
        right: '0',
        left: 'auto',
        opacity: '1',
        pointerEvents: 'auto'
    });
    
    // Keep other forms hidden
    [otpVerifyForm, resetPasswordForm].forEach(form => {
        if (form) {
            setupFormBoxStyles(form, {
                right: '-50%',
                left: 'auto',
                opacity: '0',
                pointerEvents: 'none'
            });
        }
    });
    
    wrapper.classList.add('active');
    wrapper.classList.remove('verify', 'reset');
}

// Function to manage the OTP verification screen visibility and styles
function showOTPScreen() {
    hideAllForms();
    otpVerifyForm.classList.add('active');
    
    // Keep forgot info visible for OTP screen
    setupInfoTextStyles(forgotInfo, {
        display: 'flex',
        left: '0',
        right: 'auto',
        opacity: '1',
        pointerEvents: 'auto'
    });
    
    // Keep login info hidden
    setupInfoTextStyles(loginInfo, {
        display: 'flex',
        right: '-50%',
        left: 'auto',
        opacity: '0',
        pointerEvents: 'none'
    });
    
    // Hide login and forgot forms
    setupFormBoxStyles(loginForm, {
        left: '-50%',
        right: 'auto',
        opacity: '0',
        pointerEvents: 'none'
    });
    
    setupFormBoxStyles(forgotPasswordForm, {
        right: '-50%',
        left: 'auto',
        opacity: '0',
        pointerEvents: 'none'
    });
    
    // Show OTP form
    setupFormBoxStyles(otpVerifyForm, {
        right: '0',
        left: 'auto',
        opacity: '1',
        pointerEvents: 'auto'
    });
    
    // Keep reset form hidden
    if (resetPasswordForm) {
        setupFormBoxStyles(resetPasswordForm, {
            right: '-50%',
            left: 'auto',
            opacity: '0',
            pointerEvents: 'none'
        });
    }
    
    wrapper.classList.remove('active');
    wrapper.classList.add('verify');
    wrapper.classList.remove('reset');
}

// Function to manage the reset password screen visibility and styles
function showResetPasswordScreen() {
    hideAllForms();
    resetPasswordForm.classList.add('active');
    
    // Keep forgot info visible for reset password screen
    setupInfoTextStyles(forgotInfo, {
        display: 'flex',
        left: '0', 
        right: 'auto',
        opacity: '1',
        pointerEvents: 'auto'
    });
    
    // Keep login info hidden
    setupInfoTextStyles(loginInfo, {
        display: 'flex',
        right: '-50%',
        left: 'auto',
        opacity: '0',
        pointerEvents: 'none'
    });
    
    // Hide login, forgot, and OTP forms
    [loginForm, forgotPasswordForm, otpVerifyForm].forEach(form => {
        if (form) {
            setupFormBoxStyles(form, {
                right: '-50%',
                left: 'auto',
                opacity: '0',
                pointerEvents: 'none'
            });
        }
    });
    
    // Show reset password form
    setupFormBoxStyles(resetPasswordForm, {
        right: '0',
        left: 'auto',
        opacity: '1',
        pointerEvents: 'auto'
    });
    
    wrapper.classList.remove('active', 'verify');
    wrapper.classList.add('reset');
}

//                     ||
//                     ||

//  ------     Event Listeners part    ---------

//                     ||
//                     ||

// Show Forgot Password Screen when clicking "Forgot password?"
showForgotLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // If we're in the OTP screen, we want to go back to forgot password
        const parentForm = link.closest('.form-box');
        
        if (parentForm && parentForm.classList.contains('otp-verify')) {
            showForgotPasswordScreen(); // Go back to forgot password screen
        } else {
            showForgotPasswordScreen(); // Regular forgot password navigation
        }
    });
});

// Show Login Screen from any other screen
showLoginLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginScreen();
    });
});

// Form Submissions
const forgotForm = document.querySelector('.form-box.forgot-password form');
const otpForm = document.querySelector('.form-box.otp-verify form');
const resetForm = document.querySelector('.form-box.reset-password form');

// Forgot Password Form Submit
if(forgotForm) {
    forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showOTPScreen();
    });
}

// OTP Form Submit
if(otpForm) {
    otpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showResetPasswordScreen();
    });
}

// Reset Password Form Submit
if(resetForm) {
    resetForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Here we would handle the password reset API call

        //                To be completed                          //
        
        // Show success message
        alert('Password reset successfully!');  //No really needed but it will be useful for testing
        
        // Auto redirect to login screen after successful reset
        showLoginScreen();
    });
}

// Auto-focus next OTP input
const otpInputs = document.querySelectorAll('.otp-container input');
otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if(e.target.value.length === 1 && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });
    
    // Handle backspace
    input.addEventListener('keydown', (e) => {
        if(e.key === 'Backspace' && index > 0 && !e.target.value) {
            otpInputs[index - 1].focus();
        }
    });
});
/* Here is the JavaScript code for the login and password reset functionality in the above code. 
It includes event listeners for form submissions, navigation between different 
screens, and handling OTP input focus. The code is structured to ensure a smooth 
user experience while managing the login and password reset processes. 

The script uses DOM manipulation to show and hide forms and info sections based on user interactions. 
Additionally, it includes basic validation for OTP inputs and handles backspace functionality for better usability.*/
/////
/////                            ||
/////                            ||

////       -------  Login with GOOGLE and APPLE part  -------

////                             ||
/////                            ||
////
