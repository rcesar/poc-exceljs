import exceljs from 'exceljs'
import configFixture from './data/export-config'
import tasksFixture from './data/tasks'
import { TExportConfig } from './types/export-config'
import { TGroupedTasks, TTask } from './types/tasks'
import {
  _getNextRow,
  generateHeaders,
  generateSubTitle,
  generateTitle,
  mountHeaders,
  mountRows,
  styleFont
} from './utils/export'
const { Workbook } = exceljs

async function createExcelFile(config: TExportConfig, tasks: TTask[]) {
  const workbook = new Workbook()

  const sheet = workbook.addWorksheet('Relatório de Vendas')

  const gropedRows: TGroupedTasks[] = mountRows(config, tasks)
  const headers: Partial<exceljs.Column>[] = mountHeaders(config.columns)

  sheet.columns = headers

  styleFont(sheet, headers.length)

  generateTitle(sheet, config.title, headers.length)

  gropedRows.forEach((group: TGroupedTasks) => {
    let nextRow = _getNextRow(sheet)

    if (group.key && group.label) {
      generateSubTitle(sheet, group.label, headers.length, nextRow)
      nextRow = _getNextRow(sheet)
    }

    generateHeaders(sheet, headers, nextRow)

    group.rows.forEach((row) => sheet.addRow(row))
  })

  await workbook.xlsx.writeFile('RelatorioVendas.xlsx')
  console.log('Arquivo RelatorioVendas.xlsx criado com sucesso!')
}

const config = configFixture()
const tasks = tasksFixture()
createExcelFile(config, tasks)
