document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const equipoNombre = decodeURIComponent(params.get('team'));
    const equipoInfoDiv = document.getElementById('equipoInfo');
  
    if (!equipoNombre) {
      equipoInfoDiv.innerHTML = '<p>No se encontró el equipo.</p>';
      return;
    }
  
    fetch('http://localhost:3000/api/teams')
      .then(res => res.json())
      .then(teams => {
        const equipoData = {};
        teams.forEach(team => {
          equipoData[team.nombre] = {
            logo: team.logo,
            ciudad: team.ciudad,
            fundado: team.fundacion,
            estadio: team.estadio,
            entrenador: team.entrenador
          };
        });
  
        // Ya que equipoData está lleno, ahora sí podemos buscar el equipo
        const equipo = equipoData[equipoNombre];
  
        if (!equipo) {
          equipoInfoDiv.innerHTML = `<p>No se encontró información para: ${equipoNombre}</p>`;
          return;
        }
  
        equipoInfoDiv.innerHTML = `
            <div class="card">
                <div class="card-background">
                <img src="logos/${equipo.logo}" alt="${equipoNombre}" class="logo-fondo">
                </div>
                <div class="card-content">
                <h2><span class="resaltado">${equipoNombre.split(" ")[0]}</span> ${equipoNombre.split(" ").slice(1).join(" ")}</h2>
                <p><strong>Ciudad:</strong> ${equipo.ciudad}</p>
                <p><strong>Estadio:</strong> ${equipo.estadio}</p>
                <p><strong>Fundado en:</strong> ${equipo.fundado}</p>
                <p><strong>Entrenador:</strong> ${equipo.entrenador}</p>
                <p><strong>Página web:</strong> <a href="http://${equipoNombre.toLowerCase().replace(/\s+/g, '')}.com" target="_blank">http://${equipoNombre.toLowerCase().replace(/\s+/g, '')}.com</a></p>
                </div>
            </div>
        `;
      })
      .catch(err => {
        console.error('Error al cargar los equipos:', err);
        equipoInfoDiv.innerHTML = '<p>Error al cargar la información del equipo.</p>';
      });
  });
  