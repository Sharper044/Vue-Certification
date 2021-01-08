import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Landing from '@/views/Landing.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();

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
  let actions
  let store;
  jest.useFakeTimers();

  beforeEach(() => {
    actions = {
      login: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  });

  it("Redirect should work", async () => {
    const wrapper = shallowMount(Landing, {
      localVue,
      store,
      router
    });

    wrapper.vm.simulateAuthenticated();
    expect(actions.login).toHaveBeenCalled();
    expect(window.location.href).toBe('http://localhost/#/search');
  });

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
  });

  it("should, when pressed, give an appropriate delay (1500 - 3000 ms), and then redirect the user to the search page", () => {
    const wrapper = shallowMount(Landing);
    const emailBox = wrapper.find('#email');
    const passwordBox = wrapper.find('#password');
    const loginButton = wrapper.find('button');

    emailBox.setValue(emails.valid[0]);
    passwordBox.setValue(passwords.valid[0]);
    loginButton.trigger('click');

    jest.advanceTimersByTime(1501);
    
    expect(window.location.href).toBe('http://localhost/#/search');
  });

  it("should, when pressed, give an appropriate delay (1500 - 3000 ms), and then redirect the user to the search page", () => {
    const wrapper = shallowMount(Landing);

    wrapper.setData({ email: emails.valid[0], password: passwords.valid[0] })
    wrapper.vm.submitForm({ preventDefault: jest.fn });
    
    expect(window.location.href).toBe('http://localhost/#/search');
  });
});