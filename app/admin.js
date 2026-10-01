"use client";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Banknote,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock,
  Globe,
  Image as ImageIcon,
  Inbox,
  Info,
  LayoutDashboard,
  ListChecks,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Package,
  PackagePlus,
  Pencil,
  Phone,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Store,
  Trash2,
  User,
} from "lucide-react";

export const defaultProducts = [
  [
    "Wireless Over-Ear Headphones",
    "electronics",
    1499,
    2199,
    "🎧",
    "photo-1505740420928-5e560c06d30e",
  ],
  [
    "Classic Everyday Wrist Watch",
    "electronics",
    2399,
    3199,
    "⌚",
    "photo-1523275335684-37898b6baf30",
  ],
  [
    "Lightweight Running Sneakers",
    "fashion",
    1999,
    2799,
    "👟",
    "photo-1542291026-7eec264c27ff",
  ],
  [
    "Modern Lounge Chair",
    "home",
    6999,
    8999,
    "🪑",
    "photo-1503602642458-232111445657",
  ],
  [
    "Daily Skincare Essentials",
    "beauty",
    849,
    1199,
    "🧴",
    "photo-1556228578-0d85b1a4d571",
  ],
  [
    "Minimal Laptop for Everyday Work",
    "electronics",
    42999,
    49999,
    "💻",
    "photo-1496181133206-80ce9b88a853",
  ],
  [
    "Soft Cotton Casual T-Shirt",
    "fashion",
    599,
    899,
    "👕",
    "photo-1521572163474-6864f9cf17ab",
  ],
  [
    "Decorative Table Lamp",
    "home",
    1799,
    2399,
    "💡",
    "photo-1507473885765-e6ed057f782c",
  ],
  [
    "Everyday Smartphone",
    "electronics",
    15999,
    18999,
    "📱",
    "photo-1511707171634-5f897ff02aa9",
  ],
  [
    "Stylish Everyday Handbag",
    "fashion",
    2299,
    2999,
    "👜",
    "photo-1547949003-9792a18a2601",
  ],
  [
    "Indoor Green Plant",
    "home",
    699,
    999,
    "🪴",
    "photo-1416879595882-3373a0480b5b",
  ],
  [
    "Beauty Makeup Collection",
    "beauty",
    1299,
    1799,
    "💄",
    "photo-1596462502278-27bfdc403348",
  ],
].map(([name, category, price, oldPrice, emoji, image], index) => ({
  id: String(index + 1),
  name,
  category,
  price,
  oldPrice,
  emoji,
  image,
  features: [
    `${name} for everyday use.`,
    "Modern design and versatile style.",
    "A great addition to your collection.",
  ],
}));

export const defaultSettings = {
  brand: "amazon",
  suffix: ".in",
  location: "Pakistan",
  heroKicker: "Fresh finds",
  heroTitle1: "Make every day",
  heroTitle2: "feel new.",
  heroText:
    "Discover exciting picks for your home, wardrobe and everyday life.",
  heroImage: "photo-1600210492486-724fe5c67fb0",
};

const blankProduct = {
  name: "",
  category: "electronics",
  price: "",
  oldPrice: "",
  emoji: "🛍️",
  image: "",
  features: "",
};

const input =
  "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-[16px] text-slate-900 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 min-[721px]:text-sm";

const btnPrimary =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ffd814] px-6 py-2.5 text-sm font-bold text-slate-900 shadow-sm transition duration-200 hover:bg-[#f7ca00] hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/30 active:scale-[0.98] min-[421px]:w-auto";

const btnDark =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#131921] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#232f3e] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 active:scale-[0.98]";

const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-200 hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-400/20 active:scale-[0.98]";

const orderStatusStyles = {
  pending: "border-amber-300 bg-amber-50 text-amber-800",
  confirmed: "border-blue-300 bg-blue-50 text-blue-800",
  shipped: "border-violet-300 bg-violet-50 text-violet-800",
  delivered: "border-emerald-300 bg-emerald-50 text-emerald-800",
  cancelled: "border-rose-300 bg-rose-50 text-rose-700",
};

function productImageSrc(image, width = 200) {
  if (!image) return "";
  if (/^https?:\/\//i.test(image)) return image;
  return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=${width}&q=60`;
}

function ProductThumb({
  product,
  sizeClass = "h-11 w-11",
  emojiClass = "text-xl",
}) {
  const src = productImageSrc(product.image);

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200 ${sizeClass}`}
    >
      <span className={emojiClass}>{product.emoji}</span>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      ) : null}
    </div>
  );
}

function FieldGroup({ icon: Icon, title, children }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function FieldLabel({ children }) {
  return (
    <span className="text-sm font-semibold text-slate-700">{children}</span>
  );
}

function CustomerRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white px-3.5 py-2.5 ring-1 ring-slate-100">
      <span className="mt-0.5 rounded-lg bg-slate-100 p-1.5 text-slate-500">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p className="break-words text-sm font-medium text-slate-800">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

export default function Admin({
  products,
  settings,
  onProductsChange,
  onSettingsChange,
  onBack,
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState(blankProduct);
  const [editingId, setEditingId] = useState(null);
  const [siteForm, setSiteForm] = useState(settings);

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // UI-only state: which dashboard section is visible.
  const [view, setView] = useState("overview");

  const brand = settings?.brand || "amazon";
  const suffix = settings?.suffix || ".in";

  async function loadOrders() {
    try {
      setOrdersLoading(true);

      const response = await fetch("/api/orders");

      if (!response.ok) {
        throw new Error("Orders load nahi ho sake.");
      }

      const data = await response.json();

      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Orders loading error:", error);
      setError(error.message || "Orders load nahi ho sake.");
    } finally {
      setOrdersLoading(false);
    }
  }

  async function updateOrderStatus(id, status) {
    try {
      const response = await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order status update failed");
      }

      setOrders((current) =>
        current.map((order) => (order._id === id ? data : order)),
      );

      setError("");
      toast.success(`Order status changed to ${status}`, {
        icon: "✓",
        style: {
          border: "1px solid #bbf7d0",
          background: "#f0fdf4",
          color: "#166534",
          fontWeight: "700",
        },
      });
    } catch (error) {
      console.error("Order status error:", error);
      setError(error.message || "Order status update nahi ho saka.");
      toast.error(error.message || "Order status update nahi ho saka.", {
        style: {
          border: "1px solid #fecaca",
          background: "#fef2f2",
          color: "#b91c1c",
          fontWeight: "700",
        },
      });
    }
  }

  async function deleteOrder(id) {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete this delivered order?",
      )
    ) {
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order delete failed");
      }

      setOrders((current) => current.filter((order) => order._id !== id));

      setError("");
      toast.success("Order Deleted Successfully");
    } catch (error) {
      console.error("Order delete error:", error);
      setError(error.message || "Order delete nahi ho saka.");
    }
  }

  function handleLogin(event) {
    event.preventDefault();

    // Apne credentials YAHAN change karo.
    // Client-side code mein ye secret nahi rehte.
    const correctEmail = "khandaulathassankhan@gmail.com";
    const correctPassword = "hassan";

    if (
      email.trim().toLowerCase() === correctEmail.toLowerCase() &&
      password === correctPassword
    ) {
      setUnlocked(true);
      setPassword("");
      setError("");
      loadOrders();
    } else {
      setError("Email ya password galat hai.");
    }
  }

  function resetForm() {
    setForm(blankProduct);
    setEditingId(null);
  }

  async function saveProduct(event) {
    event.preventDefault();

    const price = Number(form.price);
    const oldPrice = Number(form.oldPrice || 0);

    if (
      !form.name.trim() ||
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isFinite(oldPrice) ||
      oldPrice < 0
    ) {
      setError("Product ki details check karo.");
      return;
    }

    const product = {
      id: editingId || crypto.randomUUID(),
      name: form.name.trim(),
      category: form.category,
      price,
      oldPrice,
      emoji: form.emoji.trim() || "🛍️",
      image: form.image.trim(),
      features: form.features
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        const response = await fetch("/api/products", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Product update failed");
        }

        onProductsChange(
          products.map((item) => (item.id === editingId ? data : item)),
        );
      } else {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Product add failed");
        }

        onProductsChange([...products, data]);
      }

      if (editingId) {
        toast.success("Product updated successfully!", {
          icon: "✓",
          style: {
            border: "1px solid #bbf7d0",
            background: "#f0fdf4",
            color: "#166534",
            fontWeight: "700",
          },
        });
      } else {
        toast.success("Product added successfully!", {
          icon: "✓",
          style: {
            border: "1px solid #bbf7d0",
            background: "#f0fdf4",
            color: "#166534",
            fontWeight: "700",
          },
        });
      }
      resetForm();
      setError("");
    } catch (error) {
      console.error(error);
      setError(error.message || "Product save nahi ho saka.");
      toast.error(error.message || "Product save nahi ho saka.", {
        style: {
          border: "1px solid #fecaca",
          background: "#fef2f2",
          color: "#b91c1c",
          fontWeight: "700",
        },
      });
    }
  }

  function editProduct(product) {
    setEditingId(product.id);

    setForm({
      ...product,
      features: (product.features || []).join("\n"),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function removeProduct(id) {
    if (!window.confirm("Is product ko remove karna hai?")) {
      return;
    }

    try {
      const response = await fetch("/api/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Product delete failed");
      }

      onProductsChange(products.filter((product) => product.id !== id));

      if (editingId === id) {
        resetForm();
      }
      toast.success("Product deleted successfully!");
      setError("");
    } catch (error) {
      console.error(error);
      setError(error.message || "Product delete nahi ho saka.");
      toast.error(error.message || "Product delete nahi ho saka.");
    }
  }

  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered",
  ).length;

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "settings", label: "Website Settings", icon: Globe },
    {
      id: "products",
      label: "Products",
      icon: Package,
      count: products.length,
    },
    {
      id: "orders",
      label: "Orders",
      icon: ClipboardList,
      count: orders.length,
    },
  ];

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      note: "Items in your catalog",
      icon: Package,
      tint: "bg-amber-50 text-amber-600 ring-amber-100",
    },
    {
      label: "Total Orders",
      value: orders.length,
      note: "All-time orders received",
      icon: ClipboardList,
      tint: "bg-blue-50 text-blue-600 ring-blue-100",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      note: "Waiting for your action",
      icon: Clock,
      tint: "bg-orange-50 text-orange-600 ring-orange-100",
    },
    {
      label: "Delivered Orders",
      value: deliveredOrders,
      note: "Successfully completed",
      icon: CheckCircle2,
      tint: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    },
  ];

  return (
    <section className="min-h-screen min-w-0 bg-slate-100 text-slate-900 antialiased">
      <Toaster
        position="top-right"
        gutter={12}
        toastOptions={{
          duration: 2800,
          className: "!rounded-2xl !border !bg-white !px-4 !py-3 !shadow-2xl",
          style: {
            minWidth: "320px",
            maxWidth: "380px",
          },
        }}
      />
      {!unlocked ? (
        /* ------------------------------ LOGIN ------------------------------ */
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#131921] px-4 py-12">
          <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#ff9900]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-[#ffd814]/10 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
              backgroundSize: "26px 26px",
            }}
          />

          <div className="relative w-full max-w-md">
            <div className="rounded-3xl border border-white/10 bg-white p-7 shadow-2xl shadow-black/50 min-[421px]:p-9">
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff9900] shadow-lg shadow-orange-500/30">
                  <ShieldCheck className="h-7 w-7 text-[#131921]" />
                </div>
                <p className="mt-4 text-xl font-extrabold tracking-tight text-slate-900">
                  {brand}
                  <span className="text-[#ff9900]">{suffix}</span>
                  <span className="ml-2 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Admin
                  </span>
                </p>
              </div>

              <h2 className="mt-6 text-center text-2xl font-extrabold tracking-tight text-slate-900">
                Welcome Back
              </h2>
              <p className="mt-1.5 text-center text-sm text-slate-500">
                Sign in to manage your store, products and orders
              </p>

              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="admin-email"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="admin-email"
                      type="email"
                      autoComplete="username"
                      required
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className={`${input} pl-10`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="admin-password"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="admin-password"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className={`${input} pl-10`}
                    />
                  </div>
                </div>

                {error && (
                  <p className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span className="break-words">{error}</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ffd814] px-6 py-3 text-sm font-bold text-slate-900 shadow-md shadow-amber-500/20 transition duration-200 hover:bg-[#f7ca00] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/30 active:scale-[0.98]"
                >
                  Sign in to Admin Panel
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </form>

              <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500 ring-1 ring-slate-100">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <p>
                  Local browser admin: credentials browser code mein visible
                  hote hain. Product changes isi browser mein save hoti hain.
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-xs font-medium text-slate-400">
              Authorized access only · {brand}
              {suffix} administration
            </p>
          </div>
        </div>
      ) : (
        /* ---------------------------- DASHBOARD ---------------------------- */
        <div className="min-w-0 lg:flex lg:items-start">
          {/* Sidebar (desktop) */}
          <aside className="hidden bg-[#131921] text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-72 lg:shrink-0 lg:flex-col">
            <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ff9900] shadow-lg shadow-orange-500/20">
                <ShieldCheck className="h-6 w-6 text-[#131921]" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-lg font-extrabold tracking-tight">
                  {brand}
                  <span className="text-[#ff9900]">{suffix}</span>
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                  Admin Suite
                </p>
              </div>
            </div>

            <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 py-6">
              <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                Menu
              </p>
              {navItems.map((item) => {
                const active = view === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setView(item.id)}
                    className={
                      active
                        ? "flex w-full items-center gap-3 rounded-xl bg-[#ff9900] px-4 py-3 text-sm font-bold text-[#131921] shadow-md shadow-orange-950/40 transition duration-200"
                        : "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition duration-200 hover:bg-white/10 hover:text-white"
                    }
                  >
                    <item.icon className="h-[18px] w-[18px] shrink-0" />
                    <span className="flex-1 truncate text-left">
                      {item.label}
                    </span>
                    {item.count != null && (
                      <span
                        className={
                          active
                            ? "rounded-full bg-black/15 px-2 py-0.5 text-[11px] font-bold"
                            : "rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-bold text-slate-300"
                        }
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="space-y-1.5 border-t border-white/10 p-4">
              <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                Session
              </p>
              <button
                type="button"
                onClick={onBack}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition duration-200 hover:bg-white/10 hover:text-white"
              >
                <Store className="h-[18px] w-[18px] shrink-0" />
                <span className="flex-1 text-left">Back to Store</span>
              </button>
              <button
                type="button"
                onClick={() => setUnlocked(false)}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition duration-200 hover:bg-rose-500/15 hover:text-rose-300"
              >
                <LogOut className="h-[18px] w-[18px] shrink-0" />
                <span className="flex-1 text-left">Logout</span>
              </button>
            </div>
          </aside>

          {/* Main column */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Top header */}
            <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
              <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3.5 min-[421px]:px-5 min-[721px]:px-8 min-[721px]:py-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff9900] shadow-md shadow-orange-500/20 lg:hidden">
                    <ShieldCheck className="h-5 w-5 text-[#131921]" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="truncate text-lg font-extrabold tracking-tight text-slate-900 min-[721px]:text-2xl">
                      Admin Dashboard
                    </h1>
                    <p className="hidden text-sm text-slate-500 min-[421px]:block">
                      Manage your store, products and orders
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={onBack}
                    aria-label="Back to store"
                    className={`${btnGhost} !px-3.5 min-[721px]:!px-5`}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden min-[721px]:inline">
                      Back to store
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnlocked(false)}
                    aria-label="Logout"
                    className={`${btnDark} !px-3.5 min-[721px]:!px-5`}
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden min-[721px]:inline">Logout</span>
                  </button>
                </div>
              </div>

              {/* Mobile navigation */}
              <nav className="flex gap-2 overflow-x-auto px-4 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
                {navItems.map((item) => {
                  const active = view === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setView(item.id)}
                      className={
                        active
                          ? "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[#131921] px-4 py-2 text-xs font-bold text-white shadow-sm transition duration-200"
                          : "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition duration-200 hover:border-slate-300 hover:bg-slate-50"
                      }
                    >
                      <item.icon className="h-3.5 w-3.5" />
                      {item.label}
                      {item.count != null && (
                        <span
                          className={
                            active
                              ? "rounded-full bg-[#ff9900] px-1.5 py-0.5 text-[10px] font-bold text-[#131921]"
                              : "rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500"
                          }
                        >
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </header>

            {/* Content */}
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 min-[421px]:px-5 min-[721px]:px-8 min-[721px]:py-8">
              {error && (
                <div
                  role="alert"
                  className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700 shadow-sm"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                  <p className="break-words font-medium">{error}</p>
                </div>
              )}

              {/* --------------------------- OVERVIEW --------------------------- */}
              {view === "overview" && (
                <div className="space-y-6">
                  <div className="relative overflow-hidden rounded-2xl bg-[#131921] p-6 text-white shadow-md min-[721px]:p-8">
                    <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#ff9900]/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-28 right-40 h-56 w-56 rounded-full bg-[#ffd814]/10 blur-3xl" />
                    <p className="relative text-xs font-bold uppercase tracking-[0.25em] text-[#ff9900]">
                      Store Overview
                    </p>
                    <h2 className="relative mt-2 text-2xl font-extrabold tracking-tight min-[721px]:text-3xl">
                      Welcome back, Admin
                    </h2>
                    <p className="relative mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
                      Here is what is happening across {brand}
                      {suffix} today — track orders, update your catalog and
                      fine-tune the storefront.
                    </p>
                  </div>

                  <div className="grid gap-4 min-[421px]:grid-cols-2 min-[1100px]:grid-cols-4">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-500">
                              {stat.label}
                            </p>
                            <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                              {stat.value}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              {stat.note}
                            </p>
                          </div>
                          <div
                            className={`shrink-0 rounded-xl p-3 ring-1 ${stat.tint}`}
                          >
                            <stat.icon className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-6 min-[1100px]:grid-cols-[minmax(0,1fr)_320px]">
                    {/* Recent orders */}
                    <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 min-[721px]:px-6">
                        <div className="flex items-center gap-2.5">
                          <ClipboardList className="h-5 w-5 text-slate-400" />
                          <h3 className="font-bold text-slate-900">
                            Recent Orders
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => setView("orders")}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 transition hover:text-amber-800 hover:underline"
                        >
                          View all
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {orders.length === 0 ? (
                        <div className="flex flex-col items-center px-6 py-10 text-center">
                          <Inbox className="h-8 w-8 text-slate-300" />
                          <p className="mt-3 text-sm font-medium text-slate-500">
                            No orders yet.
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            New customer orders will appear here.
                          </p>
                        </div>
                      ) : (
                        <ul className="divide-y divide-slate-100">
                          {orders.slice(0, 5).map((order) => (
                            <li key={order._id}>
                              <button
                                type="button"
                                onClick={() => setView("orders")}
                                className="flex w-full min-w-0 items-center justify-between gap-3 px-5 py-3.5 text-left transition duration-200 hover:bg-slate-50 min-[721px]:px-6"
                              >
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold text-slate-900">
                                    <span className="font-mono">
                                      #{order._id.slice(-8)}
                                    </span>
                                    <span className="text-slate-400"> · </span>
                                    {order.customer?.name || "Customer"}
                                  </p>
                                  <p className="mt-0.5 text-xs text-slate-400">
                                    {new Date(order.createdAt).toLocaleString(
                                      "en-PK",
                                    )}
                                  </p>
                                </div>
                                <div className="flex shrink-0 items-center gap-2.5">
                                  <span className="hidden text-sm font-bold text-slate-900 min-[421px]:inline">
                                    Rs{" "}
                                    {Number(order.total || 0).toLocaleString(
                                      "en-PK",
                                    )}
                                  </span>
                                  <span
                                    className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                      orderStatusStyles[order.status] ||
                                      "border-slate-300 bg-slate-50 text-slate-600"
                                    }`}
                                  >
                                    {order.status}
                                  </span>
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Quick actions */}
                    <div className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm min-[721px]:p-6">
                      <h3 className="font-bold text-slate-900">
                        Quick Actions
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        Jump straight into common tasks.
                      </p>
                      <div className="mt-5 space-y-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            resetForm();
                            setView("products");
                          }}
                          className={`${btnDark} w-full`}
                        >
                          <Plus className="h-4 w-4" />
                          Add new product
                        </button>
                        <button
                          type="button"
                          onClick={() => setView("settings")}
                          className={`${btnGhost} w-full`}
                        >
                          <Globe className="h-4 w-4" />
                          Website settings
                        </button>
                        <button
                          type="button"
                          onClick={loadOrders}
                          className={`${btnGhost} w-full`}
                        >
                          <RefreshCw
                            className={`h-4 w-4 ${
                              ordersLoading ? "animate-spin" : ""
                            }`}
                          />
                          Refresh orders
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ------------------------ WEBSITE SETTINGS ------------------------ */}
              {view === "settings" && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex flex-wrap items-center gap-3.5 border-b border-slate-200 px-5 py-5 min-[721px]:px-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                      <Globe className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                        Website Settings
                      </h2>
                      <p className="text-sm text-slate-500">
                        Control your storefront identity and hero section
                      </p>
                    </div>
                  </div>

                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      onSettingsChange(siteForm);
                      setError("");
                    }}
                    className="grid w-full gap-4 p-5 min-[721px]:grid-cols-2 min-[721px]:p-6"
                  >
                    {[
                      ["brand", "Logo name"],
                      ["suffix", "Logo suffix"],
                      ["location", "Default location"],
                      ["heroKicker", "Hero small heading"],
                      ["heroTitle1", "Hero heading — line 1"],
                      ["heroTitle2", "Hero heading — line 2"],
                      ["heroText", "Hero description"],
                      ["heroImage", "Hero image URL / Unsplash photo ID"],
                    ].map(([key, label]) => (
                      <label
                        key={key}
                        className={`grid min-w-0 gap-1.5 ${
                          key === "heroText" || key === "heroImage"
                            ? "min-[721px]:col-span-2"
                            : ""
                        }`}
                      >
                        <FieldLabel>{label}</FieldLabel>

                        <input
                          required
                          value={siteForm[key] || ""}
                          onChange={(event) =>
                            setSiteForm({
                              ...siteForm,
                              [key]: event.target.value,
                            })
                          }
                          className={input}
                        />
                      </label>
                    ))}

                    <div className="flex justify-end border-t border-slate-100 pt-5 min-[721px]:col-span-2">
                      <button type="submit" className={btnPrimary}>
                        <Save className="h-4 w-4" />
                        Save website settings
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ---------------------------- PRODUCTS ---------------------------- */}
              {view === "products" && (
                <div className="space-y-6">
                  {/* Add / edit product */}
                  <div
                    className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-200 ${
                      editingId
                        ? "border-amber-300 ring-2 ring-amber-400/40"
                        : "border-slate-200"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-5 min-[721px]:px-6">
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                          <PackagePlus className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                            {editingId ? "Edit product" : "Add new product"}
                          </h2>
                          <p className="text-sm text-slate-500">
                            {editingId
                              ? "Update the details of this product"
                              : "Fill in the details to list a new product"}
                          </p>
                        </div>
                      </div>
                      {editingId && (
                        <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700">
                          Editing mode
                        </span>
                      )}
                    </div>

                    <form
                      onSubmit={saveProduct}
                      className="grid w-full gap-6 p-5 min-[721px]:p-6"
                    >
                      <FieldGroup icon={Info} title="Product Information">
                        <div className="grid gap-4 min-[721px]:grid-cols-2">
                          <label className="grid min-w-0 gap-1.5">
                            <FieldLabel>Product name</FieldLabel>
                            <input
                              required
                              placeholder="e.g. Wireless Over-Ear Headphones"
                              value={form.name}
                              onChange={(event) =>
                                setForm({
                                  ...form,
                                  name: event.target.value,
                                })
                              }
                              className={input}
                            />
                          </label>

                          <label className="grid min-w-0 gap-1.5">
                            <FieldLabel>Category</FieldLabel>
                            <select
                              value={form.category}
                              onChange={(event) =>
                                setForm({
                                  ...form,
                                  category: event.target.value,
                                })
                              }
                              className={`${input} capitalize`}
                            >
                              {["electronics", "fashion", "home", "beauty"].map(
                                (category) => (
                                  <option key={category} value={category}>
                                    {category}
                                  </option>
                                ),
                              )}
                            </select>
                          </label>
                        </div>
                      </FieldGroup>

                      <FieldGroup icon={Banknote} title="Pricing">
                        <div className="grid gap-4 min-[721px]:grid-cols-2">
                          <label className="grid min-w-0 gap-1.5">
                            <FieldLabel>Price (Rs)</FieldLabel>
                            <div className="relative">
                              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                                Rs
                              </span>
                              <input
                                required
                                type="number"
                                min="0"
                                placeholder="1499"
                                value={form.price}
                                onChange={(event) =>
                                  setForm({
                                    ...form,
                                    price: event.target.value,
                                  })
                                }
                                className={`${input} pl-10`}
                              />
                            </div>
                          </label>

                          <label className="grid min-w-0 gap-1.5">
                            <FieldLabel>
                              Old price (Rs){" "}
                              <span className="font-normal text-slate-400">
                                — optional
                              </span>
                            </FieldLabel>
                            <div className="relative">
                              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                                Rs
                              </span>
                              <input
                                type="number"
                                min="0"
                                placeholder="2199"
                                value={form.oldPrice}
                                onChange={(event) =>
                                  setForm({
                                    ...form,
                                    oldPrice: event.target.value,
                                  })
                                }
                                className={`${input} pl-10`}
                              />
                            </div>
                          </label>
                        </div>
                      </FieldGroup>

                      <FieldGroup icon={ImageIcon} title="Product Media">
                        <div className="grid gap-4 min-[721px]:grid-cols-[minmax(0,1fr)_minmax(0,180px)_auto]">
                          <label className="grid min-w-0 gap-1.5">
                            <FieldLabel>
                              Image URL / Unsplash photo ID
                            </FieldLabel>
                            <input
                              placeholder="photo-1505740420928-5e560c06d30e"
                              value={form.image}
                              onChange={(event) =>
                                setForm({
                                  ...form,
                                  image: event.target.value,
                                })
                              }
                              className={input}
                            />
                          </label>

                          <label className="grid min-w-0 gap-1.5">
                            <FieldLabel>Emoji</FieldLabel>
                            <input
                              placeholder="Fallback emoji, e.g. 🎧"
                              value={form.emoji}
                              onChange={(event) =>
                                setForm({
                                  ...form,
                                  emoji: event.target.value,
                                })
                              }
                              className={input}
                            />
                          </label>

                          <div className="hidden min-w-0 gap-1.5 min-[721px]:grid">
                            <FieldLabel>Preview</FieldLabel>
                            <ProductThumb
                              product={{
                                emoji: form.emoji || "🛍️",
                                image: form.image,
                                name: form.name || "Product preview",
                              }}
                              sizeClass="h-[46px] w-[56px]"
                            />
                          </div>
                        </div>
                      </FieldGroup>

                      <FieldGroup icon={ListChecks} title="Product Details">
                        <label className="grid min-w-0 gap-1.5">
                          <FieldLabel>Features</FieldLabel>
                          <textarea
                            rows={4}
                            placeholder="Product features — one per line"
                            value={form.features}
                            onChange={(event) =>
                              setForm({
                                ...form,
                                features: event.target.value,
                              })
                            }
                            className={`${input} resize-y`}
                          />
                          <span className="text-xs text-slate-400">
                            Write one feature per line — each line shows as a
                            bullet on the product.
                          </span>
                        </label>
                      </FieldGroup>

                      <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
                        <button type="submit" className={btnPrimary}>
                          {editingId ? (
                            <>
                              <CheckCircle2 className="h-4 w-4" />
                              Update product
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4" />
                              Add product
                            </>
                          )}
                        </button>

                        {editingId && (
                          <button
                            type="button"
                            onClick={resetForm}
                            className={btnGhost}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Product list */}
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-5 min-[721px]:px-6">
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                          <Package className="h-5 w-5" />
                        </span>
                        <div>
                          <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                            Products
                          </h2>
                          <p className="text-sm text-slate-500">
                            {products.length} items in your catalog
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-600">
                        {products.length} total
                      </span>
                    </div>

                    {products.length === 0 ? (
                      <div className="flex flex-col items-center px-6 py-12 text-center">
                        <Package className="h-9 w-9 text-slate-300" />
                        <p className="mt-3 text-sm font-medium text-slate-500">
                          No products yet.
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Use the form above to add your first product.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Table (desktop / tablet) */}
                        <div className="hidden overflow-x-auto min-[721px]:block">
                          <table className="w-full min-w-[640px] text-left text-sm">
                            <thead>
                              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                <th className="px-6 py-3.5">Product</th>
                                <th className="px-4 py-3.5">Category</th>
                                <th className="px-4 py-3.5">Price</th>
                                <th className="px-4 py-3.5">Old price</th>
                                <th className="px-6 py-3.5 text-right">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {products.map((product) => (
                                <tr
                                  key={product.id}
                                  className={`transition duration-200 hover:bg-amber-50/40 ${
                                    editingId === product.id
                                      ? "bg-amber-50/60"
                                      : ""
                                  }`}
                                >
                                  <td className="max-w-0 px-6 py-4 min-[721px]:w-[42%]">
                                    <div className="flex min-w-0 items-center gap-3">
                                      <ProductThumb product={product} />
                                      <div className="min-w-0">
                                        <p className="truncate font-semibold text-slate-900">
                                          {product.name}
                                        </p>
                                        <p className="mt-0.5 font-mono text-xs text-slate-400">
                                          ID: {String(product.id).slice(0, 8)}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4">
                                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold capitalize text-slate-600">
                                      {product.category}
                                    </span>
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-4 font-bold text-slate-900">
                                    Rs{" "}
                                    {Number(product.price).toLocaleString(
                                      "en-PK",
                                    )}
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-4">
                                    {Number(product.oldPrice) > 0 ? (
                                      <span className="text-slate-400 line-through">
                                        Rs{" "}
                                        {Number(
                                          product.oldPrice,
                                        ).toLocaleString("en-PK")}
                                      </span>
                                    ) : (
                                      <span className="text-slate-300">—</span>
                                    )}
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex justify-end gap-2">
                                      <button
                                        type="button"
                                        onClick={() => editProduct(product)}
                                        aria-label="Edit product"
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition duration-200 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600"
                                      >
                                        <Pencil className="h-4 w-4" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeProduct(product.id)
                                        }
                                        aria-label="Remove product"
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition duration-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Cards (mobile) */}
                        <div className="space-y-3 p-4 min-[721px]:hidden">
                          {products.map((product) => (
                            <div
                              key={product.id}
                              className={`rounded-xl border p-4 transition duration-200 ${
                                editingId === product.id
                                  ? "border-amber-300 bg-amber-50/50"
                                  : "border-slate-200 bg-white"
                              }`}
                            >
                              <div className="flex min-w-0 items-start gap-3">
                                <ProductThumb
                                  product={product}
                                  sizeClass="h-14 w-14"
                                  emojiClass="text-2xl"
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="break-words font-semibold leading-snug text-slate-900">
                                    {product.name}
                                  </p>
                                  <span className="mt-1.5 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold capitalize text-slate-600">
                                    {product.category}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                                <span className="text-base font-extrabold text-slate-900">
                                  Rs{" "}
                                  {Number(product.price).toLocaleString(
                                    "en-PK",
                                  )}
                                </span>
                                {Number(product.oldPrice) > 0 && (
                                  <span className="text-sm text-slate-400 line-through">
                                    Rs{" "}
                                    {Number(product.oldPrice).toLocaleString(
                                      "en-PK",
                                    )}
                                  </span>
                                )}
                              </div>
                              <div className="mt-3 flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => editProduct(product)}
                                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 transition duration-200 hover:bg-amber-100"
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeProduct(product.id)}
                                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600 transition duration-200 hover:bg-rose-100"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* ----------------------------- ORDERS ----------------------------- */}
              {view === "orders" && (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                        Orders
                        <span className="ml-2 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 align-middle text-xs font-bold text-slate-500">
                          {orders.length}
                        </span>
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Track and manage customer orders
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={loadOrders}
                      className={btnDark}
                    >
                      <RefreshCw
                        className={`h-4 w-4 ${
                          ordersLoading ? "animate-spin" : ""
                        }`}
                      />
                      Refresh Orders
                    </button>
                  </div>

                  {ordersLoading ? (
                    <div className="space-y-4">
                      {[0, 1, 2].map((item) => (
                        <div
                          key={item}
                          className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                        >
                          <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4">
                            <div className="space-y-2">
                              <div className="h-3.5 w-32 rounded bg-slate-200" />
                              <div className="h-3 w-44 rounded bg-slate-200" />
                            </div>
                            <div className="h-8 w-28 rounded-full bg-slate-200" />
                          </div>
                          <div className="space-y-3 p-5">
                            <div className="h-12 rounded-xl bg-slate-100" />
                            <div className="h-12 rounded-xl bg-slate-100" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                        <Inbox className="h-7 w-7 text-slate-400" />
                      </span>
                      <p className="mt-4 font-bold text-slate-700">
                        No orders yet.
                      </p>
                      <p className="mt-1 max-w-xs text-sm text-slate-400">
                        When customers place orders in your store, they will
                        show up here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {orders.map((order) => (
                        <article
                          key={order._id}
                          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:shadow-md"
                        >
                          {/* Order header */}
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-4 min-[721px]:px-5">
                            <div className="flex min-w-0 items-center gap-3">
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200">
                                <ClipboardList className="h-5 w-5" />
                              </span>
                              <div className="min-w-0">
                                <p className="truncate font-mono text-sm font-bold text-slate-900">
                                  Order #{order._id.slice(-8)}
                                </p>
                                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                                  <Clock className="h-3.5 w-3.5 shrink-0" />
                                  {new Date(order.createdAt).toLocaleString(
                                    "en-PK",
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 min-[421px]:gap-4">
                              <div className="text-right">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Total
                                </p>
                                <p className="whitespace-nowrap text-sm font-extrabold text-slate-900">
                                  Rs{" "}
                                  {Number(order.total || 0).toLocaleString(
                                    "en-PK",
                                  )}
                                </p>
                              </div>

                              <div className="relative">
                                <select
                                  value={order.status}
                                  onChange={(event) =>
                                    updateOrderStatus(
                                      order._id,
                                      event.target.value,
                                    )
                                  }
                                  className={`cursor-pointer appearance-none rounded-full border py-2 pl-3.5 pr-9 text-xs font-bold uppercase tracking-wider shadow-sm outline-none transition duration-200 focus:ring-4 focus:ring-amber-500/15 ${
                                    orderStatusStyles[order.status] ||
                                    "border-slate-300 bg-slate-50 text-slate-600"
                                  }`}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="delivered">Delivered</option>
                                  <option value="confirmed">Confirmed</option>
                                  <option value="shipped">Shipped</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>

                                {order.status === "delivered" && (
                                  <button
                                    type="button"
                                    onClick={() => deleteOrder(order._id)}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-600 transition duration-200 hover:bg-rose-100"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Delete
                                  </button>
                                )}

                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 opacity-60" />
                              </div>
                            </div>
                          </div>

                          {/* Order body */}
                          <div className="grid min-[1100px]:grid-cols-[minmax(0,1fr)_300px]">
                            <div className="min-w-0 p-4 min-[721px]:p-5">
                              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                                Items ({(order.items || []).length})
                              </p>

                              <div className="space-y-2">
                                {(order.items || []).map((item, index) => (
                                  <div
                                    key={`${order._id}-${item.productId}-${index}`}
                                    className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 rounded-xl border border-slate-100 bg-white px-4 py-3 transition duration-200 hover:border-slate-200 hover:bg-slate-50/60"
                                  >
                                    <div className="min-w-0">
                                      <p className="break-words font-semibold text-slate-900">
                                        {item.name}
                                      </p>
                                      <p className="mt-0.5 text-xs text-slate-500">
                                        Qty: {item.quantity}
                                        {Number(item.price) > 0 && (
                                          <span className="text-slate-400">
                                            {" "}
                                            · Rs{" "}
                                            {Number(item.price).toLocaleString(
                                              "en-PK",
                                            )}{" "}
                                            each
                                          </span>
                                        )}
                                      </p>
                                    </div>

                                    <p className="whitespace-nowrap font-bold text-slate-900">
                                      Rs{" "}
                                      {(
                                        Number(item.price || 0) *
                                        Number(item.quantity || 0)
                                      ).toLocaleString("en-PK")}
                                    </p>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-4 flex items-center justify-between gap-2 border-t border-dashed border-slate-200 pt-3.5">
                                <span className="text-sm font-bold text-slate-500">
                                  Order Total
                                </span>

                                <span className="text-lg font-extrabold tracking-tight text-amber-700">
                                  Rs{" "}
                                  {Number(order.total || 0).toLocaleString(
                                    "en-PK",
                                  )}
                                </span>
                              </div>
                            </div>

                            {/* Customer */}
                            <div className="min-w-0 border-t border-slate-100 bg-slate-50/70 p-4 min-[721px]:p-5 min-[1100px]:border-l min-[1100px]:border-t-0">
                              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                                Customer
                              </p>

                              <div className="space-y-2">
                                <CustomerRow
                                  icon={User}
                                  label="Name"
                                  value={order.customer?.name}
                                />
                                <CustomerRow
                                  icon={Mail}
                                  label="Email"
                                  value={order.customer?.email}
                                />
                                <CustomerRow
                                  icon={Phone}
                                  label="Phone"
                                  value={order.customer?.phone}
                                />
                                <CustomerRow
                                  icon={MapPin}
                                  label="Address"
                                  value={order.customer?.address}
                                />
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      )}
    </section>
  );
}
