import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'basis',

  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    },
  ],

  copy: [
    { src: '/src/components/basis-transcoder/basis_transcoder.wasm', dest: 'assets/' }
  ]
};
