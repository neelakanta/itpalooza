#include <ESP8266WiFi.h>

char wifi_ssid[] = "SSID";
char wifi_pass[] = "PASS";

void setup() 
{
  Serial.begin(115200);
  Serial.println();
  Serial.print("Connecting to : ");
  Serial.print(wifi_ssid);
  Serial.print(" / " );
  Serial.println(wifi_pass);

  
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  WiFi.begin(wifi_ssid, wifi_pass);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println();
  Serial.println("WiFi connected");  
}


void print_ip_and_mac()
{
  uint8_t MA[6];
  char MC[18];
  
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.print("Netmask: ");
  Serial.println(WiFi.subnetMask());
  Serial.print("Gateway: ");
  Serial.println(WiFi.gatewayIP());
  
  WiFi.macAddress(MA);
  for (int i = 0; i < sizeof(MA); i++){
    sprintf(MC, "%02x:%02x:%02x:%02x:%02x:%02x",
      MA[0], MA[1], MA[2], MA[3], MA[4], MA[5]);
  }
  Serial.print("MAC Address : ");
  Serial.println(MC);  
}

void loop () 
{
    print_ip_and_mac();
    delay(10000);
}
