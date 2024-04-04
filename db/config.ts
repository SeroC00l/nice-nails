import { column, defineDb, defineTable } from 'astro:db';

// Define la tabla de categorías
const Category = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
  },
});

// Define la tabla de productos
const Product = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    price: column.number(),
    description: column.text(),
    link: column.text(),
    categoryId: column.number({ references: () => Category.columns.id } ), 
  },
});

const db = defineDb({
  tables: {
    categories: Category,
    products: Product,
  },
});

export default db;
