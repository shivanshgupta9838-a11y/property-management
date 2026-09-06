
document.addEventListener("DOMContentLoaded", function () {

    const properties =
        JSON.parse(localStorage.getItem("properties")) || [];

    const owners =
        JSON.parse(localStorage.getItem("owners")) || [];

    const inquiries =
        JSON.parse(localStorage.getItem("inquiries")) || [];


    document.getElementById("totalProperties").textContent =
        properties.length;

    document.getElementById("totalOwners").textContent =
        owners.length;

    document.getElementById("totalInquiries").textContent =
        inquiries.length;


    const available = properties.filter(function (property) {
        return property.status === "Available";
    });

    document.getElementById("availableProperties").textContent =
        available.length;


    showRecentProperties(properties);
    showRecentInquiries(inquiries);
});


function showRecentProperties(properties) {

    const container =
        document.getElementById("recentProperties");

    if (properties.length === 0) {
        return;
    }

    const recent = properties.slice(-4).reverse();

    container.innerHTML = "";

    recent.forEach(function (property) {

        const item = document.createElement("div");

        item.className = "recent-item";

        item.innerHTML = `
            <div>
                <strong>${property.title}</strong>
                <small>${property.location}</small>
            </div>

            <span>${property.status}</span>
        `;

        container.appendChild(item);
    });
}


function showRecentInquiries(inquiries) {

    const container =
        document.getElementById("recentInquiries");

    if (inquiries.length === 0) {
        return;
    }

    const recent = inquiries.slice(-4).reverse();

    container.innerHTML = "";

    recent.forEach(function (inquiry) {

        const item = document.createElement("div");

        item.className = "recent-item";

        item.innerHTML = `
            <div>
                <strong>${inquiry.name}</strong>
                <small>${inquiry.property}</small>
            </div>

            <span>${inquiry.status}</span>
        `;

        container.appendChild(item);
    });
}

