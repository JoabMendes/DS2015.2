# Python stubs generated by omniidl from fortune.idl
# DO NOT EDIT THIS FILE!

import omniORB, _omnipy
from omniORB import CORBA, PortableServer
_0_CORBA = CORBA


_omnipy.checkVersion(4,2, __file__, 1)

try:
    property
except NameError:
    def property(*args):
        return None


#
# Start of module "Fortune"
#
__name__ = "Fortune"
_0_Fortune = omniORB.openModule("Fortune", r"fortune.idl")
_0_Fortune__POA = omniORB.openModule("Fortune__POA", r"fortune.idl")


# interface CookieServer
_0_Fortune._d_CookieServer = (omniORB.tcInternal.tv_objref, "IDL:Fortune/CookieServer:1.0", "CookieServer")
omniORB.typeMapping["IDL:Fortune/CookieServer:1.0"] = _0_Fortune._d_CookieServer
_0_Fortune.CookieServer = omniORB.newEmptyClass()
class CookieServer :
    _NP_RepositoryId = _0_Fortune._d_CookieServer[1]

    def __init__(self, *args, **kw):
        raise RuntimeError("Cannot construct objects of this type.")

    _nil = CORBA.Object._nil


_0_Fortune.CookieServer = CookieServer
_0_Fortune._tc_CookieServer = omniORB.tcInternal.createTypeCode(_0_Fortune._d_CookieServer)
omniORB.registerType(CookieServer._NP_RepositoryId, _0_Fortune._d_CookieServer, _0_Fortune._tc_CookieServer)

# CookieServer operations and attributes
CookieServer._d_get_cookie = ((), ((omniORB.tcInternal.tv_string,0), ), None)

# CookieServer object reference
class _objref_CookieServer (CORBA.Object):
    _NP_RepositoryId = CookieServer._NP_RepositoryId

    def __init__(self, obj):
        CORBA.Object.__init__(self, obj)

    def get_cookie(self, *args):
        return self._obj.invoke("get_cookie", _0_Fortune.CookieServer._d_get_cookie, args)

omniORB.registerObjref(CookieServer._NP_RepositoryId, _objref_CookieServer)
_0_Fortune._objref_CookieServer = _objref_CookieServer
del CookieServer, _objref_CookieServer

# CookieServer skeleton
__name__ = "Fortune__POA"
class CookieServer (PortableServer.Servant):
    _NP_RepositoryId = _0_Fortune.CookieServer._NP_RepositoryId


    _omni_op_d = {"get_cookie": _0_Fortune.CookieServer._d_get_cookie}

CookieServer._omni_skeleton = CookieServer
_0_Fortune__POA.CookieServer = CookieServer
omniORB.registerSkeleton(CookieServer._NP_RepositoryId, CookieServer)
del CookieServer
__name__ = "Fortune"

#
# End of module "Fortune"
#
__name__ = "fortune_idl"

_exported_modules = ( "Fortune", )

# The end.
