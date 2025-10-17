const fs = require('fs');
const path = require('path');

const browsers = ['firefox', 'webkit'];
const reportDir = path.join(__dirname, 'reports');

function getStatus(reportPath) {
  try {
    const data = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
    const failed = data.filter(s => s.status === 'failed').length;
    return failed > 0 ? 'Failed' : 'Passed';
  } catch {
    return 'Unknown';
  }
}

function getTimestamp() {
  const now = new Date();
  return now.toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function generateRow(browser, status, timestamp) {
  const statusClass = status === 'Passed' ? 'pass' : status === 'Failed' ? 'fail' : '';
  return `
    <tr>
      <td>${browser}</td>
      <td><span class="status ${statusClass}">${status}</span></td>
      <td>${timestamp}</td>
      <td><a class="link" href="./${browser}/report.html" target="_blank">View Report</a></td>
    </tr>`;
}

function generateHTML(rows) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>🧪 Cucumber Test Dashboard</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #f0f4f8; padding: 2rem; }
    h1 { color: #333; margin-bottom: 1rem; }
    table { width: 100%; border-collapse: collapse; background: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.05); }
    th, td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #007acc; color: white; }
    tr:hover { background: #f9f9f9; }
    .status { font-weight: bold; padding: 0.3rem 0.6rem; border-radius: 4px; }
    .pass { color: #2e7d32; background: #c8e6c9; }
    .fail { color: #c62828; background: #ffcdd2; }
    .link { color: #007acc; text-decoration: none; }
    .link:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>🧪 Cucumber Test Dashboard</h1>
  <table>
    <thead>
      <tr>
        <th>Browser</th>
        <th>Status</th>
        <th>Executed At</th>
        <th>Report</th>
      </tr>
    </thead>
    <tbody>
      ${rows.join('\n')}
    </tbody>
  </table>
</body>
</html>`;
}

function updateDashboard() {
  const rows = browsers.map(browser => {
    const jsonPath = path.join(reportDir, browser, 'report.json');
    const status = getStatus(jsonPath);
    const timestamp = getTimestamp();
    return generateRow(browser, status, timestamp);
  });

  const html = generateHTML(rows);
  fs.writeFileSync(path.join(reportDir, 'index.html'), html, 'utf-8');
  console.log('✅ Dashboard updated: reports/index.html');
}

updateDashboard();
