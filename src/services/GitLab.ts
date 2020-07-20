import { ProjectsBundle } from '@gitbeaker/browser';

const getGitLabMarkDown = async (text: string) => {
  const url = 'https://gitlab.com/api/v4/markdown';
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: text, gfm: true }),
  };

  const result = await fetch(url, options);
  const rendered = await result.json();
  return rendered.html;
};

const gitlabData = {
  host: 'https://gitlab.icannhas.com',
  token: process.env.REACT_APP_TOKEN,
};

const groupId = 120;
const projectId = 349;
const gitBeakerAPI = new ProjectsBundle(gitlabData);

export { gitlabData, groupId, projectId, gitBeakerAPI };
export default getGitLabMarkDown;
