import { ProjectsBundle } from '@gitbeaker/browser';

const gitlabData = {
  host: process.env.REACT_APP_HOST_URL,
  token: process.env.REACT_APP_TOKEN,
};

const groupId = process.env.REACT_APP_GROUP_ID;
const projectId = process.env.REACT_APP_PROJECT_ID;
const gitBeakerAPI = new ProjectsBundle(gitlabData);

export { gitlabData, groupId, projectId, gitBeakerAPI };
