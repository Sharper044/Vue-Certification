// The login button should be disabled until a valid email and valid password have been entered
// The password should be validated to have at least 1 capital letter, 1 lower case letter, 1 number, and is between 6-10 characters in length.
// When the login button is submitted an authentication method should be called that will simulate an HTTP call, give an appropriate delay (1500 - 3000 ms), and then redirect the user to the search page.

import { shallowMount } from '@vue/test-utils';
import Landing from '@/views/Landing.vue';

const passwords = {
  invalid: [
    'ABC',
    'abc',
    '123',
    '!@#$%^&',
    'AbCd',
    'A1B2',
    'ABCDEFG',
    '1Ab',
    'AbCdEfG',
    '!@#$',
    '1234Abcdefghijklmnop'
  ],
  valid: [
    '1Aaaaaa',
    '1234Ab'
  ]
};

const emails = {
  valid: [
    'stu@test.com',
    'this@ny.c'
  ],
  invalid: [
    'stu.stuff',
    '@nothing.com'
  ]
}

describe('Landing Page', () => {
  it('should have a way to toggle masking or showing the characters of the password', async () => {
    const wrapper = shallowMount(Landing);
    const passwordBox = wrapper.find('#password');
    const togglePasswordBox = wrapper.find('#show-password');

    expect(passwordBox.attributes().type).toBe('password');
    expect(wrapper.vm.$data.showPassword).toBe(false);
    await togglePasswordBox.setChecked(true);
    expect(passwordBox.attributes().type).toBe('text');
    expect(wrapper.vm.$data.showPassword).toBe(true);
    await togglePasswordBox.setChecked(false);
    expect(passwordBox.attributes().type).toBe('password');
    expect(wrapper.vm.$data.showPassword).toBe(false);
  })
});

describe('Login Button', () => {
  it('should be disabled until a valid email and valid password have been entered', () => {
    const wrapper = shallowMount(Landing);
    const emailBox = wrapper.find('#email');
    const passwordBox = wrapper.find('#password');

    expect(wrapper.vm.$data.disabled).toBe(true);

    emails.invalid.forEach(email => {
      emailBox.setValue(email);
      
      passwords.invalid.forEach(password => {
        passwordBox.setValue(password);
        expect(wrapper.vm.$data.disabled).toBe(true);
      });

      passwords.valid.forEach(password => {
        passwordBox.setValue(password);
        expect(wrapper.vm.$data.disabled).toBe(true);
      });
    });

    emails.valid.forEach(email => {
      emailBox.setValue(email);
      
      passwords.invalid.forEach(password => {
        passwordBox.setValue(password);
        expect(wrapper.vm.$data.disabled).toBe(true);
      });

      passwords.valid.forEach(password => {
        passwordBox.setValue(password);
        expect(wrapper.vm.$data.disabled).toBe(false);
      });
    })

  })
});