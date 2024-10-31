// src/models/task.model.ts

export type TTask = {
  id: number;
  title: string;
  description: string;
  promoterId: string;
  completed: boolean;
  dueDate: string;
  createdAt: string;
  pdv: {
    id: string;
    name: string;
    address: string;
  };
};

export type TTaskColumn = {
  label: string;
  key: string;
};
