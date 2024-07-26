import { NativeModules } from 'react-native';
import type { FilterProps, FilterPropsResponse } from './NativePackageFilter';

export interface PackageFilterModule {
  FilterSimple: (data: FilterProps) => Promise<FilterPropsResponse>;
}

const { RnImageFilterConvert } = NativeModules;

export const FilterSimple = (data: FilterProps): Promise<FilterPropsResponse> => {
  return RnImageFilterConvert.FilterSimple(data);
};

export default RnImageFilterConvert as PackageFilterModule;
