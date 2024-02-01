import { fetchAPI } from "../utils/fetchAPI";

export async function fetchStudent() {
  const response = await fetchAPI(
    "/api/teacher/getAllStudents",
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const resData = await response.json();

  return resData;
}

export async function updateStudent({ StudentID, FullName, spec, gpa }) {
  const response = await fetchAPI(
    `/api/teacher/updateStudent`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        StudentID,
        FullName,
        spec,
        gpa,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const resData = await response.json();

  return resData;
}
