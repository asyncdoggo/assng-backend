import requests

response = requests.post("http://localhost:3000/login",json={"username":"root","password":"pass1","email":"ayush@gmail.comm"})

print(response.content)

cookie = response.cookies.get("token")