const fs = require('fs');
const path = require('path');

// Percorso del file JSON
const jsonPath = './public/assets/119_laravel-api_table_projects.json';

// Leggi il file JSON
const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Aggiorna i percorsi delle immagini
jsonData.forEach(project => {
  if (project.preview_image && 
      project.preview_image.startsWith('assets/uploads/') && 
      !project.preview_image.includes('png-not-found.png')) {
    project.preview_image = `assets/uploads/projects_covers/${project.slug}.png`;
  }
});

// Scrivi il file JSON aggiornato
fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 4));

console.log('Percorsi aggiornati nel file JSON');
