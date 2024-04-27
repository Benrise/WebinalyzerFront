import type { LessonsDto } from "./dto/lessons.dto"
import type { ChartsDto } from "./dto/charts.dto"
import { CrudRepository } from "./repositories/crud-repository"

import axiosInstance from '@/api/axios'

const http = {
    lessons: new CrudRepository<LessonsDto>('/lessons', axiosInstance),
    charts: new CrudRepository<ChartsDto>('/charts', axiosInstance),
}

export default http