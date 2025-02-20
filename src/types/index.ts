export interface LayerI {
  /** Visible in front-end */
  name: string;
  /** PDOK ID, e.g. cbs_buurten_2021 */
  id: string;
  visible: boolean;
  /** Optionally overwrite URL */
  url?: string;
  type: "raster" | "fill" | "symbol";
  /** Which property is used to draw the text. Only for "symbol" types */
  textField?: string;
  serviceId?: string;
}
