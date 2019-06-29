import { a as patchEsm, b as bootstrapLazy } from './chunk-0a2a72f3.js';

const defineCustomElements = (win, options) => {
  return patchEsm().then(() => {
    bootstrapLazy([["basis-transcoder_2",[[1,"basis-transcoder",{"basisSrc":[1,"basis-src"],"height":[2],"width":[2]}],[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]]], options);
  });
};

export { defineCustomElements };
