# Tenach Tours: beta site

A static one-page site with no build step. Upload the whole folder to any static host
(Netlify, Vercel, Cloudflare Pages, GitHub Pages, or plain web hosting).

    index.html    the page
    styles.css    base styles and phone/tablet adjustments (layout and colours are inline in index.html)
    script.js     interview video overlay and quote form
    favicon.svg   browser tab icon
    images/       the seven photos from the current site

## Before going live
- **Quote form:** at the moment it opens the visitor's email app with the request filled in,
  addressed to shoshanatug@gmail.com. To receive enquiries without relying on the visitor's
  email app, set the form's `action` to a form service (Formspree, Netlify Forms, etc.)
  and remove the submit handler in script.js.
- **Interview video:** the YouTube ID is set at the top of script.js (`VIDEO_ID`). It plays
  from youtube-nocookie.com and is removed when the overlay closes, so playback stops.
- og:image uses a relative path. Some social networks need a full URL, so change it to
  https://<your-domain>/images/shoshana-british-museum.jpg once the domain is known.
