export function CanonicalUrl({ path }: { path?: string }) {
  const baseUrl = "https://www.strongbots.com"
  const canonicalUrl = path ? `${baseUrl}/${path}` : baseUrl

  return <link rel="canonical" href={canonicalUrl} />
}

