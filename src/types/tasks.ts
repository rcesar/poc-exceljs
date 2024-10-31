export type TGroupedTasks = {
  key: string;
  label: string;
  rows: Partial<TTask>[];
}

export type TTaskColumn = {
  label: string;
  key: string;
}


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
