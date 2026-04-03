import { createTheme, MantineColorsTuple } from '@mantine/core';

const saffron: MantineColorsTuple = [
  '#fff4e6',
  '#ffe8cc',
  '#ffd09b',
  '#ffb866',
  '#ffa33a',
  '#ff961e',
  '#ff8f0e',
  '#e37d00',
  '#ca6f00',
  '#b05f00',
];

const dharmic: MantineColorsTuple = [
  '#e8f5f7',
  '#d0e9ee',
  '#9ecfdb',
  '#68b4c7',
  '#449db5',
  '#2d91ab',
  '#1f8ba5',
  '#0e7891',
  '#006880',
  '#005970',
];

export const theme = createTheme({
  colors: {
    saffron,
    dharmic,
  },
  primaryColor: 'dharmic',
  primaryShade: 6,
  fontFamily: "'Inter', 'Segoe UI', sans-serif",
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    fontWeight: '700',
  },
  defaultRadius: 'md',
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'sm',
      },
    },
    Badge: {
      defaultProps: {
        radius: 'sm',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    Textarea: {
      defaultProps: {
        radius: 'md',
      },
    },
  },
});
