const fs = require('fs');
const path = require('path');

const serverPath = path.join(__dirname, '../server.js');
let code = fs.readFileSync(serverPath, 'utf8');

code = code.replace(
  'const server = http.createServer((req, res) => {',
  'export function appHandler(req, res) {'
);

const endTarget = `    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(\`\\n🚀 RevNexus AI Platform running at: http://localhost:\${PORT}\`);
  console.log(\`🛡️ Post-Quantum Cryptography Active: NIST FIPS 203 (ML-KEM) & FIPS 204 (ML-DSA)\`);
  console.log(\`📡 Sovereign Quantum-Resistant Cyber Security Suite Online.\`);
});`;

const endReplacement = `    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer(appHandler);

if (!process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(\`\\n🚀 RevNexus AI Platform running at: http://localhost:\${PORT}\`);
    console.log(\`🛡️ Post-Quantum Cryptography Active: NIST FIPS 203 (ML-KEM) & FIPS 204 (ML-DSA)\`);
    console.log(\`📡 Sovereign Quantum-Resistant Cyber Security Suite Online.\`);
  });
}

export { server };
export default appHandler;`;

code = code.replace(endTarget, endReplacement);
fs.writeFileSync(serverPath, code, 'utf8');
console.log('Successfully updated server.js to export appHandler and server');
