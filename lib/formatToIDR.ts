import { object } from "yup";

export const formatToIDR = (amount: number) => {
  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "IDR",
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  };
  const formatter = new Intl.NumberFormat("id-ID", options);
  return formatter.format(amount);
};
