/**
 * Blog charts — render bằng ECharts, dùng theme + màu + quy ước chuẩn của Semantix
 * (lib/viz/core/theme.ts, growth-accounting-colors.ts, generators/column/standard.ts,
 *  generators/waterfall.ts, generators/heatmap.ts).
 *
 * Dùng trong markdown:
 *   <div class="viz">
 *     <div class="viz-chart" data-chart="growth|cohort|line|waterfall" data-chart-data='{...}'></div>
 *     <div class="viz-caption">…</div>
 *   </div>
 *
 * ECharts lazy-load từ CDN (echarts@5.5.0) và CHỈ tải khi trang có chart.
 */

type AnyOption = Record<string, any>;

// ── Theme chuẩn Semantix (light) ─────────────────────────────────────────
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const AXIS_LABEL = '#94a3b8'; // slate-400
const LINE_COLOR = '#e2e8f0'; // slate-200
const TEXT_COLOR = '#64748b'; // slate-500
const RADIUS = 4;

// Màu metric growth accounting (lib/viz/growth-accounting-colors.ts)
const GROWTH_COLORS: Record<string, string> = {
  retained: '#8b5cf6', new: '#10b981', resurrected: '#3b82f6', revive: '#3b82f6',
  expansion: '#4ade80', churned: '#ef4444', churn: '#ef4444', contraction: '#ec4899',
  active: '#f59e0b', quickratio: '#f97316', quick: '#f97316',
};
const LINE_PALETTE = ['#6366f1', '#10b981', '#ef4444', '#f59e0b', '#3b82f6', '#ec4899'];

function baseTooltip(trigger: 'axis' | 'item'): AnyOption {
  return {
    trigger, appendToBody: true, confine: true,
    axisPointer: { type: 'shadow' },
    backgroundColor: '#ffffff', borderColor: LINE_COLOR, borderWidth: 1,
    textStyle: { color: '#0f172a', fontFamily: FONT, fontSize: 12 },
    padding: [8, 12],
    extraCssText: 'box-shadow: 0 4px 16px rgba(15,23,42,.12); border-radius: 8px;',
  };
}
function baseLegend(): AnyOption {
  return { show: true, bottom: 0, icon: 'circle', itemGap: 16, itemHeight: 10,
    textStyle: { color: TEXT_COLOR, fontFamily: FONT, fontSize: 12 } };
}
function catAxis(extra: AnyOption = {}): AnyOption {
  return { type: 'category', axisLine: { lineStyle: { color: LINE_COLOR } }, axisTick: { show: false },
    axisLabel: { color: AXIS_LABEL, fontFamily: FONT, fontSize: 11, fontWeight: 500 }, ...extra };
}
function valAxis(extra: AnyOption = {}): AnyOption {
  return { type: 'value', axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: AXIS_LABEL, fontFamily: FONT, fontSize: 11 },
    splitLine: { lineStyle: { color: LINE_COLOR, type: 'dashed' } }, ...extra };
}
const colorFor = (key: string | undefined, fb: string) =>
  (key && GROWTH_COLORS[key.toLowerCase().replace(/[^a-z]/g, '')]) || fb;

// ── Growth accounting: cột chồng (dương lên, churn âm xuống trục 0) ─────────
// Bo góc CHỈ ở khối trên cùng (dương) và dưới cùng (âm) mỗi cột — như Semantix.
function buildGrowthOption(d: AnyOption): AnyOption {
  const periods: string[] = d.periods;
  const fb = ['#8b5cf6', '#10b981', '#3b82f6', '#ef4444', '#f59e0b'];
  const raw = (d.series as any[]).map((s, i) => {
    const isLine = s.type === 'line' || s.yAxis === 1;
    const vals = (s.values as any[]).map((v) =>
      v === null || v === undefined ? null : (s.negative ? -Math.abs(Number(v)) : Number(v))
    );
    return { s, i, isLine, vals, color: s.color || colorFor(s.key || s.name, fb[i % fb.length]) };
  });
  // top-positive / bottom-negative bar-series index cho từng cột (standard.ts:40-56)
  const barIdx = raw.filter((r) => !r.isLine).map((r) => r.i);
  const topPos: number[] = [], botNeg: number[] = [];
  periods.forEach((_, c) => {
    let hp = -1, ln = -1;
    barIdx.forEach((bi) => {
      const v = raw[bi].vals[c];
      if (v != null && v > 0) hp = bi;
      if (v != null && v < 0) ln = bi;
    });
    topPos[c] = hp; botNeg[c] = ln;
  });
  const hasLine = raw.some((r) => r.isLine);
  const series = raw.map((r) => {
    if (r.isLine) {
      return { name: r.s.name, type: 'line', yAxisIndex: r.s.yAxis ?? 1, data: r.vals,
        smooth: true, symbolSize: 7, lineStyle: { width: 3, color: r.color }, itemStyle: { color: r.color }, connectNulls: true };
    }
    return {
      name: r.s.name, type: 'bar', stack: 'total', yAxisIndex: 0, barMaxWidth: 48,
      itemStyle: { color: r.color },
      data: r.vals.map((v: number | null, c: number) => {
        let br: any = 0;
        if (v != null && v > 0 && topPos[c] === r.i) br = [RADIUS, RADIUS, 0, 0];
        else if (v != null && v < 0 && botNeg[c] === r.i) br = [0, 0, RADIUS, RADIUS];
        return { value: v, itemStyle: { borderRadius: br } };
      }),
    };
  });
  const yAxis: AnyOption[] = [valAxis()];
  if (hasLine) yAxis.push(valAxis({ splitLine: { show: false }, position: 'right', name: d.y2?.name }));
  return {
    textStyle: { fontFamily: FONT },
    grid: { top: 24, left: 8, right: hasLine ? 28 : 12, bottom: 44, containLabel: true },
    tooltip: baseTooltip('axis'), legend: baseLegend(),
    xAxis: catAxis({ data: periods }), yAxis, series,
  };
}

// ── Cohort retention heatmap ──────────────────────────────────────────────
function buildCohortOption(d: AnyOption): AnyOption {
  const cohorts = d.cohorts as string[];
  const periods = d.periodLabels as string[];
  const unit = d.unit ?? '';
  const yAxisData = [...cohorts].reverse(); // cohort đầu nằm trên cùng
  const points: any[] = [];
  let max = 0;
  (d.matrix as (number | null)[][]).forEach((row, ci) => {
    row.forEach((v, pi) => {
      if (v === null || v === undefined) return;
      if (Number(v) > max) max = Number(v);
      points.push([pi, yAxisData.indexOf(cohorts[ci]), Number(v)]);
    });
  });
  return {
    textStyle: { fontFamily: FONT },
    grid: { left: 8, right: 12, top: 12, bottom: 56, containLabel: true },
    tooltip: { ...baseTooltip('item'),
      formatter: (p: any) => `${yAxisData[p.value[1]]} · ${periods[p.value[0]]}<br/><b>${p.value[2]}${unit}</b>` },
    xAxis: catAxis({ data: periods, splitArea: { show: true } }),
    yAxis: catAxis({ data: yAxisData, splitArea: { show: true }, axisLine: { show: false } }),
    visualMap: { min: 0, max: d.max ?? max, calculable: true, orient: 'horizontal', left: 'center',
      bottom: 8, itemWidth: 14, itemHeight: 120,
      inRange: { color: ['#eef2ff', '#a5b4fc', '#6366f1', '#4338ca'] },
      textStyle: { color: TEXT_COLOR, fontFamily: FONT, fontSize: 11 } },
    series: [{ type: 'heatmap', data: points,
      label: { show: true, fontFamily: FONT, fontSize: 11, fontWeight: 600, formatter: (p: any) => `${p.value[2]}${unit}` },
      itemStyle: { borderColor: '#ffffff', borderWidth: 2, borderRadius: 3 },
      emphasis: { itemStyle: { shadowBlur: 8, shadowColor: 'rgba(0,0,0,.2)' } } }],
  };
}

// ── Line: đa đường + đường ngưỡng (markLine) + vùng tô (markArea) + callout (endLabel) ──
// data = { xLabels:[], yUnit?:"%", series:[{name,values,color?,dashed?,area?,endLabel?}], markLine?:[{y,label,color?,dashed?}], markArea?:[{from,to,color}] }
function buildLineOption(d: AnyOption): AnyOption {
  const unit = d.yUnit ?? '';
  const hasEnd = (d.series as any[]).some((s) => s.endLabel);
  const series = (d.series as any[]).map((s, i) => {
    const color = s.color || LINE_PALETTE[i % LINE_PALETTE.length];
    const opt: AnyOption = {
      name: s.name, type: 'line', data: s.values, smooth: true,
      symbol: 'circle', symbolSize: 6, connectNulls: true,
      lineStyle: { width: 3, color, type: s.dashed ? 'dashed' : 'solid' },
      itemStyle: { color },
      ...(s.area ? { areaStyle: { color, opacity: 0.08 } } : {}),
      ...(s.endLabel ? { endLabel: { show: true, formatter: () => s.name, color, fontFamily: FONT, fontSize: 12, fontWeight: 700 } } : {}),
    };
    return opt;
  });
  // markLine + markArea gắn vào series đầu
  if (d.markLine && series[0]) {
    series[0].markLine = {
      symbol: 'none', silent: true,
      data: (d.markLine as any[]).map((m) => ({
        yAxis: m.y,
        lineStyle: { color: m.color || '#94a3b8', type: m.dashed === false ? 'solid' : 'dashed', width: 1.5 },
        label: { show: !!m.label, formatter: m.label, position: 'insideEndTop', color: m.color || TEXT_COLOR, fontFamily: FONT, fontSize: 11 },
      })),
    };
  }
  if (d.markArea && series[0]) {
    series[0].markArea = {
      silent: true,
      data: (d.markArea as any[]).map((a) => [
        { yAxis: a.from, itemStyle: { color: a.color || 'rgba(16,185,129,.06)' } },
        { yAxis: a.to },
      ]),
    };
  }
  return {
    textStyle: { fontFamily: FONT },
    grid: { top: 24, left: 8, right: hasEnd ? 96 : 16, bottom: 44, containLabel: true },
    tooltip: { ...baseTooltip('axis'), valueFormatter: (v: any) => (v == null ? '–' : `${v}${unit}`) },
    legend: baseLegend(),
    xAxis: catAxis({ data: d.xLabels, boundaryGap: false }),
    yAxis: valAxis({ axisLabel: { color: AXIS_LABEL, fontFamily: FONT, fontSize: 11, formatter: (v: number) => `${v}${unit}` } }),
    series,
  };
}

// ── Waterfall (bắc cầu): placeholder trong suốt + Tăng/Giảm/Tổng (waterfall.ts) ──
// data = { items:[{label, value, type?:"total"}], unit?:"" }  (value âm = giảm; type:"total" = cột mốc)
function buildWaterfallOption(d: AnyOption): AnyOption {
  const unit = d.unit ?? '';
  const inc = '#10b981', dec = '#ef4444', tot = '#2563eb';
  const xData: string[] = [], help: any[] = [], pos: any[] = [], neg: any[] = [], total: any[] = [];
  let running = 0;
  (d.items as any[]).forEach((it) => {
    xData.push(it.label);
    const v = Number(it.value) || 0;
    if (it.type === 'total') {
      help.push(0); pos.push('-'); neg.push('-');
      total.push({ value: v, itemStyle: { color: tot, borderRadius: [RADIUS, RADIUS, 0, 0] } });
      running = v;
    } else if (v >= 0) {
      help.push(running); pos.push(v); neg.push('-'); total.push('-'); running += v;
    } else {
      running += v; help.push(running); pos.push('-'); neg.push(Math.abs(v)); total.push('-');
    }
  });
  const lbl = (c: string) => ({ show: true, position: 'top', formatter: (p: any) => (p.value === '-' ? '' : `${p.value}${unit}`),
    color: c, fontFamily: FONT, fontSize: 11, fontWeight: 700 });
  return {
    textStyle: { fontFamily: FONT },
    grid: { top: 28, left: 8, right: 12, bottom: 28, containLabel: true },
    tooltip: { ...baseTooltip('axis'),
      formatter: (ps: any[]) => {
        const a = ps.find((p) => p.value !== '-' && p.seriesName !== 'base');
        return a ? `${a.name}<br/><b>${a.value}${unit}</b>` : '';
      } },
    xAxis: catAxis({ data: xData, splitLine: { show: false } }),
    yAxis: valAxis(),
    series: [
      { name: 'base', type: 'bar', stack: 'wf', silent: true, itemStyle: { color: 'transparent' },
        emphasis: { itemStyle: { color: 'transparent' } }, data: help },
      { name: 'Tăng', type: 'bar', stack: 'wf', itemStyle: { color: inc, borderRadius: [RADIUS, RADIUS, 0, 0] }, label: lbl(inc), data: pos },
      { name: 'Giảm', type: 'bar', stack: 'wf', itemStyle: { color: dec, borderRadius: [0, 0, RADIUS, RADIUS] }, label: lbl(dec), data: neg },
      { name: 'Tổng', type: 'bar', stack: 'wf', label: lbl(tot), data: total },
    ],
    legend: { ...baseLegend(), data: ['Tăng', 'Giảm', 'Tổng'] },
  };
}

const BUILDERS: Record<string, (d: AnyOption) => AnyOption> = {
  growth: buildGrowthOption,
  cohort: buildCohortOption,
  line: buildLineOption,
  waterfall: buildWaterfallOption,
};

// ── Lazy-load ECharts từ CDN (echarts@5.5.0) ──────────────────────────────
let echartsPromise: Promise<any> | null = null;
function loadECharts(): Promise<any> {
  const w = window as any;
  if (w.echarts) return Promise.resolve(w.echarts);
  if (echartsPromise) return echartsPromise;
  echartsPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/echarts@5.5.0/dist/echarts.min.js';
    s.async = true;
    s.onload = () => resolve((window as any).echarts);
    s.onerror = () => reject(new Error('Không tải được ECharts'));
    document.head.appendChild(s);
  });
  return echartsPromise;
}

function renderAll() {
  const els = Array.from(document.querySelectorAll<HTMLElement>('.viz-chart[data-chart]'));
  if (!els.length) return;
  loadECharts()
    .then((echarts) => {
      els.forEach((el) => {
        const build = BUILDERS[el.dataset.chart || ''];
        if (!build) return;
        let data: AnyOption;
        try { data = JSON.parse(el.dataset.chartData || '{}'); }
        catch (e) { console.error('[blog-charts] data-chart-data lỗi JSON', el, e); return; }
        const chart = echarts.init(el, null, { renderer: 'svg' });
        chart.setOption(build(data));
        new ResizeObserver(() => chart.resize()).observe(el);
      });
    })
    .catch((e) => console.error('[blog-charts]', e));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderAll);
else renderAll();
