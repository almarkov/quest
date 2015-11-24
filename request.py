import serial
import sys
import time

def out_gpio(value):
	f_val = open('/sys/class/gpio/gpio18/value', 'w')
	f_val.write(value)
	f_val.close()

def make_request(req):
	# watchdog
	if ord(req[0]) == 255:
		for i in range(0,ord(req[1])):
			out_gpio('1')
			port.write(req[3+5*i:7+5*i])
			time.sleep(0.004)
			out_gpio('0')
			f = 0
			while(port.inWaiting() == 0 and f < 5):
				time.sleep(0.01)
				f = f+1
			res = port.read(ord(req[2+5*i]))
			sys.stdout.write(res)

	# command
	else:
		out_gpio('1')
		port.write(req[1:])
		time.sleep(0.004)
		out_gpio('0')
		f = 0
		while(port.inWaiting() == 0 and f < 5):
			time.sleep(0.01)
			f = f+1
		res = port.read(ord(req[0]))
		sys.stdout.write(res)


port = serial.Serial("/dev/ttyUSB0", baudrate=9600, timeout=0.1)

req = sys.stdin.read()

make_request(req)

