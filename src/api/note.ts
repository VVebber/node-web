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
  const { data } = await api.get("/node");
  console.log(data, '--')
  return data;
}

export async function createNode(noteBlock: NoteBlock): Promise<NoteBlock> {
  const { data } = await api.get("/node/create", { params: noteBlock });
  return data;
}
