// ==========================================
// INQUIRIES MANAGEMENT - SUPABASE
// ==========================================

let inquiries = [];


// ==========================================
// LOAD INQUIRIES
// ==========================================

async function loadInquiries() {

    const { data, error } =
        await supabaseClient
            .from("inquiries")
            .select(`
                *,
                properties (
                    title
                )
            `)
            .order("id", {
                ascending: false
            });


    if (error) {

        console.error(
            "Error loading inquiries:",
            error
        );

        alert(
            "Inquiries load karne mein error aaya!"
        );

        return;

    }


    inquiries = data;

    displayInquiries();

}


// ==========================================
// DISPLAY INQUIRIES
// ==========================================

function displayInquiries() {

    const table =
        document.getElementById("inquiryTable");


    const search =
        document
            .getElementById("searchInquiry")
            .value
            .toLowerCase();


    const statusFilter =
        document
            .getElementById("inquiryStatusFilter")
            .value;


    const filtered =
        inquiries.filter(inquiry => {


            const name =
                inquiry.name
                    ? inquiry.name.toLowerCase()
                    : "";


            const propertyName =
                inquiry.properties &&
                inquiry.properties.title
                    ? inquiry.properties.title.toLowerCase()
                    : "";


            const matchesSearch =

                name.includes(search)

                ||

                propertyName.includes(search);


            const matchesStatus =

                statusFilter === ""

                ||

                inquiry.status === statusFilter;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    table.innerHTML = "";


    // NO INQUIRIES

    if (filtered.length === 0) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="table-empty">

                    <i class="fa-solid fa-envelope"></i>

                    <h3>
                        No Inquiries Found
                    </h3>

                    <p>
                        No customer inquiries yet.
                    </p>

                </td>

            </tr>

        `;

        return;

    }


    // DISPLAY DATA

    filtered.forEach(inquiry => {


        const propertyName =
            inquiry.properties
                ? inquiry.properties.title
                : "Property Deleted";


        table.innerHTML += `

            <tr>


                <td>

                    <strong>
                        ${inquiry.name}
                    </strong>

                </td>


                <td>

                    <div>
                        ${inquiry.phone}
                    </div>

                    <small>
                        ${inquiry.email || ""}
                    </small>

                </td>


                <td>

                    ${propertyName}

                </td>


                <td>

                    ${inquiry.message || "-"}

                </td>


                <td>

                    <select
                        class="status-select"
                        onchange="updateInquiryStatus(
                            ${inquiry.id},
                            this.value
                        )">


                        <option
                            value="New"
                            ${inquiry.status === "New"
                                ? "selected"
                                : ""}>

                            New

                        </option>


                        <option
                            value="Contacted"
                            ${inquiry.status === "Contacted"
                                ? "selected"
                                : ""}>

                            Contacted

                        </option>


                        <option
                            value="Closed"
                            ${inquiry.status === "Closed"
                                ? "selected"
                                : ""}>

                            Closed

                        </option>


                    </select>

                </td>


                <td>

                    <button
                        class="delete"
                        onclick="deleteInquiry(
                            ${inquiry.id}
                        )">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>


            </tr>

        `;

    });

}


// ==========================================
// UPDATE INQUIRY STATUS
// ==========================================

async function updateInquiryStatus(
    id,
    status
) {


    const { error } =
        await supabaseClient
            .from("inquiries")
            .update({
                status: status
            })
            .eq("id", id);


    if (error) {

        console.error(
            "Status update error:",
            error
        );

        alert(
            "Inquiry status update nahi hua!"
        );

        return;

    }


    loadInquiries();

}


// ==========================================
// DELETE INQUIRY
// ==========================================

async function deleteInquiry(id) {


    const confirmDelete =
        confirm(
            "Delete this inquiry?"
        );


    if (!confirmDelete) {

        return;

    }


    const { error } =
        await supabaseClient
            .from("inquiries")
            .delete()
            .eq("id", id);


    if (error) {

        console.error(
            "Delete error:",
            error
        );

        alert(
            "Inquiry delete nahi hui!"
        );

        return;

    }


    alert(
        "Inquiry Deleted Successfully!"
    );


    loadInquiries();

}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadInquiries();

    }
);