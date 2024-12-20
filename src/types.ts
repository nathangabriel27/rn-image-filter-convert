
export type DataType = 'base64' | 'path';
export type FilterTypes = 'blackAndWhite' | 'shadesGray' | 'default';

export type StatusReturn = {
  status: 'success' | 'mensage';
  message: string | null; // If status === 'success', message can be an empty string
}

export type FilterProps = {
  data: string; // achive base64
  filter: FilterTypes;
}

export interface FilterPropsResponse {
  uri: string | null; // achive base64
  filter: FilterTypes; // Filter select
  type: 'base64'; // Fix add DataType
  status: StatusReturn;
}
