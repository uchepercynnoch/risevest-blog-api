import { Attributes, CreationAttributes, FindAndCountOptions, FindOptions } from 'sequelize';
import { Model } from 'sequelize-typescript';

export interface IBaseDao<M extends Model, V> {
  CREATE(value: Partial<V>, options?: CreationAttributes<Attributes<M>>): Promise<M>;

  FIND_ONE(value: Partial<V>, options?: FindOptions<Attributes<M>>): Promise<M | null>;

  FIND_BY_ID(id: number, options?: FindOptions<Attributes<M>>): Promise<M | null>;

  FIND_ALL(options?: FindOptions<Attributes<M>>): Promise<M[]>;

  FIND_AND_COUNT_ALL(options?: FindAndCountOptions<Attributes<M>>): Promise<{ rows: M[]; count: number }>;
}
