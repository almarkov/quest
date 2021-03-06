import serial
import sys
import time

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
		time.sleep(0.01)
		f = f+1
	res = port.read(ord(req[0]))
	return res


def make_request(req):
	res = ''
	# watchdog
	if ord(req[0]) == 255:
		for i in range(0,ord(req[1])):
			res += send_req(req[2+5*i:7+5*i], 0.004)
	# command
	else:
<<<<<<< HEAD
		out_gpio('1')
		port.write(req[1:])
		time.sleep(0.006)
		out_gpio('0')
		f = 0
		while(port.inWaiting() == 0 and f < 5):
			time.sleep(0.01)
			f = f+1
		res = port.read(ord(req[0]))
		sys.stdout.write(res)
=======
		res = send_req(req, 0.006)

>>>>>>> 2f5a5657e8b449ae4a317c5be95965190142e71e


port = serial.Serial("/dev/ttyUSB0", baudrate=9600, timeout=0.1)

req = sys.stdin.read()

res = make_request(req)

sys.stdout.write(res)

