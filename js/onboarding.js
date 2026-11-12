document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("onboardingForm");

    const message = document.getElementById("onboardingMessage");


    // Check whether the onboarding form exists
    if (!form) {
        return;
    }


    form.addEventListener("submit", function (event) {

        // Prevent page from refreshing
        event.preventDefault();


        // Get values from the form
        const education =
            document.getElementById("education").value;

        const year =
            document.getElementById("year").value;

        const targetRole =
            document.getElementById("targetRole").value;


        // Get selected skills
        const selectedSkills =
            document.querySelectorAll(
                'input[name="skill"]:checked'
            );


        // Clear previous message
        message.textContent = "";
        message.className = "error-message";


        // Check required fields
        if (
            education === "" ||
            year === "" ||
            targetRole === ""
        ) {

            message.textContent =
                "Please complete all required fields.";

            return;
        }


        // Check whether at least one skill is selected
        if (selectedSkills.length === 0) {

            message.textContent =
                "Please select at least one area to improve.";

            return;
        }


        // Store selected skills
        const skills = [];


        selectedSkills.forEach(function (skill) {

            skills.push(skill.value);

        });


        // Get existing user information
        let user = window.getSmartPrepUser();


        // If user doesn't exist, send them to login
        // Add onboarding information to user
        user.education = education;

        user.year = year;

        user.targetRole = targetRole;

        user.skills = skills;

        user.onboardingCompleted = true;


        // Save updated user
        localStorage.setItem(
            "smartprepUser",
            JSON.stringify(user)
        );


        // Show success message
        message.className = "success-message";

        message.textContent =
            "Profile created successfully!";


        // Open dashboard
        setTimeout(function () {

            window.location.href = "dashboard.html";

        }, 700);

    });

});