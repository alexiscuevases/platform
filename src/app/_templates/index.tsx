import { Index_Default, Product_Default } from "./Default";

interface Props {
  template: string;
  page: string;
  data: any;
}

export function UseTemplate({ template, page, data }: Props) {
  if (template === "Default") {
    if (page === "Index") return <Index_Default data={data} />;
    if (page === "Product") return <Product_Default data={data} />;
  }
  return <>404</>;
}
