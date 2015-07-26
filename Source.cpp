#include <windows.h>

int main(int argc, char *argv[]) {

	if (argc < 4) {
		return 0;
	}

	char port[80];
	strcpy(port, "\\\\.\\COM");
	strcat(port, argv[1]);

	HANDLE serialHandle;

	serialHandle = CreateFile((LPCWSTR)port, GENERIC_READ | GENERIC_WRITE, 0, 0, OPEN_EXISTING, FILE_FLAG_OVERLAPPED, 0);
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
	unsigned char dev = 0;
	char *dev_ptr = argv[2];
	while (*dev_ptr) {
		dev *= 10;
		dev += *dev_ptr++ - '0';
	}

	unsigned char msg[3];

	DWORD dwBytesToWrite = 3;
	DWORD dwBytesWritten = 0;

	msg[0] = 0xFF;
	msg[1] = dev;
	msg[2] = argv[3][0] - '0';

	if (msg[2] == 2) {
		msg[2] = 0;
		WriteFile(serialHandle, msg, dwBytesToWrite, &dwBytesWritten, NULL);
		Sleep(1000);

		msg[2] = 1;
		WriteFile(serialHandle, msg, dwBytesToWrite, &dwBytesWritten, NULL);
	}
	else {
		WriteFile(serialHandle, msg, dwBytesToWrite, &dwBytesWritten, NULL);
	}

	CloseHandle(serialHandle);

	return 0;
}