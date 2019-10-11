import { SandeepTictocPage } from './app.po';

describe('sandeep-tictoc App', function() {
  let page: SandeepTictocPage;

  beforeEach(() => {
    page = new SandeepTictocPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
