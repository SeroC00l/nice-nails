<script>
  import { onMount } from "svelte";
  import { readable } from "svelte/store";

  let reservas = readable([]);

  onMount(async () => {
    const clientId = localStorage.getItem("clientId");
    const response = await fetch(`/api/reserva/3`);
    const data = await response.json();
    reservas = readable(
      data.map((reserva) => ({
        ...reserva,
        fecha: new Date(reserva.fecha).toLocaleDateString(),
      }))
    );
  });

  function getEstadoClass(estado) {
    switch (estado) {
      case "pendiente":
        return "border-2 border-yellow-400 bg-yellow-100";
      case "aprobada":
        return "border-2 border-green-400 bg-green-200";
      case "cancelada":
        return "border-2 border-orange-400 bg-orange-200";
      default:
        return "border-2 border-gray-300 bg-white";
    }
  }
</script>

<header class="w-full text-primary font-semibold text-3xl p-4 text-center">
  <h2 class="text-2xl font-">Mis Reservas</h2>
</header>

<div
  class="flex flex-wrap justify-center gap-8 cursor-pointer transition-colors w-4/5 mx-auto"
>
  {#each $reservas as reserva}
    <div class="{getEstadoClass(reserva.estado)} rounded-lg overflow-hidden">
      <div class="p-4">
        <p class="text-base font-semibold mb-2">{reserva.servicio}</p>
        <p class="text-sm text-gray-700 mb-2">Fecha: {reserva.fecha}</p>
        <p class="text-sm text-gray-700 mb-2">
          Manicurista: {reserva.manicurista}
        </p>
        <p class="text-sm text-gray-700 mb-2">Estado: {reserva.estado}</p>
      </div>
    </div>
  {/each}
</div>
