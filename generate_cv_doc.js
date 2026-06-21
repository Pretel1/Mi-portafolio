import fs from 'fs';
import https from 'https';
import path from 'path';

// Paths
const profilePath = 'public/images/profile_circle.png';
const outputPath = 'public/CV_Dany_Pretel.doc';

console.log('Generating CV document according to template with corrections...');

// Read profile image to Base64
let profileBase64 = '';
if (fs.existsSync(profilePath)) {
  const profileBuffer = fs.readFileSync(profilePath);
  profileBase64 = profileBuffer.toString('base64');
  console.log('- Profile picture loaded successfully');
} else {
  console.log('- Warning: Profile picture not found at ' + profilePath);
}

// Fetch QR Code as Base64 (Points directly to the online portfolio)
const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://pretel1.github.io/Mi-portafolio/&color=000000&bgcolor=ffffff';

console.log('- Fetching QR code from API...');
https.get(qrUrl, (res) => {
  const chunks = [];
  res.on('data', (chunk) => chunks.push(chunk));
  res.on('end', () => {
    const qrBuffer = Buffer.concat(chunks);
    const qrBase64 = qrBuffer.toString('base64');
    console.log('- QR code fetched successfully');
    generateDoc(profileBase64, qrBase64);
  });
}).on('error', (err) => {
  console.error('- Error fetching QR code:', err);
  // Generate anyway without QR
  generateDoc(profileBase64, '');
});

function generateDoc(profileB64, qrB64) {
  const profileImgHtml = profileB64 
    ? `<img src="data:image/png;base64,${profileB64}" width="160" height="160" style="border-radius: 80px; border: 1.5pt solid #000000;" />`
    : '[FOTO PROFESIONAL]';

  const qrImgHtml = qrB64
    ? `<img src="data:image/png;base64,${qrB64}" width="80" height="80" style="border: 1px solid #cccccc; padding: 2px;" />`
    : '[Código QR]';

  const htmlContent = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>Curriculum Vitae - Dany Jose Pretel Huamanvilca</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      size: A4;
      margin: 2cm 2cm 2cm 2cm;
    }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 10.5pt;
      line-height: 1.4;
      color: #333333;
      background-color: #ffffff;
    }
    .cv-container {
      background-color: #ffffff;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 25px;
    }
    .header-info {
      vertical-align: middle;
    }
    .header-photo {
      vertical-align: middle;
      text-align: right;
      width: 175px;
    }
    .name {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 24pt;
      font-weight: bold;
      color: #000000;
      line-height: 1.1;
      margin: 0 0 5px 0;
    }
    .title {
      font-size: 13pt;
      font-weight: bold;
      color: #333333;
      margin: 0 0 15px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .contact-info {
      font-size: 9.5pt;
      color: #555555;
      line-height: 1.5;
    }
    .section-title {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 12pt;
      font-weight: bold;
      color: #000000;
      border-bottom: 1.5pt solid #333333;
      padding-bottom: 4px;
      margin-top: 25px;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .profile-text {
      font-size: 10pt;
      text-align: justify;
      color: #333333;
      line-height: 1.5;
      margin-bottom: 18px;
    }
    .exp-item {
      margin-bottom: 15px;
    }
    .exp-header {
      font-weight: bold;
      font-size: 10.5pt;
      color: #000000;
    }
    .exp-subheader {
      font-style: italic;
      font-size: 9.5pt;
      color: #555555;
      margin-bottom: 4px;
    }
    .functions-title {
      font-weight: bold;
      font-size: 9.5pt;
      color: #333333;
      margin-top: 5px;
      margin-bottom: 2px;
    }
    .logros-title {
      font-weight: bold;
      font-size: 9.5pt;
      color: #333333;
      margin-top: 5px;
      margin-bottom: 2px;
    }
    .bullet-list {
      margin: 0 0 10px 0;
      padding-left: 20px;
      font-size: 9.5pt;
      color: #444444;
    }
    .bullet-list li {
      margin-bottom: 3px;
    }
    .two-columns-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
    }
    .col-cell {
      width: 50%;
      vertical-align: top;
    }
    .detail-list {
      margin: 0;
      padding-left: 15px;
      font-size: 9.5pt;
      color: #444444;
    }
    .detail-list li {
      margin-bottom: 3px;
    }
    .qr-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 30px;
      border-top: 1px solid #dddddd;
      padding-top: 15px;
    }
    .qr-text {
      vertical-align: middle;
      font-size: 8.5pt;
      color: #666666;
      line-height: 1.4;
    }
    .qr-code {
      vertical-align: middle;
      text-align: right;
      width: 90px;
    }
  </style>
</head>
<body>
  <div class="cv-container">
    
    <!-- HEADER -->
    <table class="header-table">
      <tr>
        <td class="header-info">
          <div class="name">DANY JOSE PRETEL HUAMANVILCA</div>
          <div class="title">Estudiante de Ingeniería en Ciberseguridad</div>
          <div class="contact-info">
            <b>Datos de contacto:</b> +51 935 738 276 | 1263803@senati.pe | linkedin.com/in/danny-pretel-2a35651a4
          </div>
        </td>
        <td class="header-photo">
          ${profileImgHtml}
        </td>
      </tr>
    </table>

    <!-- PERFIL PROFESIONAL -->
    <div class="section-title">Perfil Profesional</div>
    <div class="profile-text">
      Futuro Ingeniero en Ciberseguridad en el 4to semestre de SENATI. Aunque cuento con varias certificaciones, mantengo la humildad de aprender constantemente y aplicar los conocimientos rápido. Suelo ir un paso adelante en los temas que me apasionan, y si desconozco algo, lo aprendo en el instante. Integro la IA como aliada clave para el análisis y síntesis de la información. Mi meta es liderar proyectos tecnológicos extraordinarios y fundar mi propia empresa en el sector.
    </div>

    <!-- EXPERIENCIA LABORAL -->
    <div class="section-title">Experiencia Laboral</div>

    <div class="exp-item">
      <div class="exp-header">EJÉRCITO DEL PERÚ</div>
      <div class="exp-subheader">Cargo: Licenciado del Servicio Militar Voluntario / Instructor Militar | 2020 — 2022</div>
      
      <div class="functions-title">Funciones:</div>
      <ul class="bullet-list">
        <li>Impartir instrucción militar básica y entrenamiento físico al personal de nuevos contingentes.</li>
        <li>Cumplir con los servicios tácticos y operativos de resguardo y seguridad de las instalaciones.</li>
        <li>Mantener la disciplina, el orden y el cumplimiento de los reglamentos del servicio militar vigente.</li>
      </ul>
      
      <div class="logros-title">Logros:</div>
      <ul class="bullet-list">
        <li>Destacar por disciplina y conducta, obteniendo el licenciamiento y designación como Instructor Militar.</li>
        <li>Cumplir satisfactoriamente con el Servicio Militar Voluntario con legajo impecable.</li>
      </ul>
    </div>

    <!-- FORMACION PROFESIONAL -->
    <div class="section-title">Formación Profesional</div>
    <div class="exp-item" style="margin-bottom: 8px;">
      <div class="exp-header">Ingeniería de Ciberseguridad (Carrera Técnica)</div>
      <div class="exp-subheader">SENATI · Arequipa, Perú | 2025 — Presente (4to Semestre)</div>
    </div>
    <div class="exp-item" style="margin-bottom: 8px;">
      <div class="exp-header">Licenciamiento del Servicio Militar Voluntario & Especialidad de Instructor</div>
      <div class="exp-subheader">Fuerzas Armadas del Perú | UNIDAD: CEMOV_COSTA | FECHA DE ALTA: 01 JUL 2020 — FECHA DE BAJA: 23 JUN 2022 | ARMA: INFANTERÍA</div>
    </div>

    <!-- FORMACION COMPLEMENTARIA -->
    <div class="section-title">Formación Complementaria</div>
    <ul class="bullet-list" style="margin-bottom: 12px;">
      <li><b>CCNA: Introducción a Redes</b> - Cisco Networking Academy · SENATI, 70 horas, 2026.</li>
      <li><b>Hacker Ético</b> - CyberGames · Cisco · UTP, 70 horas, 2026.</li>
      <li><b>Red Hat System Administration I (Asistencia)</b> - SENATI, 2026.</li>
      <li><b>Conceptos Básicos de Redes</b> - Cisco · SENATI, 22 horas, 2025.</li>
      <li><b>Introducción a la Ciencia de Datos</b> - Cisco · SENATI, 6 horas, 2025.</li>
      <li><b>Conceptos Básicos de Hardware</b> - Cisco · SENATI, 6 horas, 2025.</li>
      <li><b>Introducción al Internet de las Cosas (IoT) y Transformación Digital</b> - Cisco · SENATI, 6 horas, 2025.</li>
    </ul>

    <!-- IDIOMAS & INFORMATICA & RECONOCIMIENTOS -->
    <table class="two-columns-table">
      <tr>
        <td class="col-cell" style="padding-right: 15px;">
          <div class="section-title" style="margin-top: 0;">Idiomas</div>
          <ul class="detail-list">
            <li><b>Español:</b> Nativo</li>
            <li><b>Quechua:</b> Nativo (Comunicación fluida)</li>
            <li><b>Inglés:</b> En curso (Academia)</li>
            <li><b>Portugués:</b> Básico</li>
          </ul>
        </td>
        <td class="col-cell" style="padding-left: 15px;">
          <div class="section-title" style="margin-top: 0;">Informática</div>
          <ul class="detail-list">
            <li><b>Sistemas Operativos:</b> Linux (Kali Linux, Red Hat Enterprise Linux, Ubuntu), Windows Server/Client.</li>
            <li><b>Redes:</b> Configuración de switches y routers Cisco, subnetting IP.</li>
            <li><b>Herramientas:</b> Nmap, Wireshark, Cisco Packet Tracer, Git, GitHub, PSeInt, MS Office.</li>
          </ul>
        </td>
      </tr>
    </table>

    <div class="section-title">Reconocimientos / Voluntariados</div>
    <ul class="bullet-list" style="margin-bottom: 12px;">
      <li>Licenciado con Licencia Militar de Primera Clase, Ejército del Perú.</li>
      <li>Certificación de Especialidad y Desempeño Sobresaliente como Instructor Militar.</li>
    </ul>

    <!-- DATOS PERSONALES -->
    <div class="section-title">Datos Personales</div>
    <table style="width: 100%; border-collapse: collapse; font-size: 9.5pt; color: #555555; margin-bottom: 15px;">
      <tr>
        <td style="padding: 2px 0; width: 25%;"><b>DNI:</b></td>
        <td style="padding: 2px 0; width: 25%;">62113229</td>
        <td style="padding: 2px 0; width: 25%;"><b>Fecha de Nacimiento:</b></td>
        <td style="padding: 2px 0; width: 25%;">09/05/2001</td>
      </tr>
      <tr>
        <td style="padding: 2px 0;"><b>Dirección:</b></td>
        <td style="padding: 2px 0;">Arequipa, Perú</td>
        <td style="padding: 2px 0;"><b>Licencia de Conducir:</b></td>
        <td style="padding: 2px 0;">No aplica / En trámite</td>
      </tr>
    </table>

    <!-- FOOTER WITH QR IN CORNER -->
    <table class="qr-table">
      <tr>
        <td class="qr-text">
          <b>VERIFICACIÓN DIGITAL DEL CURRÍCULUM:</b><br/>
          Este documento de CV cuenta con una versión digital en línea.<br/>
          Escanee el código QR adjunto para acceder a las credenciales verificables en Credly y ver los detalles actualizados del portafolio en vivo.
        </td>
        <td class="qr-code">
          ${qrImgHtml}
        </td>
      </tr>
    </table>

  </div>
</body>
</html>
  `;

  fs.writeFileSync(outputPath, htmlContent);
  console.log('Word document CV successfully created at:', outputPath);
}
