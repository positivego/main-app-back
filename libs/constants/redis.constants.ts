const minute = 60;
const hour = 60 * minute;

export const CACHING_EXP = {
  test: {
    key: () => `TEST_360`,
    ttl: hour,
  },
};
