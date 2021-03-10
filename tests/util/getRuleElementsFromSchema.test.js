import React from 'react';
import { renderToString } from 'react-dom/server';
import getRuleElementsFromSchema from '../../src/util/getRuleElementsFromSchema';
import SQFormWrapper from '../testUtils/SQFormWrapper';
import { testConditionSchema, expectedElements, expectedInitialValues } from '../testUtils/testConditionSchema';

describe('getRuleElementsFromSchema', () => {
  describe('undefined or null is passed', () => {
    it('returns an empty array', () => {
      expect(getRuleElementsFromSchema(undefined)).toEqual([]);
      expect(getRuleElementsFromSchema(null)).toEqual([]);
    });
  });

  describe('a non-object value is passed', () => {
    it('returns an empty array', () => {
      expect(getRuleElementsFromSchema('')).toEqual([]);
      expect(getRuleElementsFromSchema(1)).toEqual([]);
      expect(getRuleElementsFromSchema([])).toEqual([]);
      expect(getRuleElementsFromSchema(false)).toEqual([]);
    });
  });

  describe('an empty object is passed', () => {
    it('returns an empty object', () => {
      expect(getRuleElementsFromSchema({})).toEqual([]);
    });
  });

  describe('a valid schema is passed', () => {
    describe('includes no extra keys', () => {
      it('returns expected initialValues', () => {
        // case should cover all happy path cases
        expect(renderToString(
          <SQFormWrapper initialValues={expectedInitialValues}>
            {getRuleElementsFromSchema(testConditionSchema)}
          </SQFormWrapper>,
        )).toEqual(expectedElements);
      });
    });

    describe('invalid typei is used', () => {
      it('ignores the invalid type', () => {
        const invalidTypeSchema = {
          ...testConditionSchema,
          children: [
            ...testConditionSchema.children,
            {
              type: 'invalidType',
              id: 'f',
            },
          ],
        };

        expect(renderToString(
          <SQFormWrapper initialValues={expectedInitialValues}>
            {getRuleElementsFromSchema(invalidTypeSchema)}
          </SQFormWrapper>,
        )).toEqual(expectedElements);
      });
    });
  });
});
