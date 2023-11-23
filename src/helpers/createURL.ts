export const createURL = ({
  protocol,
  subdomain,
  domain
}: {
  protocol?: string;
  subdomain?: string;
  domain: string;
}): string => `${protocol}://${subdomain && `${subdomain}.`}${domain}`;
