import requests
import json

URL = "http://localhost:3000/api/auth"

# Parameters
PARAMS = {
	"email":"dmhp",
	"password":"dmhp@2020"
}

# Headers
headers = {'content-type': 'application/json'}


r = requests.post(url = URL, params = json.dumps(PARAMS), headers = headers)

print(r.json())


