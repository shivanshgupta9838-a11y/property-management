// ==========================================
// PUBLIC PROPERTIES PAGE
// ==========================================

let publicProperties = [];


// ==========================================
// LOAD PROPERTIES
// ==========================================

async function loadPublicProperties() {

    const { data, error } =
        await supabaseClient
            .from("properties")
            .select("*")
            .order("id", {
                ascending: false
            });


    if (error) {

        console.error(
            "Property load error:",
            error
        );

        return;

    }


    publicProperties = data;

    displayPublicProperties();

}


// ==========================================
// DISPLAY PROPERTIES
// ==========================================

function displayPublicProperties() {

    const container =
        document.getElementById(
            "publicPropertyContainer"
        );


    const search =
        document
            .getElementById("publicSearch")
            .value
            .toLowerCase();


    const type =
        document
            .getElementById("publicTypeFilter")
            .value;


    const filteredProperties =
        publicProperties.filter(property => {


            const location =
                property.location
                    ? property.location.toLowerCase()
                    : "";


            const title =
                property.title
                    ? property.title.toLowerCase()
                    : "";


            const matchesSearch =
                location.includes(search) ||
                title.includes(search);


            const matchesType =
                type === "" ||
                property.type === type;


            return matchesSearch &&
                matchesType;

        });


    container.innerHTML = "";


    if (filteredProperties.length === 0) {

        container.innerHTML = `

            <div class="home-empty">

                <i class="fa-solid fa-house"></i>

                <h3>
                    No Properties Found
                </h3>

            </div>

        `;

        return;

    }


    filteredProperties.forEach(property => {


        const image =
            property.image
                ? property.image
                : "https://via.placeholder.com/800x500?text=Property+Image";


        container.innerHTML += `

            <div class="home-property-card">


                <div class="home-property-image">

                    <img
                        src="${image}"
                        alt="${property.title}">


                    <span class="home-status">

                        ${property.status}

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


                    <button
                        class="primary-btn"
                        onclick="openInquiry('${property.id}')">

                        <i class="fa-solid fa-envelope"></i>

                        Send Inquiry

                    </button>


                </div>

            </div>

        `;

    });

}


// ==========================================
// INQUIRY
// ==========================================

function openInquiry(propertyId) {

    window.location.href =
        "public-inquiry.html?property=" + propertyId;

}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadPublicProperties();

    }
);