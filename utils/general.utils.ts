import { AccountRoleEnum } from "libs/constants/accounts.constants";
import { directoriesNamesEnum } from "libs/constants/directories.constants";

export const checkIsSimpleUser = (roleId: number) => {
  return roleId != AccountRoleEnum.user && roleId != AccountRoleEnum.vip;
};

/**
 * Метод возвращает нормальную ссылку для файла
 * @param {string} currentPath
 * @returns string
 */
export const stabilizePath = (currentPath: string): string => {
  const path = currentPath.split(directoriesNamesEnum.main).pop();
  const mainPath = process.env.MODE === "dev" ? "http://localhost:3000/" : "moviester.ru/";
  return `${mainPath}${directoriesNamesEnum.main}${path}`;
};

/**
 * Метод возвращает имена файлов
 * @param {string[] | string} input
 * @returns string[]
 */
export const extractFilenames = (input: string | string[]): string[] => {
  if (!input?.length) return [];
  const urls = Array.isArray(input) ? input : [input];
  return urls.map((url) => {
    const cleanUrl = url.replace(/^"+|"+$/g, "");
    return cleanUrl.split("/").pop() || "";
  });
};

/**
 * Метод возвращает массив чисел
 * @param {any} value
 * @returns number[]
 */
export const toNumberArray = (value: any): number[] => {
  if (Array.isArray(value)) {
    return value.map((v) => Number(v)).filter((v) => !isNaN(v));
  }

  if (typeof value === "string" || typeof value === "number") {
    const num = Number(value);
    return isNaN(num) ? [] : [num];
  }

  return [];
};
