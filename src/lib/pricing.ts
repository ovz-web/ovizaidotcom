export const MASTERCLASS_PRICE = { USD: 500, EUR: 460, CAD: 680 } as const;
export const MASTERCLASS_ORIGINAL_PRICE = { USD: 990, EUR: 900, CAD: 1300 } as const;
export type PricingCurrency = keyof typeof MASTERCLASS_PRICE;
