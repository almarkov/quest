#pragma once

#define DOOR_PORT           8082
#define DOOR_SERVER         "127.0.0.1"

#define TIMER_PORT           8083
#define TIMER_SERVER         "127.0.0.1"

#define DEFAULT_BUFFER      4096
#define MAX_SOCKET_CONN     128
#define MAX_JSON_SIZE       2048



const char http_header[256] = "HTTP/1.1 200 OK\n"
"Access-Control-Allow-Origin: http://127.0.0.1:8081\n"
"Content-Type: application/json\n"
"Content-Length: %d\n"
"\n";
