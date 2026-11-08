// FINAL PROJECT: Statistics Dashboard
// Orders are account-scoped via MineDropAccounts; favorites remain browser-scoped.
// It does not modify either dataset.
(() => {
  "use strict";

  function readArray(key) {
    try {
      const stored = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(stored) ? stored : [];
    } catch (error) {
      console.warn(`Invalid data in ${key}; dashboard shows an empty list.`, error);
      return [];
    }
  }

  function safeAmount(value) {
    const amount = Number(value);
    return Number.isFinite(amount) && amount >= 0 ? amount : 0;
  }

  function formatMoney(value) {
    return "$" + value.toFixed(2);
  }

  function monthKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  }

  function getLastSixMonths() {
    const today = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push({
        key: monthKey(date),
        label: date.toLocaleDateString("en-US", { month: "short" }),
        total: 0
      });
    }
    return months;
  }

  function calculateStats() {
    const orders = window.MineDropAccounts.getOrders()
      .filter(order => order && typeof order === "object" && !Array.isArray(order));
    const favorites = readArray("savedProducts");
    const totalSpent = orders.reduce((sum, order) => sum + safeAmount(order.total), 0);
    const purchasedItems = orders.reduce((sum, order) => {
      if (!Array.isArray(order.items)) return sum;
      return sum + order.items.reduce((itemSum, item) => {
        const qty = Number(item && item.qty);
        return itemSum + (Number.isFinite(qty) && qty > 0 ? qty : 0);
      }, 0);
    }, 0);
    const months = getLastSixMonths();
    orders.forEach(order => {
      if (typeof order.date !== "string") return;
      const date = new Date(order.date);
      if (Number.isNaN(date.getTime())) return;
      const month = months.find(item => item.key === monthKey(date));
      if (month) month.total += safeAmount(order.total);
    });
    return {
      totalSpent,
      averageOrder: orders.length ? totalSpent / orders.length : 0,
      purchasedItems,
      favoriteCount: favorites.length,
      months,
      orderCount: orders.length
    };
  }

  function renderChart(months, orderCount) {
    const chart = document.getElementById("dashboardChart");
    const empty = document.getElementById("dashboardEmpty");
    if (!chart || !empty) return;
    chart.replaceChildren();
    empty.hidden = orderCount > 0;
    const maximum = Math.max(...months.map(month => month.total), 0);
    chart.setAttribute("aria-label", "Monthly spending: " + months.map(m => `${m.label} ${formatMoney(m.total)}`).join(", "));
    months.forEach(month => {
      const column = document.createElement("div");
      column.className = "dashboard-bar-item";
      const value = document.createElement("span");
      value.className = "dashboard-bar-value";
      value.textContent = formatMoney(month.total);
      const bar = document.createElement("div");
      bar.className = "dashboard-bar";
      bar.style.height = maximum > 0 && month.total > 0 ? `${Math.max(4, (month.total / maximum) * 155)}px` : "3px";
      bar.title = `${month.label}: ${formatMoney(month.total)}`;
      const label = document.createElement("span");
      label.className = "dashboard-bar-label";
      label.textContent = month.label;
      column.append(value, bar, label);
      chart.appendChild(column);
    });
  }

  function renderDashboard() {
    const stats = calculateStats();
    document.getElementById("dashboardSpent").textContent = formatMoney(stats.totalSpent);
    document.getElementById("dashboardAverage").textContent = formatMoney(stats.averageOrder);
    document.getElementById("dashboardItems").textContent = String(stats.purchasedItems);
    document.getElementById("dashboardFavorites").textContent = String(stats.favoriteCount);
    renderChart(stats.months, stats.orderCount);
  }

  document.getElementById("refreshDashboard")?.addEventListener("click", renderDashboard);
  window.addEventListener("storage", event => {
    if (event.key === null || event.key === "savedProducts" || event.key === "md_user" ||
        (event.key && event.key.startsWith("md_account_orders_v1_"))) renderDashboard();
  });
  renderDashboard();
})();
