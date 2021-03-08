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
import WomensDay from './Class/WomensDay';


AppRegistry.registerComponent(appName, () => WomensDay);