const savedCount =
  document.getElementById("savedCount");

const cartCount =
  document.getElementById("cartCount");

const profileName =
  document.getElementById("profileName");

const profileEmail =
  document.getElementById("profileEmail");

const detailName =
  document.getElementById("detailName");

const detailEmail =
  document.getElementById("detailEmail");

const avatarLetter =
  document.getElementById("avatarLetter");

const editProfileBtn =
  document.getElementById("editProfileBtn");


function loadProfileData() {

  const savedProducts =
    JSON.parse(
      localStorage.getItem("savedProducts")
    ) || [];

  const cart =
    JSON.parse(
      localStorage.getItem("md_cart")
    ) || [];


  savedCount.textContent =
    savedProducts.length;


  const totalCartItems =
    cart.reduce(
      (total, item) =>
        total + (item.qty || 1),
      0
    );


  cartCount.textContent =
    totalCartItems;


  const storedName =
    localStorage.getItem("profileName");


  const storedEmail =
    localStorage.getItem("profileEmail");


  if (storedName) {

    profileName.textContent =
      storedName;

    detailName.textContent =
      storedName;

    avatarLetter.textContent =
      storedName.charAt(0).toUpperCase();
  }


  if (storedEmail) {

    profileEmail.textContent =
      storedEmail;

    detailEmail.textContent =
      storedEmail;
  }

}


editProfileBtn.addEventListener(
  "click",
  () => {

    const newName =
      prompt(
        "Enter your name:",
        profileName.textContent
      );


    if (newName && newName.trim()) {

      localStorage.setItem(
        "profileName",
        newName.trim()
      );

    }


    const newEmail =
      prompt(
        "Enter your email:",
        profileEmail.textContent
      );


    if (newEmail && newEmail.trim()) {

      localStorage.setItem(
        "profileEmail",
        newEmail.trim()
      );

    }


    loadProfileData();

  }
);


loadProfileData();

// ========================================
// DYNAMIC ORDER HISTORY
// ========================================

// Get orders from localStorage
function getOrders() {
    try {
        const orders = JSON.parse(
            localStorage.getItem("md_orders") || "[]"
        );

        return Array.isArray(orders) ? orders : [];

    } catch (error) {
        console.error("Could not load orders:", error);
        return [];
    }
}


// Display orders in Profile
function renderOrderHistory() {

    const orders = getOrders();

    const tableBody =
        document.getElementById("ordersTableBody");

    const ordersCount =
        document.getElementById("ordersCount");

    if (!tableBody || !ordersCount) return;

    // Update order count
    ordersCount.textContent = orders.length;

    // Remove old table rows
    tableBody.innerHTML = "";

    // Show message if no orders exist
    if (orders.length === 0) {

        const row = tableBody.insertRow();
        const cell = row.insertCell();

        cell.colSpan = 5;
        cell.textContent = "No orders yet.";
        cell.className = "text-center py-4";

        return;
    }

    // Create table rows dynamically
    orders.forEach((order) => {

        const row = tableBody.insertRow();

        const itemCount = Array.isArray(order.items)
            ? order.items.reduce(
                (total, item) => total + Number(item.qty || 1), 0
              )
            : 0;

        const date = new Date(order.date);

        row.insertCell().textContent = order.id || "—";

        row.insertCell().textContent =
            isNaN(date.getTime())
                ? "—"
                : date.toLocaleDateString("en-GB");

        row.insertCell().textContent = itemCount;

        const statusCell = row.insertCell();
        const status = document.createElement("span");

        const allowedStatuses = [
            "Processing", "Shipped", "Delivered"
        ];

        const orderStatus = allowedStatuses.includes(order.status)
            ? order.status
            : "Processing";

        status.className =
            "order-status " + orderStatus.toLowerCase();

        status.textContent = orderStatus;
        statusCell.appendChild(status);

        row.insertCell().textContent =
            "$" + Number(order.total || 0).toFixed(2);

    });
}


// Load order history
renderOrderHistory();