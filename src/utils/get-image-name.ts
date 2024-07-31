import { isEqual } from "lodash";
import Images from "src/assets/images/images.json";
import { Image } from "src/entities/image";

export function getImageUrlByName(name: string) {
  const image = Images.find((image) => isEqual(image.name, name)) as
    | Image
    | undefined;

  return image ? image.icon : "";
}
