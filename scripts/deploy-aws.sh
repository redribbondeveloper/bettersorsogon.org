#!/usr/bin/env bash
# Deploy BetterGov Sorsogon to S3 + CloudFront (AWS profile: personal).
# Usage: ./scripts/deploy-aws.sh
set -euo pipefail

BUCKET="bettersorsogon-org"
DIST_ID="E3OCHBG6OAGXS5"
PROFILE="personal"

npm run build

# Hashed bundle: immutable for a year.
aws s3 sync dist/assets "s3://$BUCKET/assets" --profile "$PROFILE" \
  --cache-control "public,max-age=31536000,immutable" --delete

# Everything else (images, locales, sitemap...): one day.
aws s3 sync dist "s3://$BUCKET" --profile "$PROFILE" \
  --exclude "assets/*" --exclude "index.html" \
  --cache-control "public,max-age=86400" --delete

# The app shell: always revalidate.
aws s3 cp dist/index.html "s3://$BUCKET/index.html" --profile "$PROFILE" \
  --cache-control "no-cache,must-revalidate"

aws cloudfront create-invalidation --distribution-id "$DIST_ID" \
  --paths "/index.html" "/" --profile "$PROFILE" --output text
echo "Deployed. https://bettersorsogon.org"
