import urllib2 #Does get requests
import json #reads json 


#
#	This program implements a calculator that uses a webservice
#	It gets the params from the prompt and send to the serve thought a 
#	web service to get the answer
#

print("======== This is a calculator program using a REST webservice =======\n")

print("Enter an operation:")
print("1 - ADD")
print("2 - SUB")
print("3 - MUL")
print("4 - DIV")

func = int(input(">"))

if func == 1:
	func = "add"
elif func == 2:
	func = "sub"
elif func == 3:
	func = "mul"
elif func == 4:
	func = "div"


a = str(input("Enter the first number:"))
b = str(input("Enter the second number:"))

uri = "https://distribuidos.herokuapp.com/?func="+func+"&a="+a+"&b="+b

result = json.loads(urllib2.urlopen(uri).read())

print("The result is:")
print(result['result'])




