import {
  registerDecorator,
  ValidationOptions,
  // ValidatorConstraint,
  // ValidatorConstraintInterface,
} from 'class-validator';

// @ValidatorConstraint({ async: false })
// export class IsPlateConstraint implements ValidatorConstraintInterface {
//   validate(plate: any) {
//     // Regex para validar placas no formato Mercosul: 4 letras seguidas de 3 números
//     const mercosulPlateRegex = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
//     return typeof plate === 'string' && mercosulPlateRegex.test(plate);
//   }

//   defaultMessage() {
//     return 'Placa de carro inválida. Deve seguir o formato Mercosul: 3 letras, 1 número, 1 letra e 2 números (ex: ABC1D23)';
//   }
// }

export function IsLicense(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(plate: any) {
          const mercosulPlateRegex = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
          return typeof plate === 'string' && mercosulPlateRegex.test(plate);
        },

        defaultMessage() {
          return 'Invalid car plate. It must follow the Mercosur format: 3 letters, 1 number, 1 letter, and 2 numbers (e.g., ABC1D23).';
        },
      },
    });
  };
}
