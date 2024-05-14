import { db, servicios } from "astro:db";

export async function GET(req) {
  try {
    const { id } = req.params;
    if (!id) {
      const allServices = await db.select().from(servicios);

      return new Response(JSON.stringify(allServices), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const servicio = await db
      .select()
      .from(servicios)
      .where(id)

    if (!servicio) {
      return new Response(
        JSON.stringify({ message: "Servicio no encontrado" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(JSON.stringify(servicio), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al obtener el servicio" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
