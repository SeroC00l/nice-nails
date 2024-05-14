import type { APIRoute } from "astro";
import { clientes, db, eq, reservas } from "astro:db";

export const GET: APIRoute = async () => {
  try {
    const allReservas = await db.select().from(reservas);
    return new Response(JSON.stringify(allReservas));
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al obtener las reservas" }),
      { status: 500 }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  const { name, address, telephone, serviceId, manicuristaId, date } =
    await request.json();

  console.log({ name, address, telephone, serviceId, manicuristaId, date });

  try {
    let clientId;
    const existingClient = await db
      .select()
      .from(clientes)
      .where(eq(clientes.telefono, telephone));

    if (existingClient.length > 0) {
      clientId = existingClient[0].id;
    } else {
      const newClient = await db.insert(clientes).values({
        nombre: name,
        direccion: address,
        telefono: telephone,
      });
      clientId = newClient.lastInsertRowid;
    }

    await db.insert(reservas).values({
      clienteId: clientId,
      manicuristaId,
      servicioId: serviceId,
      fecha: new Date(date),
      estado: "pendiente",
    });

    return new Response(JSON.stringify(clientId));
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "No se pudo crear la reserva", message: error }),
      { status: 500 }
    );
  }
};

// Ruta para actualizar una reserva por ID
export const PUT: APIRoute = async ({ request, params }) => {
  const { id } = params;
  const { clienteId, manicuristaId, servicioId, fecha, estado } =
    await request.json();

  try {
    const reserva = await db.update(reservas).set({
      id: parseInt(id),
      clienteId,
      manicuristaId,
      servicioId,
      fecha,
      estado,
    });
    return new Response(JSON.stringify(reserva));
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al actualizar la reserva" }),
      { status: 500 }
    );
  }
};

// Ruta para eliminar una reserva por ID
export const DELETE: APIRoute = async ({ params }) => {
  let { id } = params;
  const newid = parseInt(id);

  try {
    await db.delete(reservas);
    return new Response(JSON.stringify({ message: "Reserva eliminada" }));
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al eliminar la reserva" }),
      { status: 500 }
    );
  }
};
