import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FiGrid,
  FiList,
  FiMinus,
  FiPlus,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import { fetchProducts, getImageUrl } from "../../services/productService";
import "./NewInPage.scss";

interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

const NewInPage = () => {
  const bannerUrl =
    "https://houseofisabella.co.uk/cdn/shop/collections/gallery-direct-sleeping-artisan-duvet-set-burnt-orange-superking-house-of-isabella-uk-15096851791926_765x821_f394031e-73d3-4a84-8bd9-ceb55ac4e512.jpg?v=1750050830&width=1440";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const [sortOption, setSortOption] = useState("date-desc");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 30;

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [openFilters, setOpenFilters] = useState<{ [key: string]: boolean }>({
    availability: true,
    brand: true,
    accessories: true,
    dining: true,
    lighting: true,
    living: true,
    mirrors: true,
    outdoors: true,
    sleeping: true,
  });

  const sidebarData = [
    {
      id: "availability",
      title: "AVAILABILITY",
      isSpecial: true,
      items: ["IN STOCK", "SALE"],
    },
    {
      id: "accessories",
      title: "ACCESSORIES",
      items: [
        "Artificial Plants and Flowers",
        "Candles and Candle Holders",
        "Decorative",
        "Trays",
        "Vases and Planters",
        "Wall Art",
      ],
    },
    {
      id: "brand",
      title: "BRAND",
      items: [
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
      ],
    },
    {
      id: "dining",
      title: "DINING",
      items: [
        "Bar Stools",
        "Dining Chairs",
        "Dining Tables",
        "Home Bar and Drinks Cabinets",
        "Kitchen",
      ],
    },
    {
      id: "lighting",
      title: "LIGHTING",
      items: [
        "Chandeliers and Ceiling Lights",
        "Floor Standing Lamps",
        "Table Lamps",
        "Wall Lights",
      ],
    },
    {
      id: "living",
      title: "LIVING",
      items: [
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
      ],
    },
    {
      id: "mirrors",
      title: "MIRRORS",
      items: [
        "All Mirrors",
        "Decorative",
        "Overmantle",
        "Round / Oval",
        "Wall Mounted",
      ],
    },
    {
      id: "outdoors",
      title: "OUTDOORS",
      items: ["Outdoor Furniture"],
    },
    {
      id: "sleeping",
      title: "SLEEPING",
      items: [
        "Bedroom Seating",
        "Beds",
        "Bedside Tables",
        "Children's Bedroom",
        "Drawers",
        "Dressing Tables And Stools",
        "Wardrobes",
      ],
    },
  ];

  const sortOptions = [
    { label: "FEATURED", value: "featured" },
    { label: "BEST SELLING", value: "best-selling" },
    { label: "ALPHABETICALLY, A-Z", value: "name-asc" },
    { label: "ALPHABETICALLY, Z-A", value: "name-desc" },
    { label: "PRICE, LOW TO HIGH", value: "price-asc" },
    { label: "PRICE, HIGH TO LOW", value: "price-desc" },
    { label: "DATE, OLD TO NEW", value: "date-asc" },
    { label: "DATE, NEW TO OLD", value: "date-desc" },
  ];

  const currentSortLabel =
    sortOptions.find((o) => o.value === sortOption)?.label ||
    "DATE, NEW TO OLD";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const params = {
        brands: selectedBrands,
        categories: selectedCategories,
        availability: inStockOnly ? ["In stock"] : [],
        sort: sortOption,
        page,
        limit,
      };

      const response = await fetchProducts(params);
      setProducts(response.data);
      setTotalProducts(response.total);
      setLoading(false);
    };

    loadData();
  }, [selectedBrands, selectedCategories, inStockOnly, sortOption, page]);

  return (
    <div className="new-in-page">
      <div
        className="hero-banner"
        style={{ backgroundImage: `url(${bannerUrl})` }}
      >
        <div className="hero-content">
          <h4>NEW IN</h4>
          <p>
            Discover luxury styles, new arrivals, and design inspiration for
            your home.
          </p>
          <button className="read-more-btn">READ MORE &gt;</button>
        </div>
      </div>

      <div className="top-toolbar">
        <button
          className="mobile-filter-btn"
          onClick={() => setMobileFilterOpen(true)}
        >
          FILTER
        </button>

        <div className="left-tools">
          <div className="custom-sort-wrapper" ref={sortRef}>
            <div
              className={`sort-header ${isSortOpen ? "open" : ""}`}
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              {currentSortLabel}
            </div>
            {isSortOpen && (
              <ul className="sort-list">
                {sortOptions.map((opt) => (
                  <li
                    key={opt.value}
                    className={sortOption === opt.value ? "selected" : ""}
                    onClick={() => {
                      setSortOption(opt.value);
                      setIsSortOpen(false);
                    }}
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="right-tools">
          <FiGrid
            className={viewMode === "grid" ? "active" : ""}
            onClick={() => setViewMode("grid")}
          />
          <FiList
            className={viewMode === "list" ? "active" : ""}
            onClick={() => setViewMode("list")}
          />
        </div>
      </div>

      <div
        className={`filter-overlay ${mobileFilterOpen ? "show" : ""}`}
        onClick={() => setMobileFilterOpen(false)}
      />

      <div className="main-layout">
        <aside className={`sidebar ${mobileFilterOpen ? "open" : ""}`}>
          <button
            className="close-filter"
            onClick={() => setMobileFilterOpen(false)}
          >
            ✕
          </button>

          {sidebarData.map((group) => (
            <div key={group.id} className="filter-group">
              <div
                className="filter-header"
                onClick={() =>
                  setOpenFilters((p) => ({
                    ...p,
                    [group.id]: !p[group.id],
                  }))
                }
              >
                <span>{group.title}</span>
                {openFilters[group.id] ? <FiMinus /> : <FiPlus />}
              </div>

              {openFilters[group.id] && (
                <div className="filter-content">
                  <ul>
                    {group.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </aside>

        <div className="content-area">
          {loading ? (
            <div className="loading-txt">Loading...</div>
          ) : (
            <div className={`product-grid ${viewMode}`}>
              {products.map((product) => (
                <div key={product._id} className="product-card">
                  <Link
                    to={`/product/${product._id}`}
                    className="image-wrapper"
                  >
                    <img src={getImageUrl(product.image)} alt={product.name} />
                    {product.isNew && <span className="new-badge">NEW</span>}
                  </Link>
                  <div className="info">
                    <div className="brand">{product.brand}</div>
                    <Link to={`/product/${product._id}`} className="name">
                      {product.name}
                    </Link>
                    <div className="price">£{product.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewInPage;
