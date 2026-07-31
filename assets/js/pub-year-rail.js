// Right-side sticky year rail for the publications page.
// Scans the jekyll-scholar year group headings (h2.bibliography), gives each
// unique year an anchor id, and builds an axis-style nav that highlights the
// year currently in view. Class names appear here as literals so purgecss
// keeps their styles (purgecss scans _site/**/*.js).
document.addEventListener("DOMContentLoaded", function () {
  var rail = document.querySelector(".pub-year-rail-list");
  if (!rail) return;

  var headings = document.querySelectorAll(".publications h2.bibliography");
  var seen = {};
  var items = [];

  headings.forEach(function (heading) {
    var year = heading.textContent.trim();
    if (!/^\d{4}$/.test(year)) return;

    // A year can appear in both the journal and the talks section; only the
    // first occurrence gets listed in the rail.
    if (seen[year]) {
      heading.id = "year-" + year + "-" + ++seen[year];
      return;
    }
    seen[year] = 1;
    heading.id = "year-" + year;

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

  var setActive = function (heading) {
    items.forEach(function (item) {
      item.link.classList.toggle("active", item.heading === heading);
    });
  };

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target);
      });
    },
    // Activate when the heading crosses the upper reading area.
    { rootMargin: "-70px 0px -65% 0px" }
  );

  items.forEach(function (item) {
    observer.observe(item.heading);
  });
});
