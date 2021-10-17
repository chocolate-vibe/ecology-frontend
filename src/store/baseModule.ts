import { Module } from 'vuex-smart-module';
import root from './modules/root';
import stations from './modules/stations';
import pollutants from './modules/pollutants';

export default new Module({
  modules: {
    root,
    stations,
    pollutants,
  },
});
