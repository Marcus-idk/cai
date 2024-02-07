import { fetchAPI } from "../utils/fetchAPI";

export async function fetchITP() {
  const response = await fetchAPI("/api/teacher/getAllITP");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const resData = await response.json();

  return resData;
}

export async function fetchTeachers() {
  const response = await fetchAPI("/api/teacher/getDistinctTeachers");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const resData = await response.json();

  return resData;
}

export async function postITP({
  company,
  role,
  teacher,
  specialisation,
  startDate,
  endDate,
  slots,
  description,
  citizenship,
}) {
  const response = await fetchAPI("/api/teacher/addITP", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      company,
      role,
      teacher,
      specialisation,
      startDate,
      endDate,
      slots,
      description,
      citizenship,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const resData = await response.json();

  return resData;
}

export async function updateITP({
  id,
  company,
  role,
  teacher,
  specialisation,
  startDate,
  endDate,
  slots,
  description,
  citizenship,
}) {
  const response = await fetchAPI(`/api/teacher/updateITP/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      company,
      role,
      teacher,
      specialisation,
      startDate,
      endDate,
      slots,
      description,
      citizenship,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const resData = await response.json();

  return resData;
}

export async function deleteITP(id) {
  const response = await fetchAPI(`/api/teacher/itp/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const resData = await response.json();

  return resData;
}
export async function fetchITPSummary() {
  const response = await fetchAPI("/api/teacher/AllITPSummary");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const resData = await response.json();

  return resData;
}

export async function fetchAvaliableITPs() {
  const response = await fetchAPI("/api/teacher/AvaliableITPs");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const resData = await response.json();

  return resData;
}

export async function updateITPSummary(studentID, oldID, newID) {
  const response = await fetchAPI(`/api/teacher/${studentID}/EditAssign`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      oldID,
      newID,
    }),
  });

  if (!response.ok) {
    const errMsg = await response.text();
    throw new Error(`Error updating ITP Summary: ${errMsg}`);
  }
  const resData = await response.json();

  return resData;
}
