document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const equipoNombre = decodeURIComponent(params.get('team'));
    const equipoInfoDiv = document.getElementById('equipoInfo');
    const playersContainer = document.getElementById('playersContainer');
    const statsContainer = document.getElementById('statsContainer');

    // Mock data for players (simulando que cada equipo tiene algunos jugadores)
    const mockPlayers = [
        { name: "Juan Pérez", team: "América de Cali", position: "Delantero", nationality: "Colombia", photo: "https://placehold.co/100x100/A00/FFF?text=JP" },
        { name: "Carlos Gómez", team: "Atlético Nacional", position: "Defensa", nationality: "Colombia", photo: "https://placehold.co/100x100/080/FFF?text=CG" },
        { name: "Luis Díaz (Sim.)", team: "Junior FC", position: "Mediocampista", nationality: "Colombia", photo: "https://placehold.co/100x100/00F/FFF?text=LD" },
        { name: "Mateo Blanco", team: "Millonarios FC", position: "Delantero", nationality: "Colombia", photo: "https://placehold.co/100x100/000/FFF?text=MB" },
        { name: "Andrés Rojas", team: "Santa Fe", position: "Portero", nationality: "Colombia", photo: "https://placehold.co/100x100/F00/FFF?text=AR" },
        { name: "Daniel Ruiz", team: "Millonarios FC", position: "Mediocampista", nationality: "Colombia", photo: "https://placehold.co/100x100/000/FFF?text=DR" },
        { name: "Dorlan Pabón (Sim.)", team: "Atlético Nacional", position: "Delantero", nationality: "Colombia", photo: "https://placehold.co/100x100/080/FFF?text=DP" },
        { name: "Adrián Ramos (Sim.)", team: "América de Cali", position: "Delantero", nationality: "Colombia", photo: "https://placehold.co/100x100/A00/FFF?text=AR" },
        { name: "Teófilo Gutiérrez (Sim.)", team: "Junior FC", position: "Delantero", nationality: "Colombia", photo: "https://placehold.co/100x100/00F/FFF?text=TG" },
        { name: "Camilo Vargas (Sim.)", team: "Atlético Nacional", position: "Portero", nationality: "Colombia", photo: "https://placehold.co/100x100/080/FFF?text=CV" },
        { name: "Fernando Uribe", team: "Millonarios FC", position: "Delantero", nationality: "Colombia", photo: "https://placehold.co/100x100/000/FFF?text=FU" },
        { name: "Fainer Torijano", team: "Santa Fe", position: "Defensa", nationality: "Colombia", photo: "https://placehold.co/100x100/F00/FFF?text=FT" },
        { name: "Didier Moreno", team: "Junior FC", position: "Mediocampista", nationality: "Colombia", photo: "https://placehold.co/100x100/00F/FFF?text=DM" },
        { name: "Kevin Mier", team: "Atlético Nacional", position: "Portero", nationality: "Colombia", photo: "https://placehold.co/100x100/080/FFF?text=KM" },
        { name: "Carlos Darwin Quintero", team: "América de Cali", position: "Delantero", nationality: "Colombia", photo: "https://placehold.co/100x100/A00/FFF?text=CDQ" },
        { name: "Leonardo Castro", team: "Millonarios FC", position: "Delantero", nationality: "Colombia", photo: "https://placehold.co/100x100/000/FFF?text=LC" },
        { name: "Yesus Cabrera", team: "Deportes Tolima", position: "Mediocampista", nationality: "Colombia", photo: "https://placehold.co/100x100/555/FFF?text=YC" },
        { name: "Andrés Cadavid", team: "Independiente Medellín", position: "Defensa", nationality: "Colombia", photo: "https://placehold.co/100x100/777/FFF?text=AC" },
        { name: "Marco Pérez", team: "Deportivo Cali", position: "Delantero", nationality: "Colombia", photo: "https://placehold.co/100x100/333/FFF?text=MP" },
        { name: "Dayro Moreno", team: "Once Caldas", position: "Delantero", nationality: "Colombia", photo: "https://placehold.co/100x100/999/FFF?text=DM" }
    ];

    const mockTeamStats = {
        "América de Cali": {
            partidosJugados: 10,
            victorias: 7,
            empates: 2,
            derrotas: 1,
            golesAFavor: 24,
            golesEnContra: 9,
            puntos: 23,
            posicionLiga: 1,
            tarjetasAmarillas: 15,
            tarjetasRojas: 1,
            promedioPosesion: "58%"
        },
        "Atlético Nacional": {
            partidosJugados: 10,
            victorias: 6,
            empates: 3,
            derrotas: 1,
            golesAFavor: 22,
            golesEnContra: 10,
            puntos: 21,
            posicionLiga: 2,
            tarjetasAmarillas: 12,
            tarjetasRojas: 0,
            promedioPosesion: "60%"
        },
        "Millonarios FC": {
            partidosJugados: 10,
            victorias: 5,
            empates: 4,
            derrotas: 1,
            golesAFavor: 21,
            golesEnContra: 12,
            puntos: 19,
            posicionLiga: 3,
            tarjetasAmarillas: 18,
            tarjetasRojas: 2,
            promedioPosesion: "55%"
        },
        "Junior FC": {
            partidosJugados: 10,
            victorias: 5,
            empates: 3,
            derrotas: 2,
            golesAFavor: 19,
            golesEnContra: 11,
            puntos: 18,
            posicionLiga: 4,
            tarjetasAmarillas: 14,
            tarjetasRojas: 1,
            promedioPosesion: "52%"
        },
        "Santa Fe": {
            partidosJugados: 10,
            victorias: 4,
            empates: 4,
            derrotas: 2,
            golesAFavor: 15,
            golesEnContra: 10,
            puntos: 16,
            posicionLiga: 5,
            tarjetasAmarillas: 10,
            tarjetasRojas: 0,
            promedioPosesion: "49%"
        },
        "Deportivo Cali": {
            partidosJugados: 10,
            victorias: 3,
            empates: 5,
            derrotas: 2,
            golesAFavor: 14,
            golesEnContra: 13,
            puntos: 14,
            posicionLiga: 6,
            tarjetasAmarillas: 16,
            tarjetasRojas: 1,
            promedioPosesion: "48%"
        },
        "Deportes Tolima": {
            partidosJugados: 10,
            victorias: 4,
            empates: 2,
            derrotas: 4,
            golesAFavor: 16,
            golesEnContra: 15,
            puntos: 14,
            posicionLiga: 7,
            tarjetasAmarillas: 11,
            tarjetasRojas: 0,
            promedioPosesion: "53%"
        },
        "Independiente Medellín": {
            partidosJugados: 10,
            victorias: 3,
            empates: 3,
            derrotas: 4,
            golesAFavor: 12,
            golesEnContra: 14,
            puntos: 12,
            posicionLiga: 8,
            tarjetasAmarillas: 17,
            tarjetasRojas: 2,
            promedioPosesion: "45%"
        },
        "Once Caldas": {
            partidosJugados: 10,
            victorias: 3,
            empates: 2,
            derrotas: 5,
            golesAFavor: 10,
            golesEnContra: 16,
            puntos: 11,
            posicionLiga: 9,
            tarjetasAmarillas: 13,
            tarjetasRojas: 1,
            promedioPosesion: "47%"
        },
        "Águilas Doradas": {
            partidosJugados: 10,
            victorias: 2,
            empates: 4,
            derrotas: 4,
            golesAFavor: 11,
            golesEnContra: 13,
            puntos: 10,
            posicionLiga: 10,
            tarjetasAmarillas: 19,
            tarjetasRojas: 3,
            promedioPosesion: "42%"
        }
     
    };


    if (!equipoNombre) {
        equipoInfoDiv.innerHTML = '<p class="text-red-400 text-center py-8">No se encontró el equipo.</p>';
        return;
    }

    fetch('http://localhost:3000/api/teams')
        .then(res => res.json())
        .then(teams => {
            const equipoData = {};
            teams.forEach(team => {
                equipoData[team.nombre] = team;
            });

            const equipo = equipoData[equipoNombre];

            if (!equipo) {
                equipoInfoDiv.innerHTML = `<p class="text-red-400 text-center py-8">No se encontró información para: ${equipoNombre}</p>`;
                return;
            }

            const teamLogoPath = `logos/${equipo.logo}`;

            
            Vibrant.from(teamLogoPath).getPalette((err, palette) => {
                let vibrantColor = '#8b5cf6'; 
                let darkVibrantColor = '#6d28d9';
                let lightVibrantColor = '#c4b5fd'; 
                let mutedColor = '#4c0519';

                if (!err && palette) {
                    if (palette.Vibrant) vibrantColor = palette.Vibrant.hex;
                    if (palette.DarkVibrant) darkVibrantColor = palette.DarkVibrant.hex;
                    if (palette.LightVibrant) lightVibrantColor = palette.LightVibrant.hex;
                    if (palette.Muted) mutedColor = palette.Muted.hex;
                } else {
                    console.warn('Vibrant.js could not extract colors, using default:', err);
                }

                equipoInfoDiv.innerHTML = `
                    <div class="card relative p-8 rounded-3xl shadow-xl overflow-hidden mb-8" style="background-color: ${darkVibrantColor}; box-shadow: 0 10px 20px -5px ${mutedColor}80;">
                        <div class="card-background-blur absolute inset-0 opacity-20" style="background-image: url(${teamLogoPath}); background-size: cover; background-position: center;"></div>
                        <div class="card-content relative z-10 flex flex-col md:flex-row items-center md:items-start text-white">
                            <img src="${teamLogoPath}" alt="${equipoNombre} Logo" class="w-32 h-32 object-contain filter drop-shadow-lg mb-6 md:mb-0 md:mr-8" />
                            <div class="text-center md:text-left">
                                <h2 class="text-5xl font-extrabold mb-3">
                                    <span class="resaltado" style="color: ${lightVibrantColor};">${equipoNombre.split(" ")[0]}</span> ${equipoNombre.split(" ").slice(1).join(" ")}
                                </h2>
                                <p class="text-lg mb-2"><strong>Ciudad:</strong> ${equipo.ciudad}</p>
                                <p class="text-lg mb-2"><strong>Estadio:</strong> ${equipo.estadio}</p>
                                <p class="text-lg mb-2"><strong>Fundado en:</strong> ${equipo.fundacion}</p>
                                <p class="text-lg mb-2"><strong>Entrenador:</strong> ${equipo.entrenador}</p>
                                <p class="text-lg mb-2"><strong>Títulos de Liga:</strong> ${equipo.titulos.liga}</p>
                                <p class="text-lg mb-2"><strong>Valor de Plantilla:</strong> $${equipo.plantilla_valor_millones} millones</p>
                                <p class="text-lg mb-4"><strong>Descripción:</strong> ${equipo.descripcion}</p>
                                <div class="flex justify-center md:justify-start space-x-4 mb-4">
                                    <a href="${equipo.sitio_web}" target="_blank" rel="noopener noreferrer" class="text-purple-300 hover:text-purple-200 underline text-md transition-colors duration-200">
                                        Página web oficial
                                    </a>
                                    ${equipo.redes_sociales.twitter ? `<a href="https://twitter.com/${equipo.redes_sociales.twitter}" target="_blank" rel="noopener noreferrer" class="text-purple-300 hover:text-purple-200 text-xl"><i class="fab fa-twitter"></i></a>` : ''}
                                    ${equipo.redes_sociales.instagram ? `<a href="https://instagram.com/${equipo.redes_sociales.instagram}" target="_blank" rel="noopener noreferrer" class="text-purple-300 hover:text-purple-200 text-xl"><i class="fab fa-instagram"></i></a>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

  
            const teamPlayers = mockPlayers.filter(player => player.team === equipoNombre);
            playersContainer.innerHTML = ''; 

            if (teamPlayers.length > 0) {
                teamPlayers.forEach(player => {
                    const playerCard = document.createElement('div');
                    playerCard.classList.add('bg-gray-700', 'p-4', 'rounded-xl', 'shadow-md', 'flex', 'items-center', 'transition-all', 'duration-300', 'hover:bg-gray-600', 'hover:shadow-lg');
                    playerCard.innerHTML = `
                        <img src="${player.photo}" alt="${player.name}" class="w-16 h-16 rounded-full object-cover mr-4 border-2 border-purple-500" />
                        <div>
                            <p class="font-semibold text-white text-lg">${player.name}</p>
                            <p class="text-sm text-gray-400">${player.position} - ${player.nationality}</p>
                        </div>
                    `;
                    playersContainer.appendChild(playerCard);
                });
            } else {
                playersContainer.innerHTML = '<p class="text-gray-400 text-center py-8">No hay jugadores simulados para este equipo.</p>';
            }

            const teamStats = mockTeamStats[equipoNombre];
            statsContainer.innerHTML = ''; 

            if (teamStats) {
                statsContainer.innerHTML = `
                    <h3 class="text-3xl font-bold text-white mb-6">Estadísticas del Equipo</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-300">
                        <div class="bg-gray-700 p-4 rounded-lg shadow-md">
                            <p class="text-sm text-gray-400">Partidos Jugados</p>
                            <p class="text-2xl font-bold text-white">${teamStats.partidosJugados}</p>
                        </div>
                        <div class="bg-gray-700 p-4 rounded-lg shadow-md">
                            <p class="text-sm text-gray-400">Victorias</p>
                            <p class="text-2xl font-bold text-green-400">${teamStats.victorias}</p>
                        </div>
                        <div class="bg-gray-700 p-4 rounded-lg shadow-md">
                            <p class="text-sm text-gray-400">Empates</p>
                            <p class="text-2xl font-bold text-yellow-400">${teamStats.empates}</p>
                        </div>
                        <div class="bg-gray-700 p-4 rounded-lg shadow-md">
                            <p class="text-sm text-gray-400">Derrotas</p>
                            <p class="text-2xl font-bold text-red-400">${teamStats.derrotas}</p>
                        </div>
                        <div class="bg-gray-700 p-4 rounded-lg shadow-md">
                            <p class="text-sm text-gray-400">Goles a Favor</p>
                            <p class="text-2xl font-bold text-white">${teamStats.golesAFavor}</p>
                        </div>
                        <div class="bg-gray-700 p-4 rounded-lg shadow-md">
                            <p class="text-sm text-gray-400">Goles en Contra</p>
                            <p class="text-2xl font-bold text-white">${teamStats.golesEnContra}</p>
                        </div>
                        <div class="bg-gray-700 p-4 rounded-lg shadow-md">
                            <p class="text-sm text-gray-400">Puntos</p>
                            <p class="text-2xl font-bold text-purple-400">${teamStats.puntos}</p>
                        </div>
                        <div class="bg-gray-700 p-4 rounded-lg shadow-md">
                            <p class="text-sm text-gray-400">Posición en Liga</p>
                            <p class="text-2xl font-bold text-white">${teamStats.posicionLiga}</p>
                        </div>
                        <div class="bg-gray-700 p-4 rounded-lg shadow-md">
                            <p class="text-sm text-gray-400">Tarjetas Amarillas</p>
                            <p class="text-2xl font-bold text-yellow-400">${teamStats.tarjetasAmarillas}</p>
                        </div>
                        <div class="bg-gray-700 p-4 rounded-lg shadow-md">
                            <p class="text-sm text-gray-400">Tarjetas Rojas</p>
                            <p class="text-2xl font-bold text-red-400">${teamStats.tarjetasRojas}</p>
                        </div>
                        <div class="bg-gray-700 p-4 rounded-lg shadow-md">
                            <p class="text-sm text-gray-400">Posesión Promedio</p>
                            <p class="text-2xl font-bold text-white">${teamStats.promedioPosesion}</p>
                        </div>
                    </div>
                `;
            } else {
                statsContainer.innerHTML = '<p class="text-gray-400 text-center py-8">No hay estadísticas simuladas para este equipo.</p>';
            }

        })
        .catch(err => {
            console.error('Error al cargar la información del equipo:', err);
            equipoInfoDiv.innerHTML = '<p class="text-red-400 text-center py-8">Error al cargar la información del equipo.</p>';
        });
});
