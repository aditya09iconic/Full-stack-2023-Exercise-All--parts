import Constants from 'expo-constants';
import { Platform } from 'react-native';

const theme = {
  roundness: 3,
  container: {
    paddingTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  horizontalContainer: {
    marginHorizontal: 16,
  },
  seperator: {
    marginVertical: 5,
  },
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    secondary: '#f44336',
    google: '#4c8bf5',
    appBarBackground: '#24292e',
    mainBackground: '#e1e4e8',
    error: '#d73a4a',
    divider: '#d1d5da',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    title: 18,
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System',
    }),
  },
  fontWeights: {
    light: '100',
    normal: '400',
    bold: '700',
  },
};

export default theme;
