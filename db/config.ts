import { column, defineDb, defineTable } from "astro:db";

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
    categoryId: column.number({ references: () => Category.columns.id }),
  },
});

const Cliente = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text(),
    direccion: column.text(),
    telefono: column.text(),
  },
});

const Manicurista = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text(),
    telefono: column.text(),
  },
});

const Servicio = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text(),
    precio: column.number(),
    duracionMinutos: column.number(),
  },
});

const Reserva = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    clienteId: column.number({ references: () => Cliente.columns.id }),
    manicuristaId: column.number({ references: () => Manicurista.columns.id }),
    servicioId: column.number({ references: () => Servicio.columns.id }),
    fecha: column.date(),
    estado: column.text(), // Puede ser 'pendiente', 'aprobada', 'cancelada', etc.
  },
});

const db = defineDb({
  tables: {
    categories: Category,
    products: Product,
    clientes: Cliente,
    manicuristas: Manicurista,
    servicios: Servicio,
    reservas: Reserva,
  },
});

export default db;
