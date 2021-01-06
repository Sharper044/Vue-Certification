import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App', () => {
  it('Include the header element', () => {
    const wrapper = shallowMount(App, { stubs: ['router-view'] });
    expect(wrapper.html()).toContain("header-stub");
  });

  it('Include the router-view element', () => {
    const wrapper = shallowMount(App, { stubs: ['router-view'] });
    expect(wrapper.html()).toContain("router-view");
  })
})