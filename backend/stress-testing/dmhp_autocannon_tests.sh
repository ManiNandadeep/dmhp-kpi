echo "Low Latency, No Auth Route"
npx autocannon -d 3 -t 3 http://localhost:3000/

echo "High Latency, Auth Routes"

# HR Data Stored Procedure
echo "HR DATA INFO"
npx autocannon -H "Authorization: Bearer YOURTOKENHERE" -H "Content-Type:application/json" -i YOURPATHHERE -m 'POST' -d 3 -t 3 --renderStatusCodes http://localhost:3000/hr

