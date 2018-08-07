aws s3 sync ./build s3://app.openteamspace.com/dev
aws s3 cp s3://app.openteamspace.com/dev/service-worker.js s3://app.openteamspace.com/dev/service-worker.js --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type application/javascript --acl public-read
