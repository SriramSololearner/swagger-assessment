export interface Props {
  Item: {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    weight: string;
    categoryImage: string;
    categoryName: string;
    productImage: string[];
    discount: number;
    description?: string | null;
    productCreatedAt: string;
    active: boolean;
  };
}

export interface navData {
  name: {
    id: number;
    name: string;
  };
}

export interface Istate {
  data: {
    id: number;
    img: string;
    Name: string;
    Address: string;
    Date: string;
    Time: string;
    Payment: string;
    Amount: string;
    Status: string;
    active: boolean;
    Actions: { Edit: string; Delete: string };
  };
}

export interface products {
  productsList: {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    weight: string;
    categoryImage: string;
    categoryName: string;
    productImage: string[];
    discount: number | null;
    description: string | null;
    productCreatedAt: string;
    active: boolean;
  }[];
  isLoading: boolean;
  status: string;
  categoryList: {
    categoryId: number;
    categoryName: string;
  }[];
  sellerProductMesage: string;
}
