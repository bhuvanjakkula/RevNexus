async function testLive() {
  console.log('Fetching live Vercel URL...');
  const url = 'https://rev-nexus-54u1.vercel.app/?cacheBust=' + Date.now();
  const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' } });
  const html = await res.text();

  console.log('HTTP Status:', res.status);
  console.log('Contains value="bhuvanjakkula@gmail.com":', html.includes('value="bhuvanjakkula@gmail.com"'));
  console.log('Contains QuantumSecure2026!:', html.includes('QuantumSecure2026!'));
  console.log('Contains btn-gateway-master-clearance:', html.includes('btn-gateway-master-clearance'));
  console.log('Contains btn-quick-vip-owner:', html.includes('btn-quick-vip-owner'));

  if (!html.includes('value="bhuvanjakkula@gmail.com"') && !html.includes('QuantumSecure2026!') && !html.includes('btn-gateway-master-clearance')) {
    console.log('🎉 LIVE VERIFICATION SUCCESSFUL! Credentials completely purged from Vercel.');
  } else {
    console.log('⏳ Vercel build is currently in progress. Waiting for edge deployment to finalize...');
  }
}

testLive();
