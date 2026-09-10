// ===============================
// PROPERTY MANAGEMENT - SUPABASE
// ===============================

let properties = [];


// Open Modal
function openPropertyModal() {
    document.getElementById("propertyModal").style.display = "flex";
}


// Close Modal
function closePropertyModal() {
    document.getElementById("propertyModal").style.display = "none";

    document.getElementById("propertyForm").reset();

    document.getElementById("propertyId").value = "";
}


// ===============================
// LOAD PROPERTIES FROM SUPABASE
// ===============================

async function loadProperties() {

    const { data, error } = await supabaseClient
        .from("properties")
        .select(`
            *,
            owners (
                name
            )
        `)
        .order("id", { ascending: false });


    if (error) {
        console.error("Error loading properties:", error);
        alert("Properties load karne mein error aaya!");

        return;
    }


    properties = data;

    displayProperties();
}


// ===============================
// DISPLAY PROPERTIES
// ===============================

function displayProperties() {

    const container = document.getElementById("propertyContainer");

    const search = document
        .getElementById("searchProperty")
        .value
        .toLowerCase();


    const type = document.getElementById("typeFilter").value;

    const status = document.getElementById("statusFilter").value;


    const filteredProperties = properties.filter(property => {

        const title = property.title
            ? property.title.toLowerCase()
            : "";

        const location = property.location
            ? property.location.toLowerCase()
            : "";


        const matchesSearch =
            title.includes(search) ||
            location.includes(search);


        const matchesType =
            type === "" ||
            property.type === type;


        const matchesStatus =
            status === "" ||
            property.status === status;


        return matchesSearch &&
            matchesType &&
            matchesStatus;
    });


    container.innerHTML = "";


    if (filteredProperties.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <h3>No Properties Found</h3>
                <p>Add a new property to get started.</p>
            </div>
        `;

        return;
    }


    filteredProperties.forEach(property => {

        const image = property.image
            ? property.image
            : "https://via.placeholder.com/400x250?text=Property+Image";


        container.innerHTML += `

        <div class="property-card">

            <img
                src="${image}"
                alt="${property.title}"
                class="property-image"
            >


            <div class="property-info">

                <div class="property-title-row">

                    <h3>${property.title}</h3>

                    <span class="status ${property.status.toLowerCase()}">
                        ${property.status}
                    </span>

                </div>


                <p>
                    📍 ${property.location}
                </p>


                <p>
                    👤 Owner:
                    ${property.owners ? property.owners.name : "Not Assigned"}
                </p>


                <div class="property-details">

                    <span>
                        🛏 ${property.bedrooms || 0} Beds
                    </span>

                    <span>
                        📐 ${property.area || 0} sq ft
                    </span>

                </div>


                <h3 class="property-price">
                    ₹${Number(property.price).toLocaleString("en-IN")}
                </h3>


                <div class="property-actions">

                    <button
                        class="edit-btn"
                        onclick="editProperty(${property.id})"
                    >
                        <i class="fa-solid fa-pen"></i>
                        Edit
                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteProperty(${property.id})"
                    >
                        <i class="fa-solid fa-trash"></i>
                        Delete
                    </button>

                </div>

            </div>

        </div>

        `;
    });
}


// ===============================
// LOAD OWNERS IN DROPDOWN
// ===============================

async function loadOwners() {

    const { data, error } = await supabaseClient
        .from("owners")
        .select("*")
        .order("name");


    if (error) {

        console.error("Error loading owners:", error);

        return;
    }


    const ownerSelect =
        document.getElementById("propertyOwner");


    ownerSelect.innerHTML =
        `<option value="">Select Owner</option>`;


    data.forEach(owner => {

        ownerSelect.innerHTML += `

            <option value="${owner.id}">
                ${owner.name}
            </option>

        `;
    });
}


// ===============================
// ADD PROPERTY
// ===============================

document
    .getElementById("propertyForm")
    .addEventListener("submit", async function (e) {

        e.preventDefault();


        const id =
            document.getElementById("propertyId").value;


        const propertyData = {

            title:
                document.getElementById("propertyTitle").value,

            location:
                document.getElementById("propertyLocation").value,

            price:
                Number(
                    document.getElementById("propertyPrice").value
                ),

            type:
                document.getElementById("propertyType").value,

            owner_id:
                Number(
                    document.getElementById("propertyOwner").value
                ),

            status:
                document.getElementById("propertyStatus").value,

            bedrooms:
                Number(
                    document.getElementById("propertyBedrooms").value
                ) || 0,

            area:
                Number(
                    document.getElementById("propertyArea").value
                ) || 0

        };


        let result;


        // UPDATE PROPERTY

        if (id) {

            result = await supabaseClient
                .from("properties")
                .update(propertyData)
                .eq("id", id);

        }


        // ADD PROPERTY

        else {

            result = await supabaseClient
                .from("properties")
                .insert([propertyData]);

        }


        if (result.error) {

            console.error(result.error);

            alert(
                "Property save karne mein error aaya!"
            );

            return;
        }


        alert(
            id
                ? "Property Updated Successfully!"
                : "Property Added Successfully!"
        );


        closePropertyModal();

        loadProperties();

    });


// ===============================
// EDIT PROPERTY
// ===============================

function editProperty(id) {

    const property =
        properties.find(
            p => p.id === id
        );


    if (!property) return;


    document.getElementById("propertyId").value =
        property.id;


    document.getElementById("propertyTitle").value =
        property.title;


    document.getElementById("propertyLocation").value =
        property.location;


    document.getElementById("propertyPrice").value =
        property.price;


    document.getElementById("propertyType").value =
        property.type;


    document.getElementById("propertyOwner").value =
        property.owner_id;


    document.getElementById("propertyStatus").value =
        property.status;


    document.getElementById("propertyBedrooms").value =
        property.bedrooms;


    document.getElementById("propertyArea").value =
        property.area;


    document.getElementById("modalTitle").innerText =
        "Edit Property";


    document.getElementById("propertyModal").style.display =
        "flex";

}


// ===============================
// DELETE PROPERTY
// ===============================

async function deleteProperty(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this property?"
        );


    if (!confirmDelete) return;


    const { error } =
        await supabaseClient
            .from("properties")
            .delete()
            .eq("id", id);


    if (error) {

        console.error(error);

        alert(
            "Property delete karne mein error aaya!"
        );

        return;
    }


    alert(
        "Property Deleted Successfully!"
    );


    loadProperties();

}


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProperties();

        loadOwners();

    }
);