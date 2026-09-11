// Central entry for the seeder setup.
// Self-contained module: routes + controllers + services all live under src/seeder/*
// so the old scattered src/routes/* and src/controllers/* folders are no longer needed.

export { seedAll } from './controllers/seederController.js';
export { runSeedAll } from './services/seederService.js';
export { seederRouter } from './routes/index.js';
