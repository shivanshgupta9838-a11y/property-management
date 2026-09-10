// ==========================================
// DASHBOARD - SUPABASE
// ==========================================


// ==========================================
// LOAD DASHBOARD DATA
// ==========================================

async function loadDashboard() {

    loadPropertyCount();

    loadOwnerCount();

    loadInquiryCount();

    loadAvailableProperties();

    loadRecentProperties();

    loadRecentInquiries();

}


// ==========================================
// TOTAL PROPERTIES
// ==========================================

async function loadPropertyCount() {

    const { count, error } =
        await supabaseClient
            .from("properties")
            .select("*", {
                count: "exact",
                head: true
            });


    if (error) {

        console.error(
            "Property count error:",
            error
        );

        return;

    }


    document
        .getElementById("totalProperties")
        .textContent =
        count || 0;

}


// ==========================================
// TOTAL OWNERS
// ==========================================

async function loadOwnerCount() {

    const { count, error } =
        await supabaseClient
            .from("owners")
            .select("*", {
                count: "exact",
                head: true
            });


    if (error) {

        console.error(
            "Owner count error:",
            error
        );

        return;

    }


    document
        .getElementById("totalOwners")
        .textContent =
        count || 0;

}


// ==========================================
// TOTAL INQUIRIES
// ==========================================

async function loadInquiryCount() {

    const { count, error } =
        await supabaseClient
            .from("inquiries")
            .select("*", {
                count: "exact",
                head: true
            });


    if (error) {

        console.error(
            "Inquiry count error:",
            error
        );

        return;

    }


    document
        .getElementById("totalInquiries")
        .textContent =
        count || 0;

}


// ==========================================
// AVAILABLE PROPERTIES
// ==========================================

async function loadAvailableProperties() {

    const { count, error } =
        await supabaseClient
            .from("properties")
            .select("*", {
                count: "exact",
                head: true
            })
            .eq(
                "status",
                "Available"
            );


    if (error) {

        console.error(
            "Available property error:",
            error
        );

        return;

    }


    document
        .getElementById("availableProperties")
        .textContent =
        count || 0;

}


// ==========================================
// RECENT PROPERTIES
// ==========================================

async function loadRecentProperties() {

    const { data, error } =
        await supabaseClient
            .from("properties")
            .select("*")
            .order(
                "id",
                {
                    ascending: false
                }
            )
            .limit(4);


    if (error) {

        console.error(
            "Recent properties error:",
            error
        );

        return;

    }


    const container =
        document.getElementById(
            "recentProperties"
        );


    if (!data || data.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-house"></i>

                <p>
                    No properties added yet.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    data.forEach(property => {

        container.innerHTML += `

            <div class="recent-item">

                <div>

                    <strong>
                        ${property.title}
                    </strong>

                    <small>
                        ${property.location}
                    </small>

                </div>


                <span>

                    ${property.status}

                </span>

            </div>

        `;

    });

}


// ==========================================
// RECENT INQUIRIES
// ==========================================

async function loadRecentInquiries() {

    const { data, error } =
        await supabaseClient
            .from("inquiries")
            .select(`
                *,
                properties (
                    title
                )
            `)
            .order(
                "id",
                {
                    ascending: false
                }
            )
            .limit(4);


    if (error) {

        console.error(
            "Recent inquiries error:",
            error
        );

        return;

    }


    const container =
        document.getElementById(
            "recentInquiries"
        );


    if (!data || data.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-envelope"></i>

                <p>
                    No inquiries yet.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    data.forEach(inquiry => {

        const propertyName =
            inquiry.properties
                ? inquiry.properties.title
                : "Unknown Property";


        container.innerHTML += `

            <div class="recent-item">

                <div>

                    <strong>
                        ${inquiry.name}
                    </strong>

                    <small>
                        ${propertyName}
                    </small>

                </div>


                <span>

                    ${inquiry.status}

                </span>

            </div>

        `;

    });

}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDashboard();

    }
);