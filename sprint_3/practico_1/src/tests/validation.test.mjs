import { validateSuperHeroe } from '../../../practico_2/validationRules.mjs'
import { validationResult } from 'express-validator'

function runMiddlewares(middlewares, req) {
  return new Promise((resolve) => {
    let i = 0
    const res = {}
    const next = () => {
      const mw = middlewares[i++]
      if (!mw) return resolve({ req, res })
      mw(req, res, next)
    }
    next()
  })
}

const req = { body: { nombreSuperHeroe: 'Flash', nombreReal: 'Barry Allen', edad: 28, poderes: 'Velocidad,Reflejos' } }

const middlewares = validateSuperHeroe()
runMiddlewares(middlewares, req).then(() => {
  const errors = validationResult({ ...req, get: () => {} })
  if (!errors.isEmpty()) {
    console.error('Errores de validación inesperados', errors.array())
    process.exit(1)
  }
  if (!Array.isArray(req.body.poderes) || req.body.poderes.length !== 2) {
    console.error('Sanitización de poderes falló. Valor:', req.body.poderes)
    process.exit(1)
  }
  console.log('OK')
})