export const mockData = {
  results: [
    {
      id: 1,
      title: 'Sample Post 1',
      description: 'This is the description for Sample Post 1.',
      image: 'assets/images/img1',
      category: {
        id: 101,
        slug: 'technology',
        name: 'Technology',
      },
      author: {
        id: 201,
        full_name: 'John Doe',
      },
    },
    {
      id: 2,
      title: 'Sample Post 2',
      description: 'This is the description for Sample Post 2.',
      image: 'https://example.com/image2.jpg',
      category: {
        id: 102,
        slug: 'science',
        name: 'Science',
      },
      author: {
        id: 202,
        full_name: 'Jane Smith',
      },
    },
    {
      id: 3,
      title: 'Sample Post 3',
      description: 'This is the description for Sample Post 3.',
      image: 'https://example.com/image3.jpg',
      category: {
        id: 103,
        slug: 'travel',
        name: 'Travel',
      },
      author: {
        id: 203,
        full_name: 'Bob Johnson',
      },
    },
    {
      id: 4,
      title: 'Sample Post 4',
      description: 'This is the description for Sample Post 4.',
      image: 'https://example.com/image4.jpg',
      category: {
        id: 104,
        slug: 'food',
        name: 'Food',
      },
      author: {
        id: 204,
        full_name: 'Alice Williams',
      },
    },
  ],
  count: 200,
  next: null,
  previous: null,
}
