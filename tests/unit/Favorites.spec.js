import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Favorites, { sortFunctions, filterAndSortVideos } from '@/views/Favorites.vue';
import mockSearchResults from '../mocks/mockSearchResults';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Search', () => {
  let actions;
  let state;
  let store;

  beforeEach(() => {
    actions = {
    }
    state = {
      searchResults: mockSearchResults, 
      isAuthenticated: true, 
      favoriteVideos: [ mockSearchResults[0], mockSearchResults[4], mockSearchResults[8] ] 
    }
    store = new Vuex.Store({
      actions,
      state
    })
  });


  it('Includes the Search bar component', () => {
    const wrapper = mount(Favorites, { localVue, store });
    expect(wrapper.html()).toContain("search-bar");
  });
  it('Includes the search-aside component', () => {
    const wrapper = mount(Favorites, 
      { 
        localVue, 
        stubs: { 
          youtube: true 
        }, 
        store,
        computed: {
          filteredFavoritesVideos: () => [ mockSearchResults[0], mockSearchResults[4], mockSearchResults[8] ]
        } 
      }
    );

    expect(wrapper.html()).toContain("search-aside");
  });

  it('Includes the video-player component when there are favorited videos available', async () => {
    const wrapper = mount(
      Favorites, 
      { 
        localVue, 
        stubs: { 
          youtube: true 
        }, 
        store,
        computed: {
          filteredFavoritesVideos: () => [ mockSearchResults[0], mockSearchResults[4], mockSearchResults[8] ]
        } 
      }
    );

    expect(wrapper.html()).toContain('video-player');
  });
  it('Does not include the video-player component when there are not favorited videos available', async () => {
    const wrapper = mount(
      Favorites, 
      { 
        localVue, 
        stubs: { 
          youtube: true 
        }, 
        store,
        computed: {
          filteredFavoritesVideos: () => []
        } 
      }
    );
   
    expect(wrapper.html()).not.toContain('video-player');
  });

  it('Should switch which video is selected when one of the other searched videos is clicked.', async () => {
    const wrapper = mount(
      Favorites, 
      { 
        localVue, 
        stubs: { 
          youtube: true 
        }, 
        store,
        computed: {
          filteredFavoritesVideos: () => [ mockSearchResults[0], mockSearchResults[4], mockSearchResults[8] ]
        } 
      }
    );
    const videos = wrapper.findAll('li');

    expect(wrapper.vm.$data.selectedVideoIndex).toBe(0);

    await videos.at(2).trigger('click');

    expect(wrapper.vm.$data.selectedVideoIndex).toBe(2);

  });

  it('should switch the sort function used when a button is pressed', async () => {
    const wrapper = mount(
      Favorites, 
      { 
        localVue, 
        stubs: { 
          youtube: true 
        }, 
        store,
        computed: {
          filteredFavoritesVideos: () => []
        } 
      }
    );
    const buttons = wrapper.findAll('.sort-button');
    
    expect(wrapper.vm.$data.sortFunction).toBeNull();
    await buttons.at(0).trigger('click');
    expect(wrapper.vm.$data.sortFunction).toEqual(sortFunctions.titleDescending);
    await buttons.at(1).trigger('click');
    expect(wrapper.vm.$data.sortFunction).toEqual(sortFunctions.titleAscending);
    await buttons.at(2).trigger('click');
    expect(wrapper.vm.$data.sortFunction).toEqual(sortFunctions.dateDescending);
    await buttons.at(3).trigger('click');
    expect(wrapper.vm.$data.sortFunction).toEqual(sortFunctions.dateAscending);
    await buttons.at(4).trigger('click');
    expect(wrapper.vm.$data.sortFunction).toBeNull();
  });

  it('should set the filter string and reset the selected video to index 0 when the search bar is submitted', async () => {
    const wrapper = mount(
      Favorites, 
      { 
        localVue, 
        stubs: { 
          youtube: true 
        }, 
        store,
        computed: {
          filteredFavoritesVideos: () => [ mockSearchResults[0], mockSearchResults[4], mockSearchResults[8] ]
        } 
      }
    );
    const searchBar = wrapper.find('input#search');
    const searchButton = wrapper.find('div.search-bar button');

    wrapper.setData({
      selectedVideoIndex: 1,
      filterString: '',
      sortFunction: null
    });

    await searchBar.setValue('Narnia');
    await searchButton.trigger('click');

    expect(wrapper.vm.$data.selectedVideoIndex).toBe(0);
    expect(wrapper.vm.$data.filterString).toBe('Narnia');
  });
});

describe('Filter and Sort Videos Function', () => {
  it('does nothing to the order if there is no sort function or filter string', () => {
    let testState = { favoriteVideos: mockSearchResults };
    let videos = filterAndSortVideos(testState, '', sortFunctions.none);

    expect(testState.favoriteVideos.length).toEqual(videos.length);
    testState.favoriteVideos.forEach((video, i) => {
      expect(video.id.videoId).toEqual(videos[i].id.videoId);
    })
  });

  it('filters, but does not reorder when there is a filter string but no sort function', () => {
    let testState = { favoriteVideos: mockSearchResults };
    let videos = filterAndSortVideos(testState, 'lion', sortFunctions.none);

    expect(videos.length).toEqual(5);
    expect(testState.favoriteVideos[0].id.videoId).toEqual(videos[0].id.videoId);
    expect(testState.favoriteVideos[1].id.videoId).toEqual(videos[1].id.videoId);
    expect(testState.favoriteVideos[3].id.videoId).toEqual(videos[2].id.videoId);
    expect(testState.favoriteVideos[4].id.videoId).toEqual(videos[3].id.videoId);
    expect(testState.favoriteVideos[6].id.videoId).toEqual(videos[4].id.videoId);
  });

  it('sorts but does not filter when there is a sort function but not a filter string', () => {
    let testState = { favoriteVideos: mockSearchResults };
    let videos = filterAndSortVideos(testState, '', sortFunctions.titleDescending);

    expect(testState.favoriteVideos.length).toEqual(videos.length);
    expect(videos[0].id.videoId).toEqual(testState.favoriteVideos[2].id.videoId);
    expect(videos[1].id.videoId).toEqual(testState.favoriteVideos[0].id.videoId);
    expect(videos[2].id.videoId).toEqual(testState.favoriteVideos[9].id.videoId);
    expect(videos[3].id.videoId).toEqual(testState.favoriteVideos[6].id.videoId);
    expect(videos[4].id.videoId).toEqual(testState.favoriteVideos[1].id.videoId);
    expect(videos[5].id.videoId).toEqual(testState.favoriteVideos[4].id.videoId);
    expect(videos[6].id.videoId).toEqual(testState.favoriteVideos[5].id.videoId);
    expect(videos[7].id.videoId).toEqual(testState.favoriteVideos[8].id.videoId);
    expect(videos[8].id.videoId).toEqual(testState.favoriteVideos[3].id.videoId);
    expect(videos[9].id.videoId).toEqual(testState.favoriteVideos[7].id.videoId);
  });

  it('sorts and filters when both parameters are present.', () => {
    let testState = { favoriteVideos: mockSearchResults };
    let videos = filterAndSortVideos(testState, 'lion', sortFunctions.titleDescending);

    expect(videos.length).toEqual(5);
    expect(videos[0].id.videoId).toEqual(testState.favoriteVideos[0].id.videoId);
    expect(videos[1].id.videoId).toEqual(testState.favoriteVideos[6].id.videoId);
    expect(videos[2].id.videoId).toEqual(testState.favoriteVideos[1].id.videoId);
    expect(videos[3].id.videoId).toEqual(testState.favoriteVideos[4].id.videoId);
    expect(videos[4].id.videoId).toEqual(testState.favoriteVideos[3].id.videoId);
  });
});

describe('Sort Functions', () => {
  const testData = [mockSearchResults[0], mockSearchResults[1], mockSearchResults[2]];
  it('correctly sorts by title descending', () => {
    let sorted = [...testData].sort(sortFunctions.titleDescending);

    expect(sorted[0].id.videoId).toEqual(testData[2].id.videoId);
    expect(sorted[1].id.videoId).toEqual(testData[0].id.videoId);
    expect(sorted[2].id.videoId).toEqual(testData[1].id.videoId);
  });

  it('correctly sorts by title ascending', () => {
    let sorted = [...testData].sort(sortFunctions.titleAscending);

    expect(sorted[0].id.videoId).toEqual(testData[1].id.videoId);
    expect(sorted[1].id.videoId).toEqual(testData[0].id.videoId);
    expect(sorted[2].id.videoId).toEqual(testData[2].id.videoId);
  });

  it('correctly sorts by date descending', () => {
    let sorted = [...testData].sort(sortFunctions.dateDescending);

    expect(sorted[0].id.videoId).toEqual(testData[2].id.videoId);
    expect(sorted[1].id.videoId).toEqual(testData[1].id.videoId);
    expect(sorted[2].id.videoId).toEqual(testData[0].id.videoId);
  });

  it('correctly sorts by date ascending', () => {
    let sorted = [...testData].sort(sortFunctions.dateAscending);

    expect(sorted[0].id.videoId).toEqual(testData[0].id.videoId);
    expect(sorted[1].id.videoId).toEqual(testData[1].id.videoId);
    expect(sorted[2].id.videoId).toEqual(testData[2].id.videoId);  
  });
});