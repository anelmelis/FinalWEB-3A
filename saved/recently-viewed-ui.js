// MineDrop Final Project: display and manage recently viewed items on Saved.
(function () {
    "use strict";

    const grid = document.getElementById("recentlyViewedGrid");
    const empty = document.getElementById("emptyRecentlyViewed");
    const clearButton = document.getElementById("clearRecentlyViewed");

    if (!grid || !empty || !clearButton) return;

    function renderHistory() {
        grid.replaceChildren();

        // Only show IDs that still exist in the current product catalog.
        const recentProducts = window.MineDropRecent.get()
            .map(record => products.find(product => product.id === record.id))
            .filter(Boolean);

        empty.hidden = recentProducts.length > 0;
        clearButton.disabled = recentProducts.length === 0;

        recentProducts.forEach(product => {
            const column = document.createElement("div");
            column.className = "col-12 col-sm-6 col-lg-3";

            const card = document.createElement("article");
            card.className = "recently-viewed-card";

            const link = document.createElement("a");
            link.className = "recently-viewed-link";
            link.href = "../products/products.html?product=" + encodeURIComponent(product.id);
            link.setAttribute("aria-label", "View details for " + product.name);

            const image = document.createElement("img");
            image.src = product.image;
            image.alt = product.name;
            image.loading = "lazy";

            const name = document.createElement("h3");
            name.textContent = product.name;

            const price = document.createElement("p");
            price.textContent = "$" + product.price;

            link.append(image, name, price);

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.className = "recently-viewed-remove";
            removeButton.textContent = "REMOVE FROM HISTORY";
            removeButton.setAttribute("aria-label", "Remove " + product.name + " from history");
            removeButton.addEventListener("click", () => {
                if (window.MineDropRecent.remove(product.id)) renderHistory();
            });

            card.append(link, removeButton);
            column.appendChild(card);
            grid.appendChild(column);
        });
    }

    clearButton.addEventListener("click", () => {
        if (window.MineDropRecent.clear()) renderHistory();
    });

    // Refresh when localStorage changes in a different browser tab.
    window.addEventListener("storage", event => {
        if (event.key === "md_recently_viewed") renderHistory();
    });

    renderHistory();
})();
