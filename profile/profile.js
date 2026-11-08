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


// FINAL: Handle invalid or unexpected localStorage values safely.
function readStoredArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.warn(`Could not read ${key}; using an empty list.`, error);
    return [];
  }
}

function loadProfileData() {

  const savedProducts = readStoredArray("savedProducts");
  const cart = readStoredArray("md_cart");

  savedCount.textContent = savedProducts.length;

  const totalCartItems = cart.reduce((total, item) => {
    const qty = Number(item && item.qty);
    return total + (Number.isFinite(qty) && qty > 0 ? qty : 1);
  }, 0);

  cartCount.textContent = totalCartItems;


// Read user data from registration
let currentUser = null;

try {
    currentUser = JSON.parse(
        localStorage.getItem("md_user") || "null"
    );
} catch (error) {
    console.error("Could not load user:", error);
}

const registeredName = currentUser
    ? [currentUser.name, currentUser.surname]
        .filter(Boolean)
        .join(" ")
    : "";

const storedName = registeredName || "Guest";
const storedEmail = (currentUser && currentUser.email) || "Not signed in";




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



// ========================================
// EDIT PROFILE
// ========================================

editProfileBtn.addEventListener("click", () => {

    const newName = prompt(
        "Enter your full name:",
        profileName.textContent
    );

    if (newName === null) return;

    const newEmail = prompt(
        "Enter your email:",
        profileEmail.textContent
    );

    if (newEmail === null) return;

    const name = newName.trim();
    const email = newEmail.trim();

    // Validate profile data
    if (name.length < 2) {
        alert("Name must contain at least 2 characters.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Keep the same stable account ID if the email changes.
    // Reject email addresses belonging to a different demo account.
    if (!window.MineDropAccounts.updateProfile(name, email)) {
        alert("Please log in first, or choose an email not used by another account.");
        return;
    }

    loadProfileData();
});


loadProfileData();

// ========================================
// DYNAMIC ORDER HISTORY
// ========================================

// Get orders from localStorage
function getOrders() {
    return window.MineDropAccounts.getOrders();
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



// ========================================
// LOG OUT
// ========================================

const profileLogoutBtn =
    document.getElementById("profileLogoutBtn");

profileLogoutBtn.addEventListener("click", () => {
    localStorage.removeItem("md_user");
    localStorage.removeItem("profileName");
    localStorage.removeItem("profileEmail");
});


const logoutBtn = document.querySelector(".profile-btn.logout");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("md_user");
        localStorage.removeItem("profileName");
        localStorage.removeItem("profileEmail");
    });
}