export type TExportConfig = {
  columns: string[];
  groupBy?: {
    key: string;
    label: string;
  };
  title: string;
  separateSheets?: boolean;
};
