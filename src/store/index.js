import { createPinia } from "pinia"
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)
export default pinia

import { useUserStore } from "./modules/user"
import { useDepartmentStore } from "./modules/department"
import { useJobStore } from "./modules/job"
import { useImageStore } from "./modules/image"

export { useUserStore, useDepartmentStore, useJobStore, useImageStore }