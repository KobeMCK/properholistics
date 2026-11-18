(function () {
  const products = [...window.PH_PRODUCTS].sort((a, b) => a.price - b.price);
  const stacks = window.PH_STACKS;
  const brands = window.PH_BRANDS;
  const categories = window.PH_CATEGORIES;
  const discount = window.PH_STACK_DISCOUNT;
  const productById = Object.fromEntries(products.map((p) => [p.id, p]));
  const stackById = Object.fromEntries(stacks.map((s) => [s.id, s]));
  const CART_KEY = "ph-cart-v1";

  const money = (n) => `$${n.toFixed(2)} CAD`;
  const stackProducts = (s) => s.items.map((i) => productById[i.id]);
  const stackRetail = (s) => stackProducts(s).reduce((sum, p) => sum + p.price, 0);
  const stackPrice = (s) => Math.round(stackRetail(s) * (1 - discount) * 100) / 100;

  const filters = { brand: "All", category: "All", certified: false };
  let cart = loadCart();

  // Packshots grouped on a shared floor so each stack reads as a real bundle.
  function bundle(s, { floor = 12 } = {}) {
    const items = stackProducts(s);
    const n = items.length;
    const width = n === 2 ? 60 : n === 3 ? 52 : 44;
    const step = n > 1 ? (100 - width) / (n - 1) : 0;
    return items
      .map((p, i) => {
        const left = n > 1 ? i * step : (100 - width) / 2;
        return `<span aria-hidden="true" style="left:${left}%;width:${width}%;bottom:${floor}%;z-index:${i + 1};aspect-ratio:1;background-image:url('${p.image}')" class="absolute block bg-contain bg-bottom bg-no-repeat mix-blend-multiply"></span>`;
      })
      .join("");
  }

  function loadCart() {
    try {
      const parsed = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      return parsed.filter((l) => (l.type === "product" ? productById[l.id] : stackById[l.id]));
    } catch {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
  }

  function addToCart(type, id) {
    const line = cart.find((l) => l.type === type && l.id === id);
    if (line) line.qty += 1;
    else cart.push({ type, id, qty: 1 });
    saveCart();
    openCart();
  }

  function changeQty(type, id, delta) {
    const line = cart.find((l) => l.type === type && l.id === id);
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) cart = cart.filter((l) => l !== line);
    saveCart();
  }

  function filterButton(group, value) {
    const active = filters[group] === value;
    return `<button type="button" data-filter="${group}" data-value="${value}" aria-pressed="${active}"
      class="${active ? "text-ink underline underline-offset-4" : "text-mute hover:text-ink"}">${value}</button>`;
  }

  function renderFilters() {
    document.getElementById("category-filters").innerHTML = ["All", ...categories].map((c) => filterButton("category", c)).join("");
    document.getElementById("brand-filters").innerHTML = brands.map((b) => filterButton("brand", b)).join("");
    const cert = document.getElementById("certified-filter");
    cert.setAttribute("aria-pressed", String(filters.certified));
    cert.className = filters.certified ? "text-ink underline underline-offset-4" : "text-mute hover:text-ink";
  }

  function renderProducts() {
    const list = products.filter(
      (p) =>
        (filters.brand === "All" || p.brand === filters.brand) &&
        (filters.category === "All" || p.category === filters.category) &&
        (!filters.certified || p.certified)
    );
    const grid = document.getElementById("products-grid");
    if (!list.length) {
      grid.innerHTML = `<li class="col-span-full py-16 text-center text-mute">Nothing matches those filters.</li>`;
      return;
    }
    grid.innerHTML = list
      .map(
        (p) => `
      <li class="group flex flex-col items-center text-center">
        <div class="mb-5 flex aspect-square w-full items-center justify-center p-4">
          <img src="${p.image}" alt="${p.brand} ${p.name}" loading="lazy" class="max-h-full w-auto object-contain mix-blend-multiply">
        </div>
        <h3>${p.name}</h3>
        <p class="mt-1 text-mute">${p.brand}${p.certified ? " &middot; NSF Sport" : ""}</p>
        <p class="mt-1">${money(p.price)}</p>
        <button type="button" data-add-product="${p.id}" class="mt-2 text-mute underline-offset-4 hover:text-ink hover:underline md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100">
          Add to cart<span class="sr-only">: ${p.name}</span>
        </button>
      </li>`
      )
      .join("");
  }

  function renderStacks() {
    document.getElementById("stacks-grid").innerHTML = stacks
      .map(
        (s) => `
      <li>
        <button type="button" data-stack="${s.id}" class="group flex w-full flex-col items-center text-center">
          <span class="relative mb-5 block aspect-[4/3] w-3/4">${bundle(s)}</span>
          <span>${s.name} Stack</span>
          <span class="mt-1 text-mute">${stackProducts(s).map((p) => p.name).join(" + ")}</span>
          <span class="mt-1"><s class="text-mute">${money(stackRetail(s))}</s> ${money(stackPrice(s))}</span>
        </button>
      </li>`
      )
      .join("");
  }

  function openStack(id) {
    const s = stackById[id];
    document.getElementById("stack-dialog-body").innerHTML = `
      <div class="grid md:grid-cols-2">
        <div class="relative hidden md:block">${bundle(s, { floor: 22 })}</div>
        <div class="flex max-h-[85vh] flex-col gap-8 overflow-y-auto p-8">
          <div class="flex items-start justify-between gap-4">
            <h2 id="stack-dialog-title" class="text-sm font-medium">${s.name} Stack</h2>
            <button type="button" data-close class="text-mute hover:text-ink">Close</button>
          </div>
          <p class="leading-relaxed text-mute text-pretty">${s.summary}</p>
          <ul class="flex flex-col gap-5">
            ${stackProducts(s)
              .map(
                (p, i) => `
              <li class="flex items-center gap-4">
                <img src="${p.image}" alt="" class="size-16 shrink-0 object-contain mix-blend-multiply">
                <div class="flex min-w-0 flex-1 flex-col gap-1">
                  <p>${p.name} <span class="text-mute">&middot; ${p.brand}</span></p>
                  <p class="leading-relaxed text-mute">${s.items[i].note}</p>
                </div>
                <span class="whitespace-nowrap text-mute">${money(p.price)}</span>
              </li>`
              )
              .join("")}
          </ul>
          <div class="flex flex-col gap-4">
            <div class="flex items-baseline justify-between">
              <span class="text-mute">Together, save ${Math.round(discount * 100)}%</span>
              <span><s class="text-mute">${money(stackRetail(s))}</s> ${money(stackPrice(s))}</span>
            </div>
            <button type="button" data-add-stack="${s.id}" class="bg-ink py-3.5 text-paper transition hover:opacity-85">Add to cart</button>
          </div>
        </div>
      </div>`;
    document.getElementById("stack-dialog").showModal();
  }

  function cartLineView(line) {
    if (line.type === "stack") {
      const s = stackById[line.id];
      return {
        title: `${s.name} Stack`,
        sub: stackProducts(s).map((p) => p.name).join(" + "),
        thumb: `<span class="relative block h-full w-full">${bundle(s, { floor: 8 })}</span>`,
        unit: stackPrice(s),
      };
    }
    const p = productById[line.id];
    return {
      title: p.name,
      sub: p.brand,
      thumb: `<img src="${p.image}" alt="" class="max-h-full w-auto object-contain mix-blend-multiply">`,
      unit: p.price,
    };
  }

  function renderCart() {
    document.getElementById("cart-count").textContent = cart.reduce((n, l) => n + l.qty, 0);
    const body = document.getElementById("cart-lines");
    if (!cart.length) {
      body.innerHTML = `<p class="px-6 py-4 text-mute">Your cart is empty.</p>`;
      document.getElementById("cart-total").textContent = money(0);
      return;
    }
    let total = 0;
    body.innerHTML = `<ul class="flex flex-col gap-6 px-6 py-4">${cart
      .map((l) => {
        const v = cartLineView(l);
        total += v.unit * l.qty;
        return `
        <li class="flex gap-4">
          <div class="flex size-16 shrink-0 items-center justify-center">${v.thumb}</div>
          <div class="flex min-w-0 flex-1 flex-col gap-1">
            <p>${v.title}</p>
            <p class="truncate text-mute">${v.sub}</p>
            <div class="mt-1 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <button type="button" data-qty="-1" data-type="${l.type}" data-id="${l.id}" class="px-1 text-mute hover:text-ink" aria-label="Decrease quantity of ${v.title}">&minus;</button>
                <span aria-live="polite">${l.qty}</span>
                <button type="button" data-qty="1" data-type="${l.type}" data-id="${l.id}" class="px-1 text-mute hover:text-ink" aria-label="Increase quantity of ${v.title}">+</button>
              </div>
              <span>${money(v.unit * l.qty)}</span>
            </div>
          </div>
        </li>`;
      })
      .join("")}</ul>`;
    document.getElementById("cart-total").textContent = money(total);
  }

  function openCart() {
    const d = document.getElementById("cart-dialog");
    if (!d.open) d.showModal();
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, dialog");
    if (!t) return;
    if (t.tagName === "DIALOG") {
      if (e.target === t) t.close();
      return;
    }
    if (t.dataset.stack) {
      openStack(t.dataset.stack);
    } else if (t.dataset.filter) {
      const { filter, value } = t.dataset;
      filters[filter] = filter === "brand" && filters.brand === value ? "All" : value;
      renderFilters();
      renderProducts();
    } else if (t.id === "certified-filter") {
      filters.certified = !filters.certified;
      renderFilters();
      renderProducts();
    } else if (t.dataset.addProduct) {
      addToCart("product", t.dataset.addProduct);
    } else if (t.dataset.addStack) {
      document.getElementById("stack-dialog").close();
      addToCart("stack", t.dataset.addStack);
    } else if (t.dataset.qty) {
      changeQty(t.dataset.type, t.dataset.id, Number(t.dataset.qty));
    } else if (t.hasAttribute("data-open-cart")) {
      openCart();
    } else if (t.hasAttribute("data-close")) {
      t.closest("dialog").close();
    }
  });

  renderFilters();
  renderProducts();
  renderStacks();
  renderCart();
})();
