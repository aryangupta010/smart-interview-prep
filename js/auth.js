console.log("SMARTPREP AUTH.JS IS RUNNING");
document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       SMARTPREP AUTHENTICATION SYSTEM
       Handles:
       1. Login
       2. Signup
       3. Password visibility
       4. Validation
       5. LocalStorage
       6. Login / Signup navigation
       ========================================================= */


    /* =========================================================
       HELPER FUNCTIONS
       ========================================================= */

    function getSavedUser() {

        const savedUser =
            localStorage.getItem("smartprepUser");

        if (!savedUser) {
            return null;
        }

        try {

            return JSON.parse(savedUser);

        } catch (error) {

            console.error(
                "Error reading saved user:",
                error
            );

            localStorage.removeItem("smartprepUser");

            return null;
        }
    }


    function saveUser(user) {

        localStorage.setItem(
            "smartprepUser",
            JSON.stringify(user)
        );
    }


    function showError(element, message) {

        if (!element) return;

        element.className = "error-message";
        element.textContent = message;
    }


    function showSuccess(element, message) {

        if (!element) return;

        element.className = "success-message";
        element.textContent = message;
    }


    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);
    }



    /* =========================================================
       LOGIN PAGE
       ========================================================= */

    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        const emailInput =
            document.getElementById("email");

        const passwordInput =
            document.getElementById("password");

        const passwordToggle =
            document.getElementById("passwordToggle");

        const errorMessage =
            document.getElementById("errorMessage");


        /* -----------------------------------------------------
           PASSWORD SHOW / HIDE
           ----------------------------------------------------- */

        if (passwordToggle && passwordInput) {

            passwordToggle.addEventListener(
                "click",
                function () {

                    if (
                        passwordInput.type ===
                        "password"
                    ) {

                        passwordInput.type =
                            "text";

                        passwordToggle.textContent =
                            "Hide";

                    } else {

                        passwordInput.type =
                            "password";

                        passwordToggle.textContent =
                            "Show";
                    }

                }
            );

        }


        /* -----------------------------------------------------
           LOGIN FORM SUBMIT
           ----------------------------------------------------- */

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* Get values */

                const email =
                    emailInput.value
                        .trim()
                        .toLowerCase();

                const password =
                    passwordInput.value;


                /* Clear previous message */

                if (errorMessage) {

                    errorMessage.textContent = "";

                    errorMessage.className =
                        "error-message";

                }


                /* -------------------------------------------------
                   EMPTY FIELD CHECK
                   ------------------------------------------------- */

                if (
                    email === "" ||
                    password === ""
                ) {

                    showError(
                        errorMessage,
                        "Please enter your email and password."
                    );

                    return;
                }


                /* -------------------------------------------------
                   EMAIL CHECK
                   ------------------------------------------------- */

                if (!isValidEmail(email)) {

                    showError(
                        errorMessage,
                        "Please enter a valid email address."
                    );

                    return;
                }


                /* -------------------------------------------------
                   GET SAVED USER
                   ------------------------------------------------- */

                const user =
                    getSavedUser();


                /* -------------------------------------------------
                   NO ACCOUNT
                   ------------------------------------------------- */

                if (!user) {

                    showError(
                        errorMessage,
                        "No account found. Please sign up first."
                    );

                    return;
                }


                /* -------------------------------------------------
                   EMAIL MATCH
                   ------------------------------------------------- */

                const savedEmail =
                    String(user.email || "")
                        .trim()
                        .toLowerCase();


                if (savedEmail !== email) {

                    showError(
                        errorMessage,
                        "Email address is not registered."
                    );

                    return;
                }


                /* -------------------------------------------------
                   LOGIN SUCCESS
                   ------------------------------------------------- */

                user.loggedIn = true;

                saveUser(user);


                showSuccess(
                    errorMessage,
                    "Login successful! Redirecting..."
                );


                /* -------------------------------------------------
                   REDIRECT
                   ------------------------------------------------- */

                setTimeout(
                    function () {

                        if (
                            user.onboardingCompleted ===
                            true
                        ) {

                            window.location.href =
                                "dashboard.html";

                        } else {

                            window.location.href =
                                "onboarding.html";

                        }

                    },
                    700
                );

            }
        );

    }



    /* =========================================================
       SIGNUP PAGE
       ========================================================= */

    const signupForm =
        document.getElementById("signupForm");


    if (signupForm) {

        const nameInput =
            document.getElementById("signupName");

        const emailInput =
            document.getElementById("signupEmail");

        const passwordInput =
            document.getElementById("signupPassword");

        const confirmPasswordInput =
            document.getElementById(
                "confirmPassword"
            );

        const terms =
            document.getElementById("terms");

        const signupMessage =
            document.getElementById(
                "signupMessage"
            );


        /* -----------------------------------------------------
           SIGNUP FORM SUBMIT
           ----------------------------------------------------- */

        signupForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* Get values */

                const name =
                    nameInput.value.trim();

                const email =
                    emailInput.value
                        .trim()
                        .toLowerCase();

                const password =
                    passwordInput.value;

                const confirmPassword =
                    confirmPasswordInput.value;


                /* Clear previous message */

                if (signupMessage) {

                    signupMessage.textContent =
                        "";

                    signupMessage.className =
                        "error-message";

                }


                /* -------------------------------------------------
                   NAME VALIDATION
                   ------------------------------------------------- */

                if (name === "") {

                    showError(
                        signupMessage,
                        "Please enter your full name."
                    );

                    return;
                }


                /* -------------------------------------------------
                   EMAIL VALIDATION
                   ------------------------------------------------- */

                if (!isValidEmail(email)) {

                    showError(
                        signupMessage,
                        "Please enter a valid email address."
                    );

                    return;
                }


                /* -------------------------------------------------
                   PASSWORD LENGTH
                   ------------------------------------------------- */

                if (password.length < 6) {

                    showError(
                        signupMessage,
                        "Password must contain at least 6 characters."
                    );

                    return;
                }


                /* -------------------------------------------------
                   PASSWORD MATCH
                   ------------------------------------------------- */

                if (
                    password !==
                    confirmPassword
                ) {

                    showError(
                        signupMessage,
                        "Passwords do not match."
                    );

                    return;
                }


                /* -------------------------------------------------
                   TERMS CHECK
                   ------------------------------------------------- */

                if (
                    !terms ||
                    !terms.checked
                ) {

                    showError(
                        signupMessage,
                        "Please accept the Terms & Conditions."
                    );

                    return;
                }


                /* -------------------------------------------------
                   CHECK EXISTING USER
                   ------------------------------------------------- */

                const existingUser =
                    getSavedUser();


                if (
                    existingUser &&
                    String(existingUser.email)
                        .trim()
                        .toLowerCase() ===
                    email
                ) {

                    showError(
                        signupMessage,
                        "An account with this email already exists. Please login."
                    );

                    return;
                }


                /* -------------------------------------------------
                   CREATE NEW USER
                   ------------------------------------------------- */

                const user = {

                    name: name,

                    email: email,

                    loggedIn: true,

                    onboardingCompleted: false,

                    education: "",

                    year: "",

                    targetRole: "",

                    skills: []

                };


                /* -------------------------------------------------
                   SAVE USER
                   ------------------------------------------------- */

                saveUser(user);


                /* -------------------------------------------------
                   SUCCESS MESSAGE
                   ------------------------------------------------- */

                showSuccess(
                    signupMessage,
                    "Account created successfully! Redirecting..."
                );


                /* -------------------------------------------------
                   REDIRECT TO ONBOARDING
                   ------------------------------------------------- */

                setTimeout(
                    function () {

                        window.location.href =
                            "onboarding.html";

                    },
                    700
                );

            }
        );

    }

});
