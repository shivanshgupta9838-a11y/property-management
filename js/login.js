document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "loginEmail"
                    )
                    .value;


            const password =
                document
                    .getElementById(
                        "loginPassword"
                    )
                    .value;


            const {
                data,
                error
            } =
                await supabaseClient.auth
                    .signInWithPassword({

                        email: email,

                        password: password

                    });


            if (error) {

                console.error(error);


                document
                    .getElementById(
                        "loginError"
                    )
                    .textContent =
                    "Invalid email or password!";


                return;

            }


            window.location.href =
                "dashboard.html";

        }
    );