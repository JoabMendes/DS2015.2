#!/usr/bin/env python

#
#   Fortune Cookie server in Python
#   Connects throught the IOR generated from the server
#   Requests a message from the server and prints it (Fortune cookie quote)
#
 
import sys, os 

#Imports the CORBA library and the IDL path
import CORBA, Fortune, Fortune__POA
 
#Defines the path to the fortune programs
FORTUNE_PATH = "/usr/games/fortune"


#Defines the class for the server 
class CookieServer_i (Fortune__POA.CookieServer):
	#The method to the cookie from the fortune program
    def get_cookie(self):
        pipe = os.popen(FORTUNE_PATH)
        cookie = pipe.read()
        if pipe.close():
            # An error occurred with the pipe
            cookie = "Oh dear, couldn't get a fortune\n"
        return cookie
 

orb = CORBA.ORB_init(sys.argv) 
poa = orb.resolve_initial_references("RootPOA")
 
#Defines the servant object for this server
servant = CookieServer_i() 
poa.activate_object(servant)
 
#Prints the IOR of the servant object 
print orb.object_to_string(servant._this())
 
#Run
poa._get_the_POAManager().activate()
orb.run()

