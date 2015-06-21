#include <windows.h>

int main(int argc, char *argv[]) {

	HANDLE serialHandle;

	serialHandle = CreateFile((LPCWSTR)"\\\\.\\COM20", GENERIC_READ | GENERIC_WRITE, 0, 0, OPEN_EXISTING, FILE_FLAG_OVERLAPPED, 0);
	/*
	DCB serialParams = { 0 };
	serialParams.DCBlength = sizeof(serialParams);

	GetCommState(serialHandle, &serialParams);
	serialParams.BaudRate = baudrate;
	serialParams.ByteSize = byteSize;
	serialParams.StopBits = stopBits;
	serialParams.Parity = parity;
	SetCommState(serialHandle, &serialParams);
	*/
	/*
	COMMTIMEOUTS timeout = { 0 };
	timeout.ReadIntervalTimeout = 50;
	timeout.ReadTotalTimeoutConstant = 50;
	timeout.ReadTotalTimeoutMultiplier = 50;
	timeout.WriteTotalTimeoutConstant = 50;
	timeout.WriteTotalTimeoutMultiplier = 10;

	SetCommTimeouts(serialHandle, &timeout);
	*/
	unsigned char port = 0;
	char *port_ptr = argv[1];
	while (*port_ptr) {
		port *= 10;
		port += *port_ptr++ - '0';
	}
	
	unsigned char msg[4];

	DWORD dwBytesToWrite = 4;
	DWORD dwBytesWritten = 0;

	msg[0] = 0xFF;
	msg[1] = port;
	msg[2] = 0;
	msg[3] = 0xFE;
	WriteFile(serialHandle, msg, dwBytesToWrite, &dwBytesWritten, NULL);
	Sleep(1000);

	msg[2] = 1;
	WriteFile(serialHandle, msg, dwBytesToWrite, &dwBytesWritten, NULL);

	CloseHandle(serialHandle);
}