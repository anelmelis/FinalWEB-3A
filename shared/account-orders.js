/* MineDrop FINAL — account-scoped demo order history.
   No backend, no passwords: this is data organization, NOT secure authentication.
   Legacy md_orders is never removed or overwritten. */
(function () {
  'use strict';

  const REGISTRY = 'md_demo_accounts_v1';
  const LEGACY = 'md_orders';
  const LEGACY_BACKUP = 'md_orders_backup_before_accounts_v1';
  const CLAIMS = 'md_legacy_order_claims_v1';
  const ACCOUNT_ORDERS = 'md_account_orders_v1_';
  const GUEST_ORDERS = 'md_guest_orders_v1';

  function normalizeEmail(value) {
    return typeof value === 'string' ? value.trim().toLowerCase() : '';
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value));
  }

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (error) {
      console.warn('MineDrop: cannot read ' + key, error);
      return fallback;
    }
  }

  function readArray(key) {
    const data = readJSON(key, []);
    return Array.isArray(data) ? data : [];
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('MineDrop: cannot save ' + key, error);
      return false;
    }
  }

  function registry() {
    const value = readJSON(REGISTRY, {});
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  }

  function newId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return 'acc_' + crypto.randomUUID();
    }
    return 'acc_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2);
  }

  function rawUser() {
    const user = readJSON('md_user', null);
    return user && typeof user === 'object' && !Array.isArray(user) &&
      user.isLoggedIn !== false && validEmail(user.email) ? user : null;
  }

  // Store stable account IDs in a local registry so editing email does not lose orders.
  function currentAccount() {
    const user = rawUser();
    if (!user) return null;
    const email = normalizeEmail(user.email);
    const records = registry();
    let record = records[email];
    if (!record || !record.id) {
      record = {
        id: newId(),
        name: String(user.name || email.split('@')[0]),
        surname: String(user.surname || ''),
        phone: String(user.phone || '')
      };
      records[email] = record;
      if (!writeJSON(REGISTRY, records)) return null;
    }
    if (user.accountId !== record.id) {
      if (!writeJSON('md_user', { ...user, accountId: record.id })) return null;
    }
    return { id: record.id, email, record };
  }

  // Registration and the existing email-only demo login.
  function signIn(input, isRegistration = false) {
    const email = normalizeEmail(input && input.email);
    if (!validEmail(email)) return null;

    const records = registry();
    const previous = records[email];
    const record = {
      id: previous && previous.id ? previous.id : newId(),
      name: String(isRegistration ? input.name : (previous && previous.name) || email.split('@')[0]),
      surname: String(isRegistration ? input.surname : (previous && previous.surname) || 'User'),
      phone: String(isRegistration ? input.phone : (previous && previous.phone) || '')
    };
    records[email] = record;
    if (!writeJSON(REGISTRY, records)) return null;

    const user = { ...record, accountId: record.id, email, isLoggedIn: true };
    delete user.id;
    return writeJSON('md_user', user) ? user : null;
  }

  function updateProfile(fullName, nextEmail) {
    const current = currentAccount();
    const email = normalizeEmail(nextEmail);
    if (!current || !validEmail(email) || !String(fullName).trim()) return false;

    const records = registry();
    if (records[email] && records[email].id !== current.id) {
      return false; // Another demo account already uses this email.
    }
    const nameParts = String(fullName).trim().split(/\s+/);
    const newRecord = {
      ...current.record,
      id: current.id,
      name: nameParts[0],
      surname: nameParts.slice(1).join(' ')
    };
    records[email] = newRecord;
    if (email !== current.email) delete records[current.email];

    if (!writeJSON(REGISTRY, records)) return false;
    const oldUser = rawUser() || {};
    return writeJSON('md_user', {
      ...oldUser,
      accountId: current.id,
      email,
      name: newRecord.name,
      surname: newRecord.surname,
      isLoggedIn: true
    });
  }

  function ordersKey(account) {
    return account ? ACCOUNT_ORDERS + account.id : GUEST_ORDERS;
  }

  // Preserve the original legacy array exactly, before copying any matching orders.
  function backupLegacy() {
    const raw = localStorage.getItem(LEGACY);
    if (raw === null) return true;
    if (localStorage.getItem(LEGACY_BACKUP) !== null) return true;
    try {
      localStorage.setItem(LEGACY_BACKUP, raw);
      return true;
    } catch (error) {
      console.error('MineDrop: cannot back up old orders; migration skipped.', error);
      return false;
    }
  }

  // Claim legacy orders ONLY when their billing email exactly matches this account.
  // Orders with no email, mismatched email, or ambiguous ownership remain untouched.
  function migrateLegacy(account) {
    if (!account || !backupLegacy()) return;

    const legacy = readArray(LEGACY);
    if (!legacy.length) return;
    const claims = readJSON(CLAIMS, {});
    if (!claims || typeof claims !== 'object' || Array.isArray(claims)) return;
    const key = ordersKey(account);
    const scoped = readArray(key);
    const existingIds = new Set(scoped.map(order => String(order && order.id || '')));
    const next = [...scoped];
    const newlyClaimed = [];

    legacy.forEach(order => {
      if (!order || typeof order !== 'object' || Array.isArray(order)) return;
      if (normalizeEmail(order.email) !== account.email) return;
      if (typeof order.id !== 'string' || !order.id) return;
      const id = order.id;
      if (claims[id] && claims[id] !== account.id) return;
      if (!existingIds.has(id)) {
        next.push({ ...order, accountId: account.id });
        existingIds.add(id);
      }
      if (!claims[id]) newlyClaimed.push(id);
    });

    if (next.length > scoped.length && !writeJSON(key, next)) return;
    if (newlyClaimed.length) {
      newlyClaimed.forEach(id => { claims[id] = account.id; });
      writeJSON(CLAIMS, claims);
    }
  }

  function getOrders() {
    const account = currentAccount();
    if (account) migrateLegacy(account);
    return readArray(ordersKey(account));
  }

  function saveOrder(order) {
    if (!order || typeof order !== 'object' || typeof order.id !== 'string' || !order.id) {
      return false;
    }
    const account = currentAccount();
    const existing = getOrders();
    if (existing.some(item => item && item.id === order.id)) return true;
    return writeJSON(ordersKey(account), [
      ...existing,
      { ...order, accountId: account ? account.id : null }
    ]);
  }

  window.MineDropAccounts = Object.freeze({
    signIn,
    currentAccount,
    updateProfile,
    getOrders,
    saveOrder,
    backupLegacy,
    normalizeEmail
  });
})();
