// ==========================================
// PUBLIC INQUIRY FORM
// ==========================================


// GET PROPERTY ID FROM URL

const params =
    new URLSearchParams(
        window.location.search
    );


const propertyId =
    params.get("property");


// ==========================================
// SUBMIT INQUIRY
// ==========================================

document
    .getElementById("publicInquiryForm")
    .addEventListener(
        "submit",
        async function (e) {


            e.preventDefault();


            // CHECK PROPERTY

            if (!propertyId) {

                alert(
                    "Property not selected!"
                );

                return;

            }


            // INQUIRY DATA
const inquiryData = {

 customer_name:
    document
        .getElementById(
            "publicCustomerName"
        )
        .value
        .trim(),

    phone:
        document
            .getElementById(
                "publicCustomerPhone"
            )
            .value
            .trim(),

    email:
        document
            .getElementById(
                "publicCustomerEmail"
            )
            .value
            .trim(),

    property_id:
        Number(propertyId),

    message:
        document
            .getElementById(
                "publicInquiryMessage"
            )
            .value
            .trim(),

    status:
        "New"

};

            // SAVE TO SUPABASE

            const { error } =
                await supabaseClient
                    .from("inquiries")
                    .insert([
                        inquiryData
                    ]);


         if (error) {

    console.error("FULL INQUIRY ERROR:", error);

    alert(
        error.message +
        "\n\nDetails: " +
        error.details +
        "\n\nHint: " +
        error.hint
    );

    return;
}
            // SUCCESS

            alert(
                "Inquiry Sent Successfully!"
            );


            document
                .getElementById(
                    "publicInquiryForm"
                )
                .reset();


            // REDIRECT

            window.location.href =
                "public-properties.html";

        }
    );