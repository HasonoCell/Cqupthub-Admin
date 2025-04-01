import { createPinia } from "pinia"
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)
export default pinia

import { useDepartmentStore } from "./modules/department"
import { usePositionStore } from "./modules/position"
import { useImageStore } from "./modules/image"
import { useProjectStore } from "./modules/project"
import { useGameStore } from './modules/game'

export { useDepartmentStore, usePositionStore, useImageStore, useProjectStore, useGameStore }