import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import PostCard from '../PostCard';
import { ShowEnum } from '@/types';

const meta: Meta<typeof PostCard> = {
  title: 'Components/Posts/Card',
  component: PostCard
};

export default meta;

export const Main: StoryObj<typeof PostCard> = {
  args: {
    author: 'Washington Irving',
    title: "Chief and Dumpling's Day Off",
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna id volutpat lacus laoreet non curabitur. Vulputate ut pharetra sit amet aliquam id. A condimentum vitae sapien pellentesque habitant morbi.',
    episode: 3,
    id: '01',
    season: 1,
    motifs: [],
    show: ShowEnum.RickAndMorty,
    synopsis:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna id volutpat lacus laoreet non curabitur. Vulputate ut pharetra sit amet aliquam id. A condimentum vitae sapien pellentesque habitant morbi.',
    media: [
      {
        alt: 'Rick',
        source: '/rm-thats-amorte.webp',
        aspectRatio: '16 / 9'
      }
    ]
  },
  render: (args) => <PostCard {...args} />
};
