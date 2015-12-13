#!/usr/bin/perl -w
use strict; 
use CORBA::ORBit idl => [ qw(fortune.idl) ];
my $orb = CORBA::ORB_init("orbit-local-orb");
my $ior = "IOR";
my $object = $orb->string_to_object($ior);

print "Got:\n", $object->CookieServer() "\n";