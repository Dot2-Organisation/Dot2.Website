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

The included workflow publishes only `index.html`, `privacy.html`, `styles.css`, `carousel.js` and `assets/`. Once deployed, the default project URL is <https://dot2-organisation.github.io/Dot2.Website/>. The privacy page is at `privacy.html` relative to that URL.

The custom domain `dot2.co.uk` can be configured in GitHub Pages and DNS later. No custom-domain or `CNAME` configuration is included.

## Editing

- `index.html`: homepage copy, product links and contact details.
- `privacy.html`: privacy notice.
- `styles.css`: shared layout and responsive styles.
- `carousel.js`: mousepad carousel designs, image descriptions and Amazon links.
- `assets/`: company logo and product images, served locally by the website.

All local links are relative so the site works under the GitHub Pages repository path or a custom domain. The site has no analytics, tracking scripts or forms.
