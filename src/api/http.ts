import type { GraphsDto } from './dto/graphs.dto';
import type { LessonsDto } from './dto/lessons.dto';
import { CrudRepository } from './repositories/crud-repository';

import axiosInstance from '@/api/axios';

const http = {
  lessons: new CrudRepository<string[]>('/lessons', axiosInstance),
  lessonsStatuses: new CrudRepository<LessonsDto[]>('/lessons_with_status', axiosInstance),
  graphs: new CrudRepository<GraphsDto>('/graph_get', axiosInstance),
  load_file: new CrudRepository<string>('/load_file', axiosInstance),
};

export default http;
