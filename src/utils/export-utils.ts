import exceljs from "exceljs";
import lodash from "lodash";
import tasksColumnsFixture from "../data/task-columns";
import { TTaskColumn } from "../models/task.model";

const { get, pick } = lodash;
const LETTER_Z_CALCULATED_CHAR_CODE = 26;

// Função para montar as linhas agrupadas com base na configuração
export function mountRows(config: any, tasks: any[]) {
  const groupedTasks = tasks.reduce((acc, task) => {
    const groupKey = get(task, config.groupBy?.key ?? "", "");
    const groupIndex = acc.findIndex((group: any) => group.key === groupKey);

    if (groupIndex === -1) {
      acc.push({
        key: groupKey,
        label: get(task, config.groupBy?.label as string, ""),
        rows: [pick(task, config.columns)],
      });
      return acc;
    }

    acc[groupIndex].rows.push(pick(task, config.columns));
    return acc;
  }, [] as any[]);

  return groupedTasks;
}

// Função para criar os cabeçalhos da planilha
export function generateHeaders(columns: string[]): Partial<exceljs.Column>[] {
  const taskColumns = tasksColumnsFixture();
  const filteredColumns = taskColumns.filter((column: TTaskColumn) =>
    columns.includes(column.key)
  );

  return filteredColumns.map((column: TTaskColumn) => ({
    header: column.label,
    key: column.key,
    width: 20,
  }));
}

// Função para estilizar a fonte das colunas
export function styleFont(sheet: exceljs.Worksheet, range: number) {
  const font: Partial<exceljs.Font> = {
    bold: false,
    size: 10,
    color: { argb: "FF000000" },
    name: "Arial",
  };

  for (let i = 1; i <= range; i++) {
    sheet.getColumn(i).font = font;
  }
}

// Função para gerar o título principal da planilha
export function generateTitle(
  sheet: exceljs.Worksheet,
  title: string,
  range: number,
  row: number = 1
) {
  const endRange = _getRange(range);
  sheet.mergeCells(`A${row}:${endRange}${row}`);
  const cell = sheet.getCell(`A${row}`);
  cell.style = {
    font: {
      bold: true,
      size: 12,
    },
    alignment: {
      horizontal: "center",
    },
    fill: {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "FFCCCCCC",
      },
    },
  };
  cell.value = title;
}

// Função para obter a próxima linha da planilha
export function _getNextRow(sheet: exceljs.Worksheet): number {
  const lastRow = sheet.lastRow?.number ?? 0;
  return lastRow + 1;
}

// Função auxiliar para calcular o intervalo de colunas (A-Z, AA-ZZ)
function _getRange(range: number): string {
  if (range > LETTER_Z_CALCULATED_CHAR_CODE) {
    const rest = range % 26 || 1;
    const loops = Math.floor(range / 26);
    return _getRange(loops) + _getRange(rest);
  }
  return String.fromCharCode(96 + range).toUpperCase();
}

// Adicione isso ao final do arquivo export-utils.ts
export function generateSubTitle(
  sheet: exceljs.Worksheet,
  title: string,
  range: number,
  row: number
) {
  const endRange = _getRange(range);
  sheet.mergeCells(`A${row}:${endRange}${row}`);
  const cell = sheet.getCell(`A${row}`);
  cell.style = {
    font: {
      bold: true,
      size: 11,
    },
    alignment: {
      horizontal: "center",
    },
    fill: {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "FFDDDDDD",
      },
    },
  };
  cell.value = title;
}
