import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: 'dc6caedb-3bdb-406d-8605-bad24b5ca120',
    comment: 'I stayed here for one night and it was an unpleasant experience.',
    date: '2023-07-15T21:00:00.429Z',
    rating: 2,
    user: {
      name: 'Kendall',
      avatarUrl: 'https://13.design.pages.academy/static/avatar/8.jpg',
      isPro: true,
    },
  },
  {
    id: '1a77c883-d672-40f6-a266-457abe3be966',
    comment:
      'The room was spacious and clean. The pool looked nothing like the photos and desparately needs a clean. The sauna and spa were closed for lunar new year holiday.',
    date: '2023-07-12T21:00:00.429Z',
    rating: 3,
    user: {
      name: 'Zak',
      avatarUrl: 'https://13.design.pages.academy/static/avatar/1.jpg',
      isPro: false,
    },
  }
];
