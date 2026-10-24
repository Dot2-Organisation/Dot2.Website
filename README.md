# Dot2. website

A static company website for Dot2., with Amazon product links, company information, contact details and a short privacy notice for its internal advertising tool.

## Local preview

Run from this directory:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

Open <http://127.0.0.1:8080>. Stop the server with `Ctrl+C`. There are no dependencies or build steps.

## GitHub Pages

The intended repository is `Dot2-Organisation/Dot2.Website`.

1. Push these files to the repository's `main` branch.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. Run **Deploy website to GitHub Pages** in the Actions tab, or push a change to `main`.

The included workflow publishes the HTML pages, shared and business stylesheets, carousel and quote scripts, and `assets/`. Once deployed, the default project URL is <https://dot2-organisation.github.io/Dot2.Website/>. The business page is at `business.html` and the privacy page is at `privacy.html` relative to that URL.

The custom domain `dot2.co.uk` can be configured in GitHub Pages and DNS later. No custom-domain or `CNAME` configuration is included.

## Editing

- `index.html`: homepage copy, product links and contact details.
- `business.html`: business service, fictional demo brand concepts, example pricing and quote request.
- `business.css`: business page layout and form styles.
- `quote.js`: browser-only quote email preparation and enquiry presets.
- `privacy.html`: privacy notice.
- `styles.css`: shared layout and responsive styles.
- `carousel.js`: mousepad carousel designs, image descriptions and Amazon links.
- `assets/`: company logo and product images, served locally by the website.

All local links are relative so the site works under the GitHub Pages repository path or a custom domain. The site has no analytics, tracking scripts, form backend or browser storage.

## Business enquiries

The quote form validates details and prepares a reviewable email draft addressed to `support@dot2.co.uk`. The visitor must open the draft and send it through their own email app. A copy-details option and direct email link provide a fallback; the website does not submit or store enquiries. There is no automatic marketing opt-in.

Prices are explicitly illustrative examples, not confirmed prices or checkout offers. Replace these examples once commercial terms are decided. Brand names and overlaid placements in the gallery are fictional demo concepts using current Dot2. artwork, not customer projects.

Before business outreach, assess the applicable marketing rules and lawful basis, provide identity, a privacy link and an easy opt-out, and maintain suppression records. The privacy notice describes intended business handling; keep provider and retention information aligned with actual operations as the service develops.
