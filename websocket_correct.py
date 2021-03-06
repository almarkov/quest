import serial
import sys
import time
from SimpleWebSocketServer import *

port = serial.Serial("/dev/ttyUSB0", baudrate=9600, timeout=0.1)

def out_gpio(value):
	f_val = open('/sys/class/gpio/gpio18/value', 'w')
	f_val.write(value)
	f_val.close()

def send_req(req, write_wait):
	out_gpio('1')
	port.write(req[1:])
	time.sleep(write_wait)
	out_gpio('0')
	f = 0
	while(port.inWaiting() == 0 and f < 5):
		time.sleep(0.002)
		f = f+1
	time.sleep(0.040)
	res = port.read(ord(req[0]))
	return res

def make_request(req):
	res = ''
	# watchdog
	if req[0] == 255:
		for i in range(0,req[1]):
			yy = send_req(bytes(req[2+5*i:7+5*i]), 0.004)
			res = res + "".join(yy)
	# command
	else:
		yy = send_req(bytes(req), 0.006)
		res = res + "".join(yy)
	return res

class SimpleEcho(WebSocket):

	def handleMessage(self):
		res = make_request(self.data)
		self.sendMessage(res)

	def handleConnected(self):
		pass

	def handleClose(self):
		pass

print 'starting...'
server = SimpleWebSocketServer('', 3030, SimpleEcho)
server.serveforever()
