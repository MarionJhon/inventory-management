'use server'

import { getCurrentUser } from "../auth";
import prisma from "../prisma";

export const deleteProduct = async (formdata: FormData) => {
  const user = await getCurrentUser();
  const id = String(formdata.get("id") || "");

  await prisma.product.deleteMany({
    where: { id: id, userId: user.id },
  });
};
