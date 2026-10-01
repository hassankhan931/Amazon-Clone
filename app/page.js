"use client";

/* eslint-disable @next/next/no-img-element */

import { Manrope } from "next/font/google";
import { useEffect, useMemo, useRef, useState } from "react";
import Admin, { defaultProducts, defaultSettings } from "./admin";
import Footer from "./components/Footer";
import HomeContent, { Photo } from "./components/HomeContent";
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";
import { Toaster, toast as hotToast } from "react-hot-toast";
import Tracking from "./components/Tracking";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

const countries = [
  "Pakistan",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Argentina",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Belgium",
  "Brazil",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Czech Republic",
  "Denmark",
  "Egypt",
  "Finland",
  "France",
  "Germany",
  "Ghana",
  "Greece",
  "Hong Kong",
  "Hungary",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Jordan",
  "Kenya",
  "Kuwait",
  "Lebanon",
  "Malaysia",
  "Maldives",
  "Mexico",
  "Morocco",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Oman",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Saudi Arabia",
  "Singapore",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Thailand",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Vietnam",
];

const countryCurrencies = {
  Pakistan: "PKR",
  Afghanistan: "AFN",
  Albania: "ALL",
  Algeria: "DZD",
  Argentina: "ARS",
  Australia: "AUD",
  Austria: "EUR",
  Azerbaijan: "AZN",
  Bahrain: "BHD",
  Bangladesh: "BDT",
  Belgium: "EUR",
  Brazil: "BRL",
  Canada: "CAD",
  Chile: "CLP",
  China: "CNY",
  Colombia: "COP",
  "Czech Republic": "CZK",
  Denmark: "DKK",
  Egypt: "EGP",
  Finland: "EUR",
  France: "EUR",
  Germany: "EUR",
  Ghana: "GHS",
  Greece: "EUR",
  "Hong Kong": "HKD",
  Hungary: "HUF",
  India: "INR",
  Indonesia: "IDR",
  Iran: "IRR",
  Iraq: "IQD",
  Ireland: "EUR",
  Israel: "ILS",
  Italy: "EUR",
  Japan: "JPY",
  Jordan: "JOD",
  Kenya: "KES",
  Kuwait: "KWD",
  Lebanon: "LBP",
  Malaysia: "MYR",
  Maldives: "MVR",
  Mexico: "MXN",
  Morocco: "MAD",
  Nepal: "NPR",
  Netherlands: "EUR",
  "New Zealand": "NZD",
  Nigeria: "NGN",
  Norway: "NOK",
  Oman: "OMR",
  Philippines: "PHP",
  Poland: "PLN",
  Portugal: "EUR",
  Qatar: "QAR",
  Romania: "RON",
  "Saudi Arabia": "SAR",
  Singapore: "SGD",
  "South Africa": "ZAR",
  "South Korea": "KRW",
  Spain: "EUR",
  "Sri Lanka": "LKR",
  Sweden: "SEK",
  Switzerland: "CHF",
  Thailand: "THB",
  Turkey: "TRY",
  Ukraine: "UAH",
  "United Arab Emirates": "AED",
  "United Kingdom": "GBP",
  "United States": "USD",
  Vietnam: "VND",
};

/*
 * Product prices are stored in PKR.
 * Approximate fallback rates are used if the live API is unavailable.
 */
const fallbackUsdRates = {
  PKR: 280,
  AFN: 70,
  ALL: 90,
  DZD: 135,
  ARS: 1450,
  AUD: 1.55,
  EUR: 0.92,
  AZN: 1.7,
  BHD: 0.376,
  BDT: 122,
  BRL: 5.2,
  CAD: 1.38,
  CLP: 950,
  CNY: 7.25,
  COP: 4150,
  CZK: 23,
  DKK: 6.85,
  EGP: 50,
  GHS: 15,
  HKD: 7.8,
  HUF: 365,
  INR: 87,
  IDR: 16500,
  IRR: 42000,
  IQD: 1310,
  ILS: 3.7,
  JPY: 150,
  JOD: 0.709,
  KES: 130,
  KWD: 0.307,
  LBP: 89500,
  MYR: 4.45,
  MVR: 15.4,
  MXN: 20,
  MAD: 10,
  NPR: 139,
  NZD: 1.7,
  NGN: 1500,
  NOK: 11,
  OMR: 0.385,
  PHP: 58,
  PLN: 4,
  QAR: 3.64,
  RON: 4.6,
  SAR: 3.75,
  SGD: 1.35,
  ZAR: 18.5,
  KRW: 1450,
  LKR: 300,
  SEK: 10.5,
  CHF: 0.89,
  THB: 34,
  TRY: 36,
  UAH: 42,
  AED: 3.67,
  GBP: 0.78,
  USD: 1,
  VND: 25500,
};

const petProducts = [
  {
    id: "pet-dog",
    name: "Dog Walking Essentials",
    category: "home",
    price: 1899,
    oldPrice: 2499,
    emoji: "🐕",
    image: "photo-1552053831-71594a27632d",
    features: [
      "Everyday picks for dog owners.",
      "Made for walks and playtime.",
    ],
  },
  {
    id: "pet-cat",
    name: "Cat Comfort Collection",
    category: "home",
    price: 1299,
    oldPrice: 1799,
    emoji: "🐈",
    image: "photo-1573865526739-10659fec78a5",
    features: [
      "Cozy picks for cats.",
      "A little comfort for your furry friend.",
    ],
  },
  {
    id: "pet-small",
    name: "Small Pet Essentials",
    category: "home",
    price: 799,
    oldPrice: 1099,
    emoji: "🐹",
    image: "photo-1425082661705-1834bfd09dca",
    features: ["Everyday small-pet picks.", "Explore care and playtime ideas."],
  },
];

/*
 * Extra products: id, name, category, price PKR, old price PKR,
 * image reference, fallback emoji.
 *
 * These are sample store products. You can edit/delete them in Admin.
 */
const extraProductRows = [
  // Electronics
  [
    "extra-wireless-headphones",
    "Wireless Over-Ear Headphones",
    "electronics",
    6499,
    8499,
    "photo-1505740420928-5e560c06d30e",
    "🎧",
  ],
  [
    "extra-bluetooth-speaker",
    "Portable Bluetooth Speaker",
    "electronics",
    4199,
    5499,
    "photo-1608043152269-423dbba4e7e1",
    "🔊",
  ],
  [
    "extra-smart-watch",
    "Everyday Smart Watch",
    "electronics",
    8999,
    11999,
    "photo-1523275335684-37898b6baf30",
    "⌚",
  ],
  [
    "extra-keyboard",
    "Compact Wireless Keyboard",
    "electronics",
    3499,
    4599,
    "photo-1587829741301-dc798b83add3",
    "⌨️",
  ],
  [
    "extra-mouse",
    "Ergonomic Wireless Mouse",
    "electronics",
    1899,
    2499,
    "photo-1527864550417-7fd91fc51a46",
    "🖱️",
  ],
  [
    "extra-laptop-stand",
    "Adjustable Laptop Stand",
    "electronics",
    2999,
    3999,
    "photo-1498050108023-c5249f4df085",
    "💻",
  ],
  [
    "extra-camera",
    "Digital Camera Essentials",
    "electronics",
    18999,
    22999,
    "photo-1516035069371-29a1b244cc32",
    "📷",
  ],
  [
    "extra-earbuds",
    "True Wireless Earbuds",
    "electronics",
    4999,
    6999,
    "photo-1590658268037-6bf12165a8df",
    "🎧",
  ],
  [
    "extra-tablet",
    "Everyday Tablet",
    "electronics",
    27999,
    32999,
    "photo-1544244015-0df4b3ffc6b0",
    "📱",
  ],
  [
    "extra-gaming-controller",
    "Wireless Gaming Controller",
    "electronics",
    6499,
    7999,
    "photo-1592840496694-26d035b52b48",
    "🎮",
  ],
  [
    "extra-desk-monitor",
    "Home Office Monitor",
    "electronics",
    32999,
    38999,
    "photo-1527443224154-c4a3942d3acf",
    "🖥️",
  ],
  [
    "extra-power-bank",
    "Portable Power Bank",
    "electronics",
    3799,
    4999,
    "photo-1609592806596-b43bada2f6d4",
    "🔋",
  ],

  // Fashion
  [
    "extra-white-sneakers",
    "Classic White Sneakers",
    "fashion",
    4999,
    6499,
    "photo-1549298916-b41d501d3772",
    "👟",
  ],
  [
    "extra-running-shoes",
    "Lightweight Running Shoes",
    "fashion",
    5999,
    7499,
    "photo-1542291026-7eec264c27ff",
    "👟",
  ],
  [
    "extra-handbag",
    "Everyday Shoulder Handbag",
    "fashion",
    4499,
    5999,
    "photo-1584917865442-de89df76afd3",
    "👜",
  ],
  [
    "extra-denim-jacket",
    "Classic Denim Jacket",
    "fashion",
    6999,
    8499,
    "photo-1544022613-e87ca75a784a",
    "🧥",
  ],
  [
    "extra-sunglasses",
    "Modern Sunglasses",
    "fashion",
    2499,
    3299,
    "photo-1511499767150-a48a237f0083",
    "🕶️",
  ],
  [
    "extra-leather-bag",
    "Weekend Travel Bag",
    "fashion",
    8999,
    10999,
    "photo-1553062407-98eeb64c6a62",
    "🎒",
  ],
  [
    "extra-casual-shirt",
    "Casual Everyday Shirt",
    "fashion",
    2999,
    3899,
    "photo-1598032895397-b9472444bf93",
    "👕",
  ],
  [
    "extra-womens-shoes",
    "Women's Fashion Shoes",
    "fashion",
    5499,
    6999,
    "photo-1543163521-1bf539c55dd2",
    "👠",
  ],
  [
    "extra-wristwatch",
    "Minimalist Wrist Watch",
    "fashion",
    7499,
    9499,
    "photo-1524592094714-0f0654e20314",
    "⌚",
  ],
  [
    "extra-hoodie",
    "Comfort Fit Hoodie",
    "fashion",
    3999,
    5299,
    "photo-1556821840-3a63f95609a7",
    "🧥",
  ],
  [
    "extra-denim-jeans",
    "Everyday Denim Jeans",
    "fashion",
    4299,
    5499,
    "photo-1542272604-787c3835535d",
    "👖",
  ],
  [
    "extra-tote-bag",
    "Canvas Tote Bag",
    "fashion",
    1999,
    2699,
    "photo-1544816155-12df9643f363",
    "🛍️",
  ],

  // Home & Kitchen
  [
    "extra-table-lamp",
    "Warm Glow Table Lamp",
    "home",
    4299,
    5499,
    "photo-1507473885765-e6ed057f782c",
    "💡",
  ],
  [
    "extra-coffee-maker",
    "Home Coffee Maker",
    "home",
    11999,
    14999,
    "photo-1495474472287-4d71bcdd2085",
    "☕",
  ],
  [
    "extra-kitchen-tools",
    "Kitchen Cooking Tools Set",
    "home",
    3499,
    4599,
    "photo-1556911220-bff31c812dba",
    "🍳",
  ],
  [
    "extra-plant-pot",
    "Decorative Indoor Plant Pot",
    "home",
    2299,
    2999,
    "photo-1485955900006-10f4d324d411",
    "🪴",
  ],
  [
    "extra-cushions",
    "Soft Sofa Cushion Set",
    "home",
    2999,
    3999,
    "photo-1584100936595-c0654b55a2e2",
    "🛋️",
  ],
  [
    "extra-dinnerware",
    "Modern Dinnerware Set",
    "home",
    6999,
    8999,
    "photo-1490312278390-ab64016e0aa9",
    "🍽️",
  ],
  [
    "extra-wall-decor",
    "Minimal Wall Decor",
    "home",
    3899,
    4999,
    "photo-1513519245088-0e12902e5a38",
    "🖼️",
  ],
  [
    "extra-bedding",
    "Cozy Bedroom Bedding",
    "home",
    7999,
    9999,
    "photo-1505693416388-ac5ce068fe85",
    "🛏️",
  ],
  [
    "extra-vase",
    "Ceramic Flower Vase",
    "home",
    2599,
    3499,
    "photo-1578500494198-246f612d3b3d",
    "🏺",
  ],
  [
    "extra-storage-basket",
    "Woven Storage Basket",
    "home",
    2799,
    3699,
    "photo-1494438639946-1ebd1d20bf85",
    "🧺",
  ],
  [
    "extra-desk-chair",
    "Comfortable Desk Chair",
    "home",
    14999,
    18999,
    "photo-1503602642458-232111445657",
    "🪑",
  ],
  [
    "extra-kitchen-board",
    "Wooden Kitchen Board",
    "home",
    1999,
    2799,
    "photo-1600566753190-17f0baa2a6c3",
    "🍴",
  ],

  // Beauty
  [
    "extra-skincare-set",
    "Daily Skincare Essentials",
    "beauty",
    5499,
    6999,
    "photo-1556228578-0d85b1a4d571",
    "🧴",
  ],
  [
    "extra-lipstick",
    "Matte Lipstick Collection",
    "beauty",
    2499,
    3299,
    "photo-1586495777744-4413f21062fa",
    "💄",
  ],
  [
    "extra-makeup-brushes",
    "Makeup Brush Set",
    "beauty",
    3199,
    4199,
    "photo-1512496015851-a90fb38ba796",
    "🖌️",
  ],
  [
    "extra-perfume",
    "Everyday Fragrance",
    "beauty",
    7999,
    9999,
    "photo-1541643600914-78b084683601",
    "🌸",
  ],
  [
    "extra-face-serum",
    "Hydrating Face Serum",
    "beauty",
    3899,
    4999,
    "photo-1620916566398-39f1143ab7be",
    "🧪",
  ],
  [
    "extra-face-cream",
    "Moisturizing Face Cream",
    "beauty",
    3499,
    4599,
    "photo-1608248543803-ba4f8c70ae0b",
    "🧴",
  ],
  [
    "extra-nail-polish",
    "Nail Polish Collection",
    "beauty",
    2199,
    2899,
    "photo-1632345031435-8727f6897d53",
    "💅",
  ],
  [
    "extra-beauty-kit",
    "Beauty Makeup Kit",
    "beauty",
    6499,
    8499,
    "photo-1596462502278-27bfdc403348",
    "💄",
  ],
  [
    "extra-shampoo",
    "Hair Care Shampoo Set",
    "beauty",
    3299,
    4299,
    "photo-1526947425960-945c6e72858f",
    "🧴",
  ],
  [
    "extra-body-lotion",
    "Daily Body Lotion",
    "beauty",
    2699,
    3499,
    "photo-1601049541289-9b1b7bbbfe19",
    "🧴",
  ],
  [
    "extra-face-mask",
    "Refreshing Face Mask Set",
    "beauty",
    1899,
    2499,
    "photo-1570172619644-dfd03ed5d881",
    "🧖",
  ],
  [
    "extra-skin-cleanser",
    "Gentle Skin Cleanser",
    "beauty",
    2999,
    3899,
    "photo-1556229010-6c3f2c9ca5f8",
    "🧼",
  ],
];

const extraProducts = extraProductRows.map(
  ([id, name, category, price, oldPrice, image, emoji]) => ({
    id,
    name,
    category,
    price,
    oldPrice,
    image,
    emoji,
    features: [
      "A practical pick for everyday use.",
      "Explore this addition to our collection.",
    ],
  }),
);

const startingProducts = [...defaultProducts, ...petProducts, ...extraProducts];

const categoryKeywords = {
  electronics: "tech gadgets laptop mobile phone headphones watch computer",
  fashion: "shoes sneakers clothing shirt handbag style women men",
  home: "house furniture kitchen decor lamp chair plant living pet dog cat",
  beauty: "makeup skincare cosmetics self care",
};

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function scoreProduct(product, query) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return 1;

  const name = String(product.name || "").toLowerCase();
  const category = String(product.category || "").toLowerCase();
  const features = Array.isArray(product.features)
    ? product.features.join(" ").toLowerCase()
    : "";
  const keywords = categoryKeywords[category] || "";
  const searchable = `${name} ${category} ${features} ${keywords}`;

  let score = 0;
  for (const word of words) {
    if (!searchable.includes(word)) return 0;
    score += category.startsWith(word)
      ? 100
      : name.startsWith(word)
        ? 80
        : name.split(/\s+/).some((part) => part.startsWith(word))
          ? 60
          : 10;
  }
  return score;
}

export default function Home() {
  const [products, setProducts] = useState(startingProducts);
  const [nameInput, setNameInput] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [settings, setSettings] = useState(defaultSettings);
  const [exchangeRates, setExchangeRates] = useState(null);
  const [cart, setCart] = useState({});
  const [cartId] = useState(() => {
    if (typeof window === "undefined") return null;

    let id = localStorage.getItem("amazon-cart-id");

    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("amazon-cart-id", id);
    }

    return id;
  });
  const [wishlist, setWishlist] = useState([]);
  const [profile, setProfile] = useState(null);
  const [ready, setReady] = useState(false);

  const [view, setView] = useState("home");
  const [productId, setProductId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [imageView, setImageView] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [toast, setToast] = useState("");

  const searchRef = useRef(null);
  const productsRef = useRef(null);
  const toastTimer = useRef(null);

  const selectedCurrency = countryCurrencies[settings.location] || "PKR";

  const money = useMemo(() => {
    if (selectedCurrency === "PKR") {
      return (value) =>
        `Rs ${Number(value || 0).toLocaleString("en-PK", {
          maximumFractionDigits: 0,
        })}`;
    }

    const liveRate = exchangeRates?.[selectedCurrency];
    const fallbackRate =
      fallbackUsdRates[selectedCurrency] / fallbackUsdRates.PKR;

    const rate =
      typeof liveRate === "number" && Number.isFinite(liveRate) && liveRate > 0
        ? liveRate
        : fallbackRate;

    const maximumFractionDigits = new Intl.NumberFormat("en", {
      style: "currency",
      currency: selectedCurrency,
    }).resolvedOptions().maximumFractionDigits;

    const formatter = new Intl.NumberFormat("en", {
      style: "currency",
      currency: selectedCurrency,
      currencyDisplay: "code",
      minimumFractionDigits: 0,
      maximumFractionDigits,
    });

    return (value) => formatter.format(Number(value || 0) * rate);
  }, [selectedCurrency, exchangeRates]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadExchangeRates() {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/PKR", {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Exchange-rate request failed");

        const data = await response.json();

        if (data.result === "success" && data.rates) {
          setExchangeRates(data.rates);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setExchangeRates(null);
        }
      }
    }

    loadExchangeRates();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!cartId) return;

    async function loadCart() {
      try {
        const response = await fetch(`/api/cart?userId=${cartId}`);

        if (!response.ok) {
          throw new Error("Failed to load cart");
        }

        const data = await response.json();

        const cartObject = {};

        (data.items || []).forEach((item) => {
          cartObject[item.productId] = item.quantity;
        });

        setCart(cartObject);
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }

    loadCart();
  }, [cartId]);

  useEffect(() => {
    async function loadProductsFromDB() {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const dbProducts = await response.json();

        // Database mein jo products missing hain, sirf woh add karo
        const existingIds = new Set(
          Array.isArray(dbProducts)
            ? dbProducts.map((product) => product.id)
            : [],
        );

        const missingProducts = startingProducts.filter(
          (product) => !existingIds.has(product.id),
        );

        if (missingProducts.length > 0) {
          const seedResponse = await fetch("/api/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(missingProducts),
          });

          if (!seedResponse.ok) {
            throw new Error("Failed to add missing products");
          }

          const updatedProducts = await seedResponse.json();

          setProducts(updatedProducts);
          return;
        }

        // Sab products already database mein hain
        setProducts(dbProducts);
      } catch (error) {
        console.error("Product loading error:", error);

        // DB fail ho to website blank nahi hogi
        setProducts(startingProducts);
      }
    }

    loadProductsFromDB();
  }, []);

  useEffect(() => {
    const savedSettings = readStorage(
      "storefront-settings-v4",
      defaultSettings,
    );

    const savedWishlist = readStorage("storefront-wishlist-v4", []);

    const savedProfile = readStorage("storefront-profile-v4", null);

    setSettings(
      savedSettings && typeof savedSettings === "object"
        ? { ...defaultSettings, ...savedSettings }
        : defaultSettings,
    );

    setWishlist(Array.isArray(savedWishlist) ? savedWishlist : []);

    setProfile(
      savedProfile && typeof savedProfile.name === "string"
        ? savedProfile
        : null,
    );

    setReady(true);
  }, []);

  useEffect(() => {
    function syncHash() {
      const hash = window.location.hash.slice(1);

      if (hash === "admin") {
        setView("admin");
      } else if (hash.startsWith("product/")) {
        setProductId(hash.slice(8));
        setImageView(0);
        setQuantity(1);
        setView("product");
        window.scrollTo(0, 0);
      } else {
        setView("home");

        if (hash === "products") {
          setTimeout(
            () =>
              productsRef.current?.scrollIntoView({
                behavior: "smooth",
              }),
            50,
          );
        }
      }
    }

    syncHash();

    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    if (!ready) return;

    try {
      localStorage.setItem("storefront-products-v6", JSON.stringify(products));
      localStorage.setItem("storefront-settings-v4", JSON.stringify(settings));
      localStorage.setItem("storefront-wishlist-v4", JSON.stringify(wishlist));

      if (profile) {
        localStorage.setItem("storefront-profile-v4", JSON.stringify(profile));
      } else {
        localStorage.removeItem("storefront-profile-v4");
      }
    } catch {}
  }, [ready, products, settings, wishlist, profile]);

  useEffect(() => {
    const selected = products.find((item) => item.id === productId);
    document.title =
      view === "admin"
        ? "Admin Panel"
        : view === "product" && selected
          ? `${selected.name} — Store`
          : "Storefront";
  }, [view, productId, products]);

  useEffect(() => {
    if (!cartOpen && !accountOpen && !ordersOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setCartOpen(false);
        setAccountOpen(false);
        setOrdersOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [cartOpen, accountOpen, ordersOpen]);

  useEffect(() => {
    function closeSearch(event) {
      if (!searchRef.current?.contains(event.target)) {
        setSuggestionsOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeSearch);
    return () => document.removeEventListener("pointerdown", closeSearch);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  function notify(message) {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2500);
  }

  function navigate(hash) {
    setSuggestionsOpen(false);
    setActiveSuggestion(-1);

    if (window.location.hash !== `#${hash}`) {
      window.location.hash = hash;
    }

    if (hash === "admin") {
      setView("admin");
    } else if (hash.startsWith("product/")) {
      setProductId(hash.slice(8));
      setImageView(0);
      setQuantity(1);
      setView("product");
      window.scrollTo(0, 0);
    } else {
      setView("home");

      if (hash === "products") {
        setTimeout(
          () =>
            productsRef.current?.scrollIntoView({
              behavior: "smooth",
            }),
          50,
        );
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }

  function explore(category, search = "") {
    setFilter(category);
    setSearchCategory("all");
    setQuery(search);
    navigate("products");
  }

  async function addToCart(id, amount = 1) {
    const product = products.find((item) => item.id === id);

    if (!product || !cartId) return;

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: cartId,
          productId: id,
          quantity: amount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save cart");
      }

      const data = await response.json();

      const cartObject = {};

      (data.items || []).forEach((item) => {
        cartObject[item.productId] = item.quantity;
      });

      setCart(cartObject);
      hotToast.success(`${product.name} added to cart`, {
        icon: "🛒",
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
      hotToast.error("Failed to add product to cart");
    }
  }

  async function changeCart(id, amount) {
    if (!cartId) return;

    const currentQuantity = Number(cart[id]) || 0;
    const newQuantity = currentQuantity + amount;

    try {
      let response;

      if (newQuantity <= 0) {
        response = await fetch("/api/cart", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: cartId,
            productId: id,
          }),
        });
      } else {
        response = await fetch("/api/cart", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: cartId,
            productId: id,
            quantity: newQuantity,
          }),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to update cart");
      }

      const data = await response.json();

      const cartObject = {};

      (data.items || []).forEach((item) => {
        cartObject[item.productId] = item.quantity;
      });

      setCart(cartObject);
    } catch (error) {
      console.error("Failed to update cart:", error);
      hotToast.error("Failed to update cart");
    }
  }

  function toggleWishlist(id) {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    );
  }

  const visibleProducts = useMemo(() => {
    const term = query.trim();

    const matches = products
      .filter((item) => {
        const filterMatch =
          filter === "all" ||
          (filter === "saved"
            ? wishlist.includes(item.id)
            : item.category === filter);

        const categoryMatch =
          searchCategory === "all" || item.category === searchCategory;

        return (
          filterMatch &&
          categoryMatch &&
          (!term || scoreProduct(item, term) > 0)
        );
      })
      .map((item) => ({
        item,
        score: term ? scoreProduct(item, term) : 0,
      }));

    if (sort === "low") {
      matches.sort((a, b) => a.item.price - b.item.price);
    } else if (sort === "high") {
      matches.sort((a, b) => b.item.price - a.item.price);
    } else if (term) {
      matches.sort((a, b) => b.score - a.score);
    }

    return matches.map(({ item }) => item);
  }, [products, filter, wishlist, query, searchCategory, sort]);

  const suggestions = query.trim() ? visibleProducts.slice(0, 6) : [];

  const selectedProduct = products.find((item) => item.id === productId);
  const cartProducts = products.filter((item) => Number(cart[item.id]) > 0);

  const cartCount = cartProducts.reduce(
    (sum, item) => sum + Number(cart[item.id]),
    0,
  );

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.price * Number(cart[item.id]),
    0,
  );
  async function checkout() {
    if (
      !checkoutName.trim() ||
      !checkoutPhone.trim() ||
      !checkoutAddress.trim()
    ) {
      hotToast.error("Please enter your name, phone number and address.");
      return;
    }

    if (!cartId) {
      hotToast.error("Cart is not available.");
      return;
    }

    const cartItems = Object.entries(cart)
      .map(([productId, quantity]) => {
        const product = products.find((item) => item.id === productId);

        if (!product) return null;

        return {
          productId: product.id,
          name: product.name,
          price: Number(product.price),
          quantity,
          image: product.image || "",
        };
      })
      .filter(Boolean);

    if (cartItems.length === 0) {
      hotToast.error("Your cart is empty.");
      return;
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: cartId,
          items: cartItems,
          total,
          customer: {
            name: checkoutName.trim(),
            email: profile?.email || "",
            phone: checkoutPhone.trim(),
            address: checkoutAddress.trim(),
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create order");
      }

      setCart({});

      await fetch(`/api/cart?userId=${cartId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      hotToast.success("Order placed successfully! 🎉");
    } catch (error) {
      console.error("Checkout error:", error);
      hotToast.error("Failed to place order. Please try again.");
    }
  }

  const currentCountries =
    settings.location && !countries.includes(settings.location)
      ? [settings.location, ...countries]
      : countries;

  const yellow =
    "min-h-9 rounded-full border border-[#f0c14b] bg-[#ffd814] px-4 text-[#111] transition hover:bg-[#f7ca00] disabled:opacity-50";

  return (
    <div
      className={`${manrope.className} min-h-screen min-w-[320px] bg-[#e9f0f4] text-[14px] text-[#10202d]`}
    >
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
      {/* HEADER */}
      <header>
        <div className="relative z-30 bg-[#131921] text-white">
          <div className="mx-auto grid max-w-[1550px] grid-cols-[1fr_auto_auto] gap-1 px-2.5 py-2 min-[721px]:flex min-[721px]:min-h-[65px] min-[721px]:items-center min-[721px]:gap-2.5 min-[721px]:px-[17px]">
            <button
              type="button"
              onClick={() => navigate("home")}
              className="relative col-start-1 justify-self-start border border-transparent px-2 pb-2 text-[23px] font-extrabold tracking-[-2px] hover:border-white min-[421px]:text-[27px]"
              aria-label="Home"
            >
              {settings.brand}
              <small className="ml-0.5 text-xs font-normal tracking-normal">
                {settings.suffix}
              </small>
              <span className="absolute bottom-1 left-8 h-2 w-[57px] -rotate-[5deg] rounded-b-[80%] border-b-[3px] border-[#ff9900]" />
            </button>

            <label className="col-start-2 flex items-center gap-1 px-1 min-[721px]:px-2">
              <span aria-hidden="true">📍</span>
              <span>
                <span className="hidden text-xs text-[#ddd] min-[721px]:block">
                  Delivering to
                </span>
                <select
                  aria-label="Delivery country"
                  value={settings.location || "Pakistan"}
                  onChange={(event) =>
                    setSettings((current) => ({
                      ...current,
                      location: event.target.value,
                    }))
                  }
                  className="block max-w-[105px] cursor-pointer bg-transparent text-[11px] font-bold text-white outline-none min-[721px]:max-w-[150px] min-[721px]:text-[13px] [&>option]:bg-white [&>option]:text-black"
                >
                  {currentCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </span>
            </label>

            <div
              ref={searchRef}
              className="relative col-span-2 row-start-2 min-w-0 min-[721px]:col-auto min-[721px]:row-auto min-[721px]:flex-1"
            >
              <form
                role="search"
                onSubmit={(event) => {
                  event.preventDefault();

                  if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
                    navigate(`product/${suggestions[activeSuggestion].id}`);
                  } else {
                    navigate("products");
                  }
                }}
                className="flex h-[41px] overflow-hidden rounded focus-within:outline-[3px] focus-within:outline-[#ff9900]"
              >
                <label htmlFor="search-category" className="sr-only">
                  Search category
                </label>
                <select
                  id="search-category"
                  value={searchCategory}
                  onChange={(event) => setSearchCategory(event.target.value)}
                  className="w-[68px] border-r border-[#ccc] bg-[#e6e6e6] pl-2 text-[#333]"
                >
                  <option value="all">All</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home</option>
                  <option value="beauty">Beauty</option>
                </select>

                <label htmlFor="search-input" className="sr-only">
                  Search products
                </label>
                <input
                  id="search-input"
                  type="search"
                  autoComplete="off"
                  value={query}
                  onFocus={() => setSuggestionsOpen(true)}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setFilter("all");
                    setActiveSuggestion(-1);
                    setSuggestionsOpen(true);

                    if (view === "product") {
                      setView("home");
                      window.location.hash = "home";
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setSuggestionsOpen(false);
                      setActiveSuggestion(-1);
                    }

                    if (event.key === "ArrowDown" && suggestions.length) {
                      event.preventDefault();
                      setActiveSuggestion((current) =>
                        Math.min(current + 1, suggestions.length - 1),
                      );
                    }

                    if (event.key === "ArrowUp" && suggestions.length) {
                      event.preventDefault();
                      setActiveSuggestion((current) =>
                        Math.max(-1, current - 1),
                      );
                    }
                  }}
                  placeholder="Search products, home, shoes, pets..."
                  className="min-w-0 flex-1 bg-white px-3 text-[15px] text-[#111] outline-none"
                  aria-expanded={suggestionsOpen && Boolean(query.trim())}
                  aria-controls="search-suggestions"
                />

                <button
                  type="submit"
                  aria-label="Search"
                  className="w-[49px] bg-[#febd69] text-[27px] text-[#111] hover:bg-[#f3a847]"
                >
                  ⌕
                </button>
              </form>

              {suggestionsOpen && query.trim() && (
                <div
                  id="search-suggestions"
                  className="absolute top-[calc(100%+5px)] right-0 left-0 z-50 max-h-[380px] overflow-y-auto rounded-md border border-slate-200 bg-white py-1 text-[#10202d] shadow-2xl"
                >
                  <p className="px-3 py-2 text-xs text-slate-500">
                    {visibleProducts.length} matching products
                  </p>

                  {suggestions.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => navigate(`product/${item.id}`)}
                      className={`flex w-full items-center gap-3 px-3 py-2 text-left ${
                        index === activeSuggestion
                          ? "bg-[#fff2d8]"
                          : "hover:bg-[#f1f6f8]"
                      }`}
                    >
                      <Photo
                        image={item.image}
                        emoji={item.emoji}
                        width={100}
                        className="h-11 w-11 shrink-0 rounded text-lg"
                        imgClassName="object-contain"
                      />

                      <span className="min-w-0 flex-1 truncate">
                        {item.name}
                        <span className="block text-xs capitalize text-slate-500">
                          {item.category}
                        </span>
                      </span>

                      <strong className="shrink-0 text-xs">
                        {money(item.price)}
                      </strong>
                    </button>
                  ))}

                  {visibleProducts.length > 6 && (
                    <button
                      type="button"
                      onClick={() => navigate("products")}
                      className="w-full border-t px-3 py-3 text-left text-[#007185]"
                    >
                      View all results →
                    </button>
                  )}

                  {!suggestions.length && (
                    <p className="px-3 py-4 text-slate-500">
                      No matching products.
                    </p>
                  )}
                </div>
              )}
            </div>

            <Show when="signed-out">
              <div className="col-start-3 row-start-1 flex items-center gap-1 min-[721px]:col-auto min-[721px]:row-auto">
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="border border-transparent px-1 text-left hover:border-white min-[721px]:px-2"
                  >
                    <span className="hidden text-xs text-[#ddd] min-[721px]:block">
                      Hello, shopper
                    </span>

                    <strong className="block text-[11px] min-[721px]:text-[13px]">
                      Sign in
                    </strong>
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button
                    type="button"
                    className="hidden border border-transparent px-1 text-left hover:border-white min-[721px]:block min-[721px]:px-2"
                  >
                    <span className="text-xs text-[#ddd]">New customer?</span>

                    <strong className="block text-[11px]">Sign up</strong>
                  </button>
                </SignUpButton>
              </div>
            </Show>

            <Show when="signed-in">
              <div className="col-start-3 row-start-1 flex items-center gap-2 border border-transparent px-1 py-1 hover:border-white min-[721px]:col-auto min-[721px]:row-auto min-[721px]:px-2">
                <div className="hidden min-[721px]:block">
                  <span className="block text-xs text-[#ddd]">Hello</span>

                  <strong className="block text-[11px] min-[721px]:text-[13px]">
                    Account & Lists
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={() => setOrdersOpen(true)}
                  className="border border-transparent px-2 text-left hover:border-white"
                >
                  <span className="block text-xs text-[#ddd]">Your</span>

                  <strong className="block text-[11px] min-[721px]:text-[13px]">
                    Orders
                  </strong>
                </button>

                <UserButton />
              </div>
            </Show>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart with ${cartCount} items`}
              className="relative col-start-3 row-start-2 flex items-end justify-center border border-transparent px-2 hover:border-white min-[721px]:col-auto min-[721px]:row-auto"
            >
              <span className="text-[28px]">🛒</span>
              <span className="absolute top-0 left-6 min-w-4 text-center text-[16px] font-extrabold text-[#ff9900]">
                {cartCount}
              </span>
              <strong className="hidden min-[721px]:block">Cart</strong>
            </button>
          </div>
        </div>

        <nav className="bg-[#232f3e] text-white" aria-label="Categories">
          <div className="mx-auto flex max-w-[1550px] gap-0.5 overflow-x-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              ["all", "☰ All"],
              ["home", "Home & Kitchen"],
              ["fashion", "Fashion"],
              ["electronics", "Electronics"],
              ["beauty", "Beauty"],
              ["saved", "Wishlist ♥"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => explore(value)}
                className="min-h-[39px] shrink-0 whitespace-nowrap border border-transparent px-2.5 text-[13px] hover:border-white"
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-[1550px]">
        {view === "admin" ? (
          <Admin
            products={products}
            settings={settings}
            onProductsChange={setProducts}
            onSettingsChange={(next) => {
              setSettings(next);
              hotToast.success("Website settings saved");
            }}
            onBack={() => navigate("home")}
          />
        ) : view === "product" && selectedProduct ? (
          /* PRODUCT DETAIL */
          <section className="m-3 min-h-[600px] rounded-xl bg-white p-5 shadow-sm md:m-5 md:p-7">
            <button
              type="button"
              onClick={() => navigate("products")}
              className="mb-6 text-[#007185] hover:underline"
            >
              ← Back to shopping
            </button>

            <div className="grid gap-7 lg:grid-cols-[42%_34%_minmax(220px,24%)]">
              <div>
                <div className="grid grid-cols-[48px_1fr] gap-3">
                  <div className="space-y-2">
                    {[0, 1, 2].map((index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setImageView(index)}
                        aria-label={`Image view ${index + 1}`}
                        className={`h-12 w-12 overflow-hidden rounded-md border ${
                          imageView === index
                            ? "border-2 border-orange-500"
                            : "border-slate-300"
                        }`}
                      >
                        <Photo
                          image={selectedProduct.image}
                          emoji={selectedProduct.emoji}
                          width={100}
                          className="h-full w-full"
                          imgClassName={
                            index === 0 ? "object-contain" : "object-cover"
                          }
                        />
                      </button>
                    ))}
                  </div>

                  <Photo
                    key={`${selectedProduct.id}-${imageView}`}
                    image={selectedProduct.image}
                    emoji={selectedProduct.emoji}
                    alt={selectedProduct.name}
                    width={1000}
                    className="h-[320px] rounded-lg bg-[#f7f8f8] md:h-[470px]"
                    imgClassName={`mix-blend-multiply ${
                      imageView === 0 ? "object-contain" : "object-cover"
                    }`}
                  />
                </div>
              </div>

              <div>
                <span className="text-[#007185] capitalize">
                  {selectedProduct.category}
                </span>

                <h1 className="my-3 text-[26px] leading-tight md:text-[32px]">
                  {selectedProduct.name}
                </h1>

                <hr className="my-5 border-slate-200" />

                <p className="text-[29px]">{money(selectedProduct.price)}</p>

                {selectedProduct.oldPrice > 0 && (
                  <p className="mt-2 text-slate-500 line-through">
                    {money(selectedProduct.oldPrice)}
                  </p>
                )}

                <h2 className="mt-7 mb-3 text-lg font-bold">About this item</h2>

                <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                  {(selectedProduct.features || []).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <aside className="h-fit rounded-lg border border-[#d5d9d9] p-5">
                <p className="mb-5 text-[27px]">
                  {money(selectedProduct.price)}
                </p>

                <label htmlFor="quantity">Quantity</label>

                <select
                  id="quantity"
                  value={quantity}
                  onChange={(event) => setQuantity(Number(event.target.value))}
                  className="my-2 block w-full rounded-md border border-slate-300 bg-[#f7fafa] p-2"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => {
                    addToCart(selectedProduct.id, quantity);
                    setCartOpen(true);
                  }}
                  className={`${yellow} my-2 w-full`}
                >
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className="w-full rounded-full bg-[#ffa41c] px-4 py-2.5 hover:bg-[#fa8900]"
                >
                  {wishlist.includes(selectedProduct.id)
                    ? "♥ Saved to Wishlist"
                    : "♡ Add to Wishlist"}
                </button>
              </aside>
            </div>
          </section>
        ) : (
          <HomeContent
            settings={settings}
            productsRef={productsRef}
            visibleProducts={visibleProducts}
            query={query}
            filter={filter}
            setFilter={setFilter}
            setQuery={setQuery}
            setSearchCategory={setSearchCategory}
            sort={sort}
            setSort={setSort}
            wishlist={wishlist}
            money={money}
            onExplore={explore}
            onNavigate={navigate}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            yellow={yellow}
          />
        )}
      </main>

      {/* FOOTER */}
      <Footer onBackToTop={() => navigate("home")} />
      <Tracking
        open={ordersOpen}
        onClose={() => setOrdersOpen(false)}
        userId={cartId}
        money={money}
      />

      {/* BACKDROP */}
      {(cartOpen || accountOpen) && (
        <button
          type="button"
          aria-label="Close panel"
          onClick={() => {
            setCartOpen(false);
            setAccountOpen(false);
          }}
          className="fixed inset-0 z-40 bg-black/60"
        />
      )}

      {/* CART */}
      <aside
        role="dialog"
        aria-modal={cartOpen ? "true" : undefined}
        aria-label="Shopping cart"
        aria-hidden={!cartOpen}
        className={`fixed top-0 right-0 z-50 flex h-[100dvh] w-full max-w-[430px] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-bold">Your Cart ({cartCount})</h2>

          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="text-2xl"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {!cartCount ? (
            <p className="py-12 text-center text-slate-500">
              🛒 Your cart is empty.
            </p>
          ) : (
            cartProducts.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[75px_1fr] gap-3 border-b py-4"
              >
                <Photo
                  image={item.image}
                  emoji={item.emoji}
                  width={150}
                  className="h-[75px] w-[75px] rounded"
                  imgClassName="object-contain"
                />

                <div>
                  <strong>{item.name}</strong>
                  <p className="my-2">{money(item.price)}</p>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => changeCart(item.id, -1)}
                      aria-label={`Decrease ${item.name}`}
                    >
                      −
                    </button>

                    <span>{cart[item.id]}</span>

                    <button
                      type="button"
                      onClick={() => changeCart(item.id, 1)}
                      aria-label={`Increase ${item.name}`}
                    >
                      +
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        changeCart(item.id, -Number(cart[item.id]))
                      }
                      className="ml-auto text-xs text-[#007185]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t p-5">
          <p className="mb-4 flex justify-between text-lg">
            <span>Subtotal</span>
            <strong>{money(subtotal)}</strong>
          </p>

          <button
            type="button"
            disabled={!cartCount}
            onClick={() => setCheckoutOpen(true)}
            className={`${yellow} w-full`}
          >
            Continue
          </button>
        </div>
      </aside>

      {/* CHECKOUT DETAILS */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/60 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Delivery details"
            className="max-h-[90dvh] w-full max-w-[480px] overflow-y-auto rounded-xl bg-white p-5 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Delivery Details</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter your details before placing the order.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCheckoutOpen(false)}
                className="text-2xl"
                aria-label="Close checkout"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                checkout();
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="checkout-name"
                  className="mb-1 block font-semibold"
                >
                  Full Name
                </label>

                <input
                  id="checkout-name"
                  type="text"
                  required
                  maxLength={60}
                  value={checkoutName}
                  onChange={(event) => setCheckoutName(event.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-md border border-slate-300 px-3 py-3 outline-none focus:border-orange-400"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-phone"
                  className="mb-1 block font-semibold"
                >
                  Phone Number
                </label>

                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  maxLength={20}
                  value={checkoutPhone}
                  onChange={(event) => setCheckoutPhone(event.target.value)}
                  placeholder="03XX XXXXXXX"
                  className="w-full rounded-md border border-slate-300 px-3 py-3 outline-none focus:border-orange-400"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-address"
                  className="mb-1 block font-semibold"
                >
                  Delivery Address
                </label>

                <textarea
                  id="checkout-address"
                  required
                  maxLength={250}
                  rows={4}
                  value={checkoutAddress}
                  onChange={(event) => setCheckoutAddress(event.target.value)}
                  placeholder="House number, street, area, city..."
                  className="w-full resize-none rounded-md border border-slate-300 px-3 py-3 outline-none focus:border-orange-400"
                />
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <div className="flex justify-between">
                  <span>Items</span>
                  <strong>{cartCount}</strong>
                </div>

                <div className="mt-2 flex justify-between text-lg">
                  <span>Total</span>
                  <strong>{money(subtotal)}</strong>
                </div>
              </div>

              <button
                type="submit"
                className={`${yellow} w-full py-2.5 font-semibold`}
              >
                Place Order
              </button>

              <button
                type="button"
                onClick={() => setCheckoutOpen(false)}
                className="w-full py-2 text-sm text-slate-600 hover:text-black"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PROFILE */}
      {accountOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Your profile"
          className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-28px)] max-w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-2xl"
        >
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">Your profile</h2>

            <button
              type="button"
              onClick={() => {
                setAccountOpen(false);
                setOrdersOpen(true);
              }}
              className="mt-5 flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left transition hover:bg-slate-100"
            >
              <div>
                <strong className="block text-sm text-slate-900">
                  My Orders
                </strong>

                <span className="mt-1 block text-xs text-slate-500">
                  View and track your orders
                </span>
              </div>

              <span className="text-lg text-slate-400">→</span>
            </button>

            <button
              type="button"
              onClick={() => setAccountOpen(false)}
              aria-label="Close profile"
              className="text-2xl"
            >
              ×
            </button>
          </div>

          {profile ? (
            <div className="mt-5">
              <p>Welcome back, {profile.name} 👋</p>

              <button
                type="button"
                onClick={() => {
                  setAccountOpen(false);
                  setOrdersOpen(true);
                }}
                className="mt-5 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left transition hover:bg-slate-100"
              >
                <span>
                  <strong className="block text-sm text-slate-900">
                    My Orders
                  </strong>

                  <span className="mt-1 block text-xs text-slate-500">
                    View and track your orders
                  </span>
                </span>

                <span className="text-lg text-slate-400">→</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProfile(null);
                  setAccountOpen(false);
                }}
                className="mt-5 text-[#007185]"
              >
                Remove local profile
              </button>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const name = nameInput.trim().slice(0, 35);
                if (!name) return;

                setProfile({ name });
                setNameInput("");
                setAccountOpen(false);
              }}
              className="mt-5 space-y-3"
            >
              <label htmlFor="profile-name" className="block font-bold">
                Your name
              </label>

              <input
                id="profile-name"
                required
                maxLength={35}
                value={nameInput}
                onChange={(event) => setNameInput(event.target.value)}
                className="w-full rounded border p-3"
                placeholder="e.g. Hassan"
              />

              <button type="submit" className={`${yellow} w-full`}>
                Continue
              </button>
            </form>
          )}

          <p className="mt-5 text-xs text-slate-500">
            Your display name is saved in this browser only.
          </p>
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[60] max-w-[calc(100%-24px)] -translate-x-1/2 rounded bg-[#067d62] px-4 py-3 text-center text-white shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
