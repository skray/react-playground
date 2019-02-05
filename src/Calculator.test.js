import React from 'react';
import { mount } from 'enzyme';
import Calculator from './Calculator';

describe('basic button presses', () => {
  
  test('should display numbers', () => {
    const wrapper = mount(<Calculator />);

    wrapper.find('[value="5"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');

    expect(wrapper.find('.displayValue').text()).toEqual('53');
  });

  test('should clear the input', () => {
    const wrapper = mount(<Calculator />);

    wrapper.find('[value="5"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');

    expect(wrapper.find('.displayValue').text()).toEqual('53');

    wrapper.find('[value="C"]').simulate('click');

    expect(wrapper.find('.displayValue').text()).toEqual('0');
  });
  
});

describe('operators', () => {
  test.each`
  a           | b           | expected
  ${'1'}      | ${'2'}      | ${'3'}
  ${'285'}    | ${'90136'}  | ${'90421'}
  ${'993.13'} | ${'34.301'} | ${'1027.431'}
`('returns $expected when $a is added to $b', ({a, b, expected}) => {
    const wrapper = mount(<Calculator />);

    for(let digit of a) { wrapper.find(`[value="${digit}"]`).simulate('click'); }
    wrapper.find('[value="+"]').simulate('click');
    for(let digit of b) { wrapper.find(`[value="${digit}"]`).simulate('click'); }
    wrapper.find('[value="="]').simulate('click');

    expect(wrapper.find('.displayValue').text()).toEqual(expected);
  });

  test.each`
  a             | b           | expected
  ${'1'}        | ${'2'}      | ${'-1'}
  ${'34528'}    | ${'23409'}  | ${'11119'}
  ${'9023.394'} | ${'1.3904'} | ${'9022.0036'}
`('returns $expected when $a is subtracted from $b', ({a, b, expected}) => {
    const wrapper = mount(<Calculator />);

    for(let digit of a) { wrapper.find(`[value="${digit}"]`).simulate('click'); }
    wrapper.find('[value="-"]').simulate('click');
    for(let digit of b) { wrapper.find(`[value="${digit}"]`).simulate('click'); }
    wrapper.find('[value="="]').simulate('click');

    expect(wrapper.find('.displayValue').text()).toEqual(expected);
  });

  test.each`
  a               | b            | expected
  ${'1'}          | ${'2'}       | ${'2'}
  ${'538'}        | ${'112'}     | ${'60256'}
  ${'32893.2893'} | ${'238.321'} | ${'7839161.599265299'}
`('returns $expected when $a is multiplied by $b', ({a, b, expected}) => {
    const wrapper = mount(<Calculator />);

    for(let digit of a) { wrapper.find(`[value="${digit}"]`).simulate('click'); }
    wrapper.find('[value="*"]').simulate('click');
    for(let digit of b) { wrapper.find(`[value="${digit}"]`).simulate('click'); }
    wrapper.find('[value="="]').simulate('click');

    expect(wrapper.find('.displayValue').text()).toEqual(expected);
  });

  test.each`
  a           | b             | expected
  ${'1'}      | ${'2'}        | ${'0.5'}
  ${'10'}     | ${'3'}        | ${'3.3333333333333335'}
  ${'4682'}   | ${'35'}       | ${'133.77142857142857'}
  ${'2893.2'} | ${'342.3444'} | ${'8.451138677892787'}
`('returns $expected when $a is divided by $b', ({a, b, expected}) => {
    const wrapper = mount(<Calculator />);

    for(let digit of a) { wrapper.find(`[value="${digit}"]`).simulate('click'); }
    wrapper.find('[value="/"]').simulate('click');
    for(let digit of b) { wrapper.find(`[value="${digit}"]`).simulate('click'); }
    wrapper.find('[value="="]').simulate('click');

    expect(wrapper.find('.displayValue').text()).toEqual(expected);
  });
  
  test.each`
  a         | expected
  ${'0'}    | ${'0'}
  ${'1'}    | ${'0.01'}
  ${'0.23'} | ${'0.0023'}
`('returns $expected when $a taken as a percentage', ({a, b, expected}) => {
    const wrapper = mount(<Calculator />);

    for(let digit of a) { wrapper.find(`[value="${digit}"]`).simulate('click'); }
    wrapper.find('[value="%"]').simulate('click');

    expect(wrapper.find('.displayValue').text()).toEqual(expected);
  });
  
  test.each`
  a         | expected
  ${'0'}    | ${'0'}
  ${'1'}    | ${'-1'}
  ${'397'}  | ${'-397'}
  ${'1.34'} | ${'-1.34'}
`('negates $expected', ({a, b, expected}) => {
    const wrapper = mount(<Calculator />);

    for(let digit of a) { wrapper.find(`[value="${digit}"]`).simulate('click'); }
    wrapper.find('[value="+/-"]').simulate('click');

    expect(wrapper.find('.displayValue').text()).toEqual(expected);
    
    wrapper.find('[value="+/-"]').simulate('click');

    expect(wrapper.find('.displayValue').text()).toEqual(a);
  });
});