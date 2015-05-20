#pragma once

#include "Const.h"
#include "Device.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

class Timer: public Device {
	int state;//0 - idle, 1 - active
	int value;
	int current_value;
	char *json_sample;
public:
	Timer(){
		json_sample = new char[MAX_JSON_SIZE];
		strcpy(json_sample, "{\"id\": \"%d\", \"ip\" : \"%s\", \"port\" : \"%d\", \"type\" : \"%s\", \"state\" : \"%s\", \"value\": \"%d\", \"current_value\": \"%d\" }");
		state = 0; value = 12; current_value = 12; }
	int get_state() { return state; }
	void set_state(int value) { state = value; }
	void create_response(char* response) {
		char *json = new char[MAX_JSON_SIZE];
		char *http = new char[MAX_JSON_SIZE];
		sprintf(json, json_sample, 1, TIMER_SERVER, TIMER_PORT, "timer", (state ? "active" : "idle"), value, current_value);
		// таймер сам должен уменьшаться, здесь для простоты по каждому запросу состояния 
		if (state == 1 && current_value > 0) {
			current_value--;
		}
		sprintf(http, http_header, strlen(json));

		strcpy(response, http);
		strcat(response, json);
	}
	void process_request(char *keys[], char *values[], int params_count) {
		for (int i = 0; i < params_count; i++) {
			if (strcmp(keys[i], "action") == 0) {
				if (strcmp(values[i], "activate") == 0) {
					state = 1;
				}
				else if (strcmp(values[i], "stop") == 0) {
					state = 0;
				}
			}
			if (strcmp(keys[i], "value") == 0) {
				value = atoi(values[i]);
				current_value = value;
			}
		}
	}
	int port(){
		return TIMER_PORT;
	}

	char *address() {
		return TIMER_SERVER;
	}
	~Timer(){
		delete[] json_sample;
	}
};