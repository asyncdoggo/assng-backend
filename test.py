import requests
import datetime

["Registered","Closed","Cancelled","Running"]

data = [{
    "name": "",
    "type": "",
    "division": "",
    "category": "",
    "priority": 1,
    "department": "",
    "start_date": datetime.datetime.now() - datetime.timedelta(days=10),
    "end_date": datetime.datetime.now() + datetime.timedelta(days=10),
    "location": "",
    "status": "Registered"
},
{
    "name": "",
    "type": "",
    "division": "",
    "category": "",
    "priority": 1,
    "department": "",
    "start_date": datetime.datetime.now() - datetime.timedelta(days=10),
    "end_date": datetime.datetime.now() + datetime.timedelta(days=10),
    "location": "",
    "status": "Closed"
},
{
    "name": "",
    "type": "",
    "division": "",
    "category": "",
    "priority": 1,
    "department": "",
    "start_date": datetime.datetime.now() - datetime.timedelta(days=10),
    "end_date": datetime.datetime.now() + datetime.timedelta(days=10),
    "location": "",
    "status": "Cancelled"
}

]

requests.get("", headers={})
print(response.content)

cookie = response.cookies.get("token")