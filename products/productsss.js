// ========================================
// DYNAMIC PRODUCT RENDERING
// ========================================

function renderProducts() {
    const productsGrid = document.getElementById("productsGrid");

    productsGrid.innerHTML = "";

    products.forEach((product) => {
        const productCard = document.createElement("div");

        productCard.className =
            "col-12 col-sm-6 col-lg-3 product-wrapper";

        productCard.dataset.category = product.category;
        productCard.dataset.name = product.name;

        productCard.innerHTML = `
            <article class="product-card">

                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <div class="product-info">
                    <div>
                        <h3>${product.name}</h3>
                        <p>${product.shortDescription}</p>
                    </div>

                    <span class="product-price">
                        $${product.price}
                    </span>
                </div>

                <div class="product-actions">

                    <button
                        class="save-btn"
                        type="button"
                        data-id="${product.id}"
                        data-name="${product.name}"
                        data-description="${product.shortDescription}"
                        data-price="$${product.price}"
                        data-category="${product.category}"
                        data-image="${product.image}"
                    >
                        ♡ SAVE
                    </button>

                    <button
                        class="details-btn"
                        type="button"
                        data-name="${product.name}"
                        data-description="${product.description}"
                        data-price="$${product.price}"
                        data-category="${product.categoryLabel}"
                    >
                        DETAILS
                    </button>

                </div>
            </article>
        `;

        productsGrid.appendChild(productCard);
    });
}

renderProducts();// ========================================
// ELEMENTS
// ========================================

const saveButtons = document.querySelectorAll(".save-btn");
const detailsButtons = document.querySelectorAll(".details-btn");

const categoryButtons = document.querySelectorAll(".category-button");

const productWrappers = document.querySelectorAll(".product-wrapper");

const productSearch = document.getElementById("productSearch");

const productCount = document.getElementById("productCount");

const noProductsMessage = document.getElementById("noProductsMessage");


// Modal

const detailsOverlay = document.getElementById("detailsOverlay");

const closeModalButton = document.getElementById("closeModal");

const modalName = document.getElementById("modalName");

const modalDescription = document.getElementById("modalDescription");

const modalPrice = document.getElementById("modalPrice");

const modalCategory = document.getElementById("modalCategory");


// Current category

let selectedCategory = "all";


// ========================================
// SAVED PRODUCTS
// ========================================

function getSavedProducts() {

    const storedProducts =
        localStorage.getItem("savedProducts");

    if (!storedProducts) {
        return [];
    }

    try {

        return JSON.parse(storedProducts);

    } catch (error) {

        console.error(
            "Could not read saved products:",
            error
        );

        return [];
    }

}


function saveProducts(products) {

    localStorage.setItem(
        "savedProducts",
        JSON.stringify(products)
    );

}


// ========================================
// UPDATE SAVE BUTTONS WHEN PAGE LOADS
// ========================================

function updateSavedButtons() {

    const savedProducts =
        getSavedProducts();


    saveButtons.forEach((button) => {

        const saved =
            savedProducts.some(
                product =>
                    product.id === button.dataset.id
            );


        if (saved) {

            button.textContent =
                "♥ SAVED";

            button.classList.add("saved");

        } else {

            button.textContent =
                "♡ SAVE";

            button.classList.remove("saved");

        }

    });

}


updateSavedButtons();


// ========================================
// SAVE / REMOVE PRODUCT
// ========================================

saveButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            let savedProducts =
                getSavedProducts();


            const product = {
                 id: button.dataset.id,
                 name: button.dataset.name,
                 description: button.dataset.description,
                 price: button.dataset.price,
                 category: button.dataset.category,
                 image: button.dataset.image
            };

            const productIndex =
                savedProducts.findIndex(
                    item =>
                        item.id === product.id
                );


            // Product is not saved yet

            if (productIndex === -1) {

                savedProducts.push(product);

            }

            // Product already saved -> remove it

            else {

                savedProducts.splice(
                    productIndex,
                    1
                );

            }


            saveProducts(savedProducts);

            updateSavedButtons();

        }
    );

});


// ========================================
// DETAILS MODAL
// ========================================

detailsButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            modalName.textContent =
                button.dataset.name;

            modalDescription.textContent =
                button.dataset.description;

            modalPrice.textContent =
                button.dataset.price;

            modalCategory.textContent =
                button.dataset.category;


            detailsOverlay.classList.add(
                "show"
            );


            document.body.style.overflow =
                "hidden";

        }
    );

});


// ========================================
// CLOSE MODAL
// ========================================

function closeModal() {

    detailsOverlay.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


closeModalButton.addEventListener(
    "click",
    closeModal
);


// Close by clicking outside

detailsOverlay.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            detailsOverlay
        ) {

            closeModal();

        }

    }
);


// Close with ESC key

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);


// ========================================
// FILTER PRODUCTS
// ========================================

function filterProducts() {

    const searchValue =
        productSearch.value
            .trim()
            .toLowerCase();


    let visibleProducts = 0;


    productWrappers.forEach(
        (product) => {

            const productName =
                product.dataset.name
                    .toLowerCase();


            const productCategory =
                product.dataset.category;


            const matchesSearch =
                productName.includes(
                    searchValue
                );


            const matchesCategory =
                selectedCategory === "all" ||
                productCategory ===
                    selectedCategory;


            if (
                matchesSearch &&
                matchesCategory
            ) {

                product.classList.remove(
                    "hidden-product"
                );

                visibleProducts++;

            } else {

                product.classList.add(
                    "hidden-product"
                );

            }

        }
    );


    // Product count

    productCount.textContent =
        `${visibleProducts} ${
            visibleProducts === 1
                ? "product"
                : "products"
        }`;


    // Nothing found message

    if (visibleProducts === 0) {

        noProductsMessage.classList.remove(
            "d-none"
        );

    } else {

        noProductsMessage.classList.add(
            "d-none"
        );

    }

}


// ========================================
// SEARCH
// ========================================

productSearch.addEventListener(
    "input",
    filterProducts
);


// ========================================
// CATEGORY BUTTONS
// ========================================

categoryButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                selectedCategory = categories.includes(button.dataset.category)
                    ? button.dataset.category
                    : "all";

               


                categoryButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active-category"
                        );

                    }
                );


                button.classList.add(
                    "active-category"
                );


                filterProducts();

            }
        );

    }
);


// ========================================
// SORT PRODUCTS BY PRICE
// ========================================

const sortSelect = document.getElementById("sortProducts");
const sortGrid = document.getElementById("productsGrid");

// Remember the original product order
const originalProductOrder = Array.from(sortGrid.children);

function sortProductCards() {

    const cards = Array.from(
        sortGrid.querySelectorAll(".product-wrapper")
    );

    const sortType = sortSelect.value;

    cards.sort((a, b) => {

        // Restore original order
        if (sortType === "default") {
            return originalProductOrder.indexOf(a)
                 - originalProductOrder.indexOf(b);
        }

        // Get product prices
        const priceA = parseFloat(
            a.querySelector(".save-btn").dataset.price.replace("$", "")
        );

        const priceB = parseFloat(
            b.querySelector(".save-btn").dataset.price.replace("$", "")
        );

        // Low to high
        if (sortType === "low-high") {
            return priceA - priceB;
        }

        // High to low
        if (sortType === "high-low") {
            return priceB - priceA;
        }

        return 0;
    });

    // Update product order on the page
    cards.forEach(card => {
        sortGrid.appendChild(card);
    });

}

// Sort when the user changes the option
sortSelect.addEventListener("change", sortProductCards);
