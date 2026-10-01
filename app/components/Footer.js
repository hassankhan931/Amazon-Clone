"use client";

const footerColumns = [
  {
    title: "Get to Know Us",
    links: [
      ["Careers", "https://www.amazon.jobs/en/"],
      ["Blog", "https://www.aboutamazon.com/"],
      ["About Amazon", "https://www.aboutamazon.com/"],
      [
        "Investor Relations",
        "https://ir.aboutamazon.com/overview/default.aspx",
      ],
      [
        "Amazon Devices",
        "https://www.amazon.com/gp/browse.html?node=2102313011&ref_=footer_devices",
      ],
      ["Amazon Science", "https://www.amazon.science/"],
    ],
  },
  {
    title: "Make Money with Us",
    links: [
      [
        "Sell products on Amazon",
        "https://sell.amazon.com/?ld=AZFSSOA&ref_=footer_soa",
      ],
      [
        "Sell on Amazon Business",
        "https://sell.amazon.com/programs/amazon-business?ld=usb2bunifooter&ref_=footer_b2b",
      ],
      ["Sell apps on Amazon", "https://developer.amazon.com/"],
      ["Become an Affiliate", "https://affiliate-program.amazon.com/"],
      [
        "Advertise Your Products",
        "https://advertising.amazon.com/?ref=ext_amzn_ftr",
      ],
      ["Self-Publish with Us", "https://kdp.amazon.com/en_US/"],
      ["Host an Amazon Hub", "https://go.thehub-amazon.com/amazon-hub-locker"],
      [
        "›See More Make Money with Us",
        "https://www.amazon.com/b/?node=18190131011&ld=AZUSSOA-seemore&ref_=footer_seemore",
      ],
    ],
  },
  {
    title: "Amazon Payment Products",
    links: [
      ["Amazon Business Card", "https://www.amazon.com/"],
      [
        "Shop with Points",
        "https://www.amazon.com/hp/shopwithpoints/servicing",
      ],
      ["Reload Your Balance", "https://www.amazon.com/dp/B0CHTVMXZJ?th=1"],
      [
        "Amazon Currency Converter",
        "https://www.amazon.com/gp/browse.html?node=388305011&ref_=footer_tfx",
      ],
    ],
  },
  {
    title: "Let Us Help You",
    links: [
      [
        "Your Account",
        "https://www.amazon.com/gp/css/homepage.html?ref_=footer_ya",
      ],
      [
        "Your Orders",
        "https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fyour-orders%2Forders%3Fref_%3Dfooter_yo&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=amzn_retail_yourorders_us&openid.mode=checkid_setup&language=en_US&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0",
      ],
      [
        "Shipping Rates & Policies",
        "https://www.amazon.com/gp/help/customer/display.html?nodeId=GGE5X8EV7VNVTK6R&ref_=footer_shiprates",
      ],
      [
        "Returns & Replacements",
        "https://www.amazon.com/ap/signin?openid.pape.max_auth_age=3600&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fspr%2Freturns%2Fhomepage%2Fhomepage.html%3Fref_%3Dfooter_hy_f_4&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=amzn_psr_desktop_us&openid.mode=checkid_setup&language=en_US&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0",
      ],
      [
        "Manage Your Content and Devices",
        "https://www.amazon.com/ap/signin?clientContext=135-7552536-7909063&openid.pape.max_auth_age=3600&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fdigital%2Ffiona%2Fmanage&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&marketPlaceId=USAmazon&language=en_US&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&language=en",
      ],
      [
        "Help",
        "https://www.amazon.com/gp/help/customer/display.html?nodeId=508510&ref_=footer_gw_m_b_he",
      ],
    ],
  },
];

const footerLinks = [
  [
    "Amazon Music",
    "Stream millions\nof songs",
    "https://music.amazon.com/?ref=dm_aff_amz_com",
  ],
  [
    "Amazon Ads",
    "Reach customers\nwherever they\nspend their time",
    "https://advertising.amazon.com/?ref=footer_advtsing_amzn_com",
  ],
  ["6pm", "Score deals\non fashion brands", "https://www.6pm.com/"],
  ["AbeBooks", "Books, art\n& collectibles", "https://www.abebooks.com/"],
  ["ACX", "Audiobook Publishing\nMade Easy", "https://www.acx.com/"],
  [
    "Sell on Amazon",
    "Start a Selling Account",
    "https://sell.amazon.com/?ld=AZUSSOA-footer-aff&ref_=footer_sell",
  ],
  [
    "Veeqo",
    "Shipping Software\nInventory Management",
    "https://www.veeqo.com/?utm_source=amazon&utm_medium=website&utm_campaign=footer",
  ],
  [
    "Amazon Business",
    "Everything For\nYour Business",
    "https://www.amazon.com/business/register/org/landing?ref_=footer_retail_b2b",
  ],
  [
    "AmazonGlobal",
    "Ship Orders\nInternationally",
    "https://www.amazon.com/gp/browse.html?node=20338496011&ref_=footer_amazonglobal",
  ],
  [
    "Amazon Web Services",
    "Scalable Cloud\nComputing Services",
    "https://aws.amazon.com/what-is-cloud-computing/?sc_channel=EL&sc_campaign=amazonfooter",
  ],
  [
    "Audible",
    "Listen to Books & Original\nAudio Performances",
    "https://www.audible.com/",
  ],
  [
    "Box Office Mojo",
    "Find Movie\nBox Office Data",
    "https://www.boxofficemojo.com/?ref_=amzn_nav_ftr",
  ],
  [
    "Goodreads",
    "Book reviews\n& recommendations",
    "https://www.goodreads.com/",
  ],
  ["IMDb", "Movies, TV\n& Celebrities", "https://www.imdb.com/"],
  [
    "IMDbPro",
    "Get Info Entertainment\nProfessionals Need",
    "https://pro.imdb.com/signup/?ref_=amzn_nav_ftr",
  ],
  [
    "Kindle Direct Publishing",
    "Indie Digital & Print Publishing\nMade Easy",
    "https://kdp.amazon.com/en_US/",
  ],
  [
    "Prime Video Direct",
    "Video Distribution\nMade Easy",
    "https://videodirect.amazon.com/home/landing",
  ],
  ["Shopbop", "Designer\nFashion Brands", "https://www.shopbop.com/"],
  ["Woot!", "Deals and\nShenanigans", "https://www.woot.com/"],
  ["Zappos", "Shoes &\nClothing", "https://www.zappos.com/"],
  ["Ring", "Smart Home\nSecurity Systems", "https://ring.com/"],
  ["eero WiFi", "Stream 4K Video\nin Every Room", "https://eero.com/en-GB"],
  [
    "Blink",
    "Smart Security\nfor Every Home",
    "https://blinkforhome.com/?ref=nav_footer",
  ],
  [
    "Neighbors App",
    "Real-Time Crime\n& Safety Alerts",
    "https://ring.com/neighbors",
  ],
  ["PillPack", "Pharmacy Simplified", "https://www.pillpack.com/"],
];

export default function Footer({ onBackToTop }) {
  return (
    <footer className="bg-[#232f3e] text-white">
      <button
        type="button"
        onClick={onBackToTop}
        className="w-full bg-[#37475a] p-4 hover:bg-[#485769]"
      >
        Back to top
      </button>

      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-8 gap-y-10 px-5 py-12 md:grid-cols-4 md:gap-x-12">
        {footerColumns.map((column) => (
          <div key={column.title} className="min-w-0">
            <h3 className="mb-4 text-[15px] font-bold">{column.title}</h3>

            <ul className="space-y-2.5">
              {column.links.map(([label, url]) => (
                <li key={label}>
                  <a
                    href={url}
                    className="text-[13px] leading-5 text-[#ddd] hover:underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/15 px-5 py-5 text-center">
        <a href="#admin" className="text-[#febd69] hover:underline">
          Admin Panel →
        </a>
      </div>

      <div className="bg-[#131a22]">
        <div className="mx-auto grid max-w-[1050px] grid-cols-2 gap-x-5 gap-y-7 px-5 pt-10 pb-9 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
          {footerLinks.map(([title, description, url]) => (
            <a
              key={title}
              href={url}
              className="group block text-[11px] leading-[1.35]"
            >
              <span className="block font-bold text-[#eee] group-hover:underline">
                {title}
              </span>
              <span className="mt-0.5 block whitespace-pre-line text-[#aaa] group-hover:underline">
                {description}
              </span>
            </a>
          ))}
        </div>

        <p className="border-t border-white/10 px-4 py-6 text-center text-[11px] text-[#ddd]">
          © 1996-2026, Amazon.com, Inc. or its affiliates<br></br> Created By{" "}
          <b>Hassan Khan</b>
        </p>
      </div>
    </footer>
  );
}
