import { IncredibowlAppPage } from './app.po';

describe('incredibowl-app App', function() {
  let page: IncredibowlAppPage;

  beforeEach(() => {
    page = new IncredibowlAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
