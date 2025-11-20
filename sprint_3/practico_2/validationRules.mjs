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
        .customSanitizer((value) => {
            if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
            if (typeof value === 'string') return value.split(',').map((v) => v.trim()).filter(Boolean);
            return [];
        })
        .custom((arr) => Array.isArray(arr) && arr.length > 0)
        .withMessage('Los poderes deben ser un arreglo de cadenas de texto con al menos un elemento'),
];