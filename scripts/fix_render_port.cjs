const fs = require('fs');
const path = require('path');

const serverPath = path.join(__dirname, '../server.js');
let code = fs.readFileSync(serverPath, 'utf8');

// 1. Fix PORT parsing at top of server.js
const portTarget = `const PORT = process.env.PORT || 3030;`;
const portReplacement = `const rawPort = process.env.PORT;
const parsedPort = parseInt(rawPort, 10);
// Ensure valid integer port > 0; guard against '0000' or malformed inputs
const PORT = (!isNaN(parsedPort) && parsedPort > 0) ? parsedPort : (process.env.NODE_ENV === 'production' ? 10000 : 3030);
const HOST = '0.0.0.0';`;

code = code.replace(portTarget, portReplacement);

// 2. Add /healthz route
const healthTarget = `  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }`;

const healthReplacement = `  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check endpoint for Render & cloud balancers
  if (pathname === '/healthz' || pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'RevNexus AI', timestamp: new Date().toISOString() }));
    return;
  }`;

code = code.replace(healthTarget, healthReplacement);

// 3. Fix server.listen to bind to HOST ('0.0.0.0')
const listenTarget = `if (!process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(\`\\n🚀 RevNexus AI Platform running at: http://localhost:\${PORT}\`);
    console.log(\`🛡️ Post-Quantum Cryptography Active: NIST FIPS 203 (ML-KEM) & FIPS 204 (ML-DSA)\`);
    console.log(\`📡 Sovereign Quantum-Resistant Cyber Security Suite Online.\`);
  });
}`;

const listenReplacement = `if (!process.env.VERCEL) {
  server.listen(PORT, HOST, () => {
    console.log(\`\\n🚀 RevNexus AI Platform running at: http://\${HOST}:\${PORT}\`);
    console.log(\`🛡️ Post-Quantum Cryptography Active: NIST FIPS 203 (ML-KEM) & FIPS 204 (ML-DSA)\`);
    console.log(\`📡 Sovereign Quantum-Resistant Cyber Security Suite Online.\`);
  });
}`;

code = code.replace(listenTarget, listenReplacement);

fs.writeFileSync(serverPath, code, 'utf8');
console.log('Successfully patched server.js for Render 0.0.0.0 host binding and port parsing');
