import { HabitatPage } from './app.po';

describe('habitat App', () => {
  let page: HabitatPage;

  beforeEach(() => {
    page = new HabitatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
