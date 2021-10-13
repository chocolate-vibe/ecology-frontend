/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import jwtDecode from 'jwt-decode';
import { User } from '@/types/models/User';
import { Roles } from '@/enums/roles.enum';

const AccessPlugin = {
  install(Vue: any, options: any) {
    Vue.prototype.$isAdmin = (): boolean => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        const user: User = jwtDecode(token);
        return user.role?.value === Roles.ADMIN;
      }
      return false;
    };

    Vue.prototype.$isEcologist = (): boolean => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        const user: User = jwtDecode(token);
        return user.role?.value === Roles.ECOLOGIST;
      }
      return false;
    };

    Vue.prototype.$user = (): User | undefined => {
      const token = localStorage.getItem('auth_token');
      if (token) jwtDecode(token);
      return undefined;
    };
  },
};

declare module 'vue/types/vue' {
  interface Vue {
    $isAdmin: any,
    $isEcologist: any,
    $user: any,
  }
}

export default AccessPlugin;