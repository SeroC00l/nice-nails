<script>
  import { addToCart } from "@/store";
  export let product;
</script>

<button
  class="bg-primary text-white py-2 px-4 rounded-lg mt-4 cursor-pointer"
  on:click={addToCart(product)}
>
  Añadir al Carrito
</button>
