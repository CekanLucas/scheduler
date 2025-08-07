import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from './Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    children: { control: 'text' },
    confirm: { control: 'boolean' },
    danger: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' }
  },
};

const Template = (args) => <Button {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: 'Button',
};

export const Confirm = Template.bind({});
Confirm.args = {
  children: 'Confirm',
  confirm: true,
};

export const Danger = Template.bind({});
Danger.args = {
  children: 'Danger',
  danger: true,
};

export const Clickable = Template.bind({});
Clickable.args = {
  children: 'Clickable',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled',
  disabled: true,
};
