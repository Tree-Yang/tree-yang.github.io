// Right-side sticky year rails for the publications page.
// Each .pub-layout section (journal articles, conference talks) gets its own
// rail: the script scans that section's jekyll-scholar year group headings
// (h2.bibliography), gives every heading a globally unique anchor id, and
// builds an axis-style nav that highlights the year currently in view.
// Class names appear here as literals so purgecss keeps their styles
// (purgecss scans _site/**/*.js).
document.addEventListener("DOMContentLoaded", function () {
  var rails = document.querySelectorAll(".pub-year-rail-list");
  if (!rails.length) return;

  var seen = {}; // year -> count, keeps anchor ids unique across sections

  rails.forEach(function (rail) {
    var layout = rail.closest(".pub-layout");
    if (!layout) return;

    var headings = layout.querySelectorAll(".publications h2.bibliography");
    var items = [];

    headings.forEach(function (heading) {
      var year = heading.textContent.trim();
      if (!/^\d{4}$/.test(year)) return;

      seen[year] = (seen[year] || 0) + 1;
      heading.id = "year-" + year + (seen[year] > 1 ? "-" + seen[year] : "");

      var link = document.createElement("a");
      link.className = "pub-year-link";
      link.href = "#" + heading.id;
      link.innerHTML = '<span class="pub-year-label">' + year + '</span><span class="pub-year-dot"></span>';

      var item = document.createElement("li");
      item.className = "pub-year-item";
      item.appendChild(link);
      rail.appendChild(item);

      items.push({ heading: heading, link: link });
    });

    if (!items.length) return;

    items[0].link.classList.add("active");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          items.forEach(function (item) {
            item.link.classList.toggle("active", item.heading === entry.target);
          });
        });
      },
      // Activate when the heading crosses the upper reading area.
      { rootMargin: "-70px 0px -65% 0px" }
    );

    items.forEach(function (item) {
      observer.observe(item.heading);
    });
  });
});
