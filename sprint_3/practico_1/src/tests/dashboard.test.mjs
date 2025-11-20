import path from 'path'
import { fileURLToPath } from 'url'
import ejs from 'ejs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const viewPath = path.join(__dirname, '..', 'view', 'dashboard.ejs')

const superheroes = [
  { _id: '1', nombreSuperHeroe: 'Batman', nombreReal: 'Bruce Wayne', edad: 35, poderes: ['Detective', 'Tecnología'] },
  { _id: '2', nombreSuperHeroe: 'Superman', nombreReal: 'Clark Kent', edad: 30, poderes: ['Vuelo', 'Fuerza'] }
]

ejs.renderFile(viewPath, { superheroes }, (err, str) => {
  if (err) {
    console.error('Render error', err)
    process.exit(1)
  }
  if (!str.includes('Batman') || !str.includes('Superman') || !str.includes('Bruce Wayne')) {
    console.error('Los nombres no se renderizan correctamente')
    process.exit(1)
  }
  if (!str.includes('table') || !str.includes('btn btn-primary')) {
    console.error('No se detectan elementos Bootstrap esperados')
    process.exit(1)
  }
  console.log('OK')
})