import fs from 'fs';
import https from 'https';
import path from 'path';

// Paths
const profilePath = 'public/images/profile.png';
const outputPath = 'public/CV_Dany_Pretel.doc';

console.log('Generating CV document...');

// Read profile image to Base64
let profileBase64 = '';
if (fs.existsSync(profilePath)) {
  const profileBuffer = fs.readFileSync(profilePath);
  profileBase64 = profileBuffer.toString('base64');
  console.log('- Profile picture loaded successfully');
} else {
  console.log('- Warning: Profile picture not found at ' + profilePath);
}

// Fetch QR Code as Base64 (Points directly to the online CV)
const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://pretel1.github.io/Mi-portafolio/%23/cv&color=000000&bgcolor=ffffff';

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
    ? `<img src="data:image/png;base64,${profileB64}" width="100" height="100" style="border-radius: 50px; border: 2px solid #0088cc;" />`
    : '[Foto de Perfil]';

  const qrImgHtml = qrB64
    ? `<img src="data:image/png;base64,${qrB64}" width="85" height="85" style="border: 1px solid #dddddd; padding: 2px;" />`
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
      margin: 1.5cm 1.5cm 1.5cm 1.5cm;
    }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 10pt;
      line-height: 1.35;
      color: #333333;
      background-color: #ffffff;
    }
    .cv-box {
      border: 1.5pt solid #0a0c10;
      padding: 24px;
      background-color: #ffffff;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 18px;
    }
    .header-info {
      vertical-align: top;
    }
    .header-photo {
      vertical-align: top;
      text-align: right;
      width: 110px;
    }
    .name {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 20pt;
      font-weight: bold;
      color: #0a0c10;
      line-height: 1.1;
      margin: 0 0 4px 0;
    }
    .title {
      font-size: 11.5pt;
      font-weight: bold;
      color: #0088cc;
      margin: 0 0 12px 0;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }
    .contact-info {
      font-size: 8.5pt;
      color: #555555;
    }
    .contact-item {
      margin-bottom: 2px;
    }
    .section-title {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 10.5pt;
      font-weight: bold;
      color: #0a0c10;
      border-bottom: 1.5pt solid #0088cc;
      padding-bottom: 2px;
      margin-top: 16px;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .profile-text {
      font-size: 9pt;
      text-align: justify;
      color: #444444;
      line-height: 1.42;
      margin-bottom: 12px;
    }
    .columns-table {
      width: 100%;
      border-collapse: collapse;
    }
    .col-left {
      width: 32%;
      vertical-align: top;
      padding-right: 12px;
    }
    .col-right {
      width: 68%;
      vertical-align: top;
      padding-left: 12px;
      border-left: 1px solid #e2e8f0;
    }
    .item-title {
      font-weight: bold;
      font-size: 9.5pt;
      color: #0a0c10;
      margin-top: 8px;
      margin-bottom: 1px;
    }
    .item-subtitle {
      font-style: italic;
      font-size: 8.5pt;
      color: #0088cc;
      margin-bottom: 4px;
    }
    .item-desc {
      font-size: 8.5pt;
      color: #555555;
      margin-bottom: 8px;
      line-height: 1.3;
    }
    .skill-category {
      font-weight: bold;
      font-size: 8.5pt;
      color: #1a1a1a;
      margin-top: 6px;
      margin-bottom: 1px;
    }
    .skill-desc {
      font-size: 8pt;
      color: #555555;
      margin-bottom: 6px;
    }
    .qr-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      border-top: 1px solid #e2e8f0;
      padding-top: 12px;
    }
    .qr-text {
      vertical-align: middle;
      font-size: 8pt;
      color: #666666;
      line-height: 1.3;
    }
    .qr-code {
      vertical-align: middle;
      text-align: right;
      width: 95px;
    }
  </style>
</head>
<body>
  <div class="cv-box">
    
    <!-- HEADER -->
    <table class="header-table">
      <tr>
        <td class="header-info">
          <div class="name">DANY JOSE PRETEL HUAMANVILCA</div>
          <div class="title">Estudiante de Ingeniería en Ciberseguridad</div>
          <div class="contact-info">
            <div class="contact-item"><b>Ubicación:</b> Arequipa, Perú</div>
            <div class="contact-item"><b>Teléfono:</b> +51 935 738 276</div>
            <div class="contact-item"><b>Correo:</b> 1263803@senati.pe</div>
            <div class="contact-item"><b>LinkedIn:</b> linkedin.com/in/danny-pretel-2a35651a4</div>
            <div class="contact-item"><b>DNI:</b> 62113229 | <b>Nacimiento:</b> 09/05/2001</div>
          </div>
        </td>
        <td class="header-photo">
          ${profileImgHtml}
        </td>
      </tr>
    </table>

    <!-- PROFILE -->
    <div class="section-title">Perfil Profesional</div>
    <div class="profile-text">
      Futuro Ingeniero en Ciberseguridad en el 4to semestre de SENATI. Aunque cuento con varias certificaciones, mantengo la humildad de aprender constantemente y aplicar los conocimientos rápido. Suelo ir un paso adelante en los temas que me apasionan, y si desconozco algo, lo aprendo en el instante. Integro la IA como aliada clave para el análisis y síntesis de la información. Mi meta es liderar proyectos tecnológicos extraordinarios y fundar mi propia empresa en el sector.
    </div>

    <!-- MAIN BODY -->
    <table class="columns-table">
      <tr>
        <!-- LEFT COLUMN (Skills, Languages, Attributes) -->
        <td class="col-left">
          
          <div class="section-title" style="margin-top: 0;">Habilidades</div>
          
          <div class="skill-category">Redes & Cisco</div>
          <div class="skill-desc">CCNA (Introducción a Redes), Subnetting IP, direccionamiento IPv4/IPv6, configuración de routers y switches Cisco.</div>
          
          <div class="skill-category">Ciberseguridad</div>
          <div class="skill-desc">Ethical Hacking básico, escaneo de puertos, análisis de vulnerabilidades, concienciación digital y seguridad informática.</div>
          
          <div class="skill-category">Sistemas Operativos</div>
          <div class="skill-desc">Linux (Kali Linux, Red Hat Enterprise Linux I básico), Windows Client/Server.</div>
          
          <div class="skill-category">Lógica & Herramientas</div>
          <div class="skill-desc">Lógica en PSeInt, Git/GitHub, uso avanzado de herramientas de Inteligencia Artificial.</div>

          <div class="section-title">Idiomas</div>
          <table style="width: 100%; font-size: 8.5pt; color: #555555; border-collapse: collapse;">
            <tr><td style="padding: 2px 0;"><b>Español:</b></td><td style="text-align: right;">Nativo</td></tr>
            <tr><td style="padding: 2px 0;"><b>Quechua:</b></td><td style="text-align: right;">Nativo</td></tr>
            <tr><td style="padding: 2px 0;"><b>Inglés:</b></td><td style="text-align: right;">En curso</td></tr>
            <tr><td style="padding: 2px 0;"><b>Portugués:</b></td><td style="text-align: right;">Básico</td></tr>
          </table>

          <div class="section-title">Fortalezas</div>
          <ul style="font-size: 8pt; color: #555555; padding-left: 12px; margin: 0; line-height: 1.35;">
            <li style="margin-bottom: 3px;">Humildad en el aprendizaje.</li>
            <li style="margin-bottom: 3px;">Agilidad para asimilar técnicas.</li>
            <li style="margin-bottom: 3px;">Disciplina y rigor militar.</li>
            <li style="margin-bottom: 3px;">Orientación a la resolución.</li>
          </ul>

        </td>

        <!-- RIGHT COLUMN (Education, Experience, Certifications) -->
        <td class="col-right">
          
          <div class="section-title" style="margin-top: 0;">Educación</div>
          
          <div class="item-title">Ingeniería en Ciberseguridad</div>
          <div class="item-subtitle">SENATI · Arequipa, Perú | 2026 — Presente</div>
          <div class="item-desc">Cursando actualmente el 4to Semestre. Formación en redes corporativas, seguridad perimetral, administración de servidores y defensa cibernética.</div>
          
          <div class="item-title">Servicio Militar Voluntario & Especialidad de Instructor Militar</div>
          <div class="item-subtitle">Fuerzas Armadas del Perú | 2022 — 2024</div>
          <div class="item-desc">Licenciado militar con especialidad de Instructor. Experiencia en liderazgo de equipos tácticos, toma de decisiones rápidas bajo alta presión y rigurosa organización.</div>

          <div class="section-title">Certificaciones Destacadas</div>
          
          <table style="width:100%; border-collapse:collapse; font-size: 8.5pt; color:#555555;">
            <tr>
              <td style="vertical-align:top; padding: 2px 0; width: 10px;">•</td>
              <td style="padding: 2px 0;"><b>CCNA: Introducción a Redes</b> (Cisco Academy, 70 horas, 2026)</td>
            </tr>
            <tr>
              <td style="vertical-align:top; padding: 2px 0;">•</td>
              <td style="padding: 2px 0;"><b>Hacker Ético</b> (Cisco / CyberGames / UTP, 70 horas, 2026)</td>
            </tr>
            <tr>
              <td style="vertical-align:top; padding: 2px 0;">•</td>
              <td style="padding: 2px 0;"><b>Red Hat System Administration I</b> (Curso de Asistencia, 2026)</td>
            </tr>
            <tr>
              <td style="vertical-align:top; padding: 2px 0;">•</td>
              <td style="padding: 2px 0;"><b>Conceptos Básicos de Redes</b> (Cisco / SENATI, 22 horas, 2025)</td>
            </tr>
            <tr>
              <td style="vertical-align:top; padding: 2px 0;">•</td>
              <td style="padding: 2px 0;"><b>Introducción a la Ciencia de Datos</b> (Cisco / SENATI, 6 horas, 2025)</td>
            </tr>
            <tr>
              <td style="vertical-align:top; padding: 2px 0;">•</td>
              <td style="padding: 2px 0;"><b>Conceptos Básicos de Hardware</b> (Cisco / SENATI, 6 horas, 2025)</td>
            </tr>
          </table>

        </td>
      </tr>
    </table>

    <!-- FOOTER WITH QR -->
    <table class="qr-table">
      <tr>
        <td class="qr-text">
          <b>VERIFICACIÓN DIGITAL DEL CURRÍCULUM:</b><br/>
          Este documento de CV cuenta con una versión en línea interactiva y verificable.<br/>
          Escanee el código QR adjunto para acceder a las credenciales digitales en Credly y ver los detalles del portafolio en vivo.
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
