
/* ================= DEFAULT PROPERTIES ================= */

function addDefaultProperties() {

    const properties =
        JSON.parse(localStorage.getItem("properties"));

    /* Agar properties pehle se hain to default data add nahi hoga */

    if (properties && properties.length > 0) {
        return;
    }


    const defaultProperties = [

        {
            id: 1001,
            title: "Luxury Villa in Kanpur",
            location: "Civil Lines, Kanpur",
            price: 8500000,
            type: "Villa",
            ownerId: "",
            status: "Available",
            bedrooms: 4,
            area: 2500,
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
        },

        {
            id: 1002,
            title: "Modern Apartment",
            location: "Swaroop Nagar, Kanpur",
            price: 4500000,
            type: "Apartment",
            ownerId: "",
            status: "Available",
            bedrooms: 3,
            area: 1500,
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
        },

        {
            id: 1003,
            title: "Commercial Office Space",
            location: "Mall Road, Kanpur",
            price: 6500000,
            type: "Office",
            ownerId: "",
            status: "Available",
            bedrooms: 0,
            area: 2000,
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80"
        }

    ];


    localStorage.setItem(
        "properties",
        JSON.stringify(defaultProperties)
    );

}


let properties =
    JSON.parse(localStorage.getItem("properties")) || [];

function loadOwners() {

    const owners =
        JSON.parse(localStorage.getItem("owners")) || [];

    const ownerSelect =
        document.getElementById("propertyOwner");

    if (!ownerSelect) {
        console.log("Owner dropdown not found");
        return;
    }

    ownerSelect.innerHTML =
        '<option value="">Select Owner</option>';
    owners.forEach(function (owner) {

        ownerSelect.innerHTML +=
            `<option value="${owner.id}">
                ${owner.name}
            </option>`;

    });

}


let editId = null;
let selectedImage = "";


/* ================= DISPLAY ================= */

function displayProperties() {

    const container =
        document.getElementById("propertyContainer");

    const search =
        document.getElementById("searchProperty")
            .value
            .toLowerCase();

    const type =
        document.getElementById("typeFilter").value;

    const status =
        document.getElementById("statusFilter").value;


    const filtered = properties.filter(property => {

        const matchesSearch =
            property.title.toLowerCase().includes(search) ||
            property.location.toLowerCase().includes(search);

        const matchesType =
            type === "" || property.type === type;

        const matchesStatus =
            status === "" || property.status === status;

        return matchesSearch &&
            matchesType &&
            matchesStatus;
    });


    if (filtered.length === 0) {

        container.innerHTML = `
            <div class="no-properties">

                <i class="fa-solid fa-house"></i>

                <h3>No Properties Found</h3>

                <p>
                    Add a property or change your search.
                </p>

            </div>
        `;

        return;
    }


    container.innerHTML = filtered.map(property => {

        let image = property.image
            ? property.image
            : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80";


        return `

        <div class="property-card">

            <div class="property-image">

                <img src="${image}" alt="${property.title}">

                <span class="status-badge ${property.status.toLowerCase()}">
                    ${property.status}
                </span>

            </div>


            <div class="property-body">

                <h3>${property.title}</h3>

                <p class="location">
                    <i class="fa-solid fa-location-dot"></i>
                    ${property.location}
                </p>


                <div class="property-details">

                    <span>
                        <i class="fa-solid fa-house"></i>
                        ${property.type}
                    </span>

                    <span>
                        <i class="fa-solid fa-bed"></i>
                        ${property.bedrooms || 0} Beds
                    </span>

                    <span>
                        <i class="fa-solid fa-ruler-combined"></i>
                        ${property.area || 0} sq ft
                    </span>

                </div>


                <div class="property-footer">

                    <strong>
                        ₹${Number(property.price).toLocaleString("en-IN")}
                    </strong>


                    <div class="card-actions">

                        <button
                            onclick="editProperty(${property.id})"
                            title="Edit">

                            <i class="fa-solid fa-pen"></i>

                        </button>


                        <button
                            class="delete"
                            onclick="deleteProperty(${property.id})"
                            title="Delete">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;

    }).join("");
}


/* ================= OPEN MODAL ================= */

function openPropertyModal() {

    editId = null;
    selectedImage = "";

    document.getElementById("propertyForm")
        .reset();

    loadOwners();

    document.getElementById("modalTitle")
        .textContent = "Add Property";

    document.getElementById("propertyModal")
        .classList.add("show");


    document.getElementById("propertyId")
        .value = "";

}


/* ================= CLOSE MODAL ================= */

function closePropertyModal() {

    document.getElementById("propertyModal")
        .classList.remove("show");

}


/* ================= IMAGE ================= */

document.getElementById("propertyImage")
    .addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (event) {

            selectedImage = event.target.result;

        };

        reader.readAsDataURL(file);

    });


/* ================= SAVE PROPERTY ================= */

document.getElementById("propertyForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const property = {

            id: editId || Date.now(),

            title:
                document.getElementById("propertyTitle").value,

            location:
                document.getElementById("propertyLocation").value,

            price:
                document.getElementById("propertyPrice").value,

            type:
                document.getElementById("propertyType").value,
            ownerId:
                document.getElementById("propertyOwner").value,
            status:
                document.getElementById("propertyStatus").value,

            bedrooms:
                document.getElementById("propertyBedrooms").value,

            area:
                document.getElementById("propertyArea").value,

            image:
                selectedImage

        };


        if (editId) {

            properties = properties.map(item =>
                item.id === editId ? property : item
            );

        } else {

            properties.push(property);

        }


        localStorage.setItem(
            "properties",
            JSON.stringify(properties)
        );


        closePropertyModal();

        displayProperties();

    });
/* ================= EDIT ================= */

function editProperty(id) {
    loadOwners();
    document.getElementById("propertyOwner").value =
        property.ownerId || "";
    const property =
        properties.find(item => item.id === id);

    if (!property) return;


    editId = id;

    selectedImage = property.image || "";


    document.getElementById("modalTitle")
        .textContent = "Edit Property";


    document.getElementById("propertyTitle")
        .value = property.title;

    document.getElementById("propertyLocation")
        .value = property.location;

    document.getElementById("propertyPrice")
        .value = property.price;

    document.getElementById("propertyType")
        .value = property.type;

    document.getElementById("propertyStatus")
        .value = property.status;

    document.getElementById("propertyBedrooms")
        .value = property.bedrooms;

    document.getElementById("propertyArea")
        .value = property.area;


    document.getElementById("propertyModal")
        .classList.add("show");

}


/* ================= DELETE ================= */

function deleteProperty(id) {

    const property =
        properties.find(item => item.id === id);


    if (!property) return;


    const confirmDelete =
        confirm(
            `Delete "${property.title}"?`
        );


    if (!confirmDelete) return;


    properties =
        properties.filter(item => item.id !== id);


    localStorage.setItem(
        "properties",
        JSON.stringify(properties)
    );


    displayProperties();

}


/* ================= INITIAL LOAD ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {
        addDefaultProperties();
        displayProperties();
    }
);

