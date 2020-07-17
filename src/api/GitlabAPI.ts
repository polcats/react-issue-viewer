import { ProjectsBundle } from '@gitbeaker/browser';

export const gitlabData = {
  host: 'https://gitlab.icannhas.com',
  token: '2syhQoC3hVxWvVyZueHH',
};

export const groupId = 120;
export const projectId = 349;
export const gitlabAPI = new ProjectsBundle(gitlabData);
