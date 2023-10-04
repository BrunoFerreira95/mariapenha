import { env } from "process";

export async function fetchUserClaims(setUser) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    setUser(data);
  } catch (error) {
    console.error("Error fetching camera data:", error);
  }
}

export async function setUser(data, id) {
  try {
    const { telefone, full_name, rua, bairro, cidade, numero } = data; // Desestruturação dos parâmetros

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}api/users`; // URL da sua API

    // Define os dados a serem enviados no corpo da solicitação POST
    const postData = {
      id,
      full_name,
      telefone,
      rua,
      bairro,
      cidade,
      numero,
    }
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData), // Converte os dados em JSON e envia no corpo da solicitação POST
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
//