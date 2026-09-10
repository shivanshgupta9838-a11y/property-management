// ===============================
// TENANT MANAGEMENT - SUPABASE
// ===============================

let tenants = [];
let tenantProperties = [];


// ===============================
// OPEN MODAL
// ===============================

function openTenantModal() {

    document.getElementById("tenantModal").style.display = "flex";

    document.getElementById("tenantModalTitle").innerText =
        "Add Tenant";

    document.getElementById("tenantForm").reset();

    document.getElementById("tenantId").value = "";

    loadPropertiesForTenant();

}


// ===============================
// CLOSE MODAL
// ===============================

function closeTenantModal() {

    document.getElementById("tenantModal").style.display = "none";

    document.getElementById("tenantForm").reset();

    document.getElementById("tenantId").value = "";

}


// ===============================
// LOAD TENANTS
// ===============================

async function loadTenants() {

    const { data, error } = await supabaseClient
        .from("tenants")
        .select(`
            *,
            properties (
                title
            )
        `)
        .order("id", { ascending: false });


    if (error) {

        console.error("Error loading tenants:", error);

        alert("Tenants load karne mein error aaya!");

        return;
    }


    tenants = data || [];

    displayTenants();

}


// ===============================
// LOAD PROPERTIES DROPDOWN
// ===============================

async function loadPropertiesForTenant() {

    const { data, error } = await supabaseClient
        .from("properties")
        .select("id, title")
        .order("title");


    if (error) {

        console.error(
            "Error loading properties:",
            error
        );

        alert(
            "Properties dropdown load nahi ho paya!"
        );

        return;
    }


    tenantProperties = data || [];


    const propertySelect =
        document.getElementById("propertyId");


    propertySelect.innerHTML =
        `<option value="">Select Property</option>`;


    tenantProperties.forEach(property => {

        propertySelect.innerHTML += `

            <option value="${property.id}">
                ${property.title}
            </option>

        `;

    });

}


// ===============================
// DISPLAY TENANTS
// ===============================

function displayTenants() {

    const table =
        document.getElementById("tenantTable");


    const search =
        document
            .getElementById("searchTenant")
            .value
            .toLowerCase();


    const filteredTenants =
        tenants.filter(tenant => {

            const name =
                tenant.name
                    ? tenant.name.toLowerCase()
                    : "";

            const phone =
                tenant.phone
                    ? tenant.phone.toLowerCase()
                    : "";

            const email =
                tenant.email
                    ? tenant.email.toLowerCase()
                    : "";


            return (
                name.includes(search) ||
                phone.includes(search) ||
                email.includes(search)
            );

        });


    table.innerHTML = "";


    if (filteredTenants.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="6"
                    style="text-align:center; padding:20px;">

                    No Tenants Found

                </td>

            </tr>

        `;

        return;
    }


    filteredTenants.forEach(tenant => {

        const propertyName =
            tenant.properties
                ? tenant.properties.title
                : "Not Assigned";


        table.innerHTML += `

        <tr>

            <td>
                <strong>
                    ${tenant.name}
                </strong>
            </td>


            <td>
                ${tenant.phone || "-"}
            </td>


            <td>
                ${tenant.email || "-"}
            </td>


            <td>
                ${tenant.address || "-"}
            </td>


            <td>
                ${propertyName}
            </td>


            <td>

                <button
                    class="edit-btn"
                    onclick="editTenant(${tenant.id})">

                    <i class="fa-solid fa-pen"></i>

                </button>


                <button
                    class="delete-btn"
                    onclick="deleteTenant(${tenant.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}


// ===============================
// SAVE TENANT
// ===============================

document
    .getElementById("tenantForm")
    .addEventListener("submit", async function (e) {

        e.preventDefault();


        const id =
            document.getElementById("tenantId").value;


        const tenantData = {

            name:
                document
                    .getElementById("tenantName")
                    .value
                    .trim(),

            phone:
                document
                    .getElementById("tenantPhone")
                    .value
                    .trim(),

            email:
                document
                    .getElementById("tenantEmail")
                    .value
                    .trim(),

            address:
                document
                    .getElementById("tenantAddress")
                    .value
                    .trim(),

            property_id:
                Number(
                    document
                        .getElementById("propertyId")
                        .value
                )

        };


        let result;


        // UPDATE TENANT

        if (id) {

            result =
                await supabaseClient
                    .from("tenants")
                    .update(tenantData)
                    .eq("id", id);

        }


        // ADD TENANT

        else {

            result =
                await supabaseClient
                    .from("tenants")
                    .insert([tenantData]);

        }


        if (result.error) {

            console.error(
                "Tenant save error:",
                result.error
            );

            alert(
                "Tenant save karne mein error aaya!"
            );

            return;
        }


        alert(
            id
                ? "Tenant Updated Successfully!"
                : "Tenant Added Successfully!"
        );


        closeTenantModal();

        loadTenants();

    });


// ===============================
// EDIT TENANT
// ===============================

async function editTenant(id) {

    const tenant =
        tenants.find(
            tenant => tenant.id === id
        );


    if (!tenant) return;


    await loadPropertiesForTenant();


    document.getElementById("tenantId").value =
        tenant.id;


    document.getElementById("tenantName").value =
        tenant.name || "";


    document.getElementById("tenantPhone").value =
        tenant.phone || "";


    document.getElementById("tenantEmail").value =
        tenant.email || "";


    document.getElementById("tenantAddress").value =
        tenant.address || "";


    document.getElementById("propertyId").value =
        tenant.property_id || "";


    document.getElementById("tenantModalTitle").innerText =
        "Edit Tenant";


    document.getElementById("tenantModal").style.display =
        "flex";

}


// ===============================
// DELETE TENANT
// ===============================

async function deleteTenant(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this tenant?"
        );


    if (!confirmDelete) return;


    const { error } =
        await supabaseClient
            .from("tenants")
            .delete()
            .eq("id", id);


    if (error) {

        console.error(
            "Delete tenant error:",
            error
        );

        alert(
            "Tenant delete karne mein error aaya!"
        );

        return;
    }


    alert(
        "Tenant Deleted Successfully!"
    );


    loadTenants();

}


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadTenants();

    }
);