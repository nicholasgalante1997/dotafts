export type AuthorLike = Partial<string | Author>;
type Author = {
  name: string;
  email: string;
  bio?: Bio;
  pfp?: ProfilePicture;
};

type Bio = {
  description: string;
  lastUpdated: Date;
};

type ProfilePicture = {
  source: string;
  sourceSet?: [string, number][];
  alt?: string;
  d?: {
    height?: string | number;
    width?: string | number;
  };
};
