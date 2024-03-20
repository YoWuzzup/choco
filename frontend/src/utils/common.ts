export const currentCurency = (locale: string) => {
  const currencies: {
    readonly [key: string]: string;
  } = {
    en: "$",
    pl: "zł",
    ru: "zł",
  };

  return currencies[locale] || "zł";
};

export const getColorsByTaste = (tastes: string[]): (string | undefined)[] => {
  const colorsToMap: { [key: string]: string } = {
    vanilla: "#F3E5AB",
    chocolate: "brown",
    strawberry: "red",
    blueberry: "blue",
    caramel: "orange",
    lemon: "yellow",
  };

  const colors = tastes.map((taste) => colorsToMap[taste] || "white");

  return colors;
};

export const findObjectsById = (_id: string, arrayOfObjects: any[]) => {
  const obj: any = arrayOfObjects.find((item: any) =>
    _id.includes(`${item._id}`)
  );

  return obj;
};
