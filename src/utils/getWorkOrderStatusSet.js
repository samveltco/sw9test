// ©2024 Austin App House. All rights reserved.
const getWorkOrderStatusSet = (values, needFilterByRouterStatus, needFilterWithoutRouterStatus) => {
  const result = new Set(values || []);
  if (needFilterByRouterStatus) {
    result.add('routed');
    if (!needFilterByRouterStatus.published) result.delete('published');
    if (!needFilterByRouterStatus.draft) result.delete('draft');
  }
  if (!needFilterWithoutRouterStatus && result.has('published')) {
    result.add('routed');
  }
  return result;
};

export default getWorkOrderStatusSet;
