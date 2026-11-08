<p align="center">
  <img src="img/logo.jpg" alt="MineDrop store logo" width="260">
</p>

<h1 align="center">MineDrop — Final Project</h1>

<p align="center">
  <strong>A responsive, Minecraft-inspired merchandise store</strong><br>
  Web Development · Group SE-2527 · Final Project
</p>

<p align="center">
  <a href="https://anelmelis.github.io/FinalWEB-3A/"><strong>🌐 Live Website</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/anelmelis/FinalWEB-3A"><strong>💻 Source Code</strong></a>
</p>

---

## Contents

1. [Project Overview](#1-project-overview)
2. [Team Members and Contributions](#2-team-members-and-contributions)
3. [Website Pages](#3-website-pages)
4. [New Features Added for the Final](#4-new-features-added-for-the-final)
5. [Existing Features Preserved from Midterm and Endterm](#5-existing-features-preserved-from-midterm-and-endterm)
6. [Technologies and JavaScript Architecture](#6-technologies-and-javascript-architecture)
7. [External API Integration](#7-external-api-integration)
8. [LocalStorage and Data Management](#8-localstorage-and-data-management)
9. [Project Structure](#9-project-structure)
10. [Installation and Running Locally](#10-installation-and-running-locally)
11. [Functional Testing Guide](#11-functional-testing-guide)
12. [Deployment](#12-deployment)
13. [Conclusion](#13-conclusion)

## 1. Project Overview

**MineDrop** is a multi-page, responsive, Minecraft-inspired online merchandise store. The project started as a **Midterm** website, gained interactive JavaScript and jQuery functionality during the **Endterm**, and was extended into a more complete client-side web application for the **Final Project**.

The Final version **keeps the original topic, group, page structure, and previously implemented functionality**. Instead of replacing the website, we added live external data, object-oriented JavaScript, persistent browser storage, advanced checkout logic, a shopping statistics dashboard, and a site-wide theme preference.

Visitors can explore merchandise, search and filter products, save favorites, view product details, manage a cart, choose delivery options, complete a **simulated** checkout, and inspect order history and shopping statistics.

> **Project type:** Educational front-end application. No backend, real payment processing, or secure account authentication is provided.

## 2. Team Members and Contributions

**Group:** SE-2527

| Team member | Final-stage contribution |
| --- | --- |
| **Anel Melis** | **Products, Saved, Profile:** Recently Viewed Products with LocalStorage, Shopping Dashboard, and integration with the existing catalog, favorites, and profile. |
| **Albina Onglassyn** | **Home, Login:** USD → KZT API integration, loading/empty/error states, theme controls, and demo login/registration interface. |
| **Aziza Kenzhegali** | **Booking, Payment:** Object-Oriented Programming with `CartItem`, advanced delivery/checkout form, and cart-to-order integration. |


## 3. Website Pages

| Page | Main functionality | Path |
| --- | --- | --- |
| **Home** | Store introduction, interactive FAQ, jQuery animations, live USD → KZT currency converter, theme toggle | [`home/main.html`](home/main.html) |
| **Products** | Product catalog, search, filters, sorting, detail view, favorites, recently viewed tracking | [`products/products.html`](products/products.html) |
| **Saved** | Favorite products, sorting/removal, Recently Viewed section, shopping navigation | [`saved/saved.html`](saved/saved.html) |
| **Booking** | Collections, shopping cart, item quantities, order calculations with `CartItem` objects | [`booking/booking.html`](booking/booking.html) |
| **Payment** | Simulated Card/Crypto/Google Pay checkout, delivery choices, validation, order creation | [`payment/payment.html`](payment/payment.html) |
| **Login** | Demonstration registration, email-based sign-in, field validation, Google Demo option | [`login/log.html`](login/log.html) |
| **Profile** | Profile editing, account-specific demo order history, statistics dashboard, monthly spending chart | [`profile/profile.html`](profile/profile.html) |

## 4. New Features Added for the Final

**Six substantial features** were developed after the Endterm. They cover the **three mandatory requirements** and **three options from the additional-feature list**.

| # | Feature | Requirement | Key implementation |
| --- | --- | --- | --- |
| **1** | **Live USD → KZT Currency Converter** | **Mandatory — API Integration** | `fetch()`, Promise chains, JSON, dynamic DOM, loading/success/empty/error states |
| **2** | **Object-Oriented Shopping Cart** | **Mandatory — OOP** | `class CartItem`, constructor, instance methods, multiple cart-item objects |
| **3** | **Recently Viewed Products** | **Mandatory — LocalStorage** | Persistent history, maximum eight items, restoration, individual removal, clear-all |
| **4** | **Advanced Delivery & Checkout Form** | **Additional — Advanced Form** | Dependent address fields, validation, calculated delivery fee and total |
| **5** | **Shopping Statistics Dashboard** | **Additional — Data Visualization** | Account order metrics and six-month spending bar chart |
| **6** | **Global Dark Mode** | **Additional — Theme / Accessibility** | Light/dark switching, readable contrast, persisted preference across seven pages |

### Feature 1 — Live Currency Converter (API)

The Home page fetches a USD exchange-rate response from a public API, extracts the **KZT rate**, and converts a user-entered USD amount into Kazakhstani tenge. The converter and its status display are created dynamically in JavaScript.

- **Loading:** informs the visitor that rates are being requested.
- **Success:** shows the received KZT rate and converted amount.
- **Empty data:** displays `No exchange rate data available.` if no usable KZT rate is returned.
- **Network/API error:** explains that live data is unavailable.
- **Fallback:** clearly labels an approximate **485 KZT per USD** offline estimate; it is **not** claimed to be the current market rate.

**Files:** [`home/main.js`](home/main.js), [`home/main.html`](home/main.html).

### Feature 2 — Object-Oriented Shopping Cart (OOP)

The Booking page uses the meaningful JavaScript class **`CartItem`** with:

- A `constructor(id, name, price, qty)` and object properties.
- `changeQuantity(delta)` to adjust item quantity.
- `lineTotal()` to calculate a line's cost.
- `toJSON()` and `static fromJSON()` to serialize and restore cart items.
- Multiple `new CartItem(...)` instances used in actual cart operations.

The cart uses array methods such as `find()`, `filter()`, `map()`, and `reduce()`. Cart contents are restored from browser storage, and totals respond to user actions.

**File:** [`booking/booking.js`](booking/booking.js).

### Feature 3 — Recently Viewed Products (LocalStorage)

Opening **DETAILS** records the selected product in a recent-view history. The Saved page displays this history as dynamically created product cards.

- Up to **eight distinct products** are kept, with the most recent first.
- Viewing an existing item again moves it to the beginning.
- History survives page refreshes and browser restarts on the same origin.
- Users can remove an item or clear the entire history.
- Invalid or missing stored JSON is handled without crashing the feature.

**Files:** [`products/recently-viewed.js`](products/recently-viewed.js), [`products/productsss.js`](products/productsss.js), [`saved/recently-viewed-ui.js`](saved/recently-viewed-ui.js).

### Feature 4 — Advanced Checkout and Delivery

The Payment form offers **Store Pickup (free)**, **Standard Delivery ($6)**, and **Express Delivery ($12)**. For delivery methods that require shipping, recipient and address fields appear and become required.

The receipt and Pay button recalculate the amount dynamically:

`Total = Subtotal + (Subtotal × 0.08 tax) + Delivery fee`

Invalid or incomplete inputs produce feedback and block a simulated checkout. Successful orders include item details, delivery information, date, total, payment method label, and status; **payment card credentials are not stored in the order history**.

**Files:** [`payment/payment.html`](payment/payment.html), [`payment/payment.js`](payment/payment.js), [`payment/payment.css`](payment/payment.css).

### Feature 5 — Statistics Dashboard

The Profile page calculates shopping statistics from saved demo orders:

- **Total Spent** — sum of completed demo order totals.
- **Average Order** — total spent divided by the number of orders.
- **Items Purchased** — sum of ordered quantities.
- **Favorite Products** — number of items in the current browser's favorites.
- **Monthly Spending** — dynamically generated bar chart covering the last six months.

The dashboard includes an empty state and a **REFRESH STATS** control. **Order-based metrics** are retrieved for the current demonstration account; the favorites count remains shared within the browser.

**Files:** [`profile/dashboard.js`](profile/dashboard.js), [`profile/profile.html`](profile/profile.html), [`profile/profile.css`](profile/profile.css).

### Feature 6 — Global Dark Mode

All seven pages support a light/dark preference. The chosen theme is saved under `mineDropTheme` and restored on navigation or refresh. Common styling is provided through the shared theme script on Products, Saved, Booking, Payment, and Profile, while Home and Login use their own page-level controls with the same storage key.

**Files:** [`shared/theme.js`](shared/theme.js), [`home/main.js`](home/main.js), [`login/login.js`](login/login.js).

## 5. Existing Features Preserved from Midterm and Endterm

The Final project **extends rather than replaces** earlier work. Existing features retained include:

- Responsive HTML/CSS layouts, Bootstrap components, and connected navigation.
- A merchandise catalog with product search, category filtering, and price sorting.
- Product detail views and saved/favorite items.
- Shopping-cart operations: add, remove, increase/decrease quantity, and calculate totals.
- Demo checkout methods: Card, Crypto, and Google Pay.
- Registration and checkout form validation.
- User profile editing and order history.
- JavaScript functions, arrays, events, DOM manipulation, and jQuery FAQ search/accordion animations.

These existing features are **not counted again** as six new Final-stage features.

## 6. Technologies and JavaScript Architecture

| Technology | Purpose |
| --- | --- |
| **HTML5** | Semantic page structure and forms |
| **CSS3** | Responsive styling, components, dark theme |
| **Bootstrap 5** | Responsive layout and UI utilities |
| **JavaScript (ES6+)** | Classes, reusable scripts, asynchronous requests, DOM manipulation, events, validation |
| **jQuery 3.7.1** | FAQ interactions, animations, and parts of the API interface |
| **Fetch API + Promises** | External exchange-rate request and JSON processing |
| **LocalStorage + JSON** | Cart, favorites, recently viewed items, preferences, demo accounts, and order history |
| **Git / GitHub / GitHub Pages** | Version control, team workflow, and static-site deployment |

The code is organized by page, with separate HTML, CSS, and JavaScript files. Two shared scripts coordinate functionality across pages:

- [`shared/theme.js`](shared/theme.js) — reusable theme behavior for five pages.
- [`shared/account-orders.js`](shared/account-orders.js) — stable demonstration account IDs, account-specific order storage, profile email updates, and legacy-order migration.

This organization helps separate interface logic, persistent data access, and shopping behavior while retaining the original Endterm structure.

## 7. External API Integration

**Provider endpoint:** [`https://open.er-api.com/v6/latest/USD`](https://open.er-api.com/v6/latest/USD)

**Purpose:** Retrieve an exchange rate for converting **USD to KZT** on the Home page.

**How it works:**

1. The browser sends an HTTP request using `fetch()`.
2. A Promise chain processes the response and parses JSON using `response.json()`.
3. The script reads `rates.KZT` and validates that the value is usable.
4. Dynamically created DOM elements show the rate, conversion result, and appropriate loading/success/empty/error feedback.
5. If a usable rate is unavailable, the interface clearly indicates that it is showing an approximate fallback estimate.

**API key:** The public endpoint used by this project does **not require a secret key in the client code**. The app does not embed private API credentials.

**Network note:** Live rates require internet access. The fallback value is a demo estimate, not financial advice or a guaranteed current rate.

## 8. LocalStorage and Data Management

| Key or key prefix | Stored data |
| --- | --- |
| `md_user` | Current demonstration user/session data |
| `md_demo_accounts_v1` | Local registry of demo accounts and stable IDs |
| `md_account_orders_v1_<accountId>` | Demo order history scoped to one local account |
| `md_guest_orders_v1` | Guest demo orders |
| `md_orders` | Preserved legacy Endterm order data |
| `md_orders_backup_before_accounts_v1` | Backup of legacy orders before migration |
| `md_cart` | Shopping-cart contents |
| `savedProducts` | Browser-wide favorite products |
| `md_recently_viewed` | Up to eight recently viewed products |
| `mineDropTheme` | Persisted light/dark preference |

**Account-specific demo orders:** The app stores orders under a stable local account identifier. Orders are shown separately when switching demonstration accounts in the same browser, and changing an account email in Profile preserves its order history.

**Legacy migration:** The original `md_orders` array is not deleted or overwritten. A backup is saved before migration, and legacy orders are associated with an account **only when the order email matches that account's email**. Unmatched orders remain in the legacy data.

**Data validation:** Several storage readers use `try/catch`, array/type checks, and safe defaults to handle absent or malformed JSON.

> **Important:** LocalStorage is scoped to a browser/origin, not synchronized across devices, and is not a secure database. The cart, favorites, and recently viewed history remain browser-wide; only order history and order-based dashboard metrics are account-scoped. This is a **client-side demonstration**, not privacy-grade user isolation.

## 9. Project Structure

```text
FinalWEB-3A/
├── index.html                  # Redirects to Home
├── README.md                   # Project documentation
├── home/
│   ├── main.html
│   ├── main.css
│   └── main.js                 # FAQ, converter, Home theme
├── login/
│   ├── log.html
│   ├── login.css
│   └── login.js                # Demo login and registration
├── products/
│   ├── products.html
│   ├── poductss.css
│   ├── products-data.js
│   ├── productsss.js
│   └── recently-viewed.js
├── saved/
│   ├── saved.html
│   ├── savedd.css
│   ├── savedd.js
│   └── recently-viewed-ui.js
├── booking/
│   ├── booking.html
│   ├── booking.css
│   └── booking.js              # CartItem OOP
├── payment/
│   ├── payment.html
│   ├── payment.css
│   └── payment.js              # Advanced checkout
├── profile/
│   ├── profile.html
│   ├── profile.css
│   ├── profile.js
│   └── dashboard.js
├── shared/
│   ├── theme.js
│   └── account-orders.js
└── img/ + page-specific image folders
```

> File names such as `productsss.js` and `poductss.css` are shown exactly as used in the project; keep their existing HTML references intact.

## 10. Installation and Running Locally

**Requirements:** A modern desktop or mobile browser, an internet connection for the API and CDN resources, and optionally Visual Studio Code with Live Server.

1. Clone the source repository:

   ```bash
   git clone https://github.com/anelmelis/FinalWEB-3A.git
   ```

2. Open the `FinalWEB-3A` folder in **Visual Studio Code**.
3. Start a local HTTP server (recommended: the **Live Server** extension).
4. Open `index.html` or `home/main.html` through the local server.
5. Navigate between pages using the website menu.




   

## 11. Functional Testing Guide


| Test | Steps | Expected result |
| --- | --- | --- |
| **A. API integration** | Open Home; change USD amount; optionally simulate offline or missing-rate responses | Rate/conversion updates; loading, success, missing-data, and error messages are handled |
| **B. Product catalog** | Search, filter, sort, open DETAILS, save an item | Catalog responds dynamically and favorites update |
| **C. Recently Viewed** | Open DETAILS on multiple items; revisit one; refresh Saved; remove/clear history | Latest eight distinct items persist in order and can be cleared |
| **D. OOP cart** | Add different items, change quantities, remove one, refresh | Cart uses multiple `CartItem` objects, totals are correct, data persists |
| **E. Advanced Checkout** | Choose pickup/standard/express; try submitting blank delivery address; complete demo purchase | Address fields depend on delivery, invalid checkout is blocked, tax/shipping total is correct |
| **F. Dashboard** | Finish demo purchase; open Profile; click REFRESH STATS; refresh page | New order appears, spending totals/average/quantities and chart update |
| **G. Account-specific orders** | Create an order in demo account A; log out; enter account B; return to A | B does not display A's order; A's order returns after sign-in |
| **H. Theme persistence** | Toggle Dark Mode; navigate across all seven pages; refresh; switch back | Consistent readable theme is restored and light mode remains usable |
| **I. Legacy features** | Open FAQ, edit Profile, check menu links, test Card/Crypto/Google Pay demo flows | Existing Endterm behavior remains usable |
| **J. Technical QA** | Test desktop/mobile layouts; inspect DevTools Console and Network tab | No unexpected JavaScript errors, missing project files, or broken navigation during normal use |

### Suggested complete purchase test

**Products → Booking → Payment → Profile**

1. Add two products to the cart and adjust a quantity.
2. Choose **Express Delivery ($12)** and fill in the required delivery details.
3. Verify `Total = Subtotal + 8% tax + $12`.
4. Complete the **simulated** checkout with test information.
5. Confirm the order appears in Profile, changes the dashboard, and remains after refresh.

## 12. Deployment

The website is hosted as a static site on **GitHub Pages** from the project repository.

- **Source repository:** https://github.com/anelmelis/FinalWEB-3A
- **Live site:** https://anelmelis.github.io/FinalWEB-3A/
- **Entry point:** `index.html` → `home/main.html`

After updating `main`, GitHub Pages publishes the configured branch. Verify the published pages and functionality after deployment.


## 13. Conclusion

MineDrop Final builds on the same Midterm/Endterm website and transforms it into a more capable client-side application while preserving the original shopping experience. The six new Final-stage features demonstrate **external API integration, Promises and JSON, real OOP classes, persistent LocalStorage, form validation, dynamic data visualization, reusable theme behavior, and defensive error handling**.

The project also demonstrates collaborative development, page-level code organization, real browser testing, and GitHub Pages deployment. All group members are expected to demonstrate their own contribution and explain the key JavaScript concepts used across the complete website during the individual defence.
