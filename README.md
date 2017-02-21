# Project Stab

One Paragraph of project description goes here.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisities

 - If needed, [install](https://nodejs.org/en/) `Node.js` and `npm`
 - If needed, install `gulp` with `npm install gulp -g`

### Installing

- Clone this repo with `git clone {{repo}}` or download the zip-file.
 - In terminal, `cd` to the folder containing your project.
 - In terminal, type `npm install`. If (and _only_ if) `npm install` isn't working, try `sudo npm install`. This should install all [dependencies](#dependencies).
 - In terminal enter `gulp`.
 - Open your browser at `http://localhost:8080`. Use [LiveReload plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) if needed. Browser will refresh after every change in code.
 - Edit your code inside `assets` folder.
 - All compiled, minified and optimized files will be created and updated in `public` folder. Don't edit files in this folder.
 - Keep `gulp` running while you're making changes. When you want stop the gulp task, hit `ctrl + c`.

## File Structure

This project use Foundation SASS-files and its Panini library.

### HTML structure

- All html-files stored in `assets/html` folder.
- A template is a common layout that every page in your design shares. It's possible to have multiple templates, but generally you'll only need one, and a page can only use one template. In the prototyping template, the default layout is found under `assets/html/layouts/default.html`.
- The pages make up the guts of your layouts. These files will just have the middle section of the design, since the layout already covers the top and bottom. They are in `assets/html/pages/`.
- Partials allow you to inject HTML anywhere in a page or layout. They're really useful when you need to repeat certain chunks of code throughout your pages(as footer and header).
- Result will be in `public/` folder.

### CSS structure

- Write your code in `assets/scss/_*.scss` files. Gulp will automatically concat required files into one result file `public/css/style.css`.
- `style.scss` - Main file, enable\disable Foundation features here. If needed, `@import` your `_*.scss` files.
- `_settings.scss` - Foundation variables. You can add your own at the bottom of file.
- `_base.scss` - Unclassed selectors goes here.
- `_objects.scss` - Components goes here.
- `_header.scss` and `_footer.scss` - Well, you know.
- `_index.scss` - Major selectors goes here. If needed, split this files into small ones.
- `_ui.scss` - UI chunks (`.themed`, `.error` etc) .
- `_trumps.scss` - overrides and helper classes (`.centered`, `.relative` etc) .

### JS structure

- Write your JS code into `assets/js/project.js`.
- Gulp will concat all files from `jsConcat` variable at `gulpfile.js` into one file, minify it and outpu it into `public/js/app.js`.

## Authors

* **Artem Slepets** - [linkedin](https://ua.linkedin.com/in/artemslepets)
