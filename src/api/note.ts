import { api } from "../boot/api";

export interface NoteBlock {
  type?: string;

  id?: number;
  title: string;
  description: string;

  updated_at?: string;
  created_at?: string;
}

export async function fetchNode() : Promise<NoteBlock[]>{
  const { data } = await api.get("/nodes");
  return data;
}

export async function createNode(noteBlock: NoteBlock): Promise<NoteBlock> {
  const { data } = await api.get("/nodes/create", { params: noteBlock });
  return data;
}

export async function updateNode(noteBlock: NoteBlock) {
  const { data } = await api.put("/nodes/update", noteBlock);
  console.log(data, '--')
  return data;
}


export async function deleteNode(noteBlockId: number) {
  const { data } = await api.delete(`/nodes/${noteBlockId}`);
  console.log(data, '--')
  return data;
}