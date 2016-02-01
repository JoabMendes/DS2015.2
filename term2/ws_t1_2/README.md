#Webservices 


##REST implmentation

Under the folder `rest` there's an example of a REST client that uses a webservice
of a calculator server. The webserver works under the `https://distribuidos.herokuapp.com/`
url and the params should be sent as the PHP $_GET pattern.

The calculate can do the follow opetations:

* `add`: `https://distribuidos.herokuapp.com/?func=add&a=&b=`
* `sub`: `https://distribuidos.herokuapp.com/?func=sub&a=&b=`
* `mul`: `https://distribuidos.herokuapp.com/?func=mul&a=&b=`
* `div`: `https://distribuidos.herokuapp.com/?func=div&a=&b=`

###Running

Just run:

```
$ python client.py
```

##SOAP implementation

The SOAP implementation example is written in java where is the defined the Interface [SEI (Service Endpoint Interface)] and the implementation service [SIB (Service Implementation Bean)]

###Running

First you need to compile the application with `javac`.

Compile the Interface and the implementation classes (from outiside the `soap` folder):

```
$ javac soap/CalculadoraServer.java
$ javac soap/CalculadoraServerImpl.java
```

Now compile the publisher:

```
$ javac soap/CalculadoraServerPublisher.java
```

Compile the client

```
$ javac soap/CalculadoraClient.java
```

Now first run the publisher:

```
$ java soap.CalculadoraServerPublisher
```

And then in other terminal run the Client:

```
$ java soap.CalculadoraClient
```

References: 
[Desenvolvendo e Usando Webservices em Java](http://www.linhadecodigo.com.br/artigo/3654/desenvolvendo-e-usando-web-services-em-java.aspx)







