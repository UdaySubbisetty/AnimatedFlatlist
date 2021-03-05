/**
 * @format
 */

import {
    AppRegistry
} from 'react-native';
import App from './App';
import {
    name as appName
} from './app.json';
import Onboarding from './Class/Onboarding';

AppRegistry.registerComponent(appName, () => Onboarding);