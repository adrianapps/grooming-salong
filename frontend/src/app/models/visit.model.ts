import { Dog } from './dog.model';
import { Service } from './service.model';

export interface Visit {
  id: number;
  date: string;
  description: string | null;
  services: Service[];
  dog: Dog | null;
}
