# unicorn-whale

A significant advantage of using StackBlitz is the ability to generate a project without paying the cost of a huge and difficult to maintain `node_modules` folder. However, as of this writing, StackBlitz has [serious issues](https://github.com/stackblitz/core/issues/229]) around maintaining these packages.

This temporary situation has led me to try the [workspace](https://nrwl.io/nx/guide-nx-workspace) schematics of Nrwl Nx. This might mean the Nx is going to give me a way forward from my [nodejs repo](https://github.com/BryanWilhite/nodejs) which has two Angular projects with two `node_modules` folders, exceeding 250MB each, totalling over 60,000 files. This is not a situation that encourages experimentation with Angular projects.

Optimistically, this repo (and StackBlitz) will allow the Angular experimentation I am looking for.

@[BryanWilhite](https://twitter.com/BryanWilhite)