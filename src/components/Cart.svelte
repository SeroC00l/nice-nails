<script>
  import { formatPrice } from "@/lib/utils";
  import { onMount } from "svelte";
  import { cart, clearCart, removeFromCart, addToCart } from "@/store";

  let showCart = false;

  // Use onMount to load cart from localStorage
  onMount(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      cart.set(JSON.parse(storedCart));
    }
  });

  $: total = $cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  $: $cart.length > 0 ? (showCart = true) : (showCart = false);
</script>

<button
  class={`cursor-pointer ${$cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
  aria-label="Abrir carrito"
  on:click={() => (showCart = !showCart)}
>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path
      d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
    />
  </svg>
</button>

{#if showCart}
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div class="w-[400px] bg-white rounded-lg shadow-lg relative p-6">
      <h3 class="mb-4 text-xl font-bold">Carrito de Compras</h3>
      <div class="absolute top-0 right-0 p-3">
        <button
          class="text-gray-500 hover:text-gray-800"
          on:click={() => (showCart = false)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-x"
            ><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
          >
        </button>
      </div>
      {#if $cart.length === 0}
        <p class="mb-4 text-gray-800">El carrito está vacío.</p>
      {:else}
        <ul class="mb-4">
          {#each $cart as product, index}
            <li
              value={index}
              class="flex justify-between items-center border-b border-gray-300 py-2"
            >
              <div class="flex">
                <img
                  src={`/tienda/${product.id}.png`}
                  class="h-20 aspect-square"
                  alt={`imagen del producto ${product.name}`}
                />
                <span class="text-gray-700 text-base text-wrap"
                  >{product.name}</span
                >
              </div>
              <div class="flex flex-col items-center gap-2">
                <h4 class="text-base">Precio</h4>
                <span class="text-gray-700 text-sm"
                  >{formatPrice(product.price)}</span
                >
                <div class="flex">
                  <button
                    class="bg-gray-400 text-sm text-white rounded-full w-6 h-6 flex items-center justify-center mr-2"
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
                <span class="text-sm">cantidad: {product.quantity}</span>
              </div>
            </li>
          {/each}
        </ul>
        <p class="mb-4">
          Subtotal: <span class="font-semibold">{formatPrice(total)}</span>
        </p>
        <a
          class="bg-primary text-base mb-4 text-white py-2 px-4 rounded-lg"
          href="/tienda/checkout"
        >
          Proceder al pago
        </a>
        <button
          class="bg-primary text-base text-white py-2 px-4 rounded-lg"
          on:click={clearCart}>Vaciar Carrito</button
        >
      {/if}
    </div>
  </div>
{/if}
