import { AccountRoleEnum } from "libs/constants/accounts.constants";

export const checkIsSimpleUser = (roleId: number) => {
  return roleId != AccountRoleEnum.user && roleId != AccountRoleEnum.vip;
};
