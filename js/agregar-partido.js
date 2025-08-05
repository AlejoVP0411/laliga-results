document.getElementById('formPartido').addEventListener('submit', function (e) {
  e.preventDefault();

  const data = {
    equipoLocal: this.equipoLocal.value,
    golesLocal: parseInt(this.golesLocal.value),
    equipoVisitante: this.equipoVisitante.value,
    golesVisitante: parseInt(this.golesVisitante.value),
    fecha: this.fecha.value,
    jornada: parseInt(this.jornada.value)
  };

  fetch('http://localhost:3000/api/matches', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(() => {
      alert('Partido agregado');
      this.reset();
    })
    .catch(err => console.error('Error:', err));
});
