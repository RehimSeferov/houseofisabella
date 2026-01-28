import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

export interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  availability?: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: any) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void; 
  isInWishlist: (id: string) => boolean;
  wishlistCount: number; 
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlistItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product: any) => {
    setWishlistItems((prev) => {
      if (prev.find((item) => item._id === product._id)) return prev;
      const newItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        availability: product.availability,
      };
  
      return [...prev, newItem];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item._id !== id));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const isInWishlist = (id: string) => {
    return wishlistItems.some((item) => item._id === id);
  };


  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};
