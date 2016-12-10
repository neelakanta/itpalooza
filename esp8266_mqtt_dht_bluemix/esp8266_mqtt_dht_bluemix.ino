#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"

char wifi_ssid[] = "SSID";
char wifi_pass[] = "PASS";

#define DHTPIN D4
#define DHTTYPE DHT22   // DHT 22  (AM2302)
DHT dht(DHTPIN, DHTTYPE);


#define ORG "wwislx"
#define DEVICE_TYPE "ESP8266"
#define DEVICE_ID "esp01"
#define TOKEN "TOKEN_PASSWORD"

char server[] = ORG ".messaging.internetofthings.ibmcloud.com";
char topic[] = "iot-2/evt/status/fmt/json";
char authMethod[] = "use-token-auth";
char token[] = TOKEN;
char clientId[] = "d:" ORG ":" DEVICE_TYPE ":" DEVICE_ID;

WiFiClient wifiClient;
PubSubClient client(server, 1883, NULL, wifiClient);

void setup() 
{
  Serial.begin(115200);
  Serial.println();
  init_hw();
  connect_wifi();
}

void init_hw()
{
  Serial.println("Initializing DHT22");
  dht.begin();
}

void connect_wifi()
{
  Serial.print("Connecting to Wifi SSID: ");
  Serial.println(wifi_ssid);
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(wifi_ssid, wifi_pass);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.print("WiFi connected.\n IP Address: ");  
  Serial.println(WiFi.localIP());
}

void loop() 
{
  float h = dht.readHumidity();
  float t = dht.readTemperature(true);
    
  if (!client.connected()) {
    Serial.print("Reconnecting client to ");
    Serial.println(server);
    while (!client.connect(clientId, authMethod, token)) {
      Serial.print(".");
      delay(500);
    }
    Serial.println();
  }

  String payload = "{\"d\":{\"temp\":" + String (t,2) + ",\"humi\":" + String (h,2) + "}}";
 
  Serial.print("Sending payload: ");
  Serial.println(payload);
 
  if (client.publish(topic, (char*) payload.c_str())) {
    Serial.println("Publish ok");
  } else {
    Serial.println("Publish failed");
  }

  Serial.printf("Heap: %u\n", ESP.getFreeHeap());
  delay(5000);
}
