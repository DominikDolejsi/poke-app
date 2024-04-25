import {
  FormTypes,
  formTypeDB,
  formType,
  UpdateFormType,
} from "./formTypes.model.js";

export const findAll = async (): Promise<FormTypeDB[]> => {
  const foundFormTypes = await FormTypes.findMany({
    include: { forms: true },
  });
  return foundFormTypes;
};

export const create = async (newFormType: FormType): Promise<FormTypeDB> => {
  const { forms, ...rest } = newFormType;

  let updatedFormType;

  const createdFormType = await FormTypes.create({
    data: rest,
    include: { forms: true },
  });

  if (forms) {
    const formIds = forms.map((form) => {
      return { id: form.id };
    });

    updatedFormType = await FormTypes.update({
      where: { id: createdFormType.id },
      data: {
        forms: { connect: formIds },
      },
      include: { forms: true },
    });
  }

  if (updatedFormType) return updatedFormType;

  return createdFormType;
};

export const findOne = async (formTypeId: number): Promise<FormTypeDB> => {
  const foundFormType = await FormTypes.findUniqueOrThrow({
    where: { id: formTypeId },
    include: { forms: true },
  });
  return foundFormType;
};

export const update = async (
  formTypeId: number,
  newFormType: UpdateFormType,
): Promise<FormTypeDB> => {
  const { forms, ...rest } = newFormType;

  let updatedFormType;

  updatedFormType = await FormTypes.update({
    where: { id: formTypeId },
    data: rest,
    include: { forms: true },
  });

  if (forms) {
    const formIds = forms.map((form) => {
      return { id: form.id };
    });

    updatedFormType = await FormTypes.update({
      where: { id: formTypeId },
      data: {
        forms: { connect: formIds },
      },
      include: { forms: true },
    });
  }

  return updatedFormType;
};

export const deleteOne = async (formTypeId: number): Promise<FormTypeDB> => {
  const deletedFormType = await FormTypes.delete({
    where: { id: formTypeId },
    include: { forms: true },
  });
  return deletedFormType;
};
