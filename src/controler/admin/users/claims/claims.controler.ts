export async function alterClaims(id, handleClaim) {
  const dynamicData = await fetch(
    `http://localhost:3000/api/admin/users/claims?id=${id}&handleClaim=${handleClaim}`,
    { method: "POST" }
  );
}

