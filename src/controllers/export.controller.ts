import { Request, Response } from "express";
import { TExportConfig } from "src/models/export-config.model";
import { exportTasksUseCase } from "src/use-cases/export-tasks.use-case";

export async function exportTasksController(req: Request, res: Response) {
  try {
    const { columns, groupBy, separateSheets } = req.query;

    // Converte as colunas e parâmetros de query string para objetos adequados
    const exportConfig: TExportConfig = {
      columns: columns
        ? (columns as string).split(",")
        : ["createdAt", "title", "completed"],
      groupBy: groupBy ? { key: "pdv.id", label: "pdv.name" } : undefined,
      title: "Relatorio de Tarefas Promotor X",
      separateSheets: separateSheets === "true",
    };

    await exportTasksUseCase(exportConfig);
    res
      .status(200)
      .send({ status: 200, message: "Arquivo exportado com sucesso!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: 500, message: "Erro ao exportar o arquivo." });
  }
}
