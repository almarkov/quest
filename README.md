# quest
# useful things
# start:
```bash
node app.js
```

# Обновление raspberry raspbian  
```bash
sudo apt-get upgrade
sudo apt-get update
```

# linux-arm node.js
Download Node.js source
Raspberry Pi Model A, B, B+ and Compute Module
```bash
wget https://nodejs.org/dist/v4.0.0/node-v4.0.0-linux-armv6l.tar.gz 
tar -xvf node-v4.0.0-linux-armv6l.tar.gz 
cd node-v4.0.0-linux-armv6l
```

Raspberry Pi 2 Model B
```bash
wget https://nodejs.org/dist/v4.0.0/node-v4.0.0-linux-armv7l.tar.gz 
tar -xvf node-v4.0.0-linux-armv7l.tar.gz 
cd node-v4.0.0-linux-armv7l
```

Copy to /usr/local
```bash
sudo cp -R * /usr/local/
```
That's it! To check Node.js is properly install and you have the right version, run the command node -v


# script autorun  
Auto running a script  
Create the script  
Create a folder to store the script in  

```bash
mkdir ./bin
cd ./bin
```
Create the script using the nano text editor

```bash
sudo nano script_auto_run
In the nano editor, type this script:
```
```bash
#!/bin/bash
# Script to start our application
echo "Doing autorun script..."
sudo /home/pi/projects/my_project.a &
```
 
Replace "sudo /home/pi/projects/my_project.a &" with the commands you want carried out.  
The "&" means do the command in the background.  

Note that when executing a command without logging is as a user you can't depend on any path or environment variables so you must provide full paths to everything.  

Save it by pressing Ctrl+X, " Y", ENTER  

This script needs to be made executable by typing this:  

```bash
sudo chmod 755 script_auto_run
```

You can test the script works by typing  
```bash
/home/pi/bin/script_auto_run
```
Setting it to be run  
To launch the script at start-up edit the “rc.local” file needs to be edited.  
```bash
sudo nano /etc/rc.local
```
Add the following line:  

```bash
/home/pi/bin/script_auto_run
```
Save it by pressing Ctrl+X, " Y", ENTER  

Re-boot your RPi and it will run.  

# omxplayer install  
```bash
sudo apt-get update
sudo apt-get -y install omxplayer
```
Usage: omxplayer [OPTIONS] [FILE]
Options :
         -h / --help                    print this help
         -n / --aidx  index             audio stream index    : e.g. 1
         -o / --adev  device            audio out device      : e.g. hdmi/local
         -i / --info                    dump stream format and exit
         -s / --stats                   pts and buffer stats
         -p / --passthrough             audio passthrough
         -d / --deinterlace             deinterlacing
         -w / --hw                      hw audio decoding
         -3 / --3d mode                 switch tv into 3d mode (e.g. SBS/TB)
         -y / --hdmiclocksync           adjust display refresh rate to match video (default)
         -z / --nohdmiclocksync         do not adjust display refresh rate to match video
         -t / --sid index               show subtitle with index
         -r / --refresh                 adjust framerate/resolution to video
         -g / --genlog                  generate log file
         -l / --pos n                   start position (in seconds)
              --boost-on-downmix        boost volume when downmixing
              --vol n                   Set initial volume in millibels (default 0)
              --subtitles path          external subtitles in UTF-8 srt format
              --font path               subtitle font
                                        (default: /usr/share/fonts/truetype/freefont/FreeSans.ttf)
              --font-size size          font size as thousandths of screen height
                                        (default: 55)
              --align left/center       subtitle alignment (default: left)
              --lines n                 number of lines to accommodate in the subtitle buffer
                                        (default: 3)
              --win "x1 y1 x2 y2"       Set position of video window
              --audio_fifo  n           Size of audio output fifo in seconds
              --video_fifo  n           Size of video output fifo in MB
              --audio_queue n           Size of audio input queue in MB
              --video_queue n           Size of video input queue in MB
```bash
pid=$(ps -o pid= -C omxplayer)
kill $pid
```
```bash
mkfifo /tmp/cmd

omxplayer -ohdmi mymedia.avi < /tmp/cmd

echo . > /tmp/cmd (Start omxplayer running as the command will initial wait for input via the fifo)

echo -n p > /tmp/cmd - Playback is paused

echo -n q > /tmp/cmd - Playback quits
```
```bash
 NOREFRESH=1 omxplayer video.mp4
```

# rasberry autologin
How to automatically login to Raspberry Pi text console as pi user.
Step 1: Open a terminal session and edit inittab file.
sudo nano /etc/inittab
Step 2: Disable the getty program.
Navigate to the following line in inittab
1:2345:respawn:/sbin/getty 115200 tty1

And add a # at the beginning of the line to comment it out
\#1:2345:respawn:/sbin/getty 115200 tty1
Step 3: Add login program to inittab.
Add the following line just below the commented line1:2345:respawn:/bin/login -f pi tty1 </dev/tty1 >/dev/tty1 2>&1
This will run the login program with pi user and without any authentication  
Step 4: Save and Exit.  
Press Ctrl+X to exit nano editor followed by Y to save the file and then press Enter to confirm the filename.  
Reboot the pi and it will boot straight on to the shell prompt pi@raspberrypi without prompting you to enter username or password. But this isn't enough; you need your Pi to automatically run some command or a script. which is explained in the next section.  
Run a Script after login  
How to automatically run a script after login.  
Step 1: Open a terminal session and edit the file /etc/profile  
sudo nano /etc/profile  
Step 2: Add the following line to the end of the file  
. /home/pi/your_script_name.sh  
replace the script name and path with correct name and path of your start-up script.  
Step 3: Save and Exit  
Press Ctrl+X to exit nano editor followed by Y to save the file.  
