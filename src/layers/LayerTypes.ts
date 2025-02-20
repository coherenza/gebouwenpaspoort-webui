export interface LayerI {
  name: string;
  id: string;
  visible: boolean;
  url?: string;
  type: "raster" | "fill" | "symbol";
  textField?: string;
  serviceId?: string;
}

export const bagLayerId = "points";
