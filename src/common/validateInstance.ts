import { ValidatorOptions, validate } from 'class-validator';

const ValidatorOptions: ValidatorOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  validationError: {
    target: false,
    value: false,
  },
};

/**
 * Valida los datos proporcionados y crea una instancia de la clase especificada.
 * @template T - El tipo de clase que se creará.
 * @param {object} body - Los datos a validar y utilizar para crear la instancia.
 * @param {new () => T} ClassType - El constructor de la clase a instanciar.
 * @returns {Promise<T>} Una promesa que se resuelve en la instancia creada si los datos son válidos.
 * @throws {Error} Si los datos no son válidos, se arroja un error con el mensaje del primer error encontrado.
 */
export async function validateAndCreate<T>(
  body: any,
  ClassType: new () => T
): Promise<T> {
  const instance: any = new ClassType();
  Object.assign(instance, body);
  const arrayErrors = await validate(instance, ValidatorOptions);
  if (arrayErrors.length === 0) return instance;

  let keyError: string = '';
  arrayErrors.forEach((e) => {
    const obj = e.constraints;
    for (const key in obj) {
      keyError = obj[key];
      break;
    }
  });

  throw new Error(keyError || 'Datos invalidos');
}
