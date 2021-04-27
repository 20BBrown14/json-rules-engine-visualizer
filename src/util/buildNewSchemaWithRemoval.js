const buildNewSchemaWithRemoval = (existingSchema, idToRemove) => {
  let newConditionSchema = {};
  if (existingSchema.id === idToRemove) {
    if (existingSchema.children && existingSchema.children?.length) {
      // TODO: Unable to remove.
      return existingSchema;
    }
    return undefined;
  }

  Object.entries(existingSchema).forEach(([key, value]) => {
    if (key === 'children' && value?.length) {
      // Get children and filter out undefined
      const newChildren = value
        .map((ruleInformationObject) => buildNewSchemaWithRemoval(ruleInformationObject, idToRemove))
        .filter((child) => !!child);

      newConditionSchema = {
        ...newConditionSchema,
        children: newChildren,
      };
      return;
    }

    newConditionSchema = {
      ...newConditionSchema,
      [key]: value,
    };
  });
  return newConditionSchema;
};

export default buildNewSchemaWithRemoval;
