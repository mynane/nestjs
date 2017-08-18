/**
 * @file config.js
 * @author denglingbo
 *
 */
var local = window.location;

window.config = {
    apiHost: `${local.protocol}//${local.host}`
};
