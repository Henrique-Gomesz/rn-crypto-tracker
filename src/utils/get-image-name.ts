import { isEqual } from "lodash";
import Images from "src/assets/images/images.json";
import { Image } from "src/entities/image";

export function getImageUrlBySymbol(name: string): string | undefined {
  const image = Images.find((image) => isEqual(image.symbol, name)) as
    | Image
    | undefined;

  return image?.icon;
}
