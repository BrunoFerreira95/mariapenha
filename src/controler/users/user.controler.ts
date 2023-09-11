export async function fetchUserClaims(setUser) {
  try {
    const response = await fetch(`http://localhost:3000/api/user`);

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
    const { nome, tel } = data; // Desestruturação dos parâmetros

    const apiUrl = 'http://localhost:3000/api/users'; // URL da sua API

    // Define os dados a serem enviados no corpo da solicitação POST
    const postData = {
      nome: nome,
      tel: tel,
      id
    };

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
