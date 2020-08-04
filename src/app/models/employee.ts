import { dependent } from './dependent';
export interface employee {
  name: string,
  salary: number,
  costOfBenefits: number,
  dependents: Array<dependent>
}
