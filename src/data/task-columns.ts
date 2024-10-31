import { TTaskColumn } from "src/models/task.model";

export default (): TTaskColumn[] => [
  {
    label: "ID",
    key: "id",
  },
  {
    label: "Título",
    key: "title",
  },
  {
    label: "Descrição",
    key: "description",
  },
  {
    label: "Promotor",
    key: "promoterId",
  },
  {
    label: "Concluído",
    key: "completed",
  },
  {
    label: "Data de Vencimento",
    key: "dueDate",
  },
  {
    label: "Criado em",
    key: "createdAt",
  },
  {
    label: "PDV",
    key: "pdv.name",
  },
  {
    label: "Endereço",
    key: "pdv.address",
  },
];
