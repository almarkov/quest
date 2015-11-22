import serial
import sys
import time

def out_gpio(value):
	f_val = open('/sys/class/gpio/gpio18/value', 'w')
	f_val.write(value)
	f_val.close()

def make_request(req):
	out_gpio('1')
	port.write(req[1:])
	time.sleep(0.004)
	out_gpio('0')
	while(port.inWaiting() == 0):
		time.sleep(0.5)
	res = port.read(ord(req[0]))
	sys.stdout.write(res)


port = serial.Serial("/dev/ttyUSB0", baudrate=9600, timeout=1.0)

req = sys.stdin.read()

make_request(req)

