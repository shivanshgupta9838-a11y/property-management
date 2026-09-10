// ==========================================
// PROPERTYPRO SYSTEM TEST
// ==========================================


async function runAllTests() {

    checkProperties();

    checkOwners();

    checkInquiries();

    checkSupabase();

    checkAuth();

}


// ==========================================
// PROPERTIES CHECK
// ==========================================

async function checkProperties() {

    const element =
        document.getElementById(
            "propertiesStatus"
        );


    element.textContent =
        "Checking...";


    element.className =
        "status loading";


    const {
        data,
        error
    } =
        await supabaseClient
            .from("properties")
            .select("*");


    if (error) {

        console.error(
            "Properties error:",
            error
        );


        element.textContent =
            "❌ Error: " +
            error.message;


        element.className =
            "status error";


        return;

    }


    element.textContent =
        "✅ Working | " +
        data.length +
        " Properties Found";


    element.className =
        "status success";

}


// ==========================================
// OWNERS CHECK
// ==========================================

async function checkOwners() {

    const element =
        document.getElementById(
            "ownersStatus"
        );


    element.textContent =
        "Checking...";


    element.className =
        "status loading";


    const {
        data,
        error
    } =
        await supabaseClient
            .from("owners")
            .select("*");


    if (error) {

        console.error(
            "Owners error:",
            error
        );


        element.textContent =
            "❌ Error: " +
            error.message;


        element.className =
            "status error";


        return;

    }


    element.textContent =
        "✅ Working | " +
        data.length +
        " Owners Found";


    element.className =
        "status success";

}


// ==========================================
// INQUIRIES CHECK
// ==========================================

async function checkInquiries() {

    const element =
        document.getElementById(
            "inquiriesStatus"
        );


    element.textContent =
        "Checking...";


    element.className =
        "status loading";


    const {
        data,
        error
    } =
        await supabaseClient
            .from("inquiries")
            .select("*");


    if (error) {

        console.error(
            "Inquiries error:",
            error
        );


        element.textContent =
            "❌ Error: " +
            error.message;


        element.className =
            "status error";


        return;

    }


    element.textContent =
        "✅ Working | " +
        data.length +
        " Inquiries Found";


    element.className =
        "status success";

}


// ==========================================
// SUPABASE CONNECTION
// ==========================================

async function checkSupabase() {

    const element =
        document.getElementById(
            "supabaseStatus"
        );


    const {
        error
    } =
        await supabaseClient
            .from("properties")
            .select("id")
            .limit(1);


    if (error) {

        element.textContent =
            "❌ Connection Failed";


        element.className =
            "status error";


        return;

    }


    element.textContent =
        "✅ Connected Successfully";


    element.className =
        "status success";

}


// ==========================================
// ADMIN LOGIN CHECK
// ==========================================

async function checkAuth() {

    const element =
        document.getElementById(
            "authStatus"
        );


    const {
        data: {
            user
        }
    } =
        await supabaseClient
            .auth
            .getUser();


    if (user) {

        element.textContent =
            "✅ Admin Logged In";


        element.className =
            "status success";

    }

    else {

        element.textContent =
            "⚠️ Admin Not Logged In";


        element.className =
            "status loading";

    }

}


// ==========================================
// AUTO RUN
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        runAllTests();

    }
);