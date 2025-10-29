import API from "../../Data";

export const getNotes = async () => {
  const res = await API.get("notes/");
  return res.data;
};

export const createNote = async (note: { title: string; content: string }) => {
  const res = await API.post("notes/", note);
  return res.data;
};

export const updateNote = async (
  id: number,
  note: { title: string; content: string }
) => {
  const res = await API.patch(`notes/${id}/`, note);
  return res.data;
};

export const deleteNote = async (id: number) => {
  const res = await API.delete(`notes/${id}/`);
  return res.data;
};