import { NativeModules } from 'react-native';
import type { FilterProps, FilterPropsResponse } from './types';

export interface PackageFilterModule {
  FilterSimple: (data: FilterProps) => Promise<FilterPropsResponse>;
}

const { RnImageFilterConvert } = NativeModules;

export const FilterSimple = (data: FilterProps): Promise<FilterPropsResponse> => {
  return RnImageFilterConvert.FilterSimple(data);
};

export * from './types';
export default RnImageFilterConvert as PackageFilterModule;
