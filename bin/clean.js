#!/usr/bin/env node
/**
 * @file clean.js
 * @summary prune remote and local branches, then run git garbage collection
 */
const { execEachRepo } = require('../lib/exec');

execEachRepo([
    'git fetch',
    'git remote prune origin',
    'git gc',
]);

