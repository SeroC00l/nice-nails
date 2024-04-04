import { db, products, categories } from "astro:db";
import { products as data } from "@/consts/products";



export default async function () {
  await db.insert(categories).values([{id:1, name:"mary kay"}])
  for (const product of data) {
    console.log(product);
    
    await db.insert(products).values([product]);
  }
}
