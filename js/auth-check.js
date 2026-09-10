// ==========================================
// ADMIN AUTH CHECK
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        const {
            data,
            error
        } =
            await supabaseClient.auth.getSession();


        // USER NOT LOGGED IN

        if (
            error ||
            !data.session
        ) {

            window.location.href =
                "login.html";

            return;

        }

    }
);