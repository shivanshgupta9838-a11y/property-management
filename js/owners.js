// ===============================
// OWNER MANAGEMENT - SUPABASE
// ===============================

let owners = [];


// ===============================
// OPEN MODAL
// ===============================

function openOwnerModal() {

    document.getElementById("ownerModal").style.display = "flex";

    document.getElementById("ownerModalTitle").innerText =
        "Add Owner";

    document.getElementById("ownerForm").reset();

    document.getElementById("ownerId").value = "";

}


// ===============================
// CLOSE MODAL
// ===============================

function closeOwnerModal() {

    document.getElementById("ownerModal").style.display = "none";

    document.getElementById("ownerForm").reset();

    document.getElementById("ownerId").value = "";

}


// ===============================
// LOAD OWNERS
// ===============================

async function loadOwners() {

    const { data, error } = await supabaseClient
        .from("owners")
        .select("*")
        .order("id", { ascending: false });


    if (error) {

        console.error("Error loading owners:", error);

        alert("Owners load karne mein error aaya!");

        return;
    }


    owners = data;

    displayOwners();

}


// ===============================
// DISPLAY OWNERS
// ===============================

function displayOwners() {

    const table =
        document.getElementById("ownerTable");


    const search =
        document
            .getElementById("searchOwner")
            .value
            .toLowerCase();


    const filteredOwners =
        owners.filter(owner => {

            return (
                owner.name
                    .toLowerCase()
                    .includes(search)

                ||

                owner.phone
                    .toLowerCase()
                    .includes(search)

                ||

                owner.email
                    .toLowerCase()
                    .includes(search)
            );

        });


    table.innerHTML = "";


    if (filteredOwners.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="6"
                    style="text-align:center; padding:20px;">

                    No Owners Found

                </td>

            </tr>

        `;

        return;

    }


    filteredOwners.forEach(owner => {

        table.innerHTML += `

        <tr>

            <td>

                <strong>
                    ${owner.name}
                </strong>

            </td>


            <td>
                ${owner.phone}
            </td>


            <td>
                ${owner.email}
            </td>


            <td>
                ${owner.address || "-"}
            </td>


            <td>
                0
            </td>


            <td>

                <button
                    class="edit-btn"
                    onclick="editOwner(${owner.id})">

                    <i class="fa-solid fa-pen"></i>

                </button>


                <button
                    class="delete-btn"
                    onclick="deleteOwner(${owner.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}


// ===============================
// SAVE OWNER
// ===============================

document
    .getElementById("ownerForm")
    .addEventListener("submit", async function (e) {

        e.preventDefault();


        const id =
            document.getElementById("ownerId").value;


        const ownerData = {

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


        let result;


        // UPDATE OWNER

        if (id) {

            result =
                await supabaseClient
                    .from("owners")
                    .update(ownerData)
                    .eq("id", id);

        }


        // ADD OWNER

        else {

            result =
                await supabaseClient
                    .from("owners")
                    .insert([ownerData]);

        }


        if (result.error) {

            console.error(
                "Owner save error:",
                result.error
            );

            alert(
                "Owner save karne mein error aaya!"
            );

            return;

        }


        alert(
            id
                ? "Owner Updated Successfully!"
                : "Owner Added Successfully!"
        );


        closeOwnerModal();

        loadOwners();

    });


// ===============================
// EDIT OWNER
// ===============================

function editOwner(id) {

    const owner =
        owners.find(
            owner => owner.id === id
        );


    if (!owner) return;


    document.getElementById("ownerId").value =
        owner.id;


    document.getElementById("ownerName").value =
        owner.name;


    document.getElementById("ownerPhone").value =
        owner.phone;


    document.getElementById("ownerEmail").value =
        owner.email;


    document.getElementById("ownerAddress").value =
        owner.address || "";


    document.getElementById("ownerModalTitle").innerText =
        "Edit Owner";


    document.getElementById("ownerModal").style.display =
        "flex";

}


// ===============================
// DELETE OWNER
// ===============================

async function deleteOwner(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this owner?"
        );


    if (!confirmDelete) return;


    const { error } =
        await supabaseClient
            .from("owners")
            .delete()
            .eq("id", id);


    if (error) {

        console.error(
            "Delete error:",
            error
        );

        alert(
            "Owner delete karne mein error aaya!"
        );

        return;

    }


    alert(
        "Owner Deleted Successfully!"
    );


    loadOwners();

}


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadOwners();

    }
);