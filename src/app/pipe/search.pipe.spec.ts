import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {
  let pipe: SearchPipe;

  beforeEach(() => {
    pipe = new SearchPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty array when the items array is null or undefined', () => {
    expect(pipe.transform(null, 'searchTerm')).toEqual([]);
    expect(pipe.transform(undefined, 'searchTerm')).toEqual([]);
  });

  it('should return the original array when searchString is empty or null', () => {
    const items = [
      { Title: 'Note 1', Description: 'Description 1' },
      { Title: 'Note 2', Description: 'Description 2' }
    ];

    expect(pipe.transform(items, '')).toEqual(items);
    expect(pipe.transform(items, null as any)).toEqual(items);
  });

  it('should filter items by Title', () => {
    const items = [
      { Title: 'Angular', Description: 'Description for Angular' },
      { Title: 'React', Description: 'Description for React' },
      { Title: 'Vue', Description: 'Description for Vue' }
    ];

    const result = pipe.transform(items, 'angular');
    expect(result).toEqual([{ Title: 'Angular', Description: 'Description for Angular' }]);
  });

  it('should filter items by Description', () => {
    const items = [
      { Title: 'Angular', Description: 'Frontend framework' },
      { Title: 'React', Description: 'JavaScript library for building UI' },
      { Title: 'Vue', Description: 'Another JavaScript framework' }
    ];

    const result = pipe.transform(items, 'library');
    expect(result).toEqual([{ Title: 'React', Description: 'JavaScript library for building UI' }]);
  });

  it('should filter items by both Title and Description', () => {
    const items = [
      { Title: 'Angular', Description: 'Frontend framework' },
      { Title: 'React', Description: 'JavaScript library for building UI' },
      { Title: 'Vue', Description: 'Another JavaScript framework' }
    ];

    const result = pipe.transform(items, 'framework');
    expect(result).toEqual([
      { Title: 'Angular', Description: 'Frontend framework' },
      { Title: 'Vue', Description: 'Another JavaScript framework' }
    ]);
  });

  it('should return an empty array if no items match the search string', () => {
    const items = [
      { Title: 'Angular', Description: 'Frontend framework' },
      { Title: 'React', Description: 'JavaScript library for building UI' }
    ];

    const result = pipe.transform(items, 'nonexistent');
    expect(result).toEqual([]);
  });

  it('should perform a case-insensitive search', () => {
    const items = [
      { Title: 'Angular', Description: 'Frontend framework' },
      { Title: 'React', Description: 'JavaScript library for building UI' }
    ];

    const result = pipe.transform(items, 'ANGULAR');
    expect(result).toEqual([{ Title: 'Angular', Description: 'Frontend framework' }]);
  });
});
