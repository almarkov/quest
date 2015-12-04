import sys
import time
from SimpleWebSocketServer import *

class SimpleEcho(WebSocket):

    def handleMessage(self):
        res = '\x01\xFF\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
        self.sendMessage(res)

    def handleConnected(self):
    	pass

    def handleClose(self):
    	pass


server = SimpleWebSocketServer('', 3030, SimpleEcho)
server.serveforever()
