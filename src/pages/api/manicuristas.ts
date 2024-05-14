import type { APIRoute } from "astro";
import { db, eq, manicuristas } from "astro:db";

export const GET: APIRoute = async (req) => {
  try {
    const { id } = req.params;

    if (!id) {
      const allManicuristas = await db.select().from(manicuristas);

      return new Response(JSON.stringify(allManicuristas), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    
    const manicurista = await db
      .select()
      .from(manicuristas)
      .where(eq(manicuristas.id, parseInt(id)))

    if (!manicurista) {
      return new Response(
        JSON.stringify({ message: "Manicurista no encontrado" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    return new Response(JSON.stringify(manicurista), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al obtener el manicurista" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
