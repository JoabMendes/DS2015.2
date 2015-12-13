#
#   Fortune Cookie client in Python
#   Connects throught the IOR generated from the server
#   Requests a message from the server and prints it (Fortune cookie quote)
#

#Imports the CORBA library and the IDL path
import CORBA, Fortune   

#Starths the CORBA object
orb = CORBA.ORB_init()
#the IOR should be the string generated by the server
ior = ""
o = orb.string_to_object("")

#Define the interface that will be used
o = o._narrow(Fortune.CookieServer)

#Calls the function from the IDL/Interface
print o.get_cookie()