
let inquiries =
    JSON.parse(localStorage.getItem("inquiries")) || [];


/* ================= LOAD PROPERTIES ================= */

function loadProperties() {

    const properties =
        JSON.parse(localStorage.getItem("properties")) || [];


    const select =
        document.getElementById("inquiryProperty");


    select.innerHTML =
        '<option value="">Select Property</option>';


    properties.forEach(property => {

        select.innerHTML += `

            <option value="${property.id}">

                ${property.title}

            </option>

        `;

    });

}


/* ================= DISPLAY INQUIRIES ================= */

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


    const properties =
        JSON.parse(localStorage.getItem("properties")) || [];


    const filtered =
        inquiries.filter(inquiry => {


            const property =
                properties.find(item =>
                    item.id == inquiry.propertyId
                );


            const propertyName =
                property
                    ? property.title.toLowerCase()
                    : "";


            const matchesSearch =

                inquiry.name
                    .toLowerCase()
                    .includes(search)

                ||

                propertyName
                    .includes(search);


            const matchesStatus =

                statusFilter === ""

                ||

                inquiry.status === statusFilter;


            return  matchesSearch && matchesStatus;

        });


    if (filtered.length === 0) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="table-empty">

                    <i
                        class="fa-solid fa-envelope">
                    </i>

                    <h3>
                        No Inquiries Found
                    </h3>

                    <p>
                        Add a customer inquiry.
                    </p>

                </td>

            </tr>

        `;

        return;

    }


    table.innerHTML =
        filtered.map(inquiry => {


            const property =
                properties.find(item =>
                    item.id == inquiry.propertyId
                );


            const propertyName =
                property
                    ? property.title
                    : "Property Deleted";


            return `

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

                    <div
                        class="card-actions">

                        <button
                            class="delete"
                            onclick="deleteInquiry(
                                ${inquiry.id}
                            )">

                            <i
                                class="fa-solid fa-trash">
                            </i>

                        </button>

                    </div>

                </td>


            </tr>

            `;

        }).join("");

}


/* ================= OPEN MODAL ================= */

function openInquiryModal() {


    document
        .getElementById("inquiryForm")
        .reset();


    loadProperties();


    document
        .getElementById("inquiryModal")
        .classList.add("show");

}


/* ================= CLOSE MODAL ================= */

function closeInquiryModal() {


    document
        .getElementById("inquiryModal")
        .classList.remove("show");

}


/* ================= SAVE INQUIRY ================= */

document
    .getElementById("inquiryForm")
    .addEventListener("submit", function(event) {


        event.preventDefault();


        const inquiry = {


            id:
                Date.now(),


            name:
                document
                .getElementById("customerName")
                .value,


            phone:
                document
                .getElementById("customerPhone")
                .value,


            email:
                document
                .getElementById("customerEmail")
                .value,


            propertyId:
                document
                .getElementById("inquiryProperty")
                .value,


            status:
                document
                .getElementById("inquiryStatus")
                .value,


            message:
                document
                .getElementById("inquiryMessage")
                .value

        };


        inquiries.push(inquiry);


        localStorage.setItem(
            "inquiries",
            JSON.stringify(inquiries)
        );


        closeInquiryModal();


        displayInquiries();

    });


/* ================= UPDATE STATUS ================= */

function updateInquiryStatus(
    id,
    status
) {


    inquiries =
        inquiries.map(inquiry => {


            if (
                inquiry.id == id
            ) {

                inquiry.status =
                    status;

            }


            return inquiry;

        });


    localStorage.setItem(
        "inquiries",
        JSON.stringify(inquiries)
    );


    displayInquiries();

}


/* ================= DELETE ================= */

function deleteInquiry(id) {


    if (
        !confirm(
            "Delete this inquiry?"
        )
    ) {

        return;

    }


    inquiries =
        inquiries.filter(inquiry =>
            inquiry.id != id
        );


    localStorage.setItem(
        "inquiries",
        JSON.stringify(inquiries)
    );


    displayInquiries();

}


/* ================= INITIAL LOAD ================= */

document.addEventListener(
    "DOMContentLoaded",
    displayInquiries
);

