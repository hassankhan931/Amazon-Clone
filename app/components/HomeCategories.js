// "use client";

// /* eslint-disable @next/next/no-img-element */

// import { useState, useEffect } from "react";

// const heroSlides = [
//   {
//     title: "Upgrade Your Tech",
//     subtitle: "High-performance laptops and gadgets for your lifestyle.",
//     category: "electronics",
//     query: "laptop",
//     image: "photo-1496181133206-80ce9b88a853",
//     bg: "bg-blue-600",
//   },
//   {
//     title: "Step Into Style",
//     subtitle: "Discover the latest trends in fashion and footwear.",
//     category: "fashion",
//     query: "shoes",
//     image: "photo-1549298916-b41d501d3772",
//     bg: "bg-orange-500",
//   },
//   {
//     title: "Refresh Your Home",
//     subtitle: "Modern decor and essentials for every room.",
//     category: "home",
//     query: "decor",
//     image: "photo-1618221195710-dd6b41faaea6",
//     bg: "bg-emerald-600",
//   },
//   {
//     title: "Get Fit, Stay Active",
//     subtitle: "Premium fitness gear to reach your health goals.",
//     category: "all",
//     query: "fitness",
//     image: "photo-1517836357463-d25dfeac3438",
//     bg: "bg-rose-600",
//   },
//   {
//     title: "For Your Furry Friends",
//     subtitle: "Everything you need to keep your pets happy and healthy.",
//     category: "all",
//     query: "pet",
//     image: "photo-1583511655857-d19b40a7a54e",
//     bg: "bg-amber-500",
//   },
// ];

// const homeSections = [
//   {
//     title: "Plug in with our electronics",
//     items: [
//       {
//         label: "Headphones",
//         image: "photo-1505740420928-5e560c06d30e",
//         category: "electronics",
//         query: "headphones",
//       },
//       {
//         label: "Tablets",
//         image: "photo-1544244015-0df4b3ffc6b0",
//         category: "electronics",
//         query: "tablet",
//       },
//       {
//         label: "Gaming",
//         image: "photo-1593305841991-05c297ba4575",
//         category: "electronics",
//         query: "gaming",
//       },
//       {
//         label: "Speakers",
//         image: "photo-1608043152269-423dbba4e7e1",
//         category: "electronics",
//         query: "speaker",
//       },
//     ],
//   },
//   {
//     title: "Score the top PCs & Accessories",
//     items: [
//       {
//         label: "Desktops",
//         image: "photo-1593640408182-31c70c8268f5",
//         category: "electronics",
//         query: "desktop",
//       },
//       {
//         label: "Laptops",
//         image: "photo-1496181133206-80ce9b88a853",
//         category: "electronics",
//         query: "laptop",
//       },
//       {
//         label: "Hard Drives",
//         image: "photo-1597848212624-a19eb35e2651",
//         category: "electronics",
//         query: "hard drive",
//       },
//       {
//         label: "PC Accessories",
//         image: "photo-1625842268584-8f3296236761",
//         category: "electronics",
//         query: "accessories",
//       },
//     ],
//   },
//   {
//     title: "Gear up to get fit",
//     items: [
//       {
//         label: "Clothing",
//         image: "photo-1521572163474-6864f9cf17ab",
//         category: "fashion",
//         query: "clothing",
//       },
//       {
//         label: "Trackers",
//         image: "photo-1544117519-31a4b719223d",
//         category: "electronics",
//         query: "tracker",
//       },
//       {
//         label: "Equipment",
//         image: "photo-1583454110551-21f2fa2afe61",
//         category: "all",
//         query: "equipment",
//       },
//       {
//         label: "Deals",
//         image: "photo-1517836357463-d25dfeac3438",
//         category: "all",
//         query: "",
//       },
//     ],
//   },
//   {
//     title: "Apparel under $25",
//     items: [
//       {
//         label: "Women's",
//         image: "photo-1496747611176-843222e1e57c",
//         category: "fashion",
//         query: "women",
//       },
//       {
//         label: "Men's",
//         image: "photo-1515886657613-9f3515b0c78f",
//         category: "fashion",
//         query: "men",
//       },
//       {
//         label: "Shoes",
//         image: "photo-1542291026-7eec264c27ff",
//         category: "fashion",
//         query: "shoes",
//       },
//       {
//         label: "Accessories",
//         image: "photo-1523779917675-b6ed3a42a561",
//         category: "fashion",
//         query: "accessories",
//       },
//     ],
//   },
//   {
//     title: "Make your home beautiful",
//     items: [
//       {
//         label: "Kitchen",
//         image: "photo-1556911220-bff31c812dba",
//         category: "home",
//         query: "kitchen",
//       },
//       {
//         label: "Furniture",
//         image: "photo-1555041469-a586c61ea9bc",
//         category: "home",
//         query: "furniture",
//       },
//       {
//         label: "Decor",
//         image: "photo-1618221195710-dd6b41faaea6",
//         category: "home",
//         query: "decor",
//       },
//       {
//         label: "Lighting",
//         image: "photo-1507473885765-e6ed057f782c",
//         category: "home",
//         query: "lamp",
//       },
//     ],
//   },
//   {
//     title: "Beauty & personal care",
//     items: [
//       {
//         label: "Skincare",
//         image: "photo-1556228578-0d85b1a4d571",
//         category: "beauty",
//         query: "skin",
//       },
//       {
//         label: "Makeup",
//         image: "photo-1596462502278-27bfdc403348",
//         category: "beauty",
//         query: "makeup",
//       },
//       {
//         label: "Hair care",
//         image: "photo-1522337360788-8b13dee7a37e",
//         category: "beauty",
//         query: "hair",
//       },
//       {
//         label: "Beauty tools",
//         image: "photo-1512496015851-a90fb38ba796",
//         category: "beauty",
//         query: "beauty",
//       },
//     ],
//   },
//   {
//     title: "Everything for your furry friends",
//     items: [
//       {
//         label: "Dogs",
//         image: "photo-1552053831-71594a27632d",
//         category: "all",
//         query: "dog",
//       },
//       {
//         label: "Cats",
//         image: "photo-1573865526739-10659fec78a5",
//         category: "all",
//         query: "cat",
//       },
//       {
//         label: "Small pets",
//         image: "photo-1425082661705-1834bfd09dca",
//         category: "all",
//         query: "pet",
//       },
//       {
//         label: "Pet supplies",
//         image: "photo-1587300003388-59208cc962cb",
//         category: "all",
//         query: "pet",
//       },
//     ],
//   },
//   {
//     title: "Discover more for your everyday life",
//     items: [
//       {
//         label: "Books",
//         image: "photo-1495446815901-a7297e633e8d",
//         category: "all",
//         query: "book",
//       },
//       {
//         label: "Travel",
//         image: "photo-1488646953014-85cb44e25828",
//         category: "all",
//         query: "travel",
//       },
//       {
//         label: "Fitness",
//         image: "photo-1517836357463-d25dfeac3438",
//         category: "all",
//         query: "fitness",
//       },
//       {
//         label: "Daily essentials",
//         image: "photo-1607083206968-13611e3d76db",
//         category: "all",
//         query: "",
//       },
//     ],
//   },
// ];

// function imageUrl(value, width = 700) {
//   if (typeof value !== "string") return "";

//   if (/^https:\/\//i.test(value)) {
//     return value;
//   }

//   if (/^photo-[a-z0-9-]+$/i.test(value)) {
//     return `https://images.unsplash.com/${value}?w=${width}&q=85&fit=crop`;
//   }

//   return "";
// }

// function Photo({ image, alt = "", width = 700, className = "" }) {
//   const [failed, setFailed] = useState(false);

//   const src = imageUrl(image, width);

//   return (
//     <div
//       className={`relative grid place-items-center overflow-hidden bg-[#f4f6f6] ${className}`}
//     >
//       {!failed && src ? (
//         <img
//           src={src}
//           alt={alt}
//           loading="lazy"
//           onError={() => setFailed(true)}
//           className="absolute inset-0 h-full w-full object-cover"
//         />
//       ) : (
//         <span aria-hidden="true" className="text-5xl">
//           🛍️
//         </span>
//       )}
//     </div>
//   );
// }

// function HomeCategoryCard({ item, onClick }) {
//   return (
//     <button
//       type="button"
//       onClick={() => onClick(item)}
//       className="group min-w-0 text-left"
//     >
//       <Photo
//         image={item.image}
//         alt={item.label}
//         width={600}
//         className="aspect-square w-full rounded-[14px] bg-white"
//       />

//       <span className="mt-2 block text-[13px] leading-snug text-[#263746] sm:text-[14px]">
//         {item.label}
//       </span>
//     </button>
//   );
// }

// function HomeSection({ section, onItemClick }) {
//   return (
//     <section className="rounded-[20px] bg-white p-4 shadow-sm sm:p-5 md:p-6">
//       <div className="mb-4 flex items-center justify-between gap-3">
//         <h2 className="text-[20px] leading-tight font-extrabold tracking-tight sm:text-[24px] md:text-[28px]">
//           {section.title}
//         </h2>

//         <button
//           type="button"
//           onClick={() => onItemClick(section.items[0])}
//           aria-label={`Explore ${section.title}`}
//           className="shrink-0 text-3xl leading-none text-[#111827] transition-transform hover:translate-x-1"
//         >
//           ›
//         </button>
//       </div>

//       <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-4 sm:gap-4">
//         {section.items.map((item) => (
//           <HomeCategoryCard
//             key={item.label}
//             item={item}
//             onClick={onItemClick}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

// function HeroCarousel({ onExplore }) {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % heroSlides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const next = () => setCurrent((prev) => (prev + 1) % heroSlides.length);
//   const prev = () =>
//     setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

//   return (
//     <div className="relative w-full overflow-hidden bg-gray-100 shadow-sm">
//       <div
//         className="flex transition-transform duration-700 ease-in-out"
//         style={{ transform: `translateX(-${current * 100}%)` }}
//       >
//         {heroSlides.map((slide, index) => (
//           <div
//             key={index}
//             className="relative min-w-full flex-shrink-0 h-[350px] min-[421px]:h-[400px] sm:h-[450px] md:h-[550px] lg:h-[650px]"
//           >
//             <div className={`absolute inset-0 opacity-20 ${slide.bg}`} />
//             <img
//               src={imageUrl(slide.image, 1920)}
//               alt={slide.title}
//               className="absolute inset-0 h-full w-full object-cover"
//             />
//             {/* Darker Gradient for improved text contrast */}
//             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

//             <div className="relative h-full flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-28 text-white max-w-4xl">
//               <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight">
//                 {slide.title}
//               </h2>
//               <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-10 opacity-90 font-medium max-w-2xl leading-snug">
//                 {slide.subtitle}
//               </p>
//               <button
//                 onClick={() => onExplore(slide.category, slide.query)}
//                 className="bg-[#FFD814] hover:bg-[#F7CA00] text-black font-bold py-3.5 px-10 rounded-full w-fit transition-all transform hover:scale-105 text-base sm:text-lg shadow-lg"
//               >
//                 Shop Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation Arrows */}
//       <button
//         onClick={prev}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3.5 rounded-full backdrop-blur-md transition-all text-white sm:left-8"
//         aria-label="Previous slide"
//       >
//         <svg
//           className="w-8 h-8"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2.5"
//             d="M15 19l-7-7 7-7"
//           />
//         </svg>
//       </button>
//       <button
//         onClick={next}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3.5 rounded-full backdrop-blur-md transition-all text-white sm:right-8"
//         aria-label="Next slide"
//       >
//         <svg
//           className="w-8 h-8"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2.5"
//             d="M9 5l7 7-7 7"
//           />
//         </svg>
//       </button>

//       {/* Slider Dots */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
//         {heroSlides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={`h-3 rounded-full transition-all ${current === index ? "bg-white w-10" : "bg-white/40 w-3"}`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function HomeCategories({ onExplore }) {
//   function handleItemClick(item) {
//     onExplore(item.category, item.query || "");
//   }

//   return (
//     <div className="min-h-screen bg-[#f3f4f6]">
//       {/* Full-Width Edge-to-Edge Hero Banner */}
//       <HeroCarousel onExplore={onExplore} />

//       {/* Category Sections Container */}
//       <main className="mx-auto max-w-[1600px] space-y-6 px-3 py-8 sm:px-5 md:px-6 lg:px-8">
//         {homeSections.map((section) => (
//           <HomeSection
//             key={section.title}
//             section={section}
//             onItemClick={handleItemClick}
//           />
//         ))}
//       </main>
//     </div>
//   );
// }

"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";

const homeSections = [
  {
    title: "Plug in with our electronics",
    items: [
      {
        label: "Headphones",
        image: "photo-1505740420928-5e560c06d30e",
        category: "electronics",
        query: "headphones",
      },
      {
        label: "Tablets",
        image: "photo-1544244015-0df4b3ffc6b0",
        category: "electronics",
        query: "tablet",
      },
      {
        label: "Gaming",
        image: "photo-1593305841991-05c297ba4575",
        category: "electronics",
        query: "gaming",
      },
      {
        label: "Speakers",
        image: "photo-1608043152269-423dbba4e7e1",
        category: "electronics",
        query: "speaker",
      },
    ],
  },
  {
    title: "Score the top PCs & Accessories",
    items: [
      {
        label: "Desktops",
        image: "photo-1593640408182-31c70c8268f5",
        category: "electronics",
        query: "desktop",
      },
      {
        label: "Laptops",
        image: "photo-1496181133206-80ce9b88a853",
        category: "electronics",
        query: "laptop",
      },
      {
        label: "Hard Drives",
        image: "photo-1597848212624-a19eb35e2651",
        category: "electronics",
        query: "hard drive",
      },
      {
        label: "PC Accessories",
        image: "photo-1625842268584-8f3296236761",
        category: "electronics",
        query: "accessories",
      },
    ],
  },
  {
    title: "Gear up to get fit",
    items: [
      {
        label: "Clothing",
        image: "photo-1521572163474-6864f9cf17ab",
        category: "fashion",
        query: "clothing",
      },
      {
        label: "Trackers",
        image: "photo-1544117519-31a4b719223d",
        category: "electronics",
        query: "tracker",
      },
      {
        label: "Equipment",
        image: "photo-1583454110551-21f2fa2afe61",
        category: "all",
        query: "equipment",
      },
      {
        label: "Deals",
        image: "photo-1517836357463-d25dfeac3438",
        category: "all",
        query: "",
      },
    ],
  },
  {
    title: "Apparel under $25",
    items: [
      {
        label: "Women's",
        image: "photo-1496747611176-843222e1e57c",
        category: "fashion",
        query: "women",
      },
      {
        label: "Men's",
        image: "photo-1515886657613-9f3515b0c78f",
        category: "fashion",
        query: "men",
      },
      {
        label: "Shoes",
        image: "photo-1542291026-7eec264c27ff",
        category: "fashion",
        query: "shoes",
      },
      {
        label: "Accessories",
        image: "photo-1523779917675-b6ed3a42a561",
        category: "fashion",
        query: "accessories",
      },
    ],
  },
  {
    title: "Make your home beautiful",
    items: [
      {
        label: "Kitchen",
        image: "photo-1556911220-bff31c812dba",
        category: "home",
        query: "kitchen",
      },
      {
        label: "Furniture",
        image: "photo-1555041469-a586c61ea9bc",
        category: "home",
        query: "furniture",
      },
      {
        label: "Decor",
        image: "photo-1618221195710-dd6b41faaea6",
        category: "home",
        query: "decor",
      },
      {
        label: "Lighting",
        image: "photo-1507473885765-e6ed057f782c",
        category: "home",
        query: "lamp",
      },
    ],
  },
  {
    title: "Beauty & personal care",
    items: [
      {
        label: "Skincare",
        image: "photo-1556228578-8c89e6adf883",
        category: "beauty",
        query: "skin",
      },
      {
        label: "Makeup",
        image: "photo-1596462502278-27bfdc403348",
        category: "beauty",
        query: "makeup",
      },
      {
        label: "Hair care",
        image: "photo-1522337360788-8b13dee7a37e",
        category: "beauty",
        query: "hair",
      },
      {
        label: "Beauty tools",
        image: "photo-1512496015851-a90fb38ba796",
        category: "beauty",
        query: "beauty",
      },
    ],
  },
  {
    title: "Everything for your furry friends",
    items: [
      {
        label: "Dogs",
        image: "photo-1552053831-71594a27632d",
        category: "all",
        query: "dog",
      },
      {
        label: "Cats",
        image: "photo-1573865526739-10659fec78a5",
        category: "all",
        query: "cat",
      },
      {
        label: "Small pets",
        image: "photo-1425082661705-1834bfd09dca",
        category: "all",
        query: "pet",
      },
      {
        label: "Pet supplies",
        image: "photo-1587300003388-59208cc962cb",
        category: "all",
        query: "pet",
      },
    ],
  },
  {
    title: "Discover more for your everyday life",
    items: [
      {
        label: "Books",
        image: "photo-1495446815901-a7297e633e8d",
        category: "all",
        query: "book",
      },
      {
        label: "Travel",
        image: "photo-1488646953014-85cb44e25828",
        category: "all",
        query: "travel",
      },
      {
        label: "Fitness",
        image: "photo-1517836357463-d25dfeac3438",
        category: "all",
        query: "fitness",
      },
      {
        label: "Daily essentials",
        image: "photo-1607083206968-13611e3d76db",
        category: "all",
        query: "",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* HERO BANNER CAROUSEL (visual addition only).                       */
/* Every "Shop Now" button routes through the same handler as the     */
/* category cards, so it calls onExplore(slide.category, slide.query  */
/* || "") — behavior identical to the existing explore flow.          */
/* ------------------------------------------------------------------ */

const HERO_AUTOPLAY_MS = 5200;

const heroSlides = [
  {
    eyebrow: "Electronics event",
    title: "Tech that moves you forward",
    subtitle: "Premium audio, laptops and smart gear from the brands you love.",
    image: "photo-1550009158-9ebf69173e03",
    category: "electronics",
    query: "",
  },
  {
    eyebrow: "Home refresh",
    title: "Make home feel brand new",
    subtitle: "Furniture, decor and lighting to brighten every corner.",
    image: "photo-1522708323590-d24dbb6b0267",
    category: "home",
    query: "",
  },
  {
    eyebrow: "Style under $25",
    title: "Fresh looks, honest prices",
    subtitle: "Season-ready apparel picks for every day of the week.",
    image: "photo-1441986300917-64674bd600d8",
    category: "fashion",
    query: "",
  },
  {
    eyebrow: "Beauty bestsellers",
    title: "Your glow starts here",
    subtitle:
      "Skincare, makeup and self-care essentials worth the shelf space.",
    image: "photo-1522335789203-aabd1fc54bc9",
    category: "beauty",
    query: "",
  },
  {
    eyebrow: "Get fit for less",
    title: "Gear up. Show up. Level up.",
    subtitle: "Workout-ready clothing, trackers and equipment for every goal.",
    image: "photo-1571019613454-1cb2f99b2d8b",
    category: "all",
    query: "fitness",
  },
];

const HERO_SLIDE_COUNT = heroSlides.length;

function imageUrl(value, width = 700) {
  if (typeof value !== "string") return "";

  if (/^https:\/\//i.test(value)) {
    return value;
  }

  if (/^photo-[a-z0-9-]+$/i.test(value)) {
    return `https://images.unsplash.com/${value}?w=${width}&q=85&fit=crop`;
  }

  return "";
}

function Photo({ image, alt = "", width = 700, className = "" }) {
  const [failed, setFailed] = useState(false);

  const src = imageUrl(image, width);

  return (
    <div
      className={`relative grid place-items-center overflow-hidden bg-[#f4f6f6] ${className}`}
    >
      {!failed && src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true" className="text-5xl">
          🛍️
        </span>
      )}
    </div>
  );
}

/* ---------------- Hero (visual addition only) ---------------- */

function HeroChevron({ direction = "left", className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {direction === "left" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}

function HomeHero({ onShopNow }) {
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);
  const touchStartXRef = useRef(null);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  const goTo = useCallback((index) => {
    setActive(
      ((index % HERO_SLIDE_COUNT) + HERO_SLIDE_COUNT) % HERO_SLIDE_COUNT,
    );
  }, []);

  const goNext = useCallback(() => {
    setActive((i) => (i + 1) % HERO_SLIDE_COUNT);
  }, []);

  const goPrev = useCallback(() => {
    setActive((i) => (i - 1 + HERO_SLIDE_COUNT) % HERO_SLIDE_COUNT);
  }, []);

  /* Auto-advance every few seconds; pauses on hover / focus / hidden tab */
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (pausedRef.current) return;
      if (typeof document !== "undefined" && document.hidden) return;
      setActive((i) => (i + 1) % HERO_SLIDE_COUNT);
    }, HERO_AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, []);

  /* Basic touch swipe support for mobile */
  function handleTouchStart(event) {
    touchStartXRef.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    if (touchStartXRef.current == null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(deltaX) < 40) return;
    if (deltaX < 0) {
      goNext();
    } else {
      goPrev();
    }
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured offers"
      className="relative w-full select-none overflow-hidden shadow-sm h-[320px] min-[421px]:h-[380px] sm:h-[440px] md:h-[520px] lg:h-[600px]"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {heroSlides.map((slide, index) => {
        const isActive = index === active;

        return (
          <div
            key={slide.title}
            aria-hidden={!isActive}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${HERO_SLIDE_COUNT}`}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              isActive ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Photo
              image={slide.image}
              alt={slide.title}
              width={1920}
              className={`h-full w-full transition-transform duration-[5000ms] ease-out motion-reduce:transition-none ${
                isActive ? "motion-safe:scale-100" : "motion-safe:scale-[1.08]"
              }`}
            />

            {/* Readability overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1b2d]/80 via-[#0a1b2d]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1b2d]/30 via-transparent to-transparent" />

            {/* Copy + CTA */}
            <div className="absolute inset-0 flex items-center">
              <div
                className={`max-w-[82%] pl-8 pr-4 transition-[transform,opacity] duration-500 ease-out min-[421px]:pl-10 sm:max-w-[30rem] sm:pl-14 md:max-w-[36rem] md:pl-16 lg:max-w-[40rem] lg:pl-24 ${
                  isActive
                    ? "translate-y-0 opacity-100 delay-150"
                    : "translate-y-2 opacity-0"
                }`}
              >
                <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm sm:mb-3 sm:px-3.5 sm:text-[11px] md:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ffd814]" />
                  {slide.eyebrow}
                </span>

                <h2 className="text-[26px] font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-md min-[421px]:text-[30px] sm:text-[38px] md:text-[46px] lg:text-[54px]">
                  {slide.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-[13px] leading-snug text-white/85 sm:mt-3 sm:text-[15px] md:text-[17px] lg:text-[19px]">
                  {slide.subtitle}
                </p>

                <button
                  type="button"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => onShopNow(slide)}
                  className="group mt-4 inline-flex items-center gap-2 rounded-full bg-[#ffd814] px-6 py-2.5 text-[13px] font-bold text-[#131921] shadow-[0_6px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:bg-[#f7ca00] hover:shadow-[0_8px_20px_rgba(0,0,0,0.32)] active:scale-[0.97] sm:mt-5 sm:px-7 sm:py-3 sm:text-[15px] md:text-[16px]"
                >
                  Shop Now
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 sm:h-5 sm:w-5"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Previous / Next */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#0a1b2d]/35 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-[#0a1b2d]/55 active:scale-95 sm:left-5 sm:h-12 sm:w-12 md:h-14 md:w-14"
      >
        <HeroChevron direction="left" className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#0a1b2d]/35 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-[#0a1b2d]/55 active:scale-95 sm:right-5 sm:h-12 sm:w-12 md:h-14 md:w-14"
      >
        <HeroChevron direction="right" className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 sm:bottom-5 md:bottom-6">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === active}
            className={`h-2 rounded-full transition-all duration-300 sm:h-2.5 ${
              index === active
                ? "w-8 bg-white sm:w-10"
                : "w-2 bg-white/50 hover:bg-white/80 sm:w-2.5"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* -------------- End of hero (visual addition only) -------------- */

function HomeCategoryCard({ item, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      className="group min-w-0 text-left"
    >
      <Photo
        image={item.image}
        alt={item.label}
        width={600}
        className="aspect-square w-full rounded-[14px] bg-white"
      />

      <span className="mt-2 block text-[13px] leading-snug text-[#263746] sm:text-[14px]">
        {item.label}
      </span>
    </button>
  );
}

function HomeSection({ section, onItemClick }) {
  return (
    <section className="rounded-[20px] bg-white p-4 shadow-sm sm:p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-[20px] leading-tight font-extrabold tracking-tight sm:text-[24px] md:text-[28px]">
          {section.title}
        </h2>

        <button
          type="button"
          onClick={() => onItemClick(section.items[0])}
          aria-label={`Explore ${section.title}`}
          className="shrink-0 text-3xl leading-none text-[#111827] transition-transform hover:translate-x-1"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-4 sm:gap-4">
        {section.items.map((item) => (
          <HomeCategoryCard
            key={item.label}
            item={item}
            onClick={onItemClick}
          />
        ))}
      </div>
    </section>
  );
}

export default function HomeCategories({ onExplore }) {
  function handleItemClick(item) {
    onExplore(item.category, item.query || "");
  }

  return (
    <div>
      {/* Hero banner — full width edge-to-edge, no padding, no rounded corners */}
      <HomeHero onShopNow={handleItemClick} />

      {/* Category sections — padded container below the hero */}
      <main className="space-y-5 px-3 py-5 sm:px-5 md:px-6 lg:px-8">
        {homeSections.map((section) => (
          <HomeSection
            key={section.title}
            section={section}
            onItemClick={handleItemClick}
          />
        ))}
      </main>
    </div>
  );
}
