export interface ColumnData {
  unique_values?: number;
  most_common?: string;
  value_counts?: Record<string, number> | string | number;
  top_n_values?: Record<string, number> | string | number;
  missing_values: number;
  unique_count: number;
  average?: number;
  min?: number;
  max?: number;
  std_dev?: number;
}

export type ResponseData = Record<string, ColumnData>;
