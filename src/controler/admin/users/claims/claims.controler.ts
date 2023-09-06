export async function alterClaims(id, handleClaim) {
  const dynamicData = await fetch(
    `https://mariapenha.vercel.app/api/admin/users/claims?id=${id}&handleClaim=${handleClaim}`,
    { method: "POST" }
  );
}

