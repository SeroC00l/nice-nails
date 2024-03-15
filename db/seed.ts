import { db, Product, Customer, Order } from 'astro:db';

export default async function seedDatabase() {
  await db.insert(Product).values([
    { name: 'Producto 1', description: 'Descripción del producto 1', price: 10 },
    { name: 'Producto 2', description: 'Descripción del producto 2', price: 20 },
  ]);

  await db.insert(Customer).values([
    { name: 'Cliente 1', email: 'cliente1@example.com', address: 'Dirección del cliente 1' },
    { name: 'Cliente 2', email: 'cliente2@example.com', address: 'Dirección del cliente 2' },
  ]);

  await db.insert(Order).values([
    { customerId: 1, productId: 1, quantity: 2, totalPrice: 20 },
    { customerId: 2, productId: 2, quantity: 1, totalPrice: 20 },
  ]);
}