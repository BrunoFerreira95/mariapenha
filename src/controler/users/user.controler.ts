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

export async function getLocation() {
  const apiUrl = `https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC_MfeXrxRalul5jY2oKFKRmOh9UGHfB3c`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        homeMobileCountryCode: 724,
        homeMobileNetworkCode: 410,
        radioType: 'gsm',
        carrier: 'Vodafone',
        considerIp: true,
        cellTowers: [], // Preencha com informações de torres de celular, se aplicável.
        wifiAccessPoints: [], // Preencha com informações de pontos de acesso Wi-Fi, se aplicável.
      }),
    });

    if (!response.ok) {
      throw new Error('Não foi possível obter a localização.');
    }

    const data = await response.json();
    const latitude = data.location.lat;
    const longitude = data.location.lng;

    return { latitude, longitude };
  } catch (error) {
    console.error('Erro ao obter localização:', error);
    throw error;
  }
}
