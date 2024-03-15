import { defineDb, defineTable, column } from 'astro:db';

const Product = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    description: column.text(),
    price: column.number(),
  }
});

const Customer = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    email: column.text(),
    address: column.text(),
  }
});

const Order = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    customerId: column.number({ references: () => Customer.columns.id }),
    productId: column.number({ references: () => Product.columns.id }),
    quantity: column.number(),
    totalPrice: column.number(),
  }
});

export default defineDb({
  tables: { Product, Customer, Order },
});
