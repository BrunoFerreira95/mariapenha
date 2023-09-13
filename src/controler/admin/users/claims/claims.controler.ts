import { env } from "process";

export async function alterClaims(id, handleClaim) {
  const dynamicData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/admin/users/claims?id=${id}&handleClaim=${handleClaim}`,
    { method: "POST" }
  );
}

