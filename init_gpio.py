f_dir = open('/sys/class/gpio/gpio18/direction', 'w')

f_dir.write("out")
f_dir.close()
