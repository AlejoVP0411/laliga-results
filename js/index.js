document.addEventListener('DOMContentLoaded', () => {
  const jornadasDiv = document.getElementById('jornadas');
  const matchContainer = document.getElementById('matchContainer');
  const teamCarousel = document.getElementById('teamCarousel'); 
  const matchDetailsModal = document.getElementById('matchDetailsModal'); 
  const modalContent = document.getElementById('modalContent');
  const closeModalBtn = document.getElementById('closeModalBtn'); 
  const modalMatchInfo = document.getElementById('modalMatchInfo'); 

  
  const teamLogoMap = {
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

  
  const allTeamsData = [
    { nombre: "Águilas Doradas", logo: "aguilas-doradas.png", ciudad: "Rionegro", fundacion: "2008", estadio: "Alberto Grisales", entrenador: "Lucas González" },
    { nombre: "Alianza", logo: "Alianza.png", ciudad: "Barrancabermeja", fundacion: "1991", estadio: "Daniel Villa Zapata", entrenador: "Hubert Bodhert" },
    { nombre: "América", logo: "america-de-cali.png", ciudad: "Cali", fundacion: "1927", estadio: "Pascual Guerrero", entrenador: "César Farías" },
    { nombre: "Bucaramanga", logo: "bucaramanga.png", ciudad: "Bucaramanga", fundacion: "1949", estadio: "Alfonso López", entrenador: "Rafael Dudamel" },
    { nombre: "Nacional", logo: "atl-nacional.png", ciudad: "Medellín", fundacion: "1947", estadio: "Atanasio Girardot", entrenador: "Pablo Repetto" },
    { nombre: "Boyacá Chicó", logo: "boyaca-chico.png", ciudad: "Tunja", fundacion: "2002", estadio: "La Independencia", entrenador: "Miguel Caneo" },
    { nombre: "Cali", logo: "deportivo-cali.png", ciudad: "Cali", fundacion: "1912", estadio: "Deportivo Cali", entrenador: "Hernán Torres" },
    { nombre: "Pasto", logo: "pasto.png", ciudad: "Pasto", fundacion: "1949", estadio: "Departamental Libertad", entrenador: "René Higuita" },
    { nombre: "Tolima", logo: "tolima.png", ciudad: "Ibagué", fundacion: "1954", estadio: "Manuel Murillo Toro", entrenador: "David González" },
    { nombre: "Pereira", logo: "deportivo-pereira.png", ciudad: "Pereira", fundacion: "1944", estadio: "Hernán Ramírez Villegas", entrenador: "Leonel Álvarez" },
    { nombre: "Envigado", logo: "envigado.png", ciudad: "Envigado", fundacion: "1991", estadio: "Polideportivo Sur", entrenador: "Dayron Pérez" },
    { nombre: "Equidad", logo: "equidad.png", ciudad: "Bogotá", fundacion: "1982", estadio: "Metropolitano de Techo", entrenador: "Alexis García" },
    { nombre: "Medellín", logo: "medellin.png", ciudad: "Medellín", fundacion: "1913", estadio: "Atanasio Girardot", entrenador: "Alfredo Arias" },
    { nombre: "Junior", logo: "junior.png", ciudad: "Barranquilla", fundacion: "1924", estadio: "Metropolitano Roberto Meléndez", entrenador: "Arturo Reyes" },
    { nombre: "Fortaleza", logo: "fortaleza.png", ciudad: "Bogotá", fundacion: "2010", estadio: "Metropolitano de Techo", entrenador: "Nelson Flórez" },
    { nombre: "Llaneros", logo: "llaneros.png", ciudad: "Villavicencio", fundacion: "2015", estadio: "Manuel Calle Lombana", entrenador: "Jersson González" },
    { nombre: "Unión Magdalena", logo: "union-magdalena.png", ciudad: "Santa Marta", fundacion: "1953", estadio: "Sierra Nevada", entrenador: "David Ferreira" },
    { nombre: "Millonarios", logo: "millonarios.png", ciudad: "Bogotá", fundacion: "1946", estadio: "El Campín", entrenador: "Alberto Gamero" },
    { nombre: "Once Caldas", logo: "once-caldas.png", ciudad: "Manizales", fundacion: "1959", estadio: "Palogrande", entrenador: "Hernán Darío Herrera" },
    { nombre: "Santa Fe", logo: "santa-fe.png", ciudad: "Bogotá", fundacion: "1941", estadio: "El Campín", entrenador: "Pablo Peirano" }
  ];

  function getLogoPath(nombreEquipo) {
    return `logos/${teamLogoMap[nombreEquipo] || "default.png"}`;
  }

  
  const populateTeamCarousel = () => {
    teamCarousel.innerHTML = '';
    allTeamsData.forEach(team => {
      const teamLogoDiv = document.createElement('div');
      teamLogoDiv.classList.add('team-carousel-item', 'p-2', 'rounded-full', 'cursor-pointer', 'hover-scale-105', 'flex', 'items-center', 'justify-center');
      teamLogoDiv.title = team.nombre;

      const logoImg = document.createElement('img');
      logoImg.src = getLogoPath(team.nombre);
      logoImg.alt = team.nombre;
      logoImg.classList.add('w-full', 'h-full', 'object-contain');

      teamLogoDiv.appendChild(logoImg);
      teamCarousel.appendChild(teamLogoDiv);

      teamLogoDiv.addEventListener('click', () => {
        const equipoNombre = encodeURIComponent(team.nombre);
        window.location.href = `equipo.html?team=${equipoNombre}`;
      });
    });

    let scrollAmount = 0;
    const scrollStep = 1; 
    const scrollIntervalTime = 20; // Milliseconds

    setInterval(() => {
      teamCarousel.scrollLeft += scrollStep;
      //creo que hay un problema cuando llega al final del scroll, se queda en el último elemento y un poco bug
      if (teamCarousel.scrollLeft >= (teamCarousel.scrollWidth - teamCarousel.clientWidth)) {
        teamCarousel.scrollLeft = 0;
      }
    }, scrollIntervalTime);
  };

  populateTeamCarousel(); 


  for (let i = 1; i <= 20; i++) {
    const btn = document.createElement('button');
    btn.classList.add('jornada-btn', 'px-5', 'py-2', 'rounded-full', 'font-semibold', 'transition-all', 'duration-300', 'bg-gray-700', 'text-gray-300', 'hover:bg-gray-600', 'hover-scale-105'); // Tailwind classes
    btn.dataset.jornada = i;
    btn.textContent = `Jornada ${i}`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.jornada-btn').forEach(b => b.classList.remove('bg-purple-600', 'text-white', 'shadow-lg', 'activo')); 
      document.querySelectorAll('.jornada-btn').forEach(b => b.classList.add('bg-gray-700', 'text-gray-300', 'hover:bg-gray-600')); 
      btn.classList.add('bg-purple-600', 'text-white', 'shadow-lg', 'activo'); 
      btn.classList.remove('bg-gray-700', 'text-gray-300', 'hover:bg-gray-600'); 
      fetchMatchesByJornada(i);
    });
    jornadasDiv.appendChild(btn);
  }

  
  const firstJornadaBtn = document.querySelector('.jornada-btn[data-jornada="1"]');
  if (firstJornadaBtn) {
    firstJornadaBtn.classList.add('bg-purple-600', 'text-white', 'shadow-lg', 'activo');
    firstJornadaBtn.classList.remove('bg-gray-700', 'text-gray-300', 'hover:bg-gray-600');
  }
  fetchMatchesByJornada(1); 

  function fetchMatchesByJornada(jornada) {
    fetch(`http://localhost:3000/api/matches/jornada/${jornada}`)
      .then(res => res.json())
      .then(matches => {
        matchContainer.innerHTML = '';
        if (matches.length === 0) {
          matchContainer.innerHTML = '<p class="text-gray-400 text-center py-8">No hay partidos para esta jornada</p>';
          return;
        }

        matches.forEach(match => {
          const card = document.createElement('div');
          
          card.classList.add('match-card', 'bg-gray-700', 'p-4', 'rounded-2xl', 'shadow-md', 'flex', 'flex-col', 'sm:flex-row', 'items-center', 'justify-between', 'transition-all', 'duration-300', 'hover:bg-gray-600', 'hover-scale-105');

          const logoLocal = getLogoPath(match.local);
          const logoVisitante = getLogoPath(match.visitante);

          card.innerHTML = `
            <div class="match-info flex items-center justify-center sm:justify-start w-full sm:w-auto mb-4 sm:mb-0">
              <img src="${logoLocal}" class="team-logo w-12 h-12 object-contain mr-3" alt="${match.local}" />
              <div class="team-name text-lg font-semibold text-white mr-4">${match.local}</div>
              <div class="score text-xl font-extrabold text-purple-400 mr-4">${match.golesLocal ?? 0} - ${match.golesVisitante ?? 0}</div>
              <div class="team-name text-lg font-semibold text-white mr-3">${match.visitante}</div>
              <img src="${logoVisitante}" class="team-logo w-12 h-12 object-contain" alt="${match.visitante}" />
            </div>
            <div class="match-extra flex flex-col items-center sm:items-end text-gray-300 text-sm">
              <p class="mb-1"><strong>Fecha:</strong> ${match.fecha}</p>
              <p class="mb-2"><strong>Estadio:</strong> ${match.estadio}</p>
              <button class="ver-btn bg-purple-500 hover:bg-purple-600 text-white text-sm py-2 px-4 rounded-lg shadow-md transition-all duration-300 hover-scale-105"
                      data-match='${JSON.stringify(match)}'>
                Ver Detalles
              </button>
            </div>
          `;

          matchContainer.appendChild(card);
        });


        document.querySelectorAll('.ver-btn').forEach(button => {
          button.addEventListener('click', (event) => {
            const matchData = JSON.parse(event.target.dataset.match);
            showMatchDetailsModal(matchData);
          });
        });

      })
      .catch(err => {
        console.error('Error al cargar los partidos:', err);
        matchContainer.innerHTML = '<p class="text-red-400 text-center py-8">Error al cargar los partidos. Inténtalo de nuevo más tarde.</p>';
      });
  }

 
  function showMatchDetailsModal(match) {
    modalMatchInfo.innerHTML = `
      <div class="flex items-center justify-center space-x-6 w-full">
        <div class="flex flex-col items-center cursor-pointer" onclick="window.location.href='equipo.html?team=${encodeURIComponent(match.local)}'">
          <img src="${getLogoPath(match.local)}" alt="${match.local}" class="w-24 h-24 object-contain mb-2" />
          <span class="text-xl font-semibold text-white text-center">${match.local}</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-5xl font-extrabold text-purple-400">${match.golesLocal ?? 0} - ${match.golesVisitante ?? 0}</span>
          <span class="text-lg text-gray-400">Resultado Final</span>
        </div>
        <div class="flex flex-col items-center cursor-pointer" onclick="window.location.href='equipo.html?team=${encodeURIComponent(match.visitante)}'">
          <img src="${getLogoPath(match.visitante)}" alt="${match.visitante}" class="w-24 h-24 object-contain mb-2" />
          <span class="text-xl font-semibold text-white text-center">${match.visitante}</span>
        </div>
      </div>
      <div class="text-center text-gray-300 space-y-2 mt-6 w-full">
        <p class="text-lg"><strong>Fecha:</strong> ${match.fecha}</p>
        <p class="text-lg"><strong>Estadio:</strong> ${match.estadio}</p>
        <p class="text-lg"><strong>Jornada:</strong> ${match.jornada}</p>
      </div>
    `;

    matchDetailsModal.classList.remove('hidden');
    modalContent.classList.remove('scale-95', 'opacity-0');
    modalContent.classList.add('scale-100', 'opacity-100');
  }

  closeModalBtn.addEventListener('click', () => {
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      matchDetailsModal.classList.add('hidden');
    }, 300); 
  });


  matchDetailsModal.addEventListener('click', (event) => {
    if (event.target === matchDetailsModal) {
      closeModalBtn.click();
    }
  });

});
