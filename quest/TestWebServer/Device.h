#pragma once

class Device {
public:
	virtual void create_response(char* response) = 0;
	virtual void process_request(char *keys[], char *values[], int params_count) = 0;
	virtual int port() = 0;
	virtual char* address() = 0;
};