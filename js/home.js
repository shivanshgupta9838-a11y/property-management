// ==========================================
// HOME PAGE - SUPABASE
// ==========================================


// PAGE LOAD
document.addEventListener("DOMContentLoaded", function () {

    loadHomeStatistics();

    loadFeaturedProperties();

});


// ==========================================
// HOME STATISTICS
// ==========================================

async function loadHomeStatistics() {

    // LOAD PROPERTIES COUNT

    const { count: propertyCount, error: propertyError } =
        await supabaseClient
            .from("properties")
            .select("*", {
                count: "exact",
                head: true
            });


    if (propertyError) {

        console.error(
            "Property count error:",
            propertyError
        );

        return;

    }


    // LOAD OWNERS COUNT

    const { count: ownerCount, error: ownerError } =
        await supabaseClient
            .from("owners")
            .select("*", {
                count: "exact",
                head: true
            });


    if (ownerError) {

        console.error(
            "Owner count error:",
            ownerError
        );

    }


    // DISPLAY COUNTS

    document
        .getElementById("homePropertyCount")
        .textContent =
        (propertyCount || 0) + "+";


    document
        .getElementById("homeOwnerCount")
        .textContent =
        (ownerCount || 0) + "+";

}


// ==========================================
// FEATURED PROPERTIES
// ==========================================

async function loadFeaturedProperties() {

   const { data, error } =
    await supabaseClient
        .from("properties")
        .select("*")
        .order("id", {
            ascending: false
        });


    const container =
        document.getElementById(
            "featuredProperties"
        );


    // ERROR

    if (error) {

        console.error(
            "Error loading properties:",
            error
        );


        container.innerHTML = `

            <div class="home-empty">

                <i class="fa-solid fa-triangle-exclamation"></i>

                <h3>
                    Properties Load Nahi Ho Payi
                </h3>

                <p>
                    Please try again later.
                </p>

            </div>

        `;

        return;

    }


    // NO PROPERTIES

    if (!data || data.length === 0) {

        container.innerHTML = `

            <div class="home-empty">

                <i class="fa-solid fa-house"></i>

                <h3>
                    No Properties Available
                </h3>

                <p>
                    Properties will appear here
                    when added.
                </p>

            </div>

        `;

        return;

    }


    // DISPLAY PROPERTIES

    container.innerHTML =
        data.map(property => {


            const image =
                property.image
                    ? property.image
                    : "https://via.placeholder.com/800x500?text=Property+Image";


            return `

                <div class="home-property-card">

                    <div class="home-property-image">

                        <img
                            src="${image}"
                            alt="${property.title}">


                        <span class="home-status">

                            ${property.status || "Available"}

                        </span>

                    </div>


                    <div class="home-property-content">


                        <h3>

                            ${property.title}

                        </h3>


                        <p class="home-location">

                            <i class="fa-solid fa-location-dot"></i>

                            ${property.location}

                        </p>


                        <div class="home-property-info">


                            <span>

                                <i class="fa-solid fa-bed"></i>

                                ${property.bedrooms || 0}
                                Beds

                            </span>


                            <span>

                                <i class="fa-solid fa-ruler-combined"></i>

                                ${property.area || 0}
                                sq ft

                            </span>


                        </div>


                        <div class="home-price">

                            ₹${Number(
                                property.price || 0
                            ).toLocaleString("en-IN")}

                        </div>


                    </div>

                </div>

            `;

        }).join("");

}


// ==========================================
// SEARCH PROPERTIES
// ==========================================

function searchProperties() {

    const location =
        document
            .getElementById("homeSearch")
            .value;


    const type =
        document
            .getElementById("homeType")
            .value;


    // Search values temporarily save
    // for properties page

    localStorage.setItem(
        "searchLocation",
        location
    );


    localStorage.setItem(
        "searchType",
        type
    );


    window.location.href =
        "properties.html";

}