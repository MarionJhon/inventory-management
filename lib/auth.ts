import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

export const getCurrentUser = async () => {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return user
};
