#include <winsock2.h>
#pragma comment (lib, "Ws2_32.lib")
#include <stdio.h>
#include <stdlib.h>


#include "Const.h"
#include "Device.h"
#include "Door.h"
#include "Timer.h"

Device* device;

char request_type(char * buffer) {
	if (buffer[0] == 'G' && buffer[1] == 'E' && buffer[2] == 'T') {
		return 'g';
	}
	if (buffer[0] == 'P' && buffer[1] == 'O' && buffer[2] == 'S' && buffer[3] == 'T') {
		return 'p';
	}
	return 'N';
}

void parse_request(char* buffer, char &type, char* keys[], char* values[], int &params_count) {

	type = request_type(buffer);
	char *param_index = strstr(buffer, "\r\n\r\n");

	char *pch;
	int i = 0;
	pch = strtok(param_index+4, "=&");
	if (pch == NULL) {
		params_count = 0;
		return;
	}
	strcpy(keys[i], pch);
	pch = strtok(NULL, "=&");
	strcpy(values[i], pch);
	while (1)
	{
		i++;
		pch = strtok(NULL, "=&");
		if (pch == NULL) { break; };
		strcpy(keys[i], pch);
		pch = strtok(NULL, "=&");
		strcpy(values[i], pch);
	}
	params_count = i;
}

// процесс для обработки запросов
DWORD WINAPI web_client_thread(LPVOID lpParam)
{
	SOCKET        sock = (SOCKET)lpParam;
	char          buffer[DEFAULT_BUFFER];
	char          response[DEFAULT_BUFFER];
	int           ret, nLeft, idx;
	while (1)
	{
		ret = recv(sock, buffer, DEFAULT_BUFFER, 0);
		if (ret == 0) {
			return 0;
		}
		else if (ret == SOCKET_ERROR)
		{
			printf("recv() failed: %d\n", WSAGetLastError());
			return 0;
		}
		buffer[ret] = '\0';
		printf("RECV: '%s'\n", buffer);

		char *keys[32];
		char *values[32];
		for (int i = 0; i < 32; i++) {
			keys[i] = new char[32];
			values[i] = new char[32];
		}
		int params_count;
		char type;

		parse_request(buffer, type, keys, values, params_count);

		// GET-запрос
		switch (request_type(buffer)) {
			//GET-запрос
			case 'g':
				device->create_response(response);
				break;
			//POST-запрос
			case 'p':
				device->process_request(keys, values, params_count);
				break;
			
			case 'N':
				printf("cannot recognize request\n");
				break;
		}
		for (int i = 0; i < 32; i++) {
			delete[] keys[i];
			delete[] values[i];
		}
		// посылаем ответ
		if (strlen(response)) {
			nLeft = strlen(response);
			idx = 0;
			while (nLeft > 0)
			{
				ret = send(sock, &response[idx], nLeft, 0);
				if (ret == 0)
					break;
				else if (ret == SOCKET_ERROR)
				{
					printf("send() failed: %d\n",
						WSAGetLastError());
					break;
				}
				nLeft -= ret;
				idx += ret;
			}
		}
		
	}
	return 0;
}

int main(int argc, char **argv)
{
	Door door;
	Timer timer;

	if (argc < 2) {
		return 0;
	}
	if (strcmp(argv[1], "door") == 0) {
		device = &door;
	}
	else if (strcmp(argv[1], "timer") == 0) {
		device = &timer;
	}
	else {
		return 0;
	}

	WSADATA wsd;
	SOCKET  socket_web_listen, socket_web_client;

	int i_addr_size;

	HANDLE        hThread;
	DWORD         dwThreadId;

	struct sockaddr_in
		web_local,
		web_client;

	if (WSAStartup(MAKEWORD(2, 2), &wsd) != 0)
	{
		printf("Failed to load Winsock!\n");
		return 1;
	}
	printf("Winsock loaded!\n");

	socket_web_listen = socket(PF_INET, SOCK_STREAM, IPPROTO_IP);
	if (socket_web_listen == SOCKET_ERROR)
	{
		printf("web socket() failed: %d\n", WSAGetLastError());
		return 1;
	}
	printf("web socket created!\n");

	web_local.sin_addr.s_addr = htonl(INADDR_ANY);
	web_local.sin_family = PF_INET;
	web_local.sin_port = htons(device->port());

	if (bind(socket_web_listen, (struct sockaddr *)&web_local,
		sizeof(web_local)) == SOCKET_ERROR)
	{
		printf("web socket bind() failed: %d\n", WSAGetLastError());
		return 1;
	}
	printf("web socket binded!\n");
	listen(socket_web_listen, 128);

	while (1)
	{
		i_addr_size = sizeof(web_client);

		socket_web_client = accept(socket_web_listen,
			(struct sockaddr *)&web_client, &i_addr_size);
		if (socket_web_client == INVALID_SOCKET)
		{
			printf("web accept() failed: %d\n", WSAGetLastError());
			break;
		}
		printf("Accepted web client: %s:%d\n",
			inet_ntoa(web_client.sin_addr), ntohs(web_client.sin_port));

		hThread = CreateThread(NULL, 0, web_client_thread,
			(LPVOID)socket_web_client, 0, &dwThreadId);
		if (hThread == NULL)
		{
			printf("CreateThread() failed: %d\n", GetLastError());
			break;
		}
		CloseHandle(hThread);
	}

	closesocket(socket_web_listen);

	WSACleanup();
	return 0;
}