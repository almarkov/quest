import sys, json

# simple JSON echo script
for line in sys.stdin:
	print ''.join([chr(ord(x)-ord('0')) for x in line[:-1]])
