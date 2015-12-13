#!/usr/bin/perl -w


#
#   Fortune Cookie client in Perl
#   Connects throught the IOR generated from the server
#   Requests a message from the server and prints it (Fortune cookie quote)
#

use strict; 

#Gets the interface/IDL
use CORBA::ORBit idl => [ qw(fortune.idl) ];

# Defines the network
my $orb = CORBA::ORB_init("orbit-local-orb");

#the IOR should be the string generated by the server
my $ior = "IOR";
my $object = $orb->string_to_object($ior);

#Calls the function from the IDL/Interface
print "Got:\n", $object->CookieServer() "\n";