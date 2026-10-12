/*
 * MDT Software Apps — site configuration.
 *
 * This is the one file to edit when a store listing goes live, an email changes
 * or a new app is added. The homepage cards, the release board, the support list,
 * the footer and the store buttons on every app's support page all read from here.
 *
 * Paths are relative to the site root (no leading slash), so the site works at
 * https://dikranteymur.github.io/ and when opened locally.
 *
 * Store status values:
 *   "available"   — the listing is live. `url` must be set and must have been opened
 *                   and checked. Only this status shows the official store badge.
 *   "coming-soon" — in development or review for that store. Shows "Coming soon".
 *   "unavailable" — not planned for that store right now. Shows "Not available yet".
 *
 * To add an app: copy one entry in `apps`, give it a new `slug`, add its icon to
 * assets/img/icons/, and create apps/<slug>/privacy.html, eula.html and support.html
 * (copy another app's pages as a starting point). Then add the three URLs to sitemap.xml.
 */
window.MDT_CONFIG = {
  brand: {
    name: "MDT Software Apps",
    developer: "Dikran Teymur",
    // Seller name shown on the App Store.
    legalName: "Muhammet Dikran Teymur",
    email: "mdtsoftware21@gmail.com",
    siteUrl: "https://dikranteymur.github.io/"
  },

  apps: [
    {
      slug: "finance-tracker",
      name: "Finance Tracker",
      storeName: "Finance: FinanceTracker",
      category: "Finance",
      platforms: "iPhone · iPad",
      description:
        "Log expenses, set a monthly budget for each category and see where your money goes in clear charts. Scan receipts with on-device text recognition and keep your records in sync across your devices.",
      icon: "assets/img/icons/finance-tracker.png",
      screenshots: [
        "assets/img/screens/finance-tracker-1.jpg",
        "assets/img/screens/finance-tracker-2.jpg",
        "assets/img/screens/finance-tracker-3.jpg"
      ],
      email: "financetracker.ask.me@gmail.com",
      stores: {
        appStore: { status: "available", url: "https://apps.apple.com/app/finance-financetracker/id6758254858", verified: "2026-10-12" },
        googlePlay: { status: "unavailable", url: "" }
      },
      pages: {
        privacy: "apps/finance-tracker/privacy.html",
        eula: "apps/finance-tracker/eula.html",
        support: "apps/finance-tracker/support.html"
      }
    },
    {
      slug: "professional-tuner",
      name: "Professional Tuner",
      storeName: "Professional Tuner",
      category: "Music",
      platforms: "iPhone · Apple Watch · Android",
      description:
        "A precise tuner built first for bağlama and Turkish folk instruments, with 37 ready-made tunings. It also tunes guitar, violin, oud, qanun and more. Pitch detection runs entirely on your device.",
      icon: "assets/img/icons/professional-tuner.png",
      // No phone screenshots in the project yet. Add paths here when they exist.
      screenshots: [],
      email: "mdteymur@gmail.com",
      stores: {
        appStore: { status: "available", url: "https://apps.apple.com/app/professional-tuner/id6803069238", verified: "2026-10-12" },
        googlePlay: { status: "available", url: "https://play.google.com/store/apps/details?id=com.mdteymur.protuner", verified: "2026-10-12" }
      },
      pages: {
        privacy: "apps/professional-tuner/privacy.html",
        eula: "apps/professional-tuner/eula.html",
        support: "apps/professional-tuner/support.html"
      }
    },
    {
      slug: "tilted-shelf",
      name: "Tilted Shelf",
      altName: "Eğik Raf",
      storeName: "Tilted Shelf",
      category: "Puzzle game",
      platforms: "iPhone · iPad · Android",
      description:
        "Tilt each shelf and slide every item onto its spot. Undo and restart are always free, hints show the next move when you're stuck, and boss shelves wait along the way.",
      icon: "assets/img/icons/tilted-shelf.png",
      screenshots: [
        "assets/img/screens/tilted-shelf-1.jpg",
        "assets/img/screens/tilted-shelf-2.jpg",
        "assets/img/screens/tilted-shelf-3.jpg"
      ],
      email: "mdtsoftware21@gmail.com",
      stores: {
        appStore: { status: "coming-soon", url: "" },
        googlePlay: { status: "available", url: "https://play.google.com/store/apps/details?id=com.mdteymur.tiltedshelf", verified: "2026-10-12" }
      },
      pages: {
        privacy: "apps/tilted-shelf/privacy.html",
        eula: "apps/tilted-shelf/eula.html",
        support: "apps/tilted-shelf/support.html"
      }
    },
    {
      slug: "penguin-slide",
      name: "Sliding Penguins",
      altName: "Penguen Sürüsü",
      storeName: "Sliding Penguins",
      category: "Puzzle game",
      platforms: "iPhone · Android",
      description:
        "One swipe moves every penguin on the ice. Guide the whole flock into their nests in the fewest moves across 120 puzzles in six frozen areas.",
      icon: "assets/img/icons/penguin-slide.png",
      screenshots: [
        "assets/img/screens/penguin-slide-1.jpg",
        "assets/img/screens/penguin-slide-2.jpg",
        "assets/img/screens/penguin-slide-3.jpg"
      ],
      email: "mdtsoftware21@gmail.com",
      stores: {
        appStore: { status: "coming-soon", url: "" },
        googlePlay: { status: "coming-soon", url: "" }
      },
      pages: {
        privacy: "apps/penguin-slide/privacy.html",
        eula: "apps/penguin-slide/eula.html",
        support: "apps/penguin-slide/support.html"
      }
    },
    {
      slug: "screen-menu",
      name: "Screen Menu",
      storeName: "Screen Menu",
      category: "Business",
      platforms: "iPhone · iPad · Mac · Android · Fire TV",
      description:
        "A digital menu board for cafés and restaurants that works without internet. Design the menu on your phone, tablet or Mac and send it to a Fire TV or Android TV over your own Wi‑Fi.",
      icon: "assets/img/icons/screen-menu.png",
      // No screenshots in the project yet. Add paths here when they exist.
      screenshots: [],
      email: "mdtsoftware21@gmail.com",
      stores: {
        appStore: { status: "coming-soon", url: "" },
        googlePlay: { status: "coming-soon", url: "" }
      },
      pages: {
        privacy: "apps/screen-menu/privacy.html",
        eula: "apps/screen-menu/eula.html",
        support: "apps/screen-menu/support.html"
      }
    }
  ]
};
