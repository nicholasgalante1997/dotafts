import { AuthProviderProps } from '@/contexts/Auth/types';

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
  title: string;
  description: string;
  css?: string[];
  theme?: 'light' | 'dark';
} & Pick<AuthProviderProps, 'authState'>;

export default LayoutProps;
