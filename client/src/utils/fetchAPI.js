const BACKEND_IP = "http://localhost:5000";
// const BACKEND_IP = "http://3.91.96.90:5000";

export async function fetchAPI(URL, body) {
  return await fetch(BACKEND_IP + URL, body);
}