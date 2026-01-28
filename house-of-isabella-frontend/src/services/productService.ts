
const API_URL = "http://localhost:5000/api";
const UPLOADS_URL = "http://localhost:5000/uploads/"; 


export interface FilterParams {
  brands?: string[];
  categories?: string[];
  colors?: string[];
  priceRange?: string[];
  availability?: string[];
  sort?: string;
  page?: number;
  limit?: number;

  sizes?: string[];
  tags?: string[];
}

export interface Product {
  _id: string; 
  name: string;
  brand: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
}

export const fetchProducts = async (params: FilterParams) => {
  try {
    const query = new URLSearchParams();

    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());

    if (params.sort) query.append("sort", params.sort);

    // ?. (optional chaining) istifadə edirik ki, undefined olsa length-ə baxmasın

    if (params.brands && params.brands.length > 0) {
      query.append("brand", params.brands.join(","));
    }

    if (params.categories && params.categories.length > 0) {
      query.append("category", params.categories.join(","));
    }


    if (params.colors && params.colors.length > 0) {
      query.append("color", params.colors.join(","));
    }


    const response = await fetch(`${API_URL}/products?${query.toString()}`);

    if (!response.ok) {
      throw new Error("Məhsulları gətirmək mümkün olmadı");
    }

    const data = await response.json();

    return {
      data: data.products || [],
      total: data.total || 0,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { data: [], total: 0 };
  }
};


export const fetchProductById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error("Məhsul tapılmadı");
    }

    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};


export const getImageUrl = (imagePath: string) => {
  if (!imagePath) return "https://via.placeholder.com/300";
  if (imagePath.startsWith("http")) return imagePath; 
  return `${UPLOADS_URL}${imagePath}`; 
};
