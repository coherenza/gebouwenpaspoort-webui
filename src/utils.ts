export enum types {
  verblijfsobject = 'verblijfsobject',
  buurt = 'buurt',
  onbekend = 'buurt',
}

export function getType(item: any): types {
  switch (item["bag-object-type"]) {
    case "verblijfsobject":
      return types.verblijfsobject;
    case "buurt":
      return types.buurt;
    default:
      return types.onbekend;
  }
}
