
void setup() 
{
  Serial.begin(115200);
  Serial.println("LED BLINK DEMO");
  pinMode(D5, OUTPUT);
  pinMode(D6, OUTPUT);
}

void loop() 
{
  Serial.println("HIGH LOW");
  digitalWrite(D5, HIGH);  
  digitalWrite(D6, LOW);  
  delay(500);                     
  Serial.println("LOW HIGH");
  digitalWrite(D5, LOW);   
  digitalWrite(D6, HIGH);   
  delay(500);                      
}
