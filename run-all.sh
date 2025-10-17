#!/bin/bash

browsers=("chromium" "firefox" "webkit")

for browser in "${browsers[@]}"; do
  echo "🔁 Running tests on $browser..."

  # Set environment variable and run Cucumber with browser-specific report folder
  UI_AUTOMATION_BROWSER=$browser \
  npx cucumber-js ./src/features/*.feature \
    --require-module ts-node/register \
    --require ./src/step-definitions/**/**/*.ts \
    --require ./src/utils/cucumber-timeout.ts \
    -f json:./reports/$browser/report.json \
    --format html:./reports/$browser/report.html \
    --format progress \
    --tags "not @ignore"
done

echo "✅ All browser tests completed."
