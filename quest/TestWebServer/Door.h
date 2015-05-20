#pragma once

#include "Const.h"
#include "Device.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

class Door: public Device {
	int state;//0 - closed, 1 - opened
	char *json_sample;
public:
	Door(){ 
		json_sample = new char[MAX_JSON_SIZE];
		strcpy(json_sample, "{\"id\": \"%d\", \"ip\" : \"%s\", \"port\" : \"%d\", \"type\" : \"%s\", \"state\" : \"%s\" }");
		state = 0;
	}

	int get_state() { return state; }
	void set_state(int value) { state = value; }

	void create_response(char* response) {
		char *json = new char[MAX_JSON_SIZE];
		char *http = new char[MAX_JSON_SIZE];
		sprintf(json, json_sample, 1, DOOR_SERVER, DOOR_PORT, "door", (state ? "opened" : "closed"));
		sprintf(http, http_header, strlen(json));

		strcpy(response, http);
		strcat(response, json);
	}
	void process_request(char *keys[], char *values[], int params_count) {
		for (int i = 0; i < params_count; i++) {
			if (strcmp(keys[i], "action") == 0) {
				if (strcmp(values[i], "open") == 0) {
					state = 1;
				}
				else if (strcmp(values[i], "close") == 0) {
					state = 0;
				}
			}
		}
	}

	int port(){
		return DOOR_PORT;
	}

	char *address() {
		return DOOR_SERVER;
	}

	~Door() {
		delete[] json_sample;
	}
};