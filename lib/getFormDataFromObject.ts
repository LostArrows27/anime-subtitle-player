export const createFormData = (object: { [key: string]: any }): FormData => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    formData.append(key, object[key]);
  });
  return formData;
};
