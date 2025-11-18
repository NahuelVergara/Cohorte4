import {body} from 'express-validator';

export const validateSuperHeroe = () => [
    body('nombreSuperHeroe')
        .trim()
        .isLength({min: 3, max: 60})
        .notEmpty()
        .withMessage('El nombre del superhéroe es obligatorio')
        .isString()
        .withMessage('El nombre del superhéroe debe ser una cadena de texto'),
    body('nombreReal')
        .trim()
        .isLength({min: 3, max: 60})
        .notEmpty()
        .withMessage('El nombre real es obligatorio')
        .isString()
        .withMessage('El nombre real debe ser una cadena de texto'),
    body('edad')
        .trim()
        .notEmpty()
        .withMessage('La edad es obligatoria')
        .isInt({min: 0})
        .withMessage('La edad debe ser un número entero positivo'),
    body('poderes')
        .trim()
        .isLength({min: 3, max: 60})
        .notEmpty()
        .withMessage('Los poderes son obligatorios')
        .isArray({min: 1})
        .withMessage('Los poderes deben ser un arreglo de cadenas de texto'),
];