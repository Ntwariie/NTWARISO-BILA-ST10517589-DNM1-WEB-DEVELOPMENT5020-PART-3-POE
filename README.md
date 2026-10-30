# Paws & Hope Animal Rescue — Part 3

## Project overview
This is a student assessment website for Paws & Hope Animal Rescue. The website contains Home, About Us, Services, Enquiry and Contact pages. The organisation and contact details are for this assessment project; confirm all details with the project owner before using them publicly.

## How to run the website
1. Extract the ZIP file.
2. Open the `3. HTML & BASIC CONTENT` folder in Visual Studio Code.
3. Open `index.html` in a browser or use the Live Server extension.
4. Keep `style.css`, `js/script.js`, the `images` folder, `robots.txt` and `sitemap.xml` in the same website folder as the HTML pages.
5. An internet connection is needed for the Leaflet/OpenStreetMap map tiles and for the browser to open an email application. The site still provides an OpenStreetMap fallback link if the map library does not load.

## JavaScript features
- Current year is inserted in the footer.
- Images with the `gallery-image` class open in a keyboard-accessible lightbox; Escape and the close button dismiss it.
- Services can be searched and sorted alphabetically or returned to their original order. A live result count and no-results message update with the search.
- The Services page includes expandable FAQ disclosures using native HTML.
- The Contact page loads an interactive Leaflet map using OpenStreetMap data. Its marker is an approximate Polokwane city-centre location, not a verified office address.
- Both forms use HTML constraints and JavaScript validation. The enquiry form displays service-specific guidance; both forms compile validated information into a `mailto:` email draft addressed to `info@pawsandhope.co.za`.

## Form behaviour and limitation
The form does not silently store or upload information. After successful validation, the browser asks the visitor's device to open its default email application with a prepared draft. The visitor must review and send the email themselves. If no email application is configured, the draft may not open; the visitor can copy the details and send them manually. A `mailto:` link is not AJAX and does not guarantee delivery. To provide real server-side or AJAX submission, connect a secure form endpoint or a form service and configure it before deployment. The website does not confirm adoption, animal availability, volunteer placement or sponsorship.

## SEO work included
- Page-specific title tags, meta descriptions and relevant keyword metadata.
- Semantic heading structure, mobile viewport metadata, descriptive alt text and internal navigation links.
- Responsive styling and lightweight client-side code.
- Starter `robots.txt` and `sitemap.xml` files.

### SEO items to finish after deployment
- Replace relative sitemap locations with full canonical HTTPS URLs.
- Replace the placeholder sitemap comment in `robots.txt` with the full sitemap URL.
- Add the published URL to Google Search Console or another webmaster tool.
- Promote the site through legitimate relevant social channels and seek appropriate backlinks; do not buy spam links.
- Confirm the organisation's real address, phone number, email and opening hours before public release.

## Part 2 feedback addressed
- Standardised the header and navigation across pages and repaired the missing About Us page.
- Standardised the footer links and dynamic copyright year.
- Corrected invalid CSS custom-property references while retaining the cream/orange/dark colour direction.

## Testing checklist
- [ ] Open all five pages and check all navigation/footer links.
- [ ] Open an image with mouse and keyboard; close with Escape and the close button.
- [ ] Search services, search for a word with no results, and test both sort options.
- [ ] Expand and collapse the FAQs.
- [ ] Submit each form with empty fields, malformed email, invalid phone (enquiry), short message and valid details.
- [ ] Confirm a valid form opens a draft email with the expected fields and recipient. Do not assume it was sent until you send it in the email application.
- [ ] Test the map while connected to the internet and use the fallback link if needed.
- [ ] Test the layout on mobile and desktop widths.
- [ ] After deployment, update sitemap/robots with the real URL and verify every deployed page.

## GitHub and deployment actions still required
The files in this ZIP are not proof of GitHub commits, a pushed repository or a published website. In your own GitHub account, commit changes using descriptive messages (for example, `Add service search and sorting`, `Validate forms and prepare email drafts`, `Add interactive map and SEO metadata`), push the commits, deploy the site using a free static host, and add the real repository/deployment links to your submission.

## Changelog
See `CHANGELOG_PART3.md` for a detailed record of changes and tests.

## References
- Google Search Central. (n.d.). *SEO Starter Guide*. https://developers.google.com/search/docs/fundamentals/seo-starter-guide (Accessed 28 October 2026).
- Leaflet. (n.d.). *Leaflet — an open-source JavaScript library for interactive maps*. https://leafletjs.com/ (Accessed 28 October 2026).
- MDN Web Docs. (n.d.). *Constraint validation*. https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation (Accessed 28 October 2026).
- MDN Web Docs. (n.d.). *HTML forms guide*. https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms (Accessed 28 October 2026).
- MDN Web Docs. (n.d.). *Document Object Model (DOM)*. https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model (Accessed 28 October 2026).
- OpenStreetMap contributors. (n.d.). *Copyright and licence*. https://www.openstreetmap.org/copyright (Accessed 28 October 2026).
- Sitemaps.org. (n.d.). *Sitemaps XML format*. https://www.sitemaps.org/protocol.html (Accessed 28 October 2026).
