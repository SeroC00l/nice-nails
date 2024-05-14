import type { APIRoute } from "astro";
import { db, eq, manicuristas, reservas, servicios } from "astro:db";

export const GET: APIRoute = async ({ params }) => {
  try {
    const clientId = typeof params?.clientId === 'string' ? params.clientId : '';
    const allUserReservas = await db
      .select()
      .from(reservas)
      .where(eq(reservas.clienteId, parseInt(clientId)));

    const userReserves = await Promise.all(allUserReservas.map(async (reserva) => {
      const [servicio] = await db
        .select({ nombre: servicios.nombre })
        .from(servicios)
        .where(eq(servicios.id, reserva.servicioId));

      const [manicurista] = await db
        .select({ nombre: manicuristas.nombre })
        .from(manicuristas)
        .where(eq(manicuristas.id, reserva.manicuristaId));

      const updatedReserva = {
        ...reserva,
        servicio: servicio ? servicio.nombre : "Servicio no encontrado",
        manicurista: manicurista ? manicurista.nombre : "Manicurista no encontrado",
      };

      return updatedReserva;
    }));
    return new Response(JSON.stringify(userReserves));
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al obtener las reservas" }),
      { status: 500 }
    );
  }
};
