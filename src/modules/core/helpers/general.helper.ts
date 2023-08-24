import fs from 'node:fs';
import path from 'node:path';

export default class GeneralHelper {
  public static moduleResolver(name: string, modulesDir?: string) {
    const moduleDir = modulesDir ?? path.resolve(__dirname, '../modules');

    const basename = path.basename(__filename);
    const paths: string[] = [];

    fs.readdirSync(moduleDir).forEach((dir) => {
      const modules = `${moduleDir}/${dir}`;

      fs.readdirSync(modules)
        .filter((module) => RegExp(name).exec(module)?.input)
        .forEach((model) => {
          const _paths = `${moduleDir}/${dir}/${model}`;

          fs.readdirSync(_paths)
            .filter(
              (file) => !file.startsWith('.') && file !== basename && (file.endsWith('.ts') || file.endsWith('.js')),
            )
            .forEach((file) => {
              paths.push(path.resolve(_paths, file));
            });
        });
    });

    return paths;
  }
}
