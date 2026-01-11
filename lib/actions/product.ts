"use server";

import { z } from "zod";
import { getCurrentUser } from "../auth";
import prisma from "../prisma";
import { redirect } from "next/navigation";

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce.number().int().min(0, "Quantity must be non-negative"),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).optional(),
});

export const deleteProduct = async (formdata: FormData) => {
  const user = await getCurrentUser();
  const id = String(formdata.get("id") || "");

  await prisma.product.deleteMany({
    where: { id: id, userId: user.id },
  });
};

export const createProduct = async (formdata: FormData) => {
  const user = await getCurrentUser();

  const parsed = ProductSchema.safeParse({
    name: formdata.get("name"),
    price: formdata.get("price"),
    quantity: formdata.get("quantity"),
    sku: formdata.get("sku") || undefined,
    lowStockAt: formdata.get("lowStockAt") || undefined,
  });

  if (!parsed.success) {
    throw new Error("Validation failed!");
  }

  try {
    await prisma.product.create({
      data: { ...parsed.data, userId: user.id },
    });
  } catch (error) {
    throw new Error(`Failed to create product`);
  }

  redirect("/inventory");
};
