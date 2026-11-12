document.addEventListener(
    "DOMContentLoaded",
    function () {

        const user = window.getSmartPrepUser();


        /* User name */

        const welcomeName =
            document.getElementById(
                "welcomeName"
            );

        const userName =
            document.getElementById(
                "userName"
            );
        const profileAvatar = document.querySelector(".profile-avatar");
        const profileRole = document.querySelector(".topbar-profile span");


        if (user.name && welcomeName && userName) {

            welcomeName.textContent =
                user.name.split(" ")[0];

            userName.textContent =
                user.name;

        }
        if (profileAvatar) {
            profileAvatar.textContent = String(user.name || "Student").trim().charAt(0).toUpperCase();
        }
        if (profileRole) {
            profileRole.textContent = user.targetRole || "Student";
        }


        /* Target role */

        const targetText =
            document.getElementById(
                "targetText"
            );


        if (user.targetRole && targetText) {

            targetText.textContent =
                "Your current goal: " +
                user.targetRole +
                ". Keep practicing and improving.";

        }

        const categoryLinks = document.querySelectorAll("[data-practice-category]");
        categoryLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                localStorage.setItem("smartprepPracticeCategory", link.dataset.practiceCategory);
            });
        });

        const challengeOptions = document.getElementById("challengeOptions");
        const challengeSubmit = document.getElementById("challengeSubmit");
        const challengeStatus = document.getElementById("challengeStatus");

        if (challengeOptions && challengeSubmit && challengeStatus) {
            const today = new Date();
            const todayKey = [
                today.getFullYear(),
                String(today.getMonth() + 1).padStart(2, "0"),
                String(today.getDate()).padStart(2, "0")
            ].join("-");
            let selectedOption = null;
            let previousChallenge = null;

            try {
                previousChallenge = JSON.parse(localStorage.getItem("smartprepDailyChallenge") || "null");
            } catch (error) {
                console.error("Could not read the saved daily challenge:", error);
                challengeStatus.textContent = "Your saved challenge result could not be read. You can still try today's question.";
            }

            const options = Array.from(challengeOptions.querySelectorAll(".challenge-option"));
            if (previousChallenge && previousChallenge.date === todayKey) {
                options.forEach(function (option) {
                    option.disabled = true;
                    if (option.dataset.answer === "true") option.classList.add("is-correct");
                });
                challengeSubmit.disabled = true;
                challengeSubmit.textContent = "Completed today";
                challengeStatus.textContent = previousChallenge.correct
                    ? "Nice work — you got today's warm-up right. Come back tomorrow for another."
                    : "Today's answer is shown above. Come back tomorrow for a fresh warm-up.";
            } else {
                options.forEach(function (option) {
                    option.addEventListener("click", function () {
                        options.forEach(function (item) {
                            item.classList.remove("is-selected");
                            item.setAttribute("aria-pressed", "false");
                        });
                        option.classList.add("is-selected");
                        option.setAttribute("aria-pressed", "true");
                        selectedOption = option;
                        challengeSubmit.disabled = false;
                        challengeStatus.textContent = "Ready when you are — check your answer.";
                    });
                    option.setAttribute("aria-pressed", "false");
                });

                challengeSubmit.addEventListener("click", function () {
                    if (!selectedOption) {
                        challengeStatus.textContent = "Choose an answer before checking.";
                        return;
                    }

                    const isCorrect = selectedOption.dataset.answer === "true";
                    options.forEach(function (option) {
                        option.disabled = true;
                        if (option.dataset.answer === "true") option.classList.add("is-correct");
                        else if (option === selectedOption) option.classList.add("is-incorrect");
                    });
                    challengeSubmit.disabled = true;
                    challengeSubmit.textContent = "Completed today";
                    challengeStatus.textContent = isCorrect
                        ? "Exactly right. The STAR structure helps keep behavioral answers clear and specific."
                        : "Good try. A clear situation, action, and result makes a behavioral answer easier to follow.";

                    try {
                        localStorage.setItem("smartprepDailyChallenge", JSON.stringify({
                            date: todayKey,
                            correct: isCorrect
                        }));
                    } catch (error) {
                        console.error("Could not save the daily challenge result:", error);
                        challengeStatus.textContent += " Your result could not be saved in this browser.";
                    }
                });
            }
        }


        /* Logout */

        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );


        logoutBtn.addEventListener(
            "click",
            function () {

                user.loggedIn = false;

                localStorage.setItem(
                    "smartprepUser",
                    JSON.stringify(user)
                );

                window.location.href =
                    "login.html";

            }
        );

    }
);