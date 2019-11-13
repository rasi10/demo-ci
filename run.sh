#!/bin/sh
asadmin stop-domain domain1
asadmin start-domain domain1
psql -h localhost -U postgres hotel -f ~/workspace/demo-ci/hoteljsf/database-backup.sql 
cd ~/workspace/demo-ci/lecture-frontend
npm run cypress:run
cd ~/workspace/demo-ci/lecture-backend
npm run cypress:run
