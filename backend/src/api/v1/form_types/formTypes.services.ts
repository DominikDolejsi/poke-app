import { FormTypes, FormTypeDB, FormType } from "./formTypes.model.js";

export const findAll = async (): Promise<FormTypeDB[]> => {
  const foundFormTypes = await FormTypes.findMany();
  return foundFormTypes;
};

export const create = async (newFormType: FormType): Promise<FormTypeDB> => {
  const createdFormType = await FormTypes.create({ data: newFormType });
  return createdFormType;
};

export const findOne = async (formTypeId: number): Promise<FormTypeDB> => {
  const foundFormType = await FormTypes.findUniqueOrThrow({ where: { id: formTypeId } });
  return foundFormType;
};

export const update = async (
  formTypeId: number,
  newFormType: FormType,
): Promise<FormTypeDB> => {
  const updatedFormType = await FormTypes.update({
    where: { id: formTypeId },
    data: newFormType,
  });
  return updatedFormType;
};

export const deleteOne = async (formTypeId: number): Promise<FormTypeDB> => {
  const deletedFormType = await FormTypes.delete({
    where: { id: formTypeId },
  });
  return deletedFormType;
};
