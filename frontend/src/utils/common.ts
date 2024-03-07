export const currentCurency = (locale: string) => {
  const currencies: {
    readonly [key: string]: string;
  } = {
    en: "$",
    pl: "zł",
    ru: "zł",
  };

  return currencies[locale];
};
