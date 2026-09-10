document.addEventListener(
    "DOMContentLoaded",
    async function() {


        const {
            data: {
                user
            }
        } =
            await supabaseClient.auth
                .getUser();


        if (!user) {

            window.location.href =
                "login.html";

        }

    }
);

async function logout() {

    const { error } =
        await supabaseClient.auth
            .signOut();


    if (error) {

        console.error(
            "Logout error:",
            error
        );

        return;

    }


    window.location.href =
        "login.html";

}