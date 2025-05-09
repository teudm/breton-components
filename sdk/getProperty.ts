import { PropertyValue } from "apps/commerce/types.ts";

export function getPropertyValue(properties: PropertyValue[], propertyName: string) {
  return properties.find(item => item.name === propertyName)?.value;
}
