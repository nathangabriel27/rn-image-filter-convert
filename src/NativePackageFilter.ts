
export type DataType = 'base64' | 'path';
export type FilterTypes = 'blackAndWhite' | 'shadesGray';

export type StatusReturn = {
    status: 'success' | 'mensage';
    mensage: string; // if === success return ''
}

export type FilterProps = {
  data: string; // achive base64
  filter: FilterTypes;
}

export interface FilterPropsResponse {
  uri: string | null; // achive base64
  filter: FilterTypes; // Filter select
  type: 'base64'; // Fix
  status: StatusReturn;
}
