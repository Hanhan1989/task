  // Hacemos que los elementos de cada columna sean movibles
  new Sortable(document.getElementById('columna1'), {
    group: 'shared', // Agrupación compartida entre las columnas
    animation: 150
  });

  new Sortable(document.getElementById('columna2'), {
    group: 'shared',
    animation: 150
  });

  new Sortable(document.getElementById('columna3'), {
    group: 'shared',
    animation: 150
  });