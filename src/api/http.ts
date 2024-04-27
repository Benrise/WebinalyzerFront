import type { GraphsDto } from "./dto/graphs.dto"
import { CrudRepository } from "./repositories/crud-repository"

import axiosInstance from '@/api/axios'

const http = {
    lessons: new CrudRepository<string[]>('/lessons', axiosInstance),
    graphs: new CrudRepository<GraphsDto>('/graph_get', axiosInstance),
}

export default http