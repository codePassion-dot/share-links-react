"use server";

export async function addItem(data) {
  const cartId = cookies().get("cartId")?.value;
  await saveToDb({ cartId, data });
}
