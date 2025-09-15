document.addEventListener('DOMContentLoaded', () => {
            // --- THEME TOGGLE ---
            const themeToggleButton = document.getElementById('theme-toggle');
            const htmlElement = document.documentElement;

            const setTheme = (theme) => {
                htmlElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
            };

            themeToggleButton.addEventListener('click', () => {
                const currentTheme = htmlElement.getAttribute('data-theme');
                setTheme(currentTheme === 'light' ? 'dark' : 'light');
            });

            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

            // --- FORM SWITCHING LOGIC ---
            const loginSection = document.getElementById('login-section');
            const registerSection = document.getElementById('register-section');
            const otpSection = document.getElementById('otp-section');
            
            const registerForm = document.getElementById('register-form');
            const otpForm = document.getElementById('otp-form');

            const showRegisterLink = document.getElementById('show-register-link');
            const showLoginFromRegister = document.getElementById('show-login-link-from-register');
            const showLoginFromOtp = document.getElementById('show-login-link-from-otp');

            const showSection = (sectionToShow) => {
                [loginSection, registerSection, otpSection].forEach(section => {
                    section.classList.add('hidden');
                });
                sectionToShow.classList.remove('hidden');
            };

            showRegisterLink.addEventListener('click', (e) => { e.preventDefault(); showSection(registerSection); });
            showLoginFromRegister.addEventListener('click', (e) => { e.preventDefault(); showSection(loginSection); });
            showLoginFromOtp.addEventListener('click', (e) => { e.preventDefault(); showSection(loginSection); });

            // On registration form submit, show OTP section
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault(); // Prevent actual form submission
                // Here you would typically call your backend to send an OTP
                console.log('Registration form submitted. Showing OTP verification.');
                showSection(otpSection);
            });

            // On OTP form submit, (for now) just log and go to login
            otpForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const otpInputs = document.querySelectorAll('#otp-inputs .otp-input');
                const otp = Array.from(otpInputs).map(input => input.value).join('');
                console.log('Verifying OTP:', otp);
                // Here you would verify the OTP. On success:
                alert('Account created successfully! Please log in.');
                showSection(loginSection);
            });
            
            // --- OTP INPUT HANDLING ---
            const otpInputsContainer = document.getElementById('otp-inputs');
            if (otpInputsContainer) {
                const inputs = otpInputsContainer.querySelectorAll('.otp-input');
                inputs.forEach((input, index) => {
                    input.addEventListener('input', () => {
                        if (input.value.length === 1 && index < inputs.length - 1) {
                            inputs[index + 1].focus();
                        }
                    });

                    input.addEventListener('keydown', (e) => {
                        if (e.key === "Backspace" && !input.value && index > 0) {
                            inputs[index - 1].focus();
                        }
                    });
                });
            }
        });