# rn-image-filter-convert

`rn-image-filter-convert` is a React Native module that allows you to apply image filters directly on Android and iOS devices. This package provides functionalities to convert images to black and white and grayscale using native code for optimal performance. It is ideal for developers who want to integrate efficient image filters into their React Native mobile applications.

## Features

- **Black and White Filter:** Converts images to black and white using a smooth algorithm.
- **Grayscale Filter:** Applies a grayscale filter to convert images.
- **Multi-Platform Support:** Works on both Android and iOS.
- **Easy to Use:** Simple interface with TypeScript support for seamless integration into React Native projects.

## Installation

```sh
yarn add rn-image-filter-convert
```
&&
```sh
npx react-native start --reset-cache
```

## Usage Basic Import and Use

```typescript
import { FilterSimple, FilterProps, FilterPropsResponse } from 'rn-image-filter-convert';

const applyFilter = async () => {
  const base64Image = 'data:image/jpeg;base64,...'; // Your base64 string here
  const filterProps: FilterProps = { data: base64Image, filter: 'blackAndWhite' };

  try {
    const response: FilterPropsResponse = await FilterSimple(filterProps);
    if (response.status.status === 'success') {
      console.log(response.uri); // Filtered image base64
    } else {
      console.error(response.status.message);
    }
  } catch (error) {
    console.error(error);
  }
};
```

## TypeScript Support

This package provides TypeScript definitions for a better development experience. Here are the TypeScript types and interfaces used in this package:

### Types and Interfaces

#### `FilterTypes`

Defines the types of filters supported by the module.

```typescript
export type FilterTypes = 'blackAndWhite' | 'shadesGray' | 'default';
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
