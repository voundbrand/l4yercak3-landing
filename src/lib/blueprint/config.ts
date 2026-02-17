/**
 * Blueprint PDF URL mapping by agency stage.
 * Each stage maps to an environment variable pointing to the hosted PDF.
 */

const BLUEPRINT_URLS: Record<string, string | undefined> = {
  aspiring: process.env.BLUEPRINT_PDF_URL_ASPIRING,
  starter: process.env.BLUEPRINT_PDF_URL_STARTER,
  growing: process.env.BLUEPRINT_PDF_URL_GROWING,
  scaling: process.env.BLUEPRINT_PDF_URL_SCALING,
  established: process.env.BLUEPRINT_PDF_URL_ESTABLISHED,
};

export function getBlueprintDownloadUrl(stage: string): string {
  return BLUEPRINT_URLS[stage] || BLUEPRINT_URLS['growing'] || 'https://l4yercak3.com/blueprint/download';
}
