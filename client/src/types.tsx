export interface CategoryItem {
  categoryId: number;
  name: string;
}

export interface BookItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  image: string;
  categoryId: number;
}

export interface CartItem extends BookItem {
  quantity: number;
}

export interface CustomerForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpiryMonth: number;
  ccExpiryYear: number;
}

export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}

export interface OrderDetails {
  order: Order;
  customer: CustomerForm;
  books: BookItem[];
}

export interface ServerErrorResponse {
  reason: string;
  message: string;
  fieldName: string;
  error: boolean;
}

export interface BookItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  isPublic: boolean;
  categoryId:number;
}

export interface CategoryItem {
  categoryId: number;
  name: string;
}

export class ShoppingCartItem {
  id:number;
  book: BookItem;
  quantity: number;

  constructor(theBook: BookItem) {
    this.id = theBook.bookId;
    this.book = theBook;
    this.quantity = 1;
  }
}

export const initialCartState:ShoppingCartItem[] =  [];

export interface ContextProps {
  children: JSX.Element | JSX.Element[]
}

export interface CustomerForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpiryMonth: number;
  ccExpiryYear: number;
}

export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}

export interface OrderDetails {
  order: Order;
  customer: CustomerForm;
  books: BookItem[];
}

export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}

export interface LineItem {
  bookId: number;
  orderId: number;
  quantity: number;
}

export interface OrderDetails {
  order: Order;
  customer: CustomerForm;
  books: BookItem[];
  lineItems: LineItem[];
}
