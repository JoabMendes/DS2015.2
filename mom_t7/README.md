#MOM implementation using zeroMQ and python (Unix)

This is an example of an application that uses a Message-Oriented Middleware 
called [zeroMQ](http://zeromq.org/). This middleware gives support to many
programming languages and has a very complete documentation. In this example
I will exmplain the basics of this middleware using python.


#Requirements

* The main software: [http://zeromq.org/intro:get-the-software](http://zeromq.org/intro:get-the-software)
* The language biding for python: [http://zeromq.org/bindings:python](http://zeromq.org/bindings:python)

Both links above come with the documentation explaning how to install and test the softwares.
After this you're ready to run the example.

#Running

This example is a basic hello-world application, where the client sends and message ("Hello") and
the server answers back with a response ("World").

![diagram](https://github.com/imatix/zguide/raw/master/images/fig2.png)


Run the server:

`$ python server.py`

And in other terminal:

`$ python client.py`

A interesting thing to try the asynchronous communication of this middleware is to
run the client before the server. The client will keep waiting the server connection
to send the information.

References and full zeroMQ tutorial: (http://zguide.zeromq.org/py:all)[http://zguide.zeromq.org/py:all] 



