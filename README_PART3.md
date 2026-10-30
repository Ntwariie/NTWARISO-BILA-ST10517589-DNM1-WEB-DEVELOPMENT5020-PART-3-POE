# Paws & Hope Animal Rescue — Part 3

## Project overview
This is a student assessment website for Paws & Hope Animal Rescue. It includes pages for Home, About Us, Services, Enquiry and Contact.

## How to run the website
1. Extract the ZIP file.
2. Open the `3. HTML & BASIC CONTENT` folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the Live Server extension in VS Code.
4. Keep `style.css`, the `js` folder, the `images` folder, `robots.txt` and `sitemap.xml` in the same website folder as the HTML pages.

## Part 3 JavaScript features
- **Automatic copyright year:** the footer year is set to the current year.
- **Image lightbox:** click or keyboard-focus an image and press Enter/Space to open a larger preview. Close it using the close button, Escape, or by clicking outside the image.
- **Service search/filter:** the Services page filters service cards while the visitor types and announces the number of results.
- **Enquiry form validation:** checks required fields, email format and field lengths, then provides guidance based on the selected enquiry type.
- **Contact form validation:** checks general-message form fields and displays an on-page confirmation.
- **FAQ accordions:** the Services page uses native HTML `details` and `summary` elements.

## Important form limitation
The contact and enquiry forms are **front-end demonstrations only**. JavaScript validates the fields and displays feedback in the browser, but it does not email, upload, store or send the submitted information to a server. A real production website would need a secure server-side form handler or a configured form service. The on-page message does not confirm animal availability, adoption approval or sponsorship arrangements.

## SEO work included
- Page-specific titles, meta descriptions and keywords.
- Clear page heading structure and descriptive image alternative text.
- Internal navigation links between all five pages.
- `robots.txt` and `sitemap.xml` starter files.
- Mobile viewport metadata and responsive CSS.

After publishing, update `robots.txt` and `sitemap.xml` to use the actual full HTTPS URL for the deployed website. Search engines may not use keyword meta tags as a ranking signal; the main SEO work is useful page content, titles, descriptions, accessible headings, alt text, internal links and mobile-friendly layout.

## Changelog
See `CHANGELOG_PART3.md` for the detailed list of changes and testing notes.

## References
- MDN Web Docs. *Document Object Model (DOM).* https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
- MDN Web Docs. *HTML forms guide.* https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms
- MDN Web Docs. *Constraint validation.* https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation
- Google Search Central. *SEO Starter Guide.* https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Sitemaps.org. *Sitemaps XML format.* https://www.sitemaps.org/protocol.html

## Before submission
- Test every navigation and footer link.
- Test both forms with empty fields, invalid email, and valid entries.
- Test service search using words such as “adoption” and “foster”.
- Test the image lightbox with mouse and keyboard, including Escape to close.
- Check the pages on desktop and mobile widths.
- Update the sitemap and robots file after deployment.
- Commit the changes to GitHub with descriptive commit messages and add the published website URL to the POE where required.
