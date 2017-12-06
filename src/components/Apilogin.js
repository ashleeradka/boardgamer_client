const API_ROOT = `https://api-boardgamer.herokuapp.com/api/v1`;
const token = localStorage.getItem("token");

const baseUrl = "https://api-boardgamer.herokuapp.com/api/v1";

function currentUser() {
  return fetch(`${baseUrl}/current_user`, {
    headers: headers()
  }).then(res => res.json());
}

function headers() {
  return {
    "content-type": "application/json",
    accept: "application/json",
    Authorization: localStorage.getItem("jwt")
  };
}

login(loginParams) {
    return fetch(`${baseUrl}/auth`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json());
  }
};
