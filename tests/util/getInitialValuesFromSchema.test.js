import getInitialValuesFromSchema from '../../src/util/getInitialValuesFromSchema';
import { testConditionSchema, expectedInitialValues } from '../testUtils/testConditionSchema';

describe('getInitialValuesFromSchema', () => {
  describe('undefined or null is passed', () => {
    it('returns an empty object', () => {
      expect(getInitialValuesFromSchema(undefined)).toEqual({});
      expect(getInitialValuesFromSchema(null)).toEqual({});
    });
  });

  describe('a non-object value is passed', () => {
    it('returns an empty object', () => {
      expect(getInitialValuesFromSchema('')).toEqual({});
      expect(getInitialValuesFromSchema(1)).toEqual({});
      expect(getInitialValuesFromSchema([])).toEqual({});
      expect(getInitialValuesFromSchema(false)).toEqual({});
    });
  });

  describe('an empty object is passed', () => {
    it('returns an empty object', () => {
      expect(getInitialValuesFromSchema({})).toEqual({});
    });
  });

  describe('a valid schema is passed', () => {
    describe('includes no extra keys', () => {
      it('returns expected initialValues', () => {
        // case should cover all happy path cases
        expect(getInitialValuesFromSchema(testConditionSchema)).toStrictEqual(expectedInitialValues);
      });
    });

    describe('invalid type is used', () => {
      it('ignores the invalid type', () => {
        const invalidTypeSchema = {
          ...testConditionSchema,
          children: [
            ...testConditionSchema.children,
            {
              type: 'invalidType',
              id: 'f',
              factName: '',
              operator: '',
              value: '',
            },
          ],
        };

        expect(getInitialValuesFromSchema(invalidTypeSchema)).toStrictEqual(expectedInitialValues);
      });
    });
  });
});
