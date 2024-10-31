export default () => ({
  columns: ["createdAt", "title", "completed"],
  groupBy: {
    key: "pdv.id",
    label: "pdv.name",
  },
  title: "Relatorio de Tarefas Promotor X",
});
