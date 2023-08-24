import { JwtPayload } from 'jsonwebtoken';

export declare namespace CoreTypes {
  import type { NextFunction, Request, Response } from 'express';
  import type {
    Attributes,
    Dialect,
    BulkCreateOptions,
    CreateOptions,
    CreationAttributes,
    FindAndCountOptions,
    FindOptions,
  } from 'sequelize';

  import type { Model } from 'sequelize-typescript';

  type EnvType = 'development' | 'test';

  type AnyObjectType = Record<string, unknown>;

  type SQLDBConfigType = {
    host: string;
    username: string;
    password: string;
    port: number;
    dialect: Dialect;
    database: string;
  };

  type NoSQLDBConfigType = {
    host: string;
    port: number;
    database: number;
  };

  interface IAppJwtPayload extends JwtPayload {
    id: number;
  }

  type JwtConfigType = { secret: string; expiry: string | number };

  type SettingsConfigType = {
    postgres: Record<EnvType, SQLDBConfigType>;
    redis: Record<EnvType, NoSQLDBConfigType>;
    jwt: Record<EnvType, JwtConfigType>;
  };

  type ModelInstance<M> = new () => M;

  type RouteEndpointConfigType = {
    name: string;
    path: string;
    method: RouteMethodsType;
    handler: AsyncWrapperType;
  };

  type HttpResponseType<T> = {
    message: string;
    code: number;
    timestamp?: string;
    result?: T | null;
    results?: T[];
  };

  type RouteMethodsType = 'get' | 'post' | 'patch' | 'put' | 'delete';
  type AsyncWrapperType = (req: Request, res: Response, next: NextFunction) => Promise<void>;
  type RouteEndpointsType = RouteEndpointConfigType[];

  abstract class AbstractCrudRepository<M extends Model = Model, Id extends number = number> {
    model?: string;

    /**
     * @name save
     * @param values
     * @param options
     * @desc
     * Save an instance of a model to the database.
     * This method calls sequelize create method.
     * Pass optional config, to control the query outcome
     */
    save(values: CreationAttributes<M>, options?: CreateOptions<Attributes<M>>): Promise<M>;

    /**
     * @name findById
     * @param id
     * @param options
     * @desc
     * Find model instance by id.
     * This method calls sequelize findByPk method.
     * Pass optional config, to control the query outcome
     */
    findById(id: Id, options?: FindOptions<Attributes<M>>): Promise<M | null>;

    /**
     *
     * @param options
     */
    findAll(options?: FindOptions<Attributes<M>>): Promise<M[]>;

    /**
     *
     * @param options
     */
    findAllAndCount(options?: FindAndCountOptions<Attributes<M>>): Promise<{ rows: M[]; count: number }>;

    /**
     *
     * @param options
     */
    findOne(options: FindOptions<Attributes<M>>): Promise<M | null>;

    /**
     * @name bulkCreate
     * @param records
     * @param options
     * @desc
     * Create sqlModels passed as arrays, at once.
     * This method calls the bulkCreate method in sequelize.
     * Pass optional config, to control the query outcome
     */
    bulkCreate(records: ReadonlyArray<CreationAttributes<M>>, options?: BulkCreateOptions<Attributes<M>>): Promise<M[]>;
  }
}
