import {
  Attributes,
  BulkCreateOptions,
  CreateOptions,
  CreationAttributes,
  FindAndCountOptions,
  FindOptions,
} from 'sequelize';
import { Model, Repository, Sequelize } from 'sequelize-typescript';

import { CoreTypes } from '../../../@types/core';
import { SQLDatabase } from '../../../config/database/sql.database';
import AbstractCrudRepository = CoreTypes.AbstractCrudRepository;
import ModelInstance = CoreTypes.ModelInstance;

export default class BaseRepository<M extends Model, Id extends number> implements AbstractCrudRepository<M, Id> {
  protected sequelize: Sequelize;
  private repository: Repository<M>;
  private declare readonly _model: string;

  constructor(modelInstance: ModelInstance<M>) {
    this._model = modelInstance.name;
    this.sequelize = SQLDatabase.sequelize;
    this.repository = this.sequelize.getRepository(modelInstance);
  }

  get model(): string {
    return this._model;
  }

  bulkCreate(records: ReadonlyArray<CreationAttributes<M>>, options?: BulkCreateOptions<Attributes<M>>): Promise<M[]> {
    return this.sequelize.transaction(async () => {
      return this.repository.bulkCreate(records, options);
    });
  }

  findAll(options?: FindOptions<Attributes<M>>): Promise<M[]> {
    return this.sequelize.transaction(async () => {
      return this.repository.findAll(options);
    });
  }

  findById(id: Id, options?: FindOptions<Attributes<M>>): Promise<M | null> {
    return this.sequelize.transaction(async () => {
      return this.repository.findByPk(id, options);
    });
  }

  findOne(options: FindOptions<Attributes<M>>): Promise<M | null> {
    return this.sequelize.transaction(async () => {
      return this.repository.findOne({ ...options });
    });
  }

  save(values: CreationAttributes<M>, options?: CreateOptions<Attributes<M>>): Promise<M> {
    return this.sequelize.transaction(async () => {
      return this.repository.create(values, options);
    });
  }

  findAllAndCount(options: FindAndCountOptions<Attributes<M>> | undefined): Promise<{ rows: M[]; count: number }> {
    return this.sequelize.transaction(async () => {
      return this.repository.findAndCountAll(options);
    });
  }
}
