import { ManyQuery } from "../../../types/queryTypes.js";
import { FormTypes, UpdateFormType, FormType } from "./formTypes.model.js";

export const findAll = async ({
  limit,
  offset,
  deep,
}: ManyQuery): Promise<typeof foundFormTypes> => {
  const foundFormTypes = await FormTypes.findMany({
    take: limit,
    skip: offset,
    include: { forms: deep },
  });
  return foundFormTypes;
};

export const create = async (
  newFormType: FormType,
  deep: boolean,
): Promise<typeof createdFormType> => {
  const { forms, ...rest } = newFormType;

  const createdFormType = await FormTypes.create({
    data: {
      ...rest,
      forms: forms
        ? { connect: forms.map((form) => ({ id: form.id })) }
        : undefined,
    },
    include: { forms: deep },
  });

  return createdFormType;
};

export const findOne = async (
  formTypeId: number,
  deep: boolean,
): Promise<typeof foundFormType> => {
  const foundFormType = await FormTypes.findUniqueOrThrow({
    where: { id: formTypeId },
    include: { forms: deep },
  });
  return foundFormType;
};

export const update = async (
  formTypeId: number,
  newFormType: UpdateFormType,
  deep: boolean,
): Promise<typeof updatedFormType> => {
  const { forms, ...rest } = newFormType;

  const updatedFormType = await FormTypes.update({
    where: { id: formTypeId },
    data: {
      ...rest,
      forms: forms
        ? { connect: forms.map((form) => ({ id: form.id })) }
        : undefined,
    },
    include: { forms: deep },
  });

  return updatedFormType;
};

export const deleteOne = async (
  formTypeId: number,
): Promise<typeof deletedFormType> => {
  const deletedFormType = await FormTypes.delete({
    where: { id: formTypeId },
  });
  return deletedFormType;
};
