// Return the list of DVD available locally.

'use strict';


import fs = require('fs');
import path = require('path');

import utils = require('../../utils');

export = getDVDList;

/**
 * Return the list of directory given a directory.
 * @todo Refactor to use asynchronous API.
 *
 * @param {string} dvdPath
 * @param {function(Array.<string>)} callback
 */
function getDVDList(dvdPath: string, callback) {
  var dvds = fs.readdirSync(dvdPath)
    .filter(function(file) {
      var filePath = path.join(dvdPath, file);
      // @todo Use asynchronous functions here.
      var stats = fs.statSync(filePath);
      return stats.isDirectory();
    })
    .map(function(dir) {
      return {
        name: utils.formatTitle(dir),
        dir: dir
      };
    });

  callback(dvds);
}
