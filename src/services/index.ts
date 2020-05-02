import { common } from '@/services/common';
import { user } from './user';
import { project } from './project';
import { ssh } from './ssh';
import { projectTask } from './projectTask';

const services = {
  common,
  user,
  project,
  projectTask,
  ssh
};

export default services;
