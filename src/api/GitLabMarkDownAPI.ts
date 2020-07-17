const getGitLabMarkDown = async (text: string) => {
  const url = 'https://gitlab.com/api/v4/markdown';
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: text, gfm: true }),
  };

  const result = await fetch(url, options);
  let rendered = await result.json();
  return rendered.html;
};

export default getGitLabMarkDown;
