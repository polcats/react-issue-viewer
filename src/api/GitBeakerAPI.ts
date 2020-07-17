import { ProjectsBundle } from '@gitbeaker/browser';

const gitlabData = {
  host: 'https://gitlab.icannhas.com',
  token: '2syhQoC3hVxWvVyZueHH',
};

const groupId = 120;
const projectId = 349;
const gitBeakerAPI = new ProjectsBundle(gitlabData);

export { gitlabData, groupId, projectId, gitBeakerAPI };
