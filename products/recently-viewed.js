// MineDrop Final Project: recently viewed products (shared by Products and Saved).
(function () {
    "use strict";

    const STORAGE_KEY = "md_recently_viewed";
    const MAX_ITEMS = 8;

    function getHistory() {
        try {
            const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            if (!Array.isArray(value)) return [];

            const seen = new Set();
            return value.filter(item => {
                if (!item || typeof item.id !== "string" ||
                    !/^\d+$/.test(item.id) || seen.has(item.id)) {
                    return false;
                }
                seen.add(item.id);
                return true;
            }).slice(0, MAX_ITEMS);
        } catch (error) {
            console.warn("Could not read recently viewed products:", error);
            return [];
        }
    }

    function saveHistory(items) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
            return true;
        } catch (error) {
            console.warn("Could not save recently viewed products:", error);
            return false;
        }
    }

    function addProduct(productId) {
        const id = String(productId);
        if (!/^\d+$/.test(id)) return false;

        const remaining = getHistory().filter(item => item.id !== id);
        return saveHistory([
            { id, viewedAt: new Date().toISOString() },
            ...remaining
        ].slice(0, MAX_ITEMS));
    }

    function removeProduct(productId) {
        return saveHistory(getHistory().filter(item => item.id !== String(productId)));
    }

    function clearHistory() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return true;
        } catch (error) {
            console.warn("Could not clear recently viewed products:", error);
            return false;
        }
    }

    window.MineDropRecent = {
        get: getHistory,
        add: addProduct,
        remove: removeProduct,
        clear: clearHistory
    };
})();
