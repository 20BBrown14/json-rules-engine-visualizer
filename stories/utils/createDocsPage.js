/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  Title,
  Description,
  ArgsTable,
  Stories,
} from '@storybook/addon-docs/blocks';
/* eslint-enable import/no-extraneous-dependencies */

const createDocsPage = ({ markdown, showStories = true } = {}) => (
  () => (
    <>
      {markdown ? null : <Title />}
      <Description markdown={markdown} />
      <ArgsTable />
      {showStories ? <Stories includePrimary /> : null}
    </>
  )
);

export default createDocsPage;
