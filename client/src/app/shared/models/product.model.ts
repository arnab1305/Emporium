export interface Products {
  count: number;
  products: Product[];
}

export interface Product {
  shop_id:Number,
  id: Number;
  title: String;
  category: String;
  short_desc: String;
  image: String;
  price: Number;
  quantity: Number;
  images: String;
}
