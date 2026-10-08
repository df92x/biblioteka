// Cloudflare Worker: prosty serwer pośredniczący (CORS) dla wyszukiwarki ISBN.
// Przepuszcza tylko zapytania do wymienionych domen.
const ALLOWED = ['www.poczytaj.pl', 'staticl.poczytaj.pl', 'data.bn.org.pl', 'covers.openlibrary.org'];

export default {
  async fetch(req) {
    const cors = { 'Access-Control-Allow-Origin': '*' };
    const target = new URL(req.url).searchParams.get('url');
    if (!target) return new Response('missing url', { status: 400, headers: cors });
    let u;
    try { u = new URL(target); } catch { return new Response('bad url', { status: 400, headers: cors }); }
    if (u.protocol !== 'https:' || !ALLOWED.includes(u.hostname))
      return new Response('forbidden', { status: 403, headers: cors });
    const r = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0' }, cf: { cacheTtl: 86400, cacheEverything: true } });
    const h = new Headers(r.headers);
    h.set('Access-Control-Allow-Origin', '*');
    return new Response(r.body, { status: r.status, headers: h });
  },
};
