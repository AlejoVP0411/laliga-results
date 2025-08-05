document.addEventListener('DOMContentLoaded', () => {
  const jornadasDiv = document.getElementById('jornadas');
  const matchContainer = document.getElementById('matchContainer');
  const teamLogos = document.getElementById('teamLogos');

  // Cargar logos de los equipos
  fetch('http://localhost:3000/api/teams')
    .then(res => res.json())
    .then(teams => {
      teams.forEach(team => {
        const button = document.createElement('button');
        button.className = 'team-button';
        button.title = team.nombre;

        const logo = document.createElement('img');
        logo.src = `logos/${team.logo}`;
        logo.alt = team.nombre;
        logo.className = 'team-logo';

        button.appendChild(logo);
        teamLogos.appendChild(button);

        button.addEventListener('click', () => {
            const equipoNombre = encodeURIComponent(team.nombre);
            window.location.href = `equipo.html?team=${equipoNombre}`;
        });
      });
    });

  // Crear botones de jornadas
  for (let i = 1; i <= 20; i++) {
    const btn = document.createElement('button');
    btn.classList.add('jornada-btn');
    btn.dataset.jornada = i;
    btn.textContent = `Jornada ${i}`;
    btn.addEventListener('click', () => {
  	document.querySelectorAll('.jornada-btn').forEach(b => 	b.classList.remove('activo'));
  	btn.classList.add('activo');
  	fetchMatchesByJornada(i);
    });
    jornadasDiv.appendChild(btn);
  }

  fetchMatchesByJornada(1); // Jornada inicial

    function fetchMatchesByJornada(jornada) {
    fetch(`http://localhost:3000/api/matches/jornada/${jornada}`)
      .then(res => res.json())
      .then(matches => {
        matchContainer.innerHTML = '';
        if (matches.length === 0) {
          matchContainer.innerHTML = '<p>No hay partidos para esta jornada</p>';
          return;
        }

        matches.forEach(match => {
          const card = document.createElement('div');
          card.classList.add('match-card');

          const logoLocal = `logos/${getLogo(match.local)}`;
          const logoVisitante = `logos/${getLogo(match.visitante)}`;

          card.innerHTML = `
            <div class="match-info">
              <img src="${logoLocal}" class="team-logo" alt="${match.local}" />
              <div class="team-name">${match.local}</div>
              <div class="score">${match.golesLocal ?? 0} - ${match.golesVisitante ?? 0}</div>
              <div class="team-name">${match.visitante}</div>
              <img src="${logoVisitante}" class="team-logo" alt="${match.visitante}" />
            </div>
            <div class="match-extra">
              <p><strong>Fecha:</strong> ${match.fecha}</p>
              <p><strong>Estadio:</strong> ${match.estadio}</p>
              <button class="ver-btn">Ver</button>
            </div>
          `;

          matchContainer.appendChild(card);
        });
      });
  }

  function getLogo(nombreEquipo) {
    const map = {
      "Águilas Doradas": "aguilas-doradas.png",
      "Alianza": "Alianza.png",
      "América": "america-de-cali.png",
      "Bucaramanga": "bucaramanga.png",
      "Nacional": "atl-nacional.png",
      "Boyacá Chicó": "boyaca-chico.png",
      "Cali": "deportivo-cali.png",
      "Pasto": "pasto.png",
      "Tolima": "tolima.png",
      "Pereira": "deportivo-pereira.png",
      "Envigado": "envigado.png",
      "Equidad": "equidad.png",
      "Medellín": "medellin.png",
      "Junior": "junior.png",
      "Fortaleza": "fortaleza.png",
      "Llaneros": "llaneros.png",
      "Unión Magdalena": "union-magdalena.png",
      "Millonarios": "millonarios.png",
      "Once Caldas": "once-caldas.png",
      "Santa Fe": "santa-fe.png"
    };
    return map[nombreEquipo] || "default.png";
  }
});
