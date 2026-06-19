const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const dir = 'd:\\cv pretel\\cv ofi\\public\\certificates';
const files = [
  '_certificate_1263803-senati-pe_2b23bf90-22a9-416f-89d0-b48e38c5f92e.pdf',
  '_certificate_1263803-senati-pe_59ac16b1-8ff1-4d5e-b1d9-d22d1aafcc69.pdf',
  '_certificate_1263803-senati-pe_7f3e78c9-e290-41c6-ab17-d3367e323f11.pdf',
  '_certificate_1263803-senati-pe_803bfb6c-285a-4b84-8508-01fb2f7a5231.pdf',
  '_certificate_1263803-senati-pe_bb82af10-35ce-46f1-835c-08e395cce1db.pdf',
  'CourseAttendance20260619-32-6yj0to.pdf',
  'CourseAttendance20260619-32-l0ayq0.pdf'
];

async function run() {
  for (const file of files) {
    try {
      let dataBuffer = fs.readFileSync(path.join(dir, file));
      let data = await pdf(dataBuffer);
      console.log(`\n--- FILE: ${file} ---`);
      console.log(data.text.substring(0, 500).replace(/\n/g, ' '));
    } catch(e) {
      console.log(`Error parsing ${file}: ${e.message}`);
    }
  }
}
run();
