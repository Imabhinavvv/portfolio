
export type Category = 'all' | 'ai-ml' | 'web' | 'mobile';

export interface Project {
  id: number;
  title: string;
  category: Category;
  description: string;
  icon: string;
  gradient: string;
  tags: string[];
  featured: boolean;
  link: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}
