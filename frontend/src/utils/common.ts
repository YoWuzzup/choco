export const currentCurency: () => string = () => {
  return "zł";
};

export const getColorsByTaste = (tastes: string[]): (string | undefined)[] => {
  const colorsToMap: { [key: string]: string } = {
    vanilla: "#FFF8DC",
    chocolate: "brown",
    strawberry: "red",
    snickers: "#8B4513",
    nutella: "#8B4513",
    bounty: "#8FBC8F",
    cherry: "#DC143C",
    blueberry: "blue",
    caramel: "orange",
    lemon: "yellow",
    delicate: "#FFCCCC",
    decadent: "#800020",
    "red velvet": "#B22222",
    refreshing: "#7FFFD4",
  };

  const colors = tastes.map((taste) => colorsToMap[taste] || "white");

  return colors;
};

export const findObjectsById = (_id: string, arrayOfObjects: any[]) => {
  const obj: any = arrayOfObjects?.find((item: any) =>
    _id.includes(`${item._id}`)
  );

  return obj;
};
