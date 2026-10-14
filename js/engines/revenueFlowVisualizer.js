/**
 * RevNexus AI — Interactive Revenue Flow Sankey & DAG Pipeline Visualizer (2026 Edition)
 * 
 * Hardware-accelerated HTML5 Canvas visualization rendering cashflow velocity,
 * node drop-offs, bottleneck drag watermarks, and live optimization recalculations.
 */

export class RevenueFlowVisualizer {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.currency = options.currency || 'USD';
    this.formatMoney = options.formatMoney || ((v) => `$${Math.round(v).toLocaleString()}`);
    this.onNodeClick = options.onNodeClick || (() => {});
    
    this.particles = [];
    this.animationId = null;
    this.hoveredNode = null;
    this.hoveredLink = null;
    this.isOptimized = false;
    
    this.nodes = [];
    this.links = [];
    
    if (this.canvas) {
      this.initCanvas();
      this.setupEventListeners();
    }
  }

  initCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width || 800;
    const height = rect.height || 280;

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.ctx.scale(dpr, dpr);
    this.width = width;
    this.height = height;

    this.updateFlowData(this.isOptimized);
    this.spawnParticles();
    this.startAnimation();
  }

  resize() {
    if (!this.canvas || !this.ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width || 800;
    const height = rect.height || 280;

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
    this.width = width;
    this.height = height;

    this.updateFlowData(this.isOptimized);
    this.spawnParticles();
  }

  setCurrency(curr, formatFn) {
    this.currency = curr;
    if (formatFn) this.formatMoney = formatFn;
    this.updateFlowData(this.isOptimized);
  }

  setOptimized(optimized) {
    this.isOptimized = optimized;
    this.updateFlowData(optimized);
  }

  updateFlowData(optimized = false) {
    const w = this.width || 800;
    const h = this.height || 280;
    
    // Scale values based on currency
    const mult = this.currency === 'INR' ? 83 : 1;
    
    // Baseline pipeline values
    const grossInbound = 1250000 * mult;
    const latencyLoss = optimized ? 45000 * mult : 220000 * mult;
    const qualifiedPipeline = grossInbound - latencyLoss;
    
    const intentLoss = optimized ? 65000 * mult : 280000 * mult;
    const proposalPipeline = qualifiedPipeline - intentLoss;
    
    const discountLoss = optimized ? 25000 * mult : 190000 * mult;
    const closedWon = proposalPipeline - discountLoss;
    
    const churnLoss = optimized ? 30000 * mult : 140000 * mult;
    const retainedARR = closedWon - churnLoss;

    const totalLost = latencyLoss + intentLoss + discountLoss + churnLoss;

    // Node layout positions across width
    const colX = [
      w * 0.08,
      w * 0.28,
      w * 0.48,
      w * 0.70,
      w * 0.90
    ];

    const centerY = h * 0.48;

    this.nodes = [
      {
        id: 'stage_1',
        label: 'Gross Inbound',
        sub: 'Fit & Reach',
        amount: grossInbound,
        x: colX[0],
        y: centerY,
        width: 18,
        height: 120,
        color: '#06b6d4',
        glow: 'rgba(6, 182, 212, 0.4)'
      },
      {
        id: 'stage_2',
        label: 'Qualified Leads',
        sub: 'Speed-to-Lead',
        amount: qualifiedPipeline,
        leakage: latencyLoss,
        leakageLabel: '30m SLA Delay',
        x: colX[1],
        y: centerY + 6,
        width: 18,
        height: 104,
        color: '#3b82f6',
        glow: 'rgba(59, 130, 246, 0.4)'
      },
      {
        id: 'stage_3',
        label: 'Active Proposals',
        sub: 'Value Framing',
        amount: proposalPipeline,
        leakage: intentLoss,
        leakageLabel: 'Competitor / CAC Waste',
        x: colX[2],
        y: centerY + 14,
        width: 18,
        height: 88,
        color: '#8b5cf6',
        glow: 'rgba(139, 92, 246, 0.4)'
      },
      {
        id: 'stage_4',
        label: 'Closed Won ARR',
        sub: 'Margin Defended',
        amount: closedWon,
        leakage: discountLoss,
        leakageLabel: 'Discount Concessions',
        x: colX[3],
        y: centerY + 22,
        width: 18,
        height: 72,
        color: '#10b981',
        glow: 'rgba(16, 185, 129, 0.4)'
      },
      {
        id: 'stage_5',
        label: 'Net Retained LTV',
        sub: 'Handoff SLA',
        amount: retainedARR,
        leakage: churnLoss,
        leakageLabel: 'Onboarding Churn',
        x: colX[4],
        y: centerY + 28,
        width: 18,
        height: 60,
        color: '#34d399',
        glow: 'rgba(52, 211, 153, 0.4)'
      }
    ];

    // Connect nodes with flows & leakage tributaries
    this.links = [
      { from: 0, to: 1, amount: qualifiedPipeline, loss: latencyLoss, lossLabel: '-30m Latency Bleed' },
      { from: 1, to: 2, amount: proposalPipeline, loss: intentLoss, lossLabel: '-CAC Dilution' },
      { from: 2, to: 3, amount: closedWon, loss: discountLoss, lossLabel: '-Margin Discount Cut' },
      { from: 3, to: 4, amount: retainedARR, loss: churnLoss, lossLabel: '-Onboarding Friction' }
    ];

    this.metrics = {
      grossInbound,
      retainedARR,
      totalLost,
      throughputPct: ((retainedARR / grossInbound) * 100).toFixed(1)
    };
  }

  spawnParticles() {
    this.particles = [];
    const count = 38;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        linkIndex: Math.floor(Math.random() * this.links.length),
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        size: 2 + Math.random() * 2.5,
        color: Math.random() > 0.3 ? '#06b6d4' : '#10b981'
      });
    }
  }

  setupEventListeners() {
    let mouseX = 0;
    let mouseY = 0;

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      this.hoveredNode = null;
      for (const node of this.nodes) {
        if (
          mouseX >= node.x - node.width &&
          mouseX <= node.x + node.width * 2 &&
          mouseY >= node.y - node.height / 2 - 10 &&
          mouseY <= node.y + node.height / 2 + 30
        ) {
          this.hoveredNode = node;
          break;
        }
      }
      this.canvas.style.cursor = this.hoveredNode ? 'pointer' : 'default';
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.hoveredNode = null;
    });

    this.canvas.addEventListener('click', () => {
      if (this.hoveredNode) {
        this.onNodeClick(this.hoveredNode);
      }
    });

    window.addEventListener('resize', () => {
      if (this.canvas) this.initCanvas();
    });
  }

  draw() {
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, this.width, this.height);

    // Draw connecting flow bands (bezier ribbons)
    for (let i = 0; i < this.links.length; i++) {
      const link = this.links[i];
      const fromNode = this.nodes[link.from];
      const toNode = this.nodes[link.to];

      // Draw Main Retained Flow Ribbon
      const grad = ctx.createLinearGradient(fromNode.x, 0, toNode.x, 0);
      grad.addColorStop(0, fromNode.color + '33');
      grad.addColorStop(1, toNode.color + '44');

      ctx.beginPath();
      const cp1X = fromNode.x + (toNode.x - fromNode.x) * 0.45;
      const cp2X = fromNode.x + (toNode.x - fromNode.x) * 0.55;

      const topY1 = fromNode.y - fromNode.height / 2;
      const botY1 = fromNode.y + fromNode.height / 2;
      const topY2 = toNode.y - toNode.height / 2;
      const botY2 = toNode.y + toNode.height / 2;

      ctx.moveTo(fromNode.x + fromNode.width, topY1);
      ctx.bezierCurveTo(cp1X, topY1, cp2X, topY2, toNode.x, topY2);
      ctx.lineTo(toNode.x, botY2);
      ctx.bezierCurveTo(cp2X, botY2, cp1X, botY1, fromNode.x + fromNode.width, botY1);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Draw Leakage Downward Drain Band (Red/Rose Tributary)
      const leakGrad = ctx.createLinearGradient(fromNode.x, fromNode.y, toNode.x, this.height);
      leakGrad.addColorStop(0, 'rgba(244, 63, 94, 0.25)');
      leakGrad.addColorStop(1, 'rgba(244, 63, 94, 0.02)');

      const leakHeight = Math.max(10, Math.min(36, (link.loss / fromNode.amount) * 60));
      ctx.beginPath();
      ctx.moveTo(fromNode.x + fromNode.width, botY1 - leakHeight);
      ctx.bezierCurveTo(cp1X, botY1, cp1X + 20, this.height - 20, toNode.x - 20, this.height - 10);
      ctx.lineTo(toNode.x - 10, this.height - 5);
      ctx.bezierCurveTo(cp1X + 10, this.height - 10, cp1X, botY1, fromNode.x + fromNode.width, botY1);
      ctx.closePath();
      ctx.fillStyle = leakGrad;
      ctx.fill();

      // Leakage badge label
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = this.isOptimized ? '#10b981' : '#f43f5e';
      const badgeText = this.isOptimized ? `✓ Recaptured` : link.lossLabel;
      ctx.fillText(badgeText, fromNode.x + (toNode.x - fromNode.x) * 0.35, this.height - 18);
    }

    // Draw Flow Particles (Cashflow Velocity)
    for (const p of this.particles) {
      p.progress += p.speed;
      if (p.progress >= 1) {
        p.progress = 0;
        p.linkIndex = Math.floor(Math.random() * this.links.length);
      }

      const link = this.links[p.linkIndex];
      const from = this.nodes[link.from];
      const to = this.nodes[link.to];

      const t = p.progress;
      const x = from.x + from.width + (to.x - (from.x + from.width)) * t;
      const cp1X = from.x + (to.x - from.x) * 0.45;
      const cp2X = from.x + (to.x - from.x) * 0.55;

      // Cubic Bezier Y calculation
      const y0 = from.y;
      const y1 = from.y;
      const y2 = to.y;
      const y3 = to.y;
      const y = Math.pow(1 - t, 3) * y0 + 3 * Math.pow(1 - t, 2) * t * y1 + 3 * (1 - t) * Math.pow(t, 2) * y2 + Math.pow(t, 3) * y3;

      ctx.beginPath();
      ctx.arc(x, y + (Math.sin(t * Math.PI * 4) * 6), p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Draw Nodes (Pill Bars)
    for (const node of this.nodes) {
      const isHovered = this.hoveredNode && this.hoveredNode.id === node.id;

      // Glow shadow on hover
      if (isHovered) {
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 18;
      }

      // Bar fill
      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.roundRect(node.x, node.y - node.height / 2, node.width, node.height, 6);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inner highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillRect(node.x + 2, node.y - node.height / 2 + 4, 3, node.height - 8);

      // Node Label (Above)
      ctx.font = '700 11px Inter, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x + node.width / 2, node.y - node.height / 2 - 14);

      // Node Amount (Below)
      ctx.font = '700 11px "JetBrains Mono", monospace';
      ctx.fillStyle = node.color;
      ctx.fillText(this.formatMoney(node.amount), node.x + node.width / 2, node.y + node.height / 2 + 16);

      // Subtext
      ctx.font = '9px Inter, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(node.sub, node.x + node.width / 2, node.y + node.height / 2 + 28);
    }

    // Render Hover Tooltip
    if (this.hoveredNode) {
      this.drawTooltip(this.hoveredNode);
    }
  }

  drawTooltip(node) {
    const ctx = this.ctx;
    const ttWidth = 220;
    const ttHeight = 74;
    let ttX = node.x - ttWidth / 2 + node.width / 2;
    let ttY = node.y - node.height / 2 - ttHeight - 24;

    // Bounds check
    if (ttX < 10) ttX = 10;
    if (ttX + ttWidth > this.width - 10) ttX = this.width - ttWidth - 10;
    if (ttY < 10) ttY = node.y + node.height / 2 + 36;

    ctx.save();
    ctx.fillStyle = 'rgba(5, 7, 12, 0.94)';
    ctx.strokeStyle = node.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(ttX, ttY, ttWidth, ttHeight, 8);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 11px Inter, sans-serif';
    ctx.fillText(node.label, ttX + 12, ttY + 18);

    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = node.color;
    ctx.fillText(`Pipeline Value: ${this.formatMoney(node.amount)}`, ttX + 12, ttY + 36);

    if (node.leakage) {
      ctx.fillStyle = this.isOptimized ? '#10b981' : '#f43f5e';
      const statusText = this.isOptimized ? `✓ Protected: ${this.formatMoney(node.leakage)}` : `⚠️ Leakage: -${this.formatMoney(node.leakage)}`;
      ctx.fillText(statusText, ttX + 12, ttY + 52);
    } else {
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Top of Funnel Gross Flow`, ttX + 12, ttY + 52);
    }

    ctx.font = '9px Inter, sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`Click to inspect Stage Workbench ↗`, ttX + 12, ttY + 66);
    ctx.restore();
  }

  startAnimation() {
    const loop = () => {
      this.draw();
      this.animationId = requestAnimationFrame(loop);
    };
    loop();
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
