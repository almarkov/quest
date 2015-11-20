import serial
import sys, json
import RPi.GPIO as GPIO
import time

# GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

busy_pin = 4

GPIO.setup(busy_pin, GPIO.OUT)

# Serial
port = serial.Serial("/dev/ttyAMA0", baudrate=115200, timeout=1.0)

for line in sys.stdin:

	# pin 4 -> 1
	GPIO.output(busy_pin, 1)
	# send command to serial
	command = [chr(ord(x)-ord('0')) for x in line[:-1]]

	port.write(''.join(command))
	# pin 4 -> 0
	GPIO.output(busy_pin, 0)
	# read response from serial
	# rcv = port.read(7)
	rcv = command
	# send response to node
	rcv = [chr(ord(x)+ord('0'))  for x in rcv]
	print ''.join(rcv)
