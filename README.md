# Falk Bonitz Rafique — website

A static site: plain HTML, CSS and a little JavaScript. There's no build step and no framework, and hosting on GitHub Pages costs nothing.

```
index.html                     all page content
styles.css                     design (colours, type, layout)
script.js                      menu, rising-sun scroll effect, video/Spotify players
images/                        photos (extracted from the EPK)
fonts/                         self-hosted fonts (Marcellus, Cormorant Garamond; SIL Open Font License)
falk-bonitz-rafique-epk.pdf    press kit, linked from the Booking section
```

## Put it on GitHub Pages

1. Create a new repository on GitHub, e.g. `falkbonitz`. It must be **public** on a free account.
2. Upload every file and folder in this directory to the root of the repository.
   (On github.com: *Add file → Upload files*, then drag in the contents of the folder.)
3. Go to *Settings → Pages*. Under *Build and deployment* choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then *Save*.
4. After a minute or two the site is live at `https://<your-username>.github.io/<repo-name>/`.

## Connect a custom domain later

1. In *Settings → Pages → Custom domain*, enter the domain (e.g. `falkbonitz.com`) and save. GitHub adds a `CNAME` file to the repo.
2. At your domain registrar, add DNS records:
   - For the bare domain (`falkbonitz.com`): four **A** records pointing to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - For `www`: a **CNAME** record pointing to `<your-username>.github.io`
3. When the DNS check passes, tick **Enforce HTTPS**.
4. In `index.html`, change `og:image` to the full URL (`https://falkbonitz.com/images/og-image.jpg`) so link previews work on WhatsApp, Facebook and similar apps.

(GitHub's documentation on custom domains is the authority if any of these values change.)

## Editing content

- **Add a video:** in `index.html`, find `HOW TO ADD A VIDEO`, copy one `<a class="clip">` block, and change the YouTube link, the `data-youtube` ID and the title. Delete the two "Video slot" placeholders when you no longer need them.
- **Add a photo:** put the file in `images/`, then find `HOW TO ADD A PHOTO` and replace a "Photo slot" placeholder with
  `<figure><img src="images/your-photo.jpg" alt="Short description" loading="lazy"></figure>`.
  Add `class="g-wide"` or `class="g-tall"` to the `<figure>` for landscape or portrait shots.
- **Add a festival:** copy one `<li>` in the festival list (newest first).

## Before going public, check with Falk

- **Award name:** the EPK says "GIMMA Awards Taiwan 2026". Taiwan's indie award is usually written **GIMA** (Golden Indie Music Awards). Confirm the exact name and category.
- **Track list:** the EPK text lists "El Ist Ein Schnitter" and "El Buen Schnitter". The album artwork reads "Es Ist Ein Schnitter" and "El Buen Camino", and the site uses the artwork's spelling. Track 3 appears on the artwork as "Quo Vadis – The Old …" (cut off). Confirm the full title.
- **Social links:** only the handle `@falkbonitz` appears in the EPK. The Instagram and Facebook URLs are a best guess.
- **Phone numbers:** both are shown publicly. Remove them if he'd rather get booking enquiries by email only.
- **Higher-resolution photos:** the images came out of the PDF, so most are 900–1800 px wide. Originals would look sharper on large screens.
