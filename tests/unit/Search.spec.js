import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Search from '@/views/Search.vue';
import SearchBar from '@/components/SearchBar.vue'
import store from '@/store.js';
import mockSearchResults from '../mocks/mockSearchResults';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Search', () => {
  it('Includes the Search bar component', () => {
    const wrapper = mount(Search, { localVue, store });
    expect(wrapper.html()).toContain("search-bar");
  });

  it('Includes the search-aside component', () => {
    const wrapper = mount(Search, { localVue, store });
    expect(wrapper.html()).toContain("search-aside");
  });

  it('Includes the video-player component when there are search results', async () => {
    const wrapper = mount(
      Search, 
      { 
        localVue, 
        stubs: { 
          youtube: true 
        }, 
        store: { 
          state: { 
            searchResults: mockSearchResults, 
            isAuthenticated: true, 
            favoriteVideos: [] 
          }
        } 
      }
    );
   
    expect(wrapper.html()).toContain('video-player');
  });

  it('Should have a search bar where a user can input any search string.', () => {
    const wrapper = mount(SearchBar);
    const searchBar = wrapper.find('#search');

    searchBar.setValue('Narnia');

    expect(wrapper.vm.$data.searchString).toEqual('Narnia');
  });

  it('Should switch which video is selected when one of the other searched videos is clicked.', async () => {
    const wrapper = mount(
      Search, 
      { 
        localVue, 
        stubs: { 
          youtube: true 
        }, 
        store: { 
          state: { 
            searchResults: mockSearchResults, 
            isAuthenticated: true, 
            favoriteVideos: [] 
          }
        } 
      }
    );
    const searchedVideos = wrapper.findAll('li');

    expect(wrapper.vm.$data.selectedVideoIndex).toBe(0);

    await searchedVideos.at(5).trigger('click');

    expect(wrapper.vm.$data.selectedVideoIndex).toBe(5);

  })
});

describe('Search Bar Component', () => {
  it('should prevent default, call the passed in submit function and clear itself when submitted.', async () => {
    const onSubmit = jest.fn();
    const wrapper = mount(SearchBar, { propsData: { onSubmit, clearSearchOnSubmit: true }});
    const searchBar = wrapper.find('#search');

    searchBar.setValue('Narnia');
    await wrapper.find('button').trigger('click')

    expect(onSubmit).toHaveBeenCalledWith('Narnia');
    expect(wrapper.vm.$data.searchString).toEqual('');
  });

  it('should prevent default, call the passed in submit function and not clear itself when submitted.', async () => {
    const onSubmit = jest.fn();
    const wrapper = mount(SearchBar, { propsData: { onSubmit, clearSearchOnSubmit: false }});
    const searchBar = wrapper.find('#search');

    searchBar.setValue('Narnia');
    await wrapper.find('button').trigger('click')

    expect(onSubmit).toHaveBeenCalledWith('Narnia');
    expect(wrapper.vm.$data.searchString).toEqual('Narnia');
  });
});

describe('favoriting', () => {
  it('should remove a favorite when a favorited heart is clicked', async () => {
    const actions = {
      addFavorite: jest.fn(),
      removeFavorite: jest.fn()
    };
    const wrapper = mount(
      Search, 
      { 
        localVue, 
        stubs: { 
          youtube: true 
        }, 
        store: { 
          actions,
          state: { 
            searchResults: mockSearchResults, 
            isAuthenticated: true, 
            favoriteVideos: [ mockSearchResults[0] ] 
          }
        } 
      }
    );
    const favoriteHearts = wrapper.findAll('.favorited');

    await favoriteHearts.at(0).trigger('click');
  });

  it('should add a favorite when a non-favorited heart is clicked', async () => {
    const actions = {
      addFavorite: jest.fn(),
      removeFavorite: jest.fn()
    };
    const wrapper = mount(
      Search, 
      { 
        localVue, 
        stubs: { 
          youtube: true 
        }, 
        store: { 
          actions,
          state: { 
            searchResults: mockSearchResults, 
            isAuthenticated: true, 
            favoriteVideos: [ mockSearchResults[0] ] 
          }
        } 
      }
    );
    const favoriteHearts = wrapper.findAll('.favorited');

    await favoriteHearts.at(1).trigger('click');
  });
});