import fs from 'fs';
import https from 'https';
import path from 'path';
import { chromium } from 'playwright';

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

async function generateDoc(profileB64, qrB64) {
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
            <b>Datos de contacto:</b> +51 935 738 276 | <a href="mailto:1263803@senati.pe" style="color: #555555; text-decoration: none;">1263803@senati.pe</a> | <a href="https://www.linkedin.com/in/danny-pretel-2a35651a4" style="color: #555555; text-decoration: none;">linkedin.com/in/danny-pretel-2a35651a4</a>
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
      Estudiante de Ingeniería de Ciberseguridad en SENATI, cursando actualmente el 4to semestre (en curso). Aunque cuento con varias certificaciones, mantengo la humildad de aprender de manera continua y aplicar los conocimientos rápidamente. Suelo ir un paso adelante en los temas que me apasionan; si desconozco alguna materia, la investigo y asimilo al instante. Integro la inteligencia artificial como una aliada estratégica para el análisis y la síntesis de información. Mi meta es liderar proyectos tecnológicos extraordinarios y crear mi propia empresa en el sector.
    </div>

    <!-- FORMACION PROFESIONAL -->
    <div class="section-title">Formación Profesional</div>
    <div class="exp-item" style="margin-bottom: 8px;">
      <div class="exp-header">Ingeniería de Ciberseguridad (Carrera Técnica)</div>
      <div class="exp-subheader">SENATI · Arequipa, Perú | 2025 — Presente (4to Semestre - En curso)</div>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 9pt;">
        <tr>
          <td style="width: 50%; vertical-align: top; padding-right: 10px;">
            <div style="font-weight: bold; margin-bottom: 4px; text-transform: uppercase; font-size: 8.5pt;">2do Semestre:</div>
            <ul style="margin: 0; padding-left: 15px; color: #444444;">
              <li>IT ESSENTIALS (CISCO)</li>
              <li>SEGURIDAD E HIGIENE INDUSTRIAL</li>
              <li>INGLÉS II</li>
              <li>SISTEMAS OPERATIVOS WINDOWS</li>
              <li>CCNA 7 M1 ITN-INTRO NETW CISCO</li>
              <li>CCNA 7 M2 SRWE-SWIT ROUT WIR E</li>
              <li>CYBERSECURITY ESSENTIALS (CISCO)</li>
            </ul>
          </td>
          <td style="width: 50%; vertical-align: top; padding-left: 10px;">
            <div style="font-weight: bold; margin-bottom: 4px; text-transform: uppercase; font-size: 8.5pt;">3er Semestre:</div>
            <ul style="margin: 0; padding-left: 15px; color: #444444;">
              <li>FUNDAMENTOS DE DESARROLLO WEB</li>
              <li>ALGORITMIA</li>
              <li>TÉCNICAS DE LA COMUNICACIÓN</li>
              <li>INGLÉS III</li>
              <li>INSERCIÓN AL ENTORNO EMPRESARIAL</li>
              <li>RED HAT SYSTEM ADMINISTRATION I</li>
              <li>CCNA v7 M3 ENSA: ENTERPRISE NETWORKING, SECURITY AND AUTOMATION</li>
            </ul>
          </td>
        </tr>
      </table>
    </div>
    
    <div class="exp-item" style="margin-bottom: 8px;">
      <div class="exp-header">Licenciamiento del Servicio Militar Voluntario y Especialidad de Instructor</div>
      <div class="exp-subheader">Fuerzas Armadas del Perú | Unidad: CEMOV_COSTA | Fecha de Alta: 01 de Julio de 2020 — Fecha de Baja: 23 de Junio de 2022 | Arma: Infantería</div>
    </div>

    <!-- FORMACION COMPLEMENTARIA -->
    <div class="section-title">Formación Complementaria</div>
    <ul class="bullet-list" style="margin-bottom: 12px;">
      <li><b>CCNA: Introducción a Redes</b> - Cisco Networking Academy · SENATI, 70 horas, 2026.</li>
      <li><b>Hacker Ético</b> - CyberGames · Cisco · UTP, 70 horas, 2026.</li>
      <li><b>Red Hat System Administration I</b> - SENATI, Curso de Especialización, 2026.</li>
      <li><b>English for IT 1 (Nivel B2)</b> - Cisco Networking Academy · SENATI, 50 horas, 2026.</li>
      <li><b>Conceptos Básicos de Redes</b> - Cisco · SENATI, 22 horas, 2025.</li>
      <li><b>Ciencia de Datos (Introducción)</b> - Cisco · SENATI, 6 horas, 2025.</li>
      <li><b>Conceptos Básicos de Hardware</b> - Cisco · SENATI, 6 horas, 2025.</li>
      <li><b>Introducción a IoT y Transformación Digital</b> - Cisco · SENATI, 6 horas, 2025.</li>
      <li><b>Creación de Contenido Digital y Colaboración</b> - Cisco · SENATI, 6 horas, 2025.</li>
      <li><b>Conciencia Digital</b> - Cisco · SENATI, 6 horas, 2025.</li>
      <li><b>Uso de Computadoras y Dispositivos Móviles</b> - Cisco · SENATI, 6 horas, 2025.</li>
    </ul>

    <!-- IDIOMAS & INFORMATICA & RECONOCIMIENTOS -->
    <table class="two-columns-table">
      <tr>
        <td class="col-cell" style="padding-right: 15px;">
          <div class="section-title" style="margin-top: 0;">Idiomas</div>
          <ul class="detail-list">
            <li><b>Español:</b> Nativo</li>
            <li><b>Quechua:</b> Nativo</li>
            <li><b>Inglés:</b> En curso (Inglés SENATI)</li>
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

    <!-- RECONOCIMIENTOS / VOLUNTARIADOS -->
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

  // Write temporary HTML file for PDF generation
  const tempHtmlPath = 'public/temp_cv.html';
  fs.writeFileSync(tempHtmlPath, htmlContent);

  try {
    console.log('- Launching browser for PDF generation...');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const absolutePath = path.resolve(tempHtmlPath);
    
    console.log('- Rendering PDF...');
    await page.goto(`file:///${absolutePath.replace(/\\/g, '/')}`, {
      waitUntil: 'networkidle',
    });
    
    await page.pdf({
      path: 'public/CV_Dany_Pretel.pdf',
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' } // Let CSS handle margins
    });
    
    console.log('PDF CV successfully created at: public/CV_Dany_Pretel.pdf');
    await browser.close();
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    if (fs.existsSync(tempHtmlPath)) {
      fs.unlinkSync(tempHtmlPath);
    }
  }
}
