import {Options, CustomComponents} from './types/app.type';

import {ContainerObject} from './objects/container.object';

export function initializeApp(
  options?: Options,
  components?: CustomComponents,
  name?: string
) {
  const root = (window as unknown) as Record<
    'SHEETBASE_CONTAINER',
    ContainerObject
  >;
  if (!root.SHEETBASE_CONTAINER) {
    Object.defineProperty(window, 'SHEETBASE_CONTAINER', {
      value: new ContainerObject(),
    });
  }
  return root.SHEETBASE_CONTAINER.createApp(options, components, name);
}
