import lodash from 'lodash'
import { TExportConfig } from "src/types/export-config"
import { TGroupedTasks, TTask, TTaskColumn } from "src/types/tasks"
import tasksColumnsFixture from '../data/task-columns'
import exceljs from 'exceljs'
const taskColumns = tasksColumnsFixture()
const { get, pick } = lodash
const LETTER_Z_CALCULATED_CHAR_CODE = 26
export function mountRows(config: TExportConfig, tasks: TTask[]) {
  const groupedTasks: TGroupedTasks[] = tasks.reduce((acc, task) => {
    const groupKey = get(task, config.groupBy?.key ?? '', '')

    const groupIndex = acc.findIndex((group: TGroupedTasks) => group.key === groupKey)

    if (!acc[groupIndex]) {
      acc.push({
        key: groupKey,
        label: get(task, config.groupBy?.label as string, ''),
        rows: [pick(task, config.columns)]
      })
      return acc
    }

    acc[groupIndex].rows.push(pick(task, config.columns))
    return acc
  }, [] as TGroupedTasks[])

  return groupedTasks
}


export function mountHeaders(columns: string[]): Partial<exceljs.Column>[] {
  const filteredColumns = taskColumns.filter((column: any) => columns.includes(column.key))
  return filteredColumns.map((column: TTaskColumn) => {
    return {
      header: column.label,
      key: column.key,
      width: 20
    }
  })
}


export function generateTitle(sheet: exceljs.Worksheet, title: string, range: number, row: number = 1) {
  const endRange = _getRange(range)
  sheet.mergeCells(`A${row}:${endRange}${row}`)
  const cell = sheet.getCell(`A${row}`)
  cell.style = {
    font: {
      ...cell.font,
      bold: true,
      size: 12,

    },
    alignment: {
      ...cell.alignment,
      horizontal: 'center'
    },
    fill: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {
        argb: 'FFCCCCCC'
      }
    }
  }
  cell.value = title
}

export function generateSubTitle(sheet: exceljs.Worksheet, title: string, range: number, row: number) {
  const endRange = _getRange(range)
  sheet.mergeCells(`A${row}:${endRange}${row}`)
  const cell = sheet.getCell(`A${row}`)
  cell.style = {
    font: {
      ...cell.font,
      bold: true,
      size: 11,

    },
    alignment: {
      ...cell.alignment,
      horizontal: 'center'
    },
    fill: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {
        argb: 'FFDDDDDD'
      }
    }
  }
  cell.value = title
}

export function generateHeaders(sheet: exceljs.Worksheet, headers: Partial<exceljs.Column>[], row: number) {
  const sheetRow = sheet.getRow(row)

  sheetRow.values = headers.map((header: Partial<exceljs.Column>) => header.header) as string[]
  sheetRow.alignment = { horizontal: 'center' }
  sheetRow.eachCell({ includeEmpty: false }, (cell) => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEEEEEE' } }
    cell.font = { ...cell.font, bold: true, size: 10 }
  })
}

export function _getNextRow(sheet: exceljs.Worksheet): number {
  const lastRow = sheet.lastRow?.number ?? 0
  return lastRow + 1
}

export function styleFont(sheet: exceljs.Worksheet, range: number) {
  const font: Partial<exceljs.Font> = {
    bold: false,
    size: 10,
    color: { argb: 'FF000000' },
    name: 'Arial'
  }
  for (let i = 1; i <= range; i++) {
    sheet.getColumn(i).font = font
  }
}

function _getRange(range: number): string {
  if (range > LETTER_Z_CALCULATED_CHAR_CODE) {
    const rest = range % 26 || 1
    const loops = Math.floor(range / 26)
    return _getRange(loops) + _getRange(rest)
  }
  return (String.fromCharCode(96 + range)).toUpperCase()
}

