const BACKEND_IP = "http://localhost:5000";
// const BACKEND_IP = "http://ec2-18-208-234-122.compute-1.amazonaws.com:5000";

export async function fetchAPI(URL, body) {
  return await fetch(BACKEND_IP + URL, body);
}

export function getResumeLink(studentID) {
  return BACKEND_IP + "/uploads/" + studentID;
}
