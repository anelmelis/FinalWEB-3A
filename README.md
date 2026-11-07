# MineDrop — Endterm Project

## 1. Project Overview

MineDrop is a responsive, multi-page Minecraft-inspired merchandise store developed as a continuation of our Midterm Project.

The Endterm version extends the original HTML, CSS, and Bootstrap website with JavaScript and jQuery functionality. Users can browse products, search and filter items, manage favorites, use a shopping cart, complete a demo checkout, and view their order history.

The main objective is to demonstrate JavaScript fundamentals, DOM manipulation, event handling, form validation, and jQuery while preserving the original responsive website.

## 2. Team Members

**Group: SE-2527**

- Anel Melis
- Albina Onglassyn
- Aziza Kenzhegali

The project was developed collaboratively, with separate responsibilities for the main website sections.

## 3. Website Pages

MineDrop includes seven connected pages:

1. **Home** — Store introduction, navigation, interactive FAQ, and jQuery effects.
2. **Products** — Dynamic product catalog, search, category filtering, price sorting, favorites, and product details.
3. **Saved** — View, sort, and remove favorite products, and continue to Booking.
4. **Booking** — Browse available collections, manage a shopping cart, change quantities, and calculate totals.
5. **Payment** — Demo checkout with Card, Crypto, and Google Pay options and JavaScript form validation.
6. **Login** — Demo registration and login with input validation.
7. **Profile** — User information, saved items, cart statistics, profile editing, and dynamic order history.

## 4. New Endterm Features

### JavaScript Fundamentals

The project uses arrays, loops, reusable functions, parameters, and return values.

Examples include:

- `products` and `categories` arrays for product data.
- `PREORDERS` and `PREVIOUS` arrays for Booking.
- `forEach()` to generate and process product cards.
- `reduce()` to calculate quantities and totals.
- Functions such as `renderProducts()`, `filterProducts()`, `getSavedProducts()`, and `renderOrderHistory()`.

### DOM Manipulation

Product cards are dynamically created from JavaScript arrays using `createElement()`, `innerHTML`, and `appendChild()`.

The website also dynamically updates product counts, favorites, shopping cart contents, validation messages, and order history.

### Interactive Features

Users can:

- Search for products.
- Filter products by category.
- Sort products by price.
- Add and remove favorite products.
- View product details in a modal.
- Modify cart quantities and remove items.
- Search and expand FAQ questions.
- Edit profile information.

### Events

The project uses `addEventListener()` and jQuery event handlers.

Examples of event types include `click`, `input`, `change`, `submit`, and `keydown`.

The `event` object and `preventDefault()` are used where appropriate.

### Form Validation

Registration and Payment forms use custom JavaScript validation.

The validation checks required fields, email formats, name lengths, phone numbers, and demo payment details.

Invalid fields display feedback, incorrect submissions are prevented, and successful submissions display confirmation messages.

### jQuery

jQuery is used on the Home page to implement an interactive FAQ.

The implementation demonstrates:

- ID and class selectors.
- DOM traversal using `closest()` and `find()`.
- `click` and `input` events.
- `slideUp()`, `slideDown()`, `fadeIn()`, and `fadeOut()` effects.

These features improve interaction and usability.

### Local Storage

The website uses browser `localStorage` to retain data across pages.

Important storage keys include:

- `md_user` — Demo user information.
- `savedProducts` — Favorite products.
- `md_cart` — Shopping cart contents.
- `md_orders` — Completed demo orders.

After a successful demo checkout, the order is saved and dynamically displayed in Profile.

## 5. Technologies Used

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- jQuery 3.7.1
- Browser Local Storage
- Git and GitHub
- GitHub Pages

## 6. How to Run the Project

The project can be opened using the published GitHub Pages link.

For local development:

1. Clone or download the repository.
2. Open the project folder in Visual Studio Code.
3. Start a local server using Live Server.
4. Open `home/main.html` or the root `index.html`.
5. Navigate between the website pages.

An internet connection is required to load externally hosted Bootstrap, jQuery, and Google Fonts resources.

## 7. How to Test Endterm Features

### Test 1 — Product Catalog

1. Open Products.
2. Confirm that the product cards are displayed.
3. Search for a product by name.
4. Select different categories.
5. Sort by price from low to high and high to low.
6. Open a product's Details modal.

**Expected result:** Products respond dynamically to user interactions.

### Test 2 — Favorites

1. Click SAVE on any product.
2. Open Saved.
3. Confirm that the selected product appears.
4. Refresh the page.
5. Remove the product.

**Expected result:** Favorites are stored and updated correctly.

### Test 3 — Registration and Profile

1. Open Login and choose Registration.
2. Submit the form with empty or invalid fields.
3. Observe the validation messages.
4. Complete the form with valid demonstration information.
5. Open Home and Profile.

**Expected result:** Registration succeeds, and the user information appears in Profile.

### Test 4 — jQuery FAQ

1. Open Home.
2. Click an FAQ question.
3. Click it again to close the answer.
4. Enter text into the FAQ search field.

**Expected result:** Answers expand and collapse with animations, and search filters the questions.

### Test 5 — Shopping Cart

1. Open Booking.
2. Add products to the cart.
3. Increase and decrease quantities.
4. Remove a product.
5. Observe the total price.

**Expected result:** Cart contents, item counts, and totals update correctly.

### Test 6 — Payment Validation

1. Add an item to the cart.
2. Open Payment.
3. Submit the form with invalid or missing values.
4. Observe the validation messages.
5. Complete the form using fictional test information.

**Expected result:** Invalid submissions are blocked, and a valid demo checkout displays confirmation.

### Test 7 — Order History

1. Complete a demo checkout.
2. Open Profile.
3. Find the new order in Order History.
4. Refresh the page.

**Expected result:** The order remains visible, and the Orders counter is updated.

## 8. Project Deployment

**GitHub Repository:**  
https://github.com/anelmelis/minedrop---endterm--3A

**Live Website:**  
https://anelmelis.github.io/minedrop---endterm--3A/

The website is hosted using GitHub Pages.

## 9. Important Notes

MineDrop is an educational demonstration website.

Registration, login, Google login, cryptocurrency payment, and card checkout are simulated using client-side JavaScript.

No real transactions are processed. Users should not enter real passwords or payment information.

Data stored in `localStorage` is browser-specific and is not synchronized across different devices.

## 10. Conclusion

MineDrop Endterm successfully extends the original Midterm website by introducing interactive JavaScript and jQuery functionality.

The updated website demonstrates arrays, loops, reusable functions, DOM manipulation, event handling, form validation, and local data persistence.

The project preserves its original multi-page responsive design while providing a more interactive shopping experience.