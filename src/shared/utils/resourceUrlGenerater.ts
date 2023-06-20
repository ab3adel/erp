export const resourceUrlGenerater = (resource: string) => {
  return import.meta.env.VITE_RESOURCE_URL + "/" + resource;
};
