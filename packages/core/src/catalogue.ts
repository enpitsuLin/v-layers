import { ref } from 'vue'
import type { OlCatalogue } from './types'

export const catalogue = ref<OlCatalogue>({})

export const extend = (objects: any) => void Object.assign(catalogue.value, objects)

export default { catalogue, extend }
