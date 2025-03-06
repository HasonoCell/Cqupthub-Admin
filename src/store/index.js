import { createPinia } from "pinia"
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)
export default pinia

import { useUserStore } from "./modules/user"
import { useDepartmentStore } from "./modules/department"
import { usePositionStore } from "./modules/position"
import { useImageStore } from "./modules/image"

export { useUserStore, useDepartmentStore, usePositionStore, useImageStore }