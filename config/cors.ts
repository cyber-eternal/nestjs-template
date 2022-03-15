const parseOrigin = (value: string) => {
  if (value === 'true' || value === 'false') {
    return value === 'true';
  }

  if (value === '*') {
    return /^(.*)/;
  }

  const hosts = value.split(',');
  return hosts.map((v) => v.trim());
};

export default {
  origin: parseOrigin(process.env.CORS_HOST || '*'),
  credentials: process.env.CORS_CREDENTIALS === 'true',
  methods: process.env.CORS_METHODS || [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'OPTIONS',
    'HEAD',
  ],
  allowedHeaders: process.env.CORS_HEADERS || ['Content-Type', 'Authorization'],
};
