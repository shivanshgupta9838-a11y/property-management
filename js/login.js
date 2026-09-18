document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        console.error("loginForm not found");
        return;
    }

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const loginError = document.getElementById("loginError");

        loginError.textContent = "";

        try {

            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });

            if (error) {
                console.error("Login error:", error);
                loginError.textContent = error.message;
                return;
            }

            console.log("Login successful:", data);

            window.location.href = "dashboard.html";

        } catch (err) {

            console.error("Unexpected error:", err);

            loginError.textContent =
                "Login failed. Please try again.";

        }

    });

});
