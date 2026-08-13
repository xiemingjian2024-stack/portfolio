const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export function assetPath(path) {
  if (typeof path !== 'string' || !path.startsWith('/assets/')) {
    return path;
  }

  return `${basePath}${path}`;
}

export function withAssetBase(value) {
  if (Array.isArray(value)) {
    return value.map(withAssetBase);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, withAssetBase(nestedValue)])
    );
  }

  return assetPath(value);
}
