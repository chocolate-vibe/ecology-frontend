import { Module } from 'vuex-smart-module';
import stations from './modules/stations';
import pollutants from './modules/pollutants';

export default new Module({
  modules: {
    stations,
    pollutants,
  },
});