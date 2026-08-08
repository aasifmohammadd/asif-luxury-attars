import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ICartItem, BottleSize } from '@/types';

export type CurrencyType = 'INR' | 'USD' | 'AED' | 'EUR';

interface CurrencyDetails {
  symbol: string;
  rateFromINR: number;
  decimals: number;
}

export const exchangeRates: Record<CurrencyType, CurrencyDetails> = {
  INR: { symbol: '₹', rateFromINR: 1, decimals: 0 },
  USD: { symbol: '$', rateFromINR: 0.012, decimals: 2 },
  AED: { symbol: 'AED ', rateFromINR: 0.044, decimals: 2 },
  EUR: { symbol: '€', rateFromINR: 0.011, decimals: 2 },
};

interface CartState {
  items: ICartItem[];
  isOpen: boolean;
  currency: CurrencyType;
  addItem: (item: ICartItem) => void;
  removeItem: (productId: string, size: BottleSize) => void;
  updateQuantity: (productId: string, size: BottleSize, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCurrency: (currency: CurrencyType) => void;
  getCartTotalINR: () => number;
  getCartTotalConverted: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      currency: 'INR',

      addItem: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.productId === newItem.productId && i.size === newItem.size
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += newItem.quantity;
            return { items: updatedItems, isOpen: true };
          }

          return { items: [...state.items, newItem], isOpen: true };
        });
      },

      removeItem: (productId, size) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.productId === productId && i.size === size)),
        }));
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.size === size ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setCurrency: (currency) => set({ currency }),

      getCartTotalINR: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getCartTotalConverted: () => {
        const totalINR = get().getCartTotalINR();
        const activeCurrency = get().currency;
        const rate = exchangeRates[activeCurrency]?.rateFromINR || 1;
        return totalINR * rate;
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'asif-luxury-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, currency: state.currency }),
    }
  )
);