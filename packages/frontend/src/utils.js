module.exports = {
  tiempoTranscurrido: (segundos) => {
    let intervalo = Math.floor(segundos / 31536000);
    if (intervalo >= 1) {
      return "Hace " + intervalo + " año" + (intervalo === 1 ? "" : "s");
    }
    intervalo = Math.floor(segundos / 2592000);
    if (intervalo >= 1) {
      return "Hace " + intervalo + " mes" + (intervalo === 1 ? "" : "es");
    }
    intervalo = Math.floor(segundos / 86400);
    if (intervalo >= 1) {
      return "Hace " + intervalo + " día" + (intervalo === 1 ? "" : "s");
    }
    intervalo = Math.floor(segundos / 3600);
    if (intervalo >= 1) {
      return "Hace " + intervalo + " hora" + (intervalo === 1 ? "" : "s");
    }
    intervalo = Math.floor(segundos / 60);
    if (intervalo >= 1) {
      return "Hace " + intervalo, " minuto" + (intervalo === 1 ? "" : "s");
    }
    return "Hace " + segundos + " segundo" + (segundos === 1 ? "" : "s");
  },

  tiempoTranscurridoHoras: (segundos) => {
    let horas = Math.floor(segundos / 3600);
    let minutos = Math.floor((segundos % 3600) / 60);
    
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
  },
  
  diferenciaEnSegundos: (tiempo) => {
    // Obtener la fecha actual en milisegundos
    const ahora = new Date().getTime();
    // Obtener la fecha del tiempo especificado en milisegundos
    const fechaTiempo = new Date(tiempo * 1000).getTime();
    // Calcular la diferencia en segundos y devolver el resultado
    const diferenciaEnSegundos = (ahora - fechaTiempo) / 1000;
    return diferenciaEnSegundos;
  },

  timestampToDateString: (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const dateString = `${day}/${month}/${year}` ;
    const hour = `${hours}:${minutes}`;
    return [dateString,hour];
  },

  truncateHexString: (hexString, startLength, endLength) => {
    const length = hexString.length;
    const start = hexString.substring(0, startLength);
    const end = hexString.substring(length - endLength, length);
    return `${start}...${end}`;
  }
}
