<script>
  import { formatPrice } from "@/lib/utils";
  import { cart, clearCart, addToCart, removeFromCart } from "@/store";
  import { onMount } from "svelte";

  function handlePayment() {
    // Aquí puedes implementar la lógica para procesar el pago
    // Por ejemplo, enviar los datos al servidor para procesar el pago
    alert("¡Pago completado! Gracias por tu compra.");
    clearCart();
  }

  onMount(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      cart.set(JSON.parse(storedCart));
    }
  });

  $: total = $cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
</script>

<div class="flex flex-col md:flex-row items-start justify-center gap-8">
  <div class="w-full md:w-2/3">
    {#if $cart.length === 0}
      <p class="text-gray-600">El carrito está vacío.</p>
    {:else}
      <h3 class="text-lg font-semibold mt-6 mb-2">Productos en el carrito:</h3>
      <ul class="divide-y divide-gray-300">
        {#each $cart as product, index}
          <li value={index} class="flex items-center py-2 gap-10">
            <img
              src={`/tienda/${product.id}.png`}
              alt={`imagen del producto, ${product.name}`}
              class="h-20 w-20 object-cover rounded"
            />
            <span class="">
              <p class="text-lg font-semibold">{product.name}</p>
              <p class="text-primary font-semibold">{formatPrice(product.price)}</p>
            </span>
            <div class="flex gap-2">
              <span class="text-sm">cantidad: {product.quantity}</span>
              <button
                class="bg-gray-400 text-sm text-white rounded-full w-6 h-6 flex items-center justify-center"
                on:click={() => addToCart(product)}
              >
                +
              </button>

              <button
                class="bg-gray-400 text-sm text-white rounded-full w-6 h-6 flex items-center justify-center"
                on:click={() => removeFromCart(product.id)}
              >
                -
              </button>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <form on:submit={handlePayment} class="w-full md:w-1/3 flex flex-col gap-4">
    <h3 class="text-lg font-semibold mt-6 mb-2">
      Total a pagar: {formatPrice(total)}
    </h3>
    <label for="name">Nombre:</label>
    <input
      id="name"
      type="text"
      required
      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
    />
    <label for="adress">Dirección:</label>
    <input
      id="adress"
      type="text"
      required
      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
    />
    <label for="cardNumber">Número de tarjeta:</label>
    <input
      id="cardNumber"
      type="text"
      pattern="[0-9]{16}"
      title="Debe ser un número de tarjeta válido de 16 dígitos"
      required
      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
    />
    <label for="cardExpiration">Fecha de expiración (MM/YY):</label>
    <input
      id="cardExpiration"
      type="text"
      pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
      title="Formato MM/YY"
      required
      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
    />
    <label for="cardCVV">CVV:</label>
    <input
      id="cardCVV"
      type="text"
      pattern="[0-9]{3}"
      title="Debe ser un CVV válido de 3 dígitos"
      required
      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
    />
    <button
      type="submit"
      class="px-4 py-2 bg-primary text-white rounded-md shadow-m">Pagar</button
    >
  </form>
</div>
