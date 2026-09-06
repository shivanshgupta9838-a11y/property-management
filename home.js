
document.addEventListener("DOMContentLoaded", function () {

    loadHomeStatistics();

    loadFeaturedProperties();

});


/* ================= HOME STATISTICS ================= */

function loadHomeStatistics() {

    const properties =
        JSON.parse(localStorage.getItem("properties")) || [];

    const owners =
        JSON.parse(localStorage.getItem("owners")) || [];


    document.getElementById("homePropertyCount")
        .textContent = properties.length + "+";


    document.getElementById("homeOwnerCount")
        .textContent = owners.length + "+";

}


/* ================= FEATURED PROPERTIES ================= */

function loadFeaturedProperties() {

    const properties =
        JSON.parse(localStorage.getItem("properties")) || [];


    const container =
        document.getElementById("featuredProperties");


    if (properties.length === 0) {

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


    const featuredProperties =
        properties.slice(-6).reverse();


    container.innerHTML =
        featuredProperties.map(property => {


            const image =
                property.image
                    ? property.image
                    : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80";


            return `

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

                                ${property.bedrooms || 0} Beds

                            </span>


                            <span>

                                <i class="fa-solid fa-ruler-combined"></i>

                                ${property.area || 0} sq ft

                            </span>

                        </div>


                        <div class="home-price">

                            ₹${Number(
                                property.price
                            ).toLocaleString("en-IN")}

                        </div>

                    </div>

                </div>

            `;

        }).join("");

}


/* ================= SEARCH ================= */

function searchProperties() {

    const location =
        document
        .getElementById("homeSearch")
        .value;


    const type =
        document
        .getElementById("homeType")
        .value;


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

