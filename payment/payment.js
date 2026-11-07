const TAX_RATE = 0.08;

const METHODS = {
  card: { name: 'Card', pay: 'by card' },
  crypto: { name: 'Crypto', pay: 'with crypto' },
  gpay: { name: 'Google Pay', pay: 'with Google Pay' },
};

const COINS = {
  BTC: 'Bitcoin (BTC)',
  ETH: 'Ethereum (ETH)',
  USDT: 'Tether (USDT)',
};

function readStore(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch (error) {
    return fallback;
  }
}



function writeStore(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;

    } catch (error) {
        console.error("Could not save checkout data:", error);
        return false;
    }
}


function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[ch]));
}

function formatPrice(value) {
  return '$' + Number(value).toFixed(2);
}

const methodTabs = document.getElementById('method-tabs');
const panels = document.querySelectorAll('[data-panel]');
const formEl = document.getElementById('payment-form');
const submitBtn = document.getElementById('submit-btn');
const emailEl = document.getElementById('pay-email');
const coinEl = document.getElementById('coin');
const coinNote = document.getElementById('coin-note');
const receiptEl = document.getElementById('receipt');
const successEl = document.getElementById('success');

const user = readStore('md_user', null);

const lines = readStore('md_cart', []);
const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
const tax = subtotal * TAX_RATE;
const total = subtotal + tax;

let orderNumber = readStore('md_order', null);
if (!orderNumber) {
  orderNumber = 'MD' + Math.random().toString(36).slice(2, 8).toUpperCase();
  writeStore('md_order', orderNumber);
}

let method = 'card';

function paymentName() {
  return method === 'crypto' ? `Crypto (${coinEl.value})` : METHODS[method].name;
}

function renderReceipt() {
  const profileName = user ? [user.name, user.surname].filter(Boolean).join(' ') : 'Guest';
  const email = emailEl.value.trim() || (user && user.email) || '—';

  const itemsHtml = lines.length
    ? lines.map((line, index) => `
        <div class="receipt__row receipt__item">
          <span>${index + 1}. ${escapeHtml(line.name)}${line.qty > 1 ? ' ×' + line.qty : ''}</span>
          <span>${formatPrice(line.price * line.qty)}</span>
        </div>`).join('')
    : '<p>Your cart is empty.</p>';

  receiptEl.innerHTML = `
    <div class="receipt__brand"><strong>MINEDROP</strong><span>Merch Store</span></div>
    <hr>
    <div class="receipt__row"><span>Time</span><span id="clock"></span></div>
    <div class="receipt__row"><span>Order number</span><span>${orderNumber}</span></div>
    <div class="receipt__row"><span>Profile name</span><span>${escapeHtml(profileName)}</span></div>
    <div class="receipt__row"><span>Email</span><span>${escapeHtml(email)}</span></div>
    <div class="receipt__row"><span>Payment</span><span>${paymentName()}</span></div>
    <hr>
    ${itemsHtml}
    <hr>
    <div class="receipt__row"><span>Tax (${Math.round(TAX_RATE * 100)}%)</span><span>${formatPrice(tax)}</span></div>
    <div class="receipt__row receipt__total"><span>Total</span><span>${formatPrice(total)}</span></div>`;

  updateClock();
}

function updateClock() {
  const clock = document.getElementById('clock');
  if (clock) clock.textContent = new Date().toLocaleTimeString('en-GB');
}
setInterval(updateClock, 1000);

function updateForm() {
  methodTabs.querySelectorAll('[data-method]').forEach((tab) => {
    tab.setAttribute('aria-pressed', tab.dataset.method === method);
  });

  panels.forEach((panel) => {
    const isActive = panel.dataset.panel === method;
    panel.hidden = !isActive;
    panel.querySelectorAll('input, select').forEach((field) => { field.disabled = !isActive; });
  });

  coinNote.textContent = `You are paying with ${COINS[coinEl.value]}.`;

  submitBtn.disabled = lines.length === 0;
  submitBtn.textContent = lines.length
    ? `Pay ${formatPrice(total)} ${METHODS[method].pay}`
    : 'Your cart is empty';

  renderReceipt();
}

methodTabs.addEventListener('click', (event) => {
  const tab = event.target.closest('[data-method]');
  if (!tab) return;
  method = tab.dataset.method;
  updateForm();
});

coinEl.innerHTML = Object.entries(COINS)
  .map(([symbol, label]) => `<option value="${symbol}">${label}</option>`)
  .join('');
coinEl.addEventListener('change', updateForm);

emailEl.addEventListener('input', renderReceipt);

document.getElementById('card-number').addEventListener('input', (event) => {
  const digits = event.target.value.replace(/\D/g, '').slice(0, 16);
  event.target.value = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
});

document.getElementById('card-exp').addEventListener('input', (event) => {
  const digits = event.target.value.replace(/\D/g, '').slice(0, 4);
  event.target.value = digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
});




// ========================================
// ENDTERM - CUSTOM FORM VALIDATION
// ========================================

// Disable default browser validation
formEl.noValidate = true;


// Show error beside the input
function showFieldError(field, message) {

    const wrapper = field.closest(".field");

    if (!wrapper) return;

    let error = wrapper.querySelector(".field-error");

    if (!error) {
        error = document.createElement("p");
        error.className = "field-error";
        error.setAttribute("role", "alert");
        wrapper.appendChild(error);
    }

    error.textContent = message;

    field.classList.toggle(
        "invalid-field",
        Boolean(message)
    );

    field.setAttribute(
        "aria-invalid",
        message ? "true" : "false"
    );
}


// Show general checkout error
function showCheckoutError(message) {

    let messageEl =
        document.getElementById("checkout-error");

    if (!messageEl) {

        messageEl = document.createElement("p");

        messageEl.id = "checkout-error";
        messageEl.className = "checkout-error";

        messageEl.setAttribute("role", "alert");

        submitBtn.insertAdjacentElement(
            "afterend",
            messageEl
        );
    }

    messageEl.textContent = message;
}


// Clear previous errors
function clearValidation() {

    formEl.querySelectorAll("input, select")
        .forEach((field) => {
            showFieldError(field, "");
        });

    showCheckoutError("");
}


// ========================================
// VALIDATE PAYMENT FORM
// ========================================

function validatePaymentForm() {

    clearValidation();

    let valid = true;
    let firstInvalid = null;

    function reject(field, message) {

        showFieldError(field, message);

        if (!firstInvalid) {
            firstInvalid = field;
        }

        valid = false;
    }


    // Validate email
    const email = emailEl.value.trim();

    if (!email) {

        reject(emailEl, "Email is required.");

    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {

        reject(
            emailEl,
            "Enter a valid email address."
        );
    }


    // CARD VALIDATION
    if (method === "card") {

        const numberEl =
            document.getElementById("card-number");

        const expiryEl =
            document.getElementById("card-exp");

        const cvcEl =
            document.getElementById("card-cvc");


        // Card number
        const digits =
            numberEl.value.replace(/\D/g, "");

        if (!/^\d{16}$/.test(digits)) {

            reject(
                numberEl,
                "Enter a 16-digit test card number."
            );
        }


        // Expiration date
        const match = expiryEl.value
            .trim()
            .match(/^(\d{2}) \/ (\d{2})$/);

        if (!match) {

            reject(
                expiryEl,
                "Use the format MM / YY."
            );

        } else {

            const month = Number(match[1]);
            const year = 2000 + Number(match[2]);

            const now = new Date();

            const expired =
                year < now.getFullYear() ||
                (
                    year === now.getFullYear() &&
                    month < now.getMonth() + 1
                );

            if (
                month < 1 ||
                month > 12 ||
                expired
            ) {

                reject(
                    expiryEl,
                    "Enter a valid future expiration date."
                );
            }
        }


        // Security code
        if (
            !/^\d{3,4}$/.test(cvcEl.value.trim())
        ) {

            reject(
                cvcEl,
                "Enter a 3- or 4-digit test security code."
            );
        }
    }


    // CRYPTO VALIDATION
    else if (method === "crypto") {

        const walletEl =
            document.getElementById("wallet");

        if (!coinEl.value) {

            reject(
                coinEl,
                "Select a coin."
            );
        }

        if (walletEl.value.trim().length < 10) {

            reject(
                walletEl,
                "Enter a demo wallet address (10+ characters)."
            );
        }
    }


    // Focus first invalid field
    if (firstInvalid) {
        firstInvalid.focus();
    }

    return valid;
}


// ========================================
// CLEAR ERRORS WHEN USER TYPES
// ========================================

formEl.addEventListener("input", (event) => {

    const field = event.target;

    if (field.matches("input, select")) {
        showFieldError(field, "");
    }

});


formEl.addEventListener("change", (event) => {

    const field = event.target;

    if (field.matches("input, select")) {
        showFieldError(field, "");
    }

});


methodTabs.addEventListener(
    "click",
    clearValidation
);


// ========================================
// ENDTERM - SAVE ORDER HISTORY
// ========================================

function saveCompletedOrder() {

    const storedOrders =
        readStore("md_orders", []);

    const orders = Array.isArray(storedOrders)
        ? storedOrders
        : [];


    // Avoid duplicate orders
    if (
        orders.some(
            order => order.id === orderNumber
        )
    ) {
        return true;
    }


    // Create order object
    const order = {

        id: orderNumber,

        date: new Date().toISOString(),

        items: lines.map((line) => ({

            id: line.id,
            name: line.name,
            price: Number(line.price),
            qty: Number(line.qty)

        })),

        total: Number(total.toFixed(2)),

        status: "Processing",

        email: emailEl.value.trim(),

        method: paymentName()
    };


    // Save only order details,
    // never card or wallet information
    return writeStore(
        "md_orders",
        [...orders, order]
    );
}







// ========================================
// ENDTERM - PAYMENT SUBMISSION
// ========================================

formEl.addEventListener("submit", (event) => {

    event.preventDefault();


    // Check shopping cart
    if (lines.length === 0) {

        showCheckoutError(
            "Your cart is empty. Add a product in Booking."
        );

        return;
    }


    // Validate form before payment
    if (!validatePaymentForm()) {
        return;
    }


    // Save order to Profile history
    if (!saveCompletedOrder()) {

        showCheckoutError(
            "Could not save the demo order. Please try again."
        );

        return;
    }


    // Clear shopping cart
    writeStore("md_cart", []);

    writeStore("md_order", null);


    // Hide form and payment methods
    formEl.hidden = true;
    methodTabs.hidden = true;


    // Show success message
    successEl.hidden = false;

    successEl.innerHTML = `
        <strong>Thank you for your order!</strong>
        <br>
        Order ${escapeHtml(orderNumber)} is confirmed.
        This is a demo store: no money was charged.
        <br>
        <a href="../profile/profile.html">
            View Order History in Profile
        </a>
    `;

});




if (user && user.email) emailEl.value = user.email;
updateForm();
