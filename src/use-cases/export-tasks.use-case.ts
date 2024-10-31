import exceljs from "exceljs";
import { getTasks } from "../repositories/task.repository";
import { TExportConfig } from "../models/export-config.model";
import {
  generateHeaders,
  mountRows,
  styleFont,
  _getNextRow,
  generateTitle,
} from "../utils/export-utils";

export async function exportTasksUseCase(config: TExportConfig) {
  const tasks = getTasks();
  const workbook = new exceljs.Workbook();

  if (config.separateSheets) {
    // Cria uma planilha para cada PDV
    const groupedTasks = mountRows(config, tasks);
    groupedTasks.forEach(
      (group: { label: string | undefined; rows: any[] }) => {
        const sheet = workbook.addWorksheet(group.label);
        createSheetContent(sheet, config, group.rows);
      }
    );
  } else {
    // Cria uma única planilha
    const sheet = workbook.addWorksheet("Relatório de Tarefas");
    createSheetContent(sheet, config, tasks);
  }

  const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
  const filename = `RelatorioVendas_${timestamp}.xlsx`;
  await workbook.xlsx.writeFile(filename);
  console.log("Arquivo RelatorioVendas.xlsx criado com sucesso!");
}

function createSheetContent(
  sheet: exceljs.Worksheet,
  config: TExportConfig,
  rows: any[]
) {
  const headers = generateHeaders(config.columns);
  sheet.columns = headers;
  styleFont(sheet, headers.length);
  generateTitle(sheet, config.title, headers.length);

  // Adiciona a linha de cabeçalhos
  let nextRow = _getNextRow(sheet);
  const headerRow = sheet.getRow(nextRow);
  headerRow.values = headers.map((header) => header.header) as string[];
  headerRow.alignment = { horizontal: "center" };
  headerRow.eachCell({ includeEmpty: false }, (cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFEEEEEE" },
    };
    cell.font = { bold: true, size: 10 };
  });

  // Adiciona as linhas de dados
  rows.forEach((row) => {
    sheet.addRow(row);
  });
}
