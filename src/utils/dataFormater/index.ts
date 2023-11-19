export const showFormattedDate = (date: string) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  return formattedDate;
};

export const showFormattedNumber = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};
