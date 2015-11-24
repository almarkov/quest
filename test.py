import serial
import sys
import time

def out_gpio(value):
	f_val = open('/sys/class/gpio/gpio18/value', 'w')
	f_val.write(value)
	f_val.close()

# первый байт req - ожидаемая длина ответа
def make_request(req):
	out_gpio('1')
	port.write(req[1:])
	time.sleep(0.004)
	out_gpio('0')
	while(port.inWaiting() == 0):
		time.sleep(0.5)
	res = port.read(req[0])
	sys.stdout.write(res)


port = serial.Serial("/dev/ttyUSB0", baudrate=9600, timeout=1.0)

#req = sys.stdin.read()
# команда
req = '\x06\x01\x00\x00\x00\x00\x00';
# watchdog (если 3 устройства)
req = '\x07\x01\xFF\x00\x00';

make_request(req)

