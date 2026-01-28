const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./src/models/Product");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log(
      "✅ MongoDB Bağlandı... Bütün kateqoriyalar (Wall Art düzəldildi) yüklənir."
    )
  )
  .catch((err) => {
    console.error("❌ MongoDB Xətası:", err);
    process.exit(1);
  });

// --- BRENDLƏR & KATEQORİYALAR ---
const brands = [
  "Berkeley London Designs",
  "DI Designs",
  "Eichholtz",
  "Esperance",
  "Hamilton Interiors",
  "Liang & Eimil",
  "Noosa & Co.",
  "Premier",
  "Richmond Interiors",
  "Twenty10 Designs",
];

const categories = [
  "Artificial Plants and Flowers",
  "Candles and Candle Holders",
  "Decorative",
  "Trays",
  "Vases and Planters",
  "Wall Art",
  "Bar Stools",
  "Dining Chairs",
  "Dining Tables",
  "Home Bar and Drinks Cabinets",
  "Kitchen",
  "Chandeliers and Ceiling Lights",
  "Floor Standing Lamps",
  "Table Lamps",
  "Wall Lights",
  "Cabinets",
  "Coffee Tables",
  "Console Tables",
  "Cupboards and Storage",
  "Display Units",
  "Home Office",
  "Mirrors",
  "Rugs",
  "Seating",
  "Side Tables and Occasional",
  "Sideboards",
  "Sofas",
  "Stools and Footstools",
  "Storage Trunks",
  "All Mirrors",
  "Overmantle",
  "Round / Oval",
  "Wall Mounted",
  "Outdoor Furniture",
  "Bedroom Seating",
  "Beds",
  "Bedside Tables",
  "Children's Bedroom",
  "Drawers",
  "Dressing Tables And Stools",
  "Wardrobes",
];

const materials = [
  "Velvet",
  "Antique Brass",
  "Polished Stainless Steel",
  "Oak Veneer",
  "White Marble",
  "Clear Glass",
  "Ceramic",
];
const adjectives = [
  "Luxury",
  "Contemporary",
  "Elegant",
  "Sophisticated",
  "Handcrafted",
  "Premium",
  "Modern",
  "Lifelike",
];

// --- 🌿 BİTKİLƏR (SİZİN URL-LƏR) ---
const plantImages = [
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-bundle-of-strelitzia-leaves-36-pcs-house-of-isabella-uk-1212507173.jpg?v=1766710809&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-bundle-of-magnolia-leaves-24-pcs-house-of-isabella-uk-1212507176.jpg?v=1766708436&width=480",
  "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=800&q=80",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-folding-screen-jacques-house-of-isabella-uk-1212504590.jpg?v=1766458358&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-bouquet-of-vanda-orchids-real-touch-24-pcs-house-of-isabella-uk-1212507369.jpg?v=1766546436&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-folding-screen-bahamas-house-of-isabella-uk-1212504594.jpg?v=1766863089&width=480",
  "https://images.pexels.com/photos/2826787/pexels-photo-2826787.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-outdoor-planter-ocean-club-house-of-isabella-uk-1212503647.jpg?v=1766867376&width=480",
  "https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-bouquet-of-hydrangeas-snowball-real-touch-36-pcs-house-of-isabella-uk-1212507422.jpg?v=1766829817&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-blush-cone-floral-garland-house-of-isabella-uk-1193983525.jpg?v=1758549168&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-eucalyptus-autumnal-bouquet-house-of-isabella-uk-1193982990.jpg?v=1761142737&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-potted-sansevieria-plant-4ft-house-of-isabella-uk-1158886163.webp?v=1750757085&width=480",
  "https://images.pexels.com/photos/3094208/pexels-photo-3094208.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-potted-calathea-leaf-tree-large-house-of-isabella-uk-1158886160.jpg?v=1750756975&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-potted-calathea-leaf-tree-small-house-of-isabella-uk-1158886156.jpg?v=1750743763&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-potted-king-kentia-palm-tree-large-house-of-isabella-uk-1158886154.jpg?v=1750743657&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-potted-chinese-white-olive-tree-large-house-of-isabella-uk-1158886135.jpg?v=1750756609&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-potted-rhodoleia-5ft-tree-house-of-isabella-uk-1158886126.jpg?v=1750756482&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-potted-rhodoleia-3ft-tree-house-of-isabella-uk-1158886122.jpg?v=1750753009&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-potted-grass-with-pampas-seed-heads-5pk-large-house-of-isabella-uk-1158886118.jpg?v=1750752906&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-bundle-of-tender-leaves-36-pcs-house-of-isabella-uk-1212507168.jpg?v=1766544037&width=480",
  "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-potted-statement-palm-large-house-of-isabella-uk-1158886086.jpg?v=1750752411&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-wide-fern-in-concrete-pot-house-of-isabella-uk-1158886076.webp?v=1750743530&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-faux-aloe-vera-in-ceramic-pot-house-of-isabella-uk-1158886074.webp?v=1750752163&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-faux-snake-plant-in-ceramic-pot-house-of-isabella-uk-1158886072.webp?v=1750752058&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-faux-playycerium-multi-colour-in-ceramic-pot-house-of-isabella-uk-1158886068.webp?v=1750752047&width=4800",
];

// --- 🕯️ ŞAMLAR (SİZİN URL-LƏR) ---
const candleImages = [
  "https://houseofisabella.co.uk/cdn/shop/files/dolni-accessories-xl-white-ceramic-2200g-amber-patchouli-candle-house-of-isabella-uk-1212509962.png?v=1766638718&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/dolni-accessories-xl-black-ceramic-2200g-tuberose-sandalwood-candle-house-of-isabella-uk-1212509972.png?v=1766638359&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/dolni-accessories-white-ceramic-1500ml-blackberry-oud-reed-diffuser-house-of-isabella-uk-1212509975.png?v=1766638510&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/dolni-accessories-large-white-ceramic-blackberry-oud-500ml-reed-diffuser-house-of-isabella-uk-1212509983.png?v=1766903890&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/dolni-accessories-large-white-ceramic-600g-amber-patchouli-candle-house-of-isabella-uk-1212509994.png?v=1766903770&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/dolni-accessories-large-brown-ceramic-600g-tobacco-oud-candle-house-of-isabella-uk-1212509998.png?v=1766646009&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/dolni-accessories-large-black-ceramic-600g-tuberose-sandalwood-candle-house-of-isabella-uk-1212510007.png?v=1766641270&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/dolni-accessories-candle-snuffer-wick-trimmer-set-house-of-isabella-uk-1212510010.png?v=1766674178&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/dolni-accessories-blackberry-oud-500ml-reed-diffuser-refill-house-of-isabella-uk-1212510013.png?v=1766673310&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/dolni-accessories-1500ml-reed-diffuser-replacement-reeds-house-of-isabella-uk-1212510015.png?v=1766641450&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-villena-glass-taper-candlestick-olive-house-of-isabella-uk-1199075634.jpg?v=1763720935&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/5056693591498_1_2_10062025045834_610702a8-0b19-4036-b07a-aff50b3d1dfb.jpg?v=1760002983&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-ora-pebble-candle-holder-small-house-of-isabella-uk-1199075359.jpg?v=1763725494&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-movera-glass-taper-candlestick-smoke-house-of-isabella-uk-1199075239.jpg?v=1763726437&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/5056693591672_1_2_10062025035705_af2666b8-aded-4d26-836e-dd5934d23b4e.jpg?v=1760007252&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/5056693591665_1_2_10092025134037_702bb768-5ba9-4ed4-89e6-b59d1e58f819.jpg?v=1760007278&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-led-3-wick-candle-oxblood-house-of-isabella-uk-1199075086.jpg?v=1763727765&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/5061087222254_1_2_05082025112446_aee45df5-4bb7-462d-98c0-8b9d81317cde.jpg?v=1760009383&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-led-3-wick-candle-olive-house-of-isabella-uk-1199075078.jpg?v=1763727760&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-led-1-wick-candle-oxblood-3pk-house-of-isabella-uk-1199075050.jpg?v=1763728011&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-led-1-wick-candle-olive-3pk-house-of-isabella-uk-1199075074.jpg?v=1763727888&width=480",
];

// --- 🖼️ WALL ART (SİZİN REAL LİNKLƏR - Əvvəlki "Decorative" siyahısı) ---
const wallArtImages = [
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-philip-plisson-classic-week-i-house-of-isabella-uk-1212503239.jpg?v=1766378794&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-philippe-vogelenzang-vivian-house-of-isabella-uk-1212503243.jpg?v=1766871848&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-philippe-vogelenzang-vitamin-oral-house-of-isabella-uk-1212503244.jpg?v=1766379400&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-philippe-vogelenzang-surrender-house-of-isabella-uk-1212503248.jpg?v=1766380718&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-philippe-vogelenzang-slow-ocean-house-of-isabella-uk-1212503252.jpg?v=1766380237&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-philippe-vogelenzang-see-you-at-midnight-house-of-isabella-uk-1212503259.jpg?v=1766379637&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-philippe-vogelenzang-miramar-house-of-isabella-uk-1212503263.jpg?v=1766380358&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-philippe-vogelenzang-lola-douce-house-of-isabella-uk-1212503265.jpg?v=1766379878&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-philippe-vogelenzang-la-nuit-house-of-isabella-uk-1212503269.jpg?v=1766871637&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-philippe-vogelenzang-dawn-house-of-isabella-uk-1212503271.jpg?v=1766380715&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-philippe-vogelenzang-coucou-house-of-isabella-uk-1212503275.jpg?v=1766380355&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-philippe-vogelenzang-coco-jolie-house-of-isabella-uk-1212503280.jpg?v=1766380478&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-philippe-vogelenzang-cherche-moi-house-of-isabella-uk-1212503281.jpg?v=1766380596&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-philippe-vogelenzang-cala-vincente-house-of-isabella-uk-1212503285.jpg?v=1766871429&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-philippe-vogelenzang-beurre-sale-house-of-isabella-uk-1212503291.jpg?v=1766871396&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eccotrading-design-london-accessories-tibetan-bronze-table-house-of-isabella-uk-1212511842.webp?v=1766898576&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-falmouth-photo-frame-6x4-3pk-house-of-isabella-uk-1193982951.jpg?v=1761142128&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-ilkley-photo-frame-6x4-3pk-house-of-isabella-uk-1193982588.jpg?v=1761136253&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/118557_0_1_1_a4de426d-6f6f-4671-b900-9b4d155a0f26.jpg?v=1760010947&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-philip-plisson-classic-week-ii-house-of-isabella-uk-1199074843.jpg?v=1763729555&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-refined-catena-by-michael-willett-set-of-2-house-of-isabella-uk-1212503237.jpg?v=1766871937&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-sand-shaped-by-michael-willett-set-of-2-house-of-isabella-uk-1212503221.jpg?v=1766403158&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-sand-shaped-by-grace-popp-set-of-2-house-of-isabella-uk-1212503226.jpg?v=1766403398&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-print-rift-valley-by-vanna-lam-set-of-2-house-of-isabella-uk-1212503231.jpg?v=1766871969&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-framed-print-vogue-1965-house-of-isabella-uk-1174848344.jpg?v=1753377891&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-framed-print-vogue-1956-i-house-of-isabella-uk-1174848342.jpg?v=1753377883&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/uttermost-accessories-black-label-feather-burst-shadow-box-house-of-isabella-uk-41812171325747.jpg?v=1750662752&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/uttermost-accessories-adlai-wood-wall-art-s-6-house-of-isabella-uk-41810684018995.jpg?v=1750663626&width=480",
];

// --- 🍽️ PADNOSLAR (SİZİN REAL LİNKLƏR) ---
const trayImages = [
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-wine-rack-alboran-s-house-of-isabella-uk-1212501439.jpg?v=1766317715&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-wine-cooler-clementine-house-of-isabella-uk-1212501445.jpg?v=1766318797&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-wine-cooler-christian-house-of-isabella-uk-1212501451.jpg?v=1766318315&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-tray-vimini-s-house-of-isabella-uk-1212501983.jpg?v=1766353718&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-tray-shell-s-house-of-isabella-uk-1212502011.jpg?v=1766337995&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-tray-salvi-round-house-of-isabella-uk-1212502018.jpg?v=1766879916&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-tray-salvi-rectangular-s-house-of-isabella-uk-1212502023.jpg?v=1766879856&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-tray-salvi-rectangular-l-house-of-isabella-uk-1212502025.jpg?v=1766337276&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-tray-salvi-hexagon-house-of-isabella-uk-1212502031.jpg?v=1766888050&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-tray-pelagos-house-of-isabella-uk-1212502039.jpg?v=1766887990&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-tray-lenora-house-of-isabella-uk-1212502043.jpg?v=1766887897&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-accessories-stand-christine-house-of-isabella-uk-1212502445.jpg?v=1766354916&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eccotrading-design-london-accessories-wode-tray-rectangle-putty-leather-house-of-isabella-uk-1212511814.jpg?v=1766660616&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eccotrading-design-london-accessories-paragon-oval-tray-pumice-leather-house-of-isabella-uk-1212511941.webp?v=1766896390&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-tray-liv-black-gold-house-of-isabella-uk-1212516545.jpg?v=1766732828&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-tray-judy-house-of-isabella-uk-1212516530.jpg?v=1766732170&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-tray-jinx-house-of-isabella-uk-1212516527.jpg?v=1766819588&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-tray-jinx-green-house-of-isabella-uk-1212516520.jpg?v=1766732529&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-tray-jalien-pink-house-of-isabella-uk-1212516511.jpg?v=1766732771&width=480",
];

// --- 🏺 VASES & PLANTERS (SİZİN URL-LƏR) ---
const vaseImages = [
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-planter-dira-45o-brushed-gold-house-of-isabella-uk-1180995231.jpg?v=1753405860&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-tarragona-marble-storage-jar-small-house-of-isabella-uk-1193981298.jpg?v=1761118246&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-southwold-ribbed-ceramic-vase-teal-set-of-2-house-of-isabella-uk-1193981581.jpg?v=1761120290&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-rose-eucalyptus-vase-arrangement-house-of-isabella-uk-1193981679.jpg?v=1761121969&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-retro-vase-with-meadown-foliage-house-of-isabella-uk-1193981731.jpg?v=1761122569&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-retro-vase-with-eucalyptus-house-of-isabella-uk-1193981737.jpg?v=1761122688&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-pablo-curved-vase-house-of-isabella-uk-1193981921.jpg?v=1761125805&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-organic-faceted-hurricane-amber-large-house-of-isabella-uk-1193982017.jpg?v=1761110830&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-meadow-embossed-ceramic-vase-stone-small-house-of-isabella-uk-1193982346.jpg?v=1761132520&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-linea-stripe-glass-vase-monochrome-set-of-2-house-of-isabella-uk-1193982442.jpg?v=1761134094&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-kusama-dotted-ceramic-vase-small-house-of-isabella-uk-1193982493.jpg?v=1761134801&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-hydrangea-ceramic-arrangement-house-of-isabella-uk-1193982608.jpg?v=1761136496&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-forma-swirl-glass-vase-camel-black-house-of-isabella-uk-1193982874.jpg?v=1761140808&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-cromer-ceramic-handled-vase-white-small-house-of-isabella-uk-1193983249.jpg?v=1761147165&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-claro-stripe-glass-vase-taupe-small-house-of-isabella-uk-1193983346.jpg?v=1758546772&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/bodhi-accessories-claro-stripe-glass-vase-taupe-large-house-of-isabella-uk-1193983354.jpg?v=1758546894&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/eichholtz-living-vase-fayum-house-of-isabella-uk-1180997140.jpg?v=1756248152&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-vase-justa-black-house-of-isabella-uk-1181001307.jpg?v=1753581408&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-vase-shirley-gold-house-of-isabella-uk-1181001302.jpg?v=1753581292&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-vase-lio-gold-house-of-isabella-uk-1181001299.jpg?v=1753581283&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-vase-akelei-gold-gold-house-of-isabella-uk-1181001291.jpg?v=1753580944&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-vase-omono-house-of-isabella-uk-1181001295.jpg?v=1753581180&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-vase-siem-beige-beige-house-of-isabella-uk-1181001287.jpg?v=1753580932&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-vase-flora-olive-house-of-isabella-uk-1181001277.jpg?v=1753580585&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-vase-jared-house-of-isabella-uk-1181001283.jpg?v=1753580822&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-vase-flora-olive-house-of-isabella-uk-1181001277.jpg?v=1753580585&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-vase-cedar-house-of-isabella-uk-1181001274.jpg?v=1753580576&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-vase-lena-brushed-gold-house-of-isabella-uk-1181001221.jpg?v=1753579746&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-vase-alain-black-house-of-isabella-uk-1181001218.jpg?v=1753579736&width=480",
  "https://houseofisabella.co.uk/cdn/shop/files/richmond-interiors-accessories-vase-emar-big-black-house-of-isabella-uk-1181001178.jpg?v=1753578420&width=480",
];

// --- 🎁 "DECORATIVE" (YENİ & STABİL) ---
const decorativeImages = [
  "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&q=80",
  "https://images.unsplash.com/photo-1605218427368-35b84d4ae832?w=800&q=80",
  "https://images.unsplash.com/photo-1615486511484-92e172cc416d?w=800&q=80",
  "https://images.unsplash.com/photo-1585257930814-14234327680c?w=800&q=80",
  "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=800&q=80",
  "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
  "https://images.unsplash.com/photo-1515516947340-99bbcf872717?w=800&q=80",
  "https://images.pexels.com/photos/6157583/pexels-photo-6157583.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.unsplash.com/photo-1634738442108-d083b40552b7?w=800&q=80",
  "https://images.unsplash.com/photo-1526435478479-7071e6878b66?w=800&q=80",
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
  "https://images.unsplash.com/photo-1608264582963-c79b9b39226c?w=800&q=80",
  "https://images.unsplash.com/photo-1599695026410-d8677c7f9999?w=800&q=80",
  "https://images.unsplash.com/photo-1601666710777-a859663d5964?w=800&q=80",
  "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=800&q=80",
  "https://images.pexels.com/photos/6758774/pexels-photo-6758774.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/4203099/pexels-photo-4203099.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80",
  "https://images.unsplash.com/photo-1578759323495-2d645e7e008c?w=800&q=80",
  "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=800&q=80",
  "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
  "https://images.unsplash.com/photo-1602409398863-0d5885078a63?w=800&q=80",
  "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80",
  "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=800&q=80",
  "https://images.unsplash.com/photo-1602052577122-f73b9710adba?w=800&q=80",
  "https://images.unsplash.com/photo-1617006082269-8c65f0122e23?w=800&q=80",
  "https://images.unsplash.com/photo-1590791443653-a5c88c7d242c?w=800&q=80",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
];

// Digər kateqoriyalar üçün stabil şəkillər (Placeholder olaraq)
const otherImages = {
  lighting:
    "https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=800",
  seating:
    "https://images.pexels.com/photos/3757055/pexels-photo-3757055.jpeg?auto=compress&cs=tinysrgb&w=800",
  table:
    "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800",
  bedroom:
    "https://images.pexels.com/photos/6585614/pexels-photo-6585614.jpeg?auto=compress&cs=tinysrgb&w=800",
  mirror:
    "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=800",
  art: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800",
  outdoor:
    "https://images.pexels.com/photos/8961313/pexels-photo-8961313.jpeg?auto=compress&cs=tinysrgb&w=800",
  default:
    "https://images.pexels.com/photos/6758774/pexels-photo-6758774.jpeg?auto=compress&cs=tinysrgb&w=800",
};

const getImageForCategory = (cat, index) => {
  const c = cat.toLowerCase();

  // 🔥 1. VAZALAR (Planter/Vase/Pot) - ƏN BAŞDA
  if (c.includes("vase") || c.includes("planter") || c.includes("pot")) {
    return vaseImages[index % vaseImages.length];
  }

  // 🖼️ 2. WALL ART (SİZİN REAL LİNKLƏR)
  if (
    c.includes("wall art") ||
    c.includes("print") ||
    c.includes("picture") ||
    c.includes("painting")
  ) {
    return wallArtImages[index % wallArtImages.length];
  }

  // 🎁 3. DEKORATİV (Yeni Stabil Şəkillər)
  // "Tray", "Vase", "Wall Art" çıxılmaqla əsl dekorativ əşyalar
  if (
    c.includes("decorative") &&
    !c.includes("tray") &&
    !c.includes("vase") &&
    !c.includes("wall")
  ) {
    return decorativeImages[index % decorativeImages.length];
  }

  // 🌿 4. BİTKİLƏR (Orijinal URL-lər)
  if (c.includes("plant") || c.includes("flower") || c.includes("artificial")) {
    return plantImages[index % plantImages.length];
  }

  // 🕯️ 5. ŞAMLAR (Orijinal URL-lər)
  if (c.includes("candle")) {
    return candleImages[index % candleImages.length];
  }

  // 🍽️ 6. PADNOSLAR (Orijinal URL-lər)
  if (c.includes("tray") || c.includes("platter")) {
    return trayImages[index % trayImages.length];
  }

  // Digərləri
  if (c.includes("chandelier") || c.includes("lamp") || c.includes("light"))
    return otherImages.lighting;
  if (
    c.includes("sofa") ||
    c.includes("chair") ||
    c.includes("stool") ||
    c.includes("seating")
  )
    return otherImages.seating;
  if (
    c.includes("table") ||
    c.includes("desk") ||
    c.includes("cabinet") ||
    c.includes("dining")
  )
    return otherImages.table;
  if (c.includes("bed") || c.includes("sleeping") || c.includes("wardrobe"))
    return otherImages.bedroom;
  if (c.includes("mirror")) return otherImages.mirror;
  if (c.includes("outdoor")) return otherImages.outdoor;

  return otherImages.default;
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomPrice = () => {
  const prices = [150, 295, 450, 650, 890, 1250, 1890, 2450, 3400];
  return prices[Math.floor(Math.random() * prices.length)];
};

const generateProducts = () => {
  const products = [];

  categories.forEach((cat) => {
    // Hər kateqoriya üçün 35 məhsul
    for (let i = 0; i < 35; i++) {
      const brand = getRandom(brands);
      const material = getRandom(materials);
      const adj = getRandom(adjectives);

      products.push({
        name: `${brand} ${cat} ${material} ${i + 1}`,
        brand: brand,
        category: cat,
        price: getRandomPrice(),
        image: getImageForCategory(cat, i), // ✅ Düzgün kateqoriya yoxlaması
        availability: Math.random() > 0.1 ? "In stock" : "Out of stock",
        isNewProduct: Math.random() > 0.6,
        description: `This luxurious ${cat.toLowerCase()} from ${brand} features a stunning ${material} finish.`,
      });
    }
  });

  return products;
};

const importData = async () => {
  try {
    try {
      await Product.collection.drop();
      console.log("🗑️  Köhnə məlumatlar silindi.");
    } catch (e) {
      console.log("ℹ️  Baza boş idi.");
    }

    console.log(
      "⏳ Məlumatlar yüklənir (Wall Art, Decorative, Vases hamısı ayrı)..."
    );
    const allProducts = generateProducts();

    const chunkSize = 500;
    for (let i = 0; i < allProducts.length; i += chunkSize) {
      const chunk = allProducts.slice(i, i + chunkSize);
      await Product.insertMany(chunk);
      console.log(`✅ ${i + chunk.length} məhsul hazır...`);
    }

    console.log(
      `\n🎉 BİTDİ! İndi 'Wall Art' seçəndə Sizin Printləriniz, 'Decorative' seçəndə isə Heykəllər çıxacaq.`
    );
    process.exit();
  } catch (error) {
    console.error("❌ Xəta:", error);
    process.exit(1);
  }
};

importData();
