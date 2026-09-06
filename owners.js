
let owners =
    JSON.parse(localStorage.getItem("owners")) || [];

let editOwnerId = null;


/* ================= DISPLAY OWNERS ================= */

function displayOwners() {

    const table =
        document.getElementById("ownerTable");

    const search =
        document.getElementById("searchOwner")
        .value
        .toLowerCase();


    const filteredOwners = owners.filter(owner => {

        return (
            owner.name.toLowerCase().includes(search) ||
            owner.phone.toLowerCase().includes(search) ||
            owner.email.toLowerCase().includes(search)
        );

    });


    if (filteredOwners.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6" class="table-empty">

                    <i class="fa-solid fa-users"></i>

                    <h3>No Owners Found</h3>

                    <p>
                        Add an owner to see them here.
                    </p>

                </td>
            </tr>
        `;

        return;
    }


    const properties =
        JSON.parse(localStorage.getItem("properties")) || [];


    table.innerHTML =
        filteredOwners.map(owner => {

            const ownerProperties =
                properties.filter(property =>
                    property.ownerId == owner.id
                );


            return `

            <tr>

                <td>

                    <div class="owner-info">

                        <div class="owner-avatar">

                            ${owner.name
                                .charAt(0)
                                .toUpperCase()}

                        </div>

                        <div>

                            <strong>
                                ${owner.name}
                            </strong>

                            <small>
                                Owner
                            </small>

                        </div>

                    </div>

                </td>


                <td>

                    <i class="fa-solid fa-phone"></i>
                    ${owner.phone}

                </td>


                <td>

                    <i class="fa-solid fa-envelope"></i>
                    ${owner.email}

                </td>


                <td>
                    ${owner.address || "Not provided"}
                </td>


                <td>

                    <span class="property-count">

                        ${ownerProperties.length}

                    </span>

                </td>


                <td>

                    <div class="card-actions">

                        <button
                            onclick="editOwner(${owner.id})">

                            <i class="fa-solid fa-pen"></i>

                        </button>


                        <button
                            class="delete"
                            onclick="deleteOwner(${owner.id})">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </td>

            </tr>

            `;

        }).join("");

}


/* ================= OPEN MODAL ================= */

function openOwnerModal() {

    editOwnerId = null;

    document
        .getElementById("ownerForm")
        .reset();

    document
        .getElementById("ownerModalTitle")
        .textContent = "Add Owner";


    document
        .getElementById("ownerModal")
        .classList.add("show");

}


/* ================= CLOSE MODAL ================= */

function closeOwnerModal() {

    document
        .getElementById("ownerModal")
        .classList.remove("show");

}


/* ================= SAVE OWNER ================= */

document
    .getElementById("ownerForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const owner = {

            id: editOwnerId || Date.now(),

            name:
                document
                .getElementById("ownerName")
                .value
                .trim(),

            phone:
                document
                .getElementById("ownerPhone")
                .value
                .trim(),

            email:
                document
                .getElementById("ownerEmail")
                .value
                .trim(),

            address:
                document
                .getElementById("ownerAddress")
                .value
                .trim()

        };


        if (editOwnerId) {

            owners = owners.map(item =>
                item.id === editOwnerId
                    ? owner
                    : item
            );

        } else {

            owners.push(owner);

        }


        localStorage.setItem(
            "owners",
            JSON.stringify(owners)
        );


        closeOwnerModal();

        displayOwners();

    });


/* ================= EDIT OWNER ================= */

function editOwner(id) {

    const owner =
        owners.find(item => item.id === id);

    if (!owner) return;


    editOwnerId = id;


    document
        .getElementById("ownerName")
        .value = owner.name;

    document
        .getElementById("ownerPhone")
        .value = owner.phone;

    document
        .getElementById("ownerEmail")
        .value = owner.email;

    document
        .getElementById("ownerAddress")
        .value = owner.address || "";


    document
        .getElementById("ownerModalTitle")
        .textContent = "Edit Owner";


    document
        .getElementById("ownerModal")
        .classList.add("show");

}


/* ================= DELETE OWNER ================= */

function deleteOwner(id) {

    const owner =
        owners.find(item => item.id === id);

    if (!owner) return;


    const properties =
        JSON.parse(localStorage.getItem("properties")) || [];


    const linkedProperties =
        properties.filter(property =>
            property.ownerId == id
        );


    if (linkedProperties.length > 0) {

        alert(
            "This owner has properties linked to them. Remove the property links first."
        );

        return;

    }


    if (
        !confirm(
            `Delete owner "${owner.name}"?`
        )
    ) {

        return;

    }


    owners =
        owners.filter(item =>
            item.id !== id
        );


    localStorage.setItem(
        "owners",
        JSON.stringify(owners)
    );


    displayOwners();

}


/* ================= INITIAL LOAD ================= */

document.addEventListener(
    "DOMContentLoaded",
    displayOwners
);

