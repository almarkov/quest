import sys
import time
from SimpleWebSocketServer import *

class SimpleEcho(WebSocket):

    def handleMessage(self):
        res = self.data
        self.sendMessage(res)

    def handleConnected(self):
    	pass

    def handleClose(self):
    	pass


server = SimpleWebSocketServer('', 3030, SimpleEcho)
server.serveforever()
