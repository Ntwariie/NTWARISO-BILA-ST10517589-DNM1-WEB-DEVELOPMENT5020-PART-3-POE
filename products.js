/* Service search, live filtering and alphabetical sorting on services.html */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('serviceGrid');
  if (!grid) return;

  const search = document.getElementById('serviceSearch');
  const sortControl = document.getElementById('serviceSort');
  const count = document.getElementById('searchCount');
  const noResults = document.getElementById('noServices');
  const cards = Array.from(grid.querySelectorAll('.card'));
  const originalOrder = new Map(cards.map((card, index) => [card, index]));

  function updateServices() {
    const query = search ? search.value.trim().toLocaleLowerCase() : '';
    const sort = sortControl ? sortControl.value : 'default';
    const sortedCards = [...cards].sort((a, b) => {
      const titleA = (a.querySelector('h3')?.textContent || '').trim();
      const titleB = (b.querySelector('h3')?.textContent || '').trim();
      if (sort === 'az') return titleA.localeCompare(titleB);
      if (sort === 'za') return titleB.localeCompare(titleA);
      return originalOrder.get(a) - originalOrder.get(b);
    });

    bortedCards.forEach((card) => {
      grid.appendChild(card);
      card.hidden = !card.textContent.toLocaleLowerCase().includes(query);
    });
    const visible = sortedCards.filter((card) => !card.hidden).length;
    if (count) count.textContent = `${visible} of ${cards.length} services shown.`;
    if (noResults) noResults.hidden = visible !== 0;
  }

  if (search) search.addEventListener('input', updateServices);
  if (sortControl) sortControl.addEventListener('change', updateServices);
  updateServices();
});
