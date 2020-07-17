# GitLab Issue Viewer

## Setup

`yarn install` and then `yarn run start`

## Implementated Requirements Summary

### On screens 1024px wide and up, implement a two-column base layout

- [x] The left column contains a list of open issues, while the right column contains details and comments on the issue.

### The right column (or the second page) must contain the following information when an issue is selected:

- [x] Issue title
- [x] Issue author
- [x] Last modified date, as a humanized timestamp ("a few seconds ago", "5 minutes ago", "yesterday", "May 1, 2019")
- [x] Description -- convert the Markdown to HTML. Inline images must show up
- [x] Issue assigned to
- [x] Labels with colors
- [ ] Milestones (project doesn't seem to have milestones to display, show "None" when empty)
- [x] Due date

### Below the information about the issue, display all comments in that issue. Each comment must have:

- [x] Comment author
- [x] Date posted, as a humanized timestamp
- [x] The comment itself -- convert the Markdown to HTML. Inline images must show up
- [ ] You do not need to parse any references to issues, labels, merge requests, milestones or users. (all parsed to html)
- [ ] You must display discussions as a thread. (doesn't seem to have threads to display)

### On screens less than 1024px wide, the left and right columns described above must instead appear as two pages to the user.

- [x] The left side will become the first page, while the right side will be shown after the user selects an issue from the list.

### When no issue is selected, display a random image from https://picsum.photos occupying all of the right side.

- [x] Done

### Update the browser history accordingly when selecting an issue.

- [ ] History back and forward buttons must behave intuitively as I navigate around your app. (not sure if manual modification or just the app behavior)

### Use loading states while loading data from the API.

- [x] Done

### Use code splitting to load component code as needed.

- [x] Used sparingly
